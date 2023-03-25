import React from 'react';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

import NoMatchFound from 'components/Common/NoMatchFound';
import CustomNoRowsOverlay from '../Common/CustomNoRowsOverlay';

type Props = {};

export default function MyPortfolio({}: Props) {
  const { active } = useWeb3React<Web3Provider>();

  if (!active) {
    return <NoMatchFound />;
  }

  return (
    <>
      <CustomNoRowsOverlay noRowsMessage="This wallet does not contain any Positions" />
    </>
  );
}
