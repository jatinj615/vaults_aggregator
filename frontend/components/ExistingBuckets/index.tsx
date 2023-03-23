import React, { useState } from 'react';
import { CardContent, CardHeader, Divider, Grid, useTheme } from '@mui/material';

import Title from 'components/Common/Title';
import { Card } from 'components/Common/Card';
import LabelValue from 'components/Common/LabelValue';
import SkeletonLoader from 'components/Common/SkeletonLoader';

const buckets = [
  {
    bucketName: 'Blue Chip',
    bucketPrice: '1.00',
    bucketTVL: '1.00',
    tokens: [
      { tokenName: 'BTC', tokenPercentage: '40%' },
      { tokenName: 'ETH', tokenPercentage: '30%' },
      { tokenName: 'MATIC', tokenPercentage: '20%' },
      { tokenName: 'LINK', tokenPercentage: '10%' }
    ]
  },
  {
    bucketName: 'Metaverse',
    bucketPrice: '0.88',
    bucketTVL: '6.42',
    tokens: [
      { tokenName: 'APE', tokenPercentage: '40%' },
      { tokenName: 'MANA', tokenPercentage: '30%' },
      { tokenName: 'SAND', tokenPercentage: '30%' }
    ]
  },
  {
    bucketName: 'Stable Coins',
    bucketPrice: '1.50',
    bucketTVL: '6.51',
    tokens: [
      { tokenName: 'USDC', tokenPercentage: '40%' },
      { tokenName: 'USDT', tokenPercentage: '30%' },
      { tokenName: 'DAI', tokenPercentage: '30%' }
    ]
  }
];

type Props = {};

export default function ExistingBuckets({}: Props) {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Title titleText="Existing Bucket | Scaling 2023" />
      <Grid mt={2} mb={4} container item spacing={4}>
        {buckets.map((bucket, index) => (
          <Grid key={index} xs={12} sm={6} md={4} lg={3} item>
            <Card sx={{ cursor: 'pointer', width: '100%', maxWidth: 450 }}>
              <CardHeader
                subheader={bucket.bucketName}
                subheaderTypographyProps={{ sx: { fontWeight: theme.typography.fontWeightBold } }}
              />
              <Divider />
              <CardContent>
                <Grid container item justifyContent="space-between">
                  <Grid item xs={6}>
                    <LabelValue
                      label="Bucket Price ($)"
                      value={loading ? <SkeletonLoader width="80%" /> : bucket.bucketPrice}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <LabelValue label="TVL ($)" value={loading ? <SkeletonLoader width="80%" /> : bucket.bucketTVL} />
                  </Grid>
                  {bucket.tokens.map((token, index) => (
                    <Grid key={index} item>
                      <LabelValue
                        label={loading ? <SkeletonLoader width="80%" /> : token.tokenName}
                        value={loading ? <SkeletonLoader width="80%" /> : token.tokenPercentage}
                      />
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
