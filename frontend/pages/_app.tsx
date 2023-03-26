import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import 'styles/globals.css';

import type { AppProps } from 'next/app';

import React, { useContext, useEffect, useMemo, useState } from 'react';
import { createStore, StoreProvider } from 'easy-peasy';
import { QueryClientProvider } from '@tanstack/react-query';
import { createTheme, ThemeProvider } from '@mui/material';
import { useWeb3React, Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

import globalStore, { useStoreActions } from 'store/globalStore';
import { StoreModel } from 'store/model';
import { useStoreState } from 'store/globalStore';
import getDesignTokens from 'theme';
import { getEthereumProviderLibrary, getItem } from 'utils';
import { ToastContext } from 'context/toastContext';
import { useNetwork } from 'hooks/ethereum';
import { vaggrQueryClient } from 'queryClient';

import StructureComponent from 'components/Structure';

function InnerXVaultApp({ Component, pageProps }: AppProps) {
  const mode = useStoreState((state) => state.theme.mode);
  const { setNetwork, setTheme } = useStoreActions((actions) => actions);
  const { setToastData } = useContext(ToastContext);
  const { library } = useWeb3React<Web3Provider>();
  const network = useNetwork(library);

  // Update the theme only if the mode changes
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  useEffect(() => {
    if (getItem('theme')) {
      setTheme(getItem('theme'));
    }
  }, [setTheme]);

  useEffect(() => {
    setNetwork(network);
  }, [network, setNetwork]);

  return (
    <ThemeProvider theme={theme}>
      <StructureComponent>
        <Component {...pageProps} />
      </StructureComponent>
    </ThemeProvider>
  );
}

// * initiate the store
const store = createStore<StoreModel>(globalStore);

// * this is the main setup file where all the top level library injections happen
export default function XVaultApp({ Component, pageProps }: AppProps) {
  const [toastData, setToastData] = useState();
  const [showConnectWalletModal, setShowConnectWalletModal] = useState<boolean>(false);
  const value = { toastData, setToastData, showConnectWalletModal, setShowConnectWalletModal };

  return (
    <StoreProvider store={store}>
      <Web3ReactProvider getLibrary={getEthereumProviderLibrary}>
        <QueryClientProvider client={vaggrQueryClient}>
          <ToastContext.Provider value={value}>
            <InnerXVaultApp Component={Component} {...pageProps}></InnerXVaultApp>
          </ToastContext.Provider>
        </QueryClientProvider>
      </Web3ReactProvider>
    </StoreProvider>
  );
}
