import { ethers } from 'ethers';
import { GridColumns, GridRenderCellParams } from '@mui/x-data-grid';

import { BigNumber } from 'utils/poolCalc/utils/bignumber';
import { ChainName, YieldPercentage, TokenName, TotalBalance } from 'utils/datagrid/columns/PortfolioColumns';

export const portfolioCurrentValueSymbol = '$';
export const portfolioDatagridRowHeight: number = 75;

export const portfolioOTYTBalancesColumns = {
  tokenName: {
    minWidth: 100
  },
  fixedAPRPositionAPY: {
    minWidth: 100
  },
  yieldPercentage: {
    minWidth: 100
  },
  totalBalance: {
    minWidth: 100
  }
};

export const getOTYTBalancesColumns = (): GridColumns => {
  return [
    {
      field: 'tokenSymbol',
      headerName: 'Token Name',
      headerClassName: 'MuiDataGrid-columnHeader--tokenName',
      cellClassName: 'MuiDataGrid-cell--tokenName',
      minWidth: portfolioOTYTBalancesColumns.tokenName.minWidth,
      flex: 1,
      renderCell: (params: GridRenderCellParams<string>) => {
        return <TokenName params={params} />;
      },
      sortable: false,
      disableColumnMenu: true
    },
    {
      field: 'chainName',
      headerName: 'Chain Name',
      minWidth: portfolioOTYTBalancesColumns.fixedAPRPositionAPY.minWidth,
      flex: 1,
      renderCell: (params: GridRenderCellParams<any>) => {
        return <ChainName params={params} />;
      },
      sortable: false,
      disableColumnMenu: true
    },
    {
      field: 'yieldPercentage',
      headerName: 'Yield Percentage',
      minWidth: portfolioOTYTBalancesColumns.yieldPercentage.minWidth,
      flex: 1,
      renderCell: (params: GridRenderCellParams<BigNumber>) => {
        return <YieldPercentage params={params} />;
      },
      sortable: false,
      disableColumnMenu: true
    },
    {
      field: 'tokenBalance',
      headerName: 'Total Balance',
      minWidth: portfolioOTYTBalancesColumns.totalBalance.minWidth,
      flex: 1,
      renderCell: (params: GridRenderCellParams<ethers.BigNumber>) => {
        return <TotalBalance params={params} />;
      },
      sortable: false,
      disableColumnMenu: true
    }
  ];
};
