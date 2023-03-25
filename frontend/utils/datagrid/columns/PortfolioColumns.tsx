import { ethers } from 'ethers';
import { Avatar, Grid, Theme } from '@mui/material';

import { intlFormatNumber } from 'utils/formatNumber';
import { bnum } from 'utils/poolCalc/utils/bignumber';
import { getCurrencyPath } from 'constants/currencyPaths';

import SkeletonLoader from 'components/Common/SkeletonLoader';

interface IColumnProps {
  params?: any;
  theme?: Theme;
  minWidth?: number;
  loading?: boolean;
  cellPadding?: number;
}

export function TokenName({ params, minWidth, loading = false, cellPadding = 1.25 }: IColumnProps) {
  const cellSx = loading ? { minWidth, px: cellPadding, pl: 3 } : {};

  return (
    <Grid container item xs alignItems="center" {...cellSx}>
      <Grid item xs={2}>
        {loading ? (
          <SkeletonLoader variant="circular">
            <Avatar />
          </SkeletonLoader>
        ) : (
          <Avatar alt="Currency Logo" src={getCurrencyPath(params?.row?.symbol)} />
        )}
      </Grid>
      <Grid item xs={10}>
        {loading ? <SkeletonLoader width="80%" /> : <>{params?.value}</>}
      </Grid>
    </Grid>
  );
}

export function ChainName({ params, minWidth, loading = false, cellPadding = 1.25 }: IColumnProps) {
  if (loading) {
    return (
      <Grid item xs minWidth={minWidth} px={cellPadding}>
        <SkeletonLoader width="80%" />
      </Grid>
    );
  }

  return <>{params?.value}</>;
}

export function YieldPercentage({ params, minWidth, loading = false, cellPadding = 1.25 }: IColumnProps) {
  return loading ? (
    <Grid item xs minWidth={minWidth} px={cellPadding}>
      <SkeletonLoader width="80%" />
    </Grid>
  ) : (
    <>{`${params?.value} %`}</>
  );
}

export function TotalBalance({ params, minWidth, loading = false, cellPadding = 1.25 }: IColumnProps) {
  return loading ? (
    <Grid item xs minWidth={minWidth} px={cellPadding}>
      <SkeletonLoader width="80%" />
    </Grid>
  ) : (
    <>{intlFormatNumber(params?.value, 6)}</>
  );
}
