import { Grid, Theme } from '@mui/material';

import { portfolioOTYTBalancesColumns } from 'utils/datagrid';
import { ChainName, YieldPercentage, TokenName, TotalBalance } from 'utils/datagrid/columns/PortfolioColumns';

interface IPortfolioCardLoaderProps {
  theme: Theme;
  rowHeight: number;
}

export function PortfolioCardOTYTBalancesLoader({ theme, rowHeight }: IPortfolioCardLoaderProps) {
  return (
    <Grid
      sx={{
        backgroundColor: theme.vaggr.card.backgroundColor,
        border: `2px solid ${theme.vaggr.datagrid.border.color}`,
        borderTop: 0,
        maxHeight: 'none !important',
        height: rowHeight,
        maxWidth: '100%',
        borderBottomLeftRadius: theme.typography.pxToRem(12),
        borderBottomRightRadius: theme.typography.pxToRem(12)
      }}
      container
      wrap="nowrap"
      alignItems="center"
    >
      {/* Token Name */}
      <TokenName minWidth={portfolioOTYTBalancesColumns.tokenName.minWidth} loading />
      {/* Fixed APR / Position APY */}
      <ChainName minWidth={portfolioOTYTBalancesColumns.fixedAPRPositionAPY.minWidth} loading />
      {/* Current Value */}
      <YieldPercentage minWidth={portfolioOTYTBalancesColumns.yieldPercentage.minWidth} loading />
      {/* Total Balance */}
      <TotalBalance minWidth={portfolioOTYTBalancesColumns.totalBalance.minWidth} loading />
    </Grid>
  );
}
