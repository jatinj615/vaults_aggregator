import { Box, Button, Card, CardContent, CardHeader, Checkbox, Divider, Grid, useTheme } from '@mui/material';
import { CheckCircle as CircleCheckedIcon, RadioButtonUnchecked as CircleUncheckedIcon } from '@mui/icons-material';
import { darken, lighten } from '@mui/material/styles';
import { useGetAaveData } from 'hooks/api/getAaveData';
import SkeletonLoader from '../Common/SkeletonLoader';
import LabelValue from '../Common/LabelValue';
import IObject from 'interfaces/iobject.interface';

const getHoverBackgroundColor = (theme) =>
  theme.palette.mode === 'dark'
    ? `${darken(theme.palette.info.main, 0.3)}, ${darken(theme.palette.info.dark, 0.5)}`
    : `${lighten(theme.palette.info.main, 0.1)}, ${lighten(theme.palette.info.light, 0.4)}`;

type Props = {
  checkedState: IObject;
  handleVaultChecked: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBack: () => void;
  handleNext: () => void;
};

export default function SelectVaults({ checkedState, handleVaultChecked, handleBack, handleNext }: Props) {
  const theme = useTheme();
  const { data: aaveData = [], isLoading, isFetching } = useGetAaveData();
  const loading = isFetching || isLoading;

  return (
    <Grid sx={{ height: '100%' }} container direction="column" justifyContent="center" rowSpacing={3}>
      {loading ? (
        <Card
          sx={{
            cursor: 'wait',
            background: theme.vaggr.card.backgroundColor,
            borderRadius: theme.typography.pxToRem(12),
            width: '100%',
            maxWidth: 450
          }}
        >
          <CardHeader
            subheader={<SkeletonLoader width="20%" />}
            subheaderTypographyProps={{ sx: { fontWeight: theme.typography.fontWeightBold } }}
            action={<Checkbox icon={<CircleUncheckedIcon />} disabled />}
          />
          <Divider />
          <CardContent>
            <Grid container direction="column">
              <Grid item>
                <LabelValue label="Chain Name" value={<SkeletonLoader width="20%" />} />
              </Grid>
              <Grid item>
                <LabelValue label="Total Liquidity" value={<SkeletonLoader width="20%" />} />
              </Grid>
              <Grid item>
                <LabelValue label="Yield Percentage" value={<SkeletonLoader width="20%" />} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ) : (
        <Grid mb={2} container spacing={4}>
          {aaveData.map((bucket, index) => {
            const checkedName = `${bucket.name}_${bucket.chainName}`;

            return (
              <Grid key={index} xs={12} sm={6} md={4} item>
                <Card
                  sx={{
                    cursor: 'pointer',
                    background: theme.vaggr.card.backgroundColor,
                    borderRadius: theme.typography.pxToRem(12),
                    width: '100%',
                    maxWidth: 450,
                    '&:hover': {
                      background: (_theme) => `linear-gradient(225deg, ${getHoverBackgroundColor(_theme)})`
                    }
                  }}
                >
                  <CardHeader
                    subheader={bucket.name || `Bucket ${index + 1}`}
                    subheaderTypographyProps={{ sx: { fontWeight: theme.typography.fontWeightBold } }}
                    action={
                      <Checkbox
                        checked={checkedState?.checkedName}
                        onChange={handleVaultChecked}
                        icon={<CircleUncheckedIcon />}
                        checkedIcon={<CircleCheckedIcon />}
                        inputProps={{ 'aria-label': 'Add this vault' }}
                        name={checkedName}
                      />
                    }
                  />
                  <Divider />
                  <CardContent>
                    <Grid container direction="column">
                      <Grid item>
                        <LabelValue
                          label="Chain Name"
                          value={loading ? <SkeletonLoader width="20%" /> : `${bucket.chainName}`}
                        />
                      </Grid>
                      <Grid item>
                        <LabelValue
                          label="Total Liquidity"
                          value={loading ? <SkeletonLoader width="20%" /> : `$ ${bucket.totalLiquidity}`}
                        />
                      </Grid>
                      <Grid item>
                        <LabelValue
                          label="Yield Percentage"
                          value={loading ? <SkeletonLoader width="20%" /> : `${bucket.yieldPercentage} %`}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
          Back
        </Button>
        <Box sx={{ flex: '1 1 auto' }} />
        <Button onClick={handleNext}>Next</Button>
      </Box>
    </Grid>
  );
}
