import React from 'react';
import { CardContent, CardHeader, Divider, Grid, useTheme } from '@mui/material';

import Title from 'components/Common/Title';
import { Card } from 'components/Common/Card';
import LabelValue from 'components/Common/LabelValue';
import SkeletonLoader from 'components/Common/SkeletonLoader';
import { useGetExistingBuckets } from 'hooks/api/getExistingBuckets';
import CustomNoRowsOverlay from '../Common/CustomNoRowsOverlay';

type Props = {};

export default function ExistingBuckets({}: Props) {
  const theme = useTheme();
  const { data: existingBucketsData = [], isLoading, isFetching } = useGetExistingBuckets();
  const loading = isFetching || isLoading;

  return (
    <>
      <Title titleText="Existing Bucket | Vault Aggregator" />
      {loading ? (
        <Card sx={{ cursor: 'wait', width: '100%', maxWidth: 450, mt: 6 }}>
          <CardHeader
            subheader={<SkeletonLoader width="20%" />}
            subheaderTypographyProps={{ sx: { fontWeight: theme.typography.fontWeightBold } }}
          />
          <Divider />
          <CardContent>
            <Grid container>
              <Grid item xs={12}>
                <LabelValue label="Bucket Yield Percentage" value={<SkeletonLoader width="20%" />} />
              </Grid>
              <Grid item>
                <LabelValue label={<SkeletonLoader width={50} />} value={<SkeletonLoader width={50} />} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ) : existingBucketsData.length ? (
        <Grid mt={2} mb={4} container spacing={4}>
          {existingBucketsData.map((bucket, index) => (
            <Grid key={index} xs={12} sm={6} md={4} lg={3} item>
              <Card sx={{ cursor: 'pointer', width: '100%', maxWidth: 450 }}>
                <CardHeader
                  subheader={bucket.name || `Bucket ${index + 1}`}
                  subheaderTypographyProps={{ sx: { fontWeight: theme.typography.fontWeightBold } }}
                />
                <Divider />
                <CardContent>
                  <Grid container>
                    <Grid item xs={12}>
                      <LabelValue
                        label="Bucket Yield Percentage"
                        value={loading ? <SkeletonLoader width="20%" /> : `${bucket.bucketYieldPercentage || 0} %`}
                      />
                    </Grid>
                    {bucket.constituents.map((token, index) => (
                      <Grid key={index} item>
                        <LabelValue
                          label={loading ? <SkeletonLoader width={50} /> : token.tokenSymbol}
                          value={loading ? <SkeletonLoader width={50} /> : `${token.yieldPercentage || 0} %`}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <CustomNoRowsOverlay noRowsMessage="You do not have any buckets! Create one using the + icon" />
      )}
    </>
  );
}
