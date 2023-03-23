import React from 'react';
import { Fab, Tooltip } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

import NoMatchFound from 'components/Common/NoMatchFound';
import CustomNoRowsOverlay from '../Common/CustomNoRowsOverlay';

type Props = {};

export default function MyBuckets({}: Props) {
  const router = useRouter();
  const { active } = useWeb3React<Web3Provider>();

  const handleClickNewBucketBtn = () => {
    router.push('/new-bucket');
  };

  if (!active) {
    return <NoMatchFound />;
  }

  return (
    <>
      <CustomNoRowsOverlay noRowsMessage="You do not have any buckets! Create one using the + icon" />
      <Tooltip title="Create a new bucket" placement="top">
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
