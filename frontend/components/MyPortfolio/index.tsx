import { Grid, Slide, Typography, useTheme } from '@mui/material';
import { DataGrid, DATA_GRID_PROPS_DEFAULT_VALUES, GridSelectionModel } from '@mui/x-data-grid';
import { darken, lighten, Theme } from '@mui/material/styles';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

import { useStoreState } from 'store/globalStore';
import NoMatchFound from 'components/Common/NoMatchFound';
import CustomNoRowsOverlay from '../Common/CustomNoRowsOverlay';

import { PortfolioCardOTYTBalancesLoader } from './PortfolioCardLoader';
import { SUPPORTED_NETWORKS } from 'constants/networkNames';
import { getOTYTBalancesColumns, portfolioDatagridRowHeight } from 'utils/datagrid';
import { NetworkName } from 'enums';
import { useEffect, useState } from 'react';
import { useGetAaveData } from 'hooks/api/getAaveData';
import { useGetPortfolioData } from 'hooks/api/getPortfolioData';

const getHoverBackgroundColor = (theme: Theme) =>
  theme.palette.mode === 'dark'
    ? `${lighten(theme.palette.secondary.main, 0.1)}, ${lighten(theme.palette.secondary.dark, 0.3)}`
    : `${lighten(theme.palette.info.light, 0.4)}, ${lighten(theme.palette.info.main, 0.1)}`;

const getNoRowsCustomStyles = (theme) => ({
  backgroundColor: theme.vaggr.card.backgroundColor,
  border: `2px solid ${theme.vaggr.datagrid.border.color}`,
  borderTop: 0,
  maxHeight: 'none !important',
  maxWidth: '100%',
  borderBottomLeftRadius: theme.typography.pxToRem(12),
  borderBottomRightRadius: theme.typography.pxToRem(12)
});

const { headerHeight } = DATA_GRID_PROPS_DEFAULT_VALUES;

type Props = {};

export default function MyPortfolio({}: Props) {
  const { network } = useStoreState((state) => state);
  const theme = useTheme();
  const { account, active } = useWeb3React<Web3Provider>();
  const {
    data: aaveData = [],
    isInitialLoading: isAaveDataInitLoading,
    isLoading: isAaveDataLoading,
    isFetching: isAaveDataFetching
  } = useGetAaveData();
  const {
    data: portfolioRowsData = [],
    isInitialLoading: isPortfolioBalancesInitLoading,
    isLoading: isPortfolioBalancesLoading,
    isFetching: isPortfolioBalancesFetching
  } = useGetPortfolioData(account, aaveData);

  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);

  const loading = isAaveDataLoading || isAaveDataFetching || isPortfolioBalancesLoading || isPortfolioBalancesFetching;

  const handleSelectionModelChange = (newSelectionModel: GridSelectionModel) => {
    setSelectionModel(newSelectionModel);
  };

  const resetPortfolioCardModal = () => {
    // setIsOwnership(false);
    // setFromLPPositions(false);
    // setAPR(ZERO);
    // setVaultApy(ethers.constants.Zero);
    // setEndDate('');
    // setDuration('');
    // setPercentComplete(0);
    // setBalance(ethers.constants.Zero);
    // setTokenSymbol('');
    // setCurrentValue(ZERO);
    // setCurrencySymbol('');
    // setPoolID('');
    // setStreamKey('');
    // setEpochNumber(0);
    // setShareOfPool(ZERO);
    // setPoolTokenLiquidity(ZERO);
    // setPoolTokenSymbol('');
    // setUnderlyingTokenLiquidity(ZERO);
    // setUnderlyingTokenSymbol('');
    // setUnderlyingDecimals(18);
  };

  const handlePortfolioRowClick = (params, event, details) => {
    resetPortfolioCardModal();
  };

  const getDatagridHeight = (noOfRows: number): number => {
    if (isAaveDataInitLoading || isPortfolioBalancesInitLoading) {
      return headerHeight + portfolioDatagridRowHeight + 10;
    }
    if (noOfRows) {
      return headerHeight + portfolioDatagridRowHeight * noOfRows + 30;
    } else {
      return headerHeight + portfolioDatagridRowHeight * 3 + 10;
    }
  };

  if (!active) {
    return <NoMatchFound />;
  }

  if (network && !SUPPORTED_NETWORKS.includes(network as NetworkName)) {
    return <CustomNoRowsOverlay noRowsMessage="This wallet does not contain any Positions" />;
  }

  return (
    <Slide direction="left" in timeout={150} mountOnEnter unmountOnExit>
      <Grid
        container
        direction="column"
        wrap="nowrap"
        mt={5}
        sx={{
          '& .unreal-app-theme--table-card': {
            bgcolor: theme.vaggr.card.backgroundColor,
            boxShadow: '0px 10px 100px rgba(0, 0, 0, 0.06)',
            border: `2px solid ${theme.vaggr.datagrid.border.color}`,
            borderTop: 0,
            maxHeight: 'none !important',
            cursor: 'pointer'
          },
          '& .MuiGrid-root.MuiGrid-item': {
            '&.MuiGrid-item--datagrid': {
              minHeight: theme.typography.pxToRem(getDatagridHeight(portfolioRowsData.length))
            }
          }
        }}
      >
        <Grid item mb={2}>
          <Typography variant="h5" gutterBottom>
            Investments Overview
          </Typography>
        </Grid>
        <Grid item xs className="MuiGrid-item--datagrid">
          <DataGrid
            sx={{
              border: 0,
              '& .MuiDataGrid-cell': {
                borderBottom: 'none'
              },
              '& .MuiDataGrid-cell:focus': {
                outline: 'none'
              },
              '& .MuiDataGrid-columnHeaders': {
                border: `2px solid ${theme.vaggr.datagrid.border.color}`,
                borderTopLeftRadius: theme.typography.pxToRem(12),
                borderTopRightRadius: theme.typography.pxToRem(12),
                ...theme.vaggr.datagrid.header
              },
              '& .MuiDataGrid-columnHeader--tokenName, & .MuiDataGrid-cell--tokenName': {
                pl: theme.spacing(3)
              },
              '& .MuiDataGrid-columnSeparator': {
                visibility: 'hidden'
              },
              '& .MuiDataGrid-virtualScrollerRenderZone': {
                maxWidth: '100%',
                '& .MuiDataGrid-row': {
                  maxWidth: '100%',
                  '&:hover': {
                    background: (_theme) => `linear-gradient(135deg, ${getHoverBackgroundColor(_theme)})`
                  },
                  '&.MuiDataGrid-row--lastVisible': {
                    borderBottomLeftRadius: theme.typography.pxToRem(12),
                    borderBottomRightRadius: theme.typography.pxToRem(12)
                  }
                }
              }
            }}
            columns={getOTYTBalancesColumns()}
            rows={portfolioRowsData}
            onRowClick={handlePortfolioRowClick}
            getRowClassName={(_params) => `unreal-app-theme--table-card`}
            hideFooter
            rowHeight={portfolioDatagridRowHeight}
            onSelectionModelChange={handleSelectionModelChange}
            selectionModel={selectionModel}
            components={{ LoadingOverlay: PortfolioCardOTYTBalancesLoader, NoRowsOverlay: CustomNoRowsOverlay }}
            componentsProps={{
              loadingOverlay: { theme, rowHeight: portfolioDatagridRowHeight },
              noRowsOverlay: {
                noRowsMessage: 'This wallet does not contain any Ownership Tokens',
                customStyles: getNoRowsCustomStyles(theme)
              }
            }}
            loading={loading}
          />
        </Grid>
      </Grid>
    </Slide>
  );
}
