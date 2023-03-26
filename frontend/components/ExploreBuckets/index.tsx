import React, { useEffect, useState } from 'react';
import { CardActionArea, CardContent, CardHeader, Chip, Divider, Fab, Grid, Tooltip, useTheme } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

import Title from 'components/Common/Title';
import { Card } from 'components/Common/Card';
import LabelValue from 'components/Common/LabelValue';
import SkeletonLoader from 'components/Common/SkeletonLoader';
import { useSigner } from 'hooks/ethereum';
import { useGetExploreBuckets } from 'hooks/api/getExploreBuckets';
import CustomNoRowsOverlay from '../Common/CustomNoRowsOverlay';
import { useRouter } from 'next/router';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import InvestModal from '../Modal/InvestModal';
import IObject from 'interfaces/iobject.interface';
import { useStoreState } from 'store/globalStore';
import { WethAddressFromChainName } from 'constants/networkNames';

type Props = {};

export default function ExploreBuckets({}: Props) {
  const { network } = useStoreState((state) => state);
  const theme = useTheme();
  const router = useRouter();
  const { account, library } = useWeb3React<Web3Provider>();
  const signer = useSigner(account, library);
  const { data: exploreBucketsData = [], isLoading, isFetching } = useGetExploreBuckets(account);
  const loading = isFetching || isLoading;
  const [showInvestModal, setShowInvestModal] = useState(false);
  const [constituents, setConstituents] = useState<IObject[]>([]);
  const [chainId, setChainId] = useState<number>();

  const underlying = WethAddressFromChainName[network];

  useEffect(() => {
    let active = true;

    const setChainID = async () => {
      if (signer) {
        try {
          const connectedChainId = await signer.getChainId();
          if (!active) {
            return;
          }
          setChainId(connectedChainId);
        } catch (error) {
          console.error('Error from structure signer getChainId API', error);
        }
      }
    };

    setChainID();
    // Clean the state when the component is unmounted
    return () => {
      active = false;
      setChainId(undefined);
    };
  }, [signer]);

  const handleClickNewBucketBtn = () => {
    router.push('/new-bucket');
  };

  const handleShowInvestModal = (value: boolean) => {
    setShowInvestModal(value);
  };

  const resetInvestModal = () => {
    setConstituents([]);
  };

  const handleCardClick = (bucket: IObject) => {
    resetInvestModal();
    setConstituents(bucket.constituents);
    setShowInvestModal(true);
  };

  return (
    <>
      <Title titleText="Explore Buckets | Vault Aggregator" />
      {showInvestModal && (
        <InvestModal
          showDialog={showInvestModal}
          setShowDialog={handleShowInvestModal}
          underlyingTokenSymbol={'WETH'}
          chainId={chainId}
          underlying={underlying}
          underlyingDecimals={18}
          constituents={constituents}
        />
      )}
      {loading ? (
        <Card sx={{ cursor: 'wait', width: '100%', maxWidth: 350, mt: 6 }}>
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
      ) : exploreBucketsData.length ? (
        <Grid mt={2} mb={4} container spacing={4}>
          {exploreBucketsData.map((bucket, index) => (
            <Grid key={index} xs={12} sm={6} md={4} lg={3} item>
              <Card sx={{ cursor: 'pointer', width: '100%', maxWidth: 450 }}>
                <CardActionArea disableRipple onClick={() => handleCardClick(bucket)}>
                  <CardHeader
                    subheader={bucket.name || `Bucket ${index + 1}`}
                    subheaderTypographyProps={{ sx: { fontWeight: theme.typography.fontWeightBold } }}
                    action={
                      <Chip
                        sx={{ borderRadius: theme.typography.pxToRem(5) }}
                        label={bucket?.userAddress ? 'PRIVATE' : 'PUBLIC'}
                        variant="outlined"
                        color={bucket?.userAddress ? 'success' : 'warning'}
                      />
                    }
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
                            label={loading ? <SkeletonLoader width={50} /> : token.vaultSymbol}
                            value={loading ? <SkeletonLoader width={50} /> : `${token.yieldPercentage || 0} %`}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <CustomNoRowsOverlay noRowsMessage="You do not have any buckets! Create one using the + icon" />
      )}
      <Tooltip title="Create a custom bucket" placement="top">
        <Fab
          sx={{
            position: 'fixed',
            top: '90%',
            left: '94%',
            /* bring your own prefixes */
            transform: 'translate(-50%, -50%)'
          }}
          color="primary"
          aria-label="create-new-bucket"
          onClick={handleClickNewBucketBtn}
        >
          <AddIcon />
        </Fab>
      </Tooltip>
    </>
  );
}
