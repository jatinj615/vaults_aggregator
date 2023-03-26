import { ethers } from 'ethers';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { useNetwork, useSigner } from './ethereum';
import { useStoreActions } from 'store/globalStore';
import { useContext } from 'react';
import { SUPPORTED_NETWORKS } from 'constants/networkNames';
import { ToastContext, ToastDataInterface } from 'context/toastContext';
import toast from 'react-hot-toast';
import { registries, connextDomain, ConnextWeth } from '../utils/multiChainConstants';
import { Registry__factory } from './typechain';
import { BigNumber } from 'ethers';
import { filter, forEach, isUndefined, map, toString } from 'lodash-es';
import { ExplorerDataType, getExplorerLink } from 'utils';
import { getConnextData } from '../utils/getConnextData';
import axios from 'axios';
import IObject from 'interfaces/iobject.interface';
import { RouteIdFromChainId } from 'utils/contracts';

type BridgeRequestStruct = {
  destinationDomain: BigNumber;
  relayerFee: BigNumber;
  slippage: BigNumber;
};

type VaultRequestStruct = {
  routeId: BigNumber;
  amount: BigNumber;
  vaultAddress: string;
  underlying: string;
  onBehalfOf: string;
  bridgeRequest: BridgeRequestStruct;
};

const useRegistry = () => {
  const { setShouldUpdate } = useStoreActions((action) => action);
  const { setToastData } = useContext(ToastContext);
  const { account, library } = useWeb3React<Web3Provider>();
  const network = useNetwork(library);
  const signer = useSigner(account, library);
  const chainId = library._network.chainId;
  const getRegistryContract = () => {
    try {
      const registryFactory = new Registry__factory(signer);
      const registry = registryFactory.attach(registries[chainId]);
      return registry;
    } catch (err) {
      console.log(err);
    }
  };

  type AmountObject = {
    [key: string]: BigNumber;
  };

  type VaultAddressObject = {
    [key: string]: string;
  };

  const userDepositRequest = async (
    underlying: string,
    amounts: AmountObject,
    vaultAddresses: VaultAddressObject,
    routeId: BigNumber,
    chainId: number
  ) => {
    let relayerFee: BigNumber = ethers.BigNumber.from('0');
    try {
      const filteredChains = {};
      forEach(amounts, (value, key) => {
        const toChainId = key.split('-')[0];
        // if (toChainId !== chainId.toString()) {
        filteredChains[toChainId] = value;
        // }
      });
      const chainIds = [];
      const relayerPromises = map(filteredChains, (value, key) => {
        chainIds.push(key);
        return axios.get(`https://www.zucco.in/?fromChain=${chainId}&toChain=${key}&amount=${value}`);
      });
      const relayerResults = await Promise.all(relayerPromises);
      const chainIdToRelayerFee = {};
      forEach(relayerResults, ({ data }, index) => {
        let relayerFee = ethers.BigNumber.from(String(data.relayerFee));
        // Note: For Demo Purpose passing the triple relayer fee
        relayerFee = relayerFee.mul(ethers.BigNumber.from('3'));
        chainIdToRelayerFee[chainIds[index]] = relayerFee;
      });

      // const connextSDKResponse = await getConnextData(chainId, destinationChainId, amount.toString());
      // console.log(connextSDKResponse);

      // relayerFee = ethers.BigNumber.from(String(connextSDKResponse.relayerFee));
      // Note: For Demo Purpose passing the triple relayer fee
      // relayerFee = relayerFee.mul(ethers.BigNumber.from('3'));
      // slippage = ethers.BigNumber.from(String(connextSDKResponse.destinationSlippage));
      // Note: For Demo purpose passing the slippage as 3%
      // slippage = ethers.BigNumber.from('300');

      const signerAddress = await signer.getAddress();

      let flagIsSameChainTx = true;
      const payload: VaultRequestStruct[] = map(chainIdToRelayerFee, (value, key) => {
        if (key !== chainId.toString()) {
          flagIsSameChainTx = false;
        }
        relayerFee = relayerFee.add(value);
        const bridgeRequest: BridgeRequestStruct = {
          destinationDomain: ethers.BigNumber.from(connextDomain[key].toString()),
          relayerFee: value,
          slippage: ethers.BigNumber.from('300')
        };
        return {
          routeId: routeId,
          amount: amounts[`${key}-${vaultAddresses[key]}-amount`],
          vaultAddress: vaultAddresses[key],
          underlying: underlying,
          onBehalfOf: signerAddress,
          bridgeRequest: bridgeRequest
        };
      });

      console.log({ payload });

      const registryContract = getRegistryContract();

      let tx;
      if (!flagIsSameChainTx) {
        tx = await registryContract
          .connect(signer)
          .userDepositRequest(payload, { value: relayerFee});
      } else {
        console.log('same chain tx');
        tx = await registryContract.connect(signer).userDepositRequest(payload);
      }

      const { hash } = tx;
      // * toast message
      let id = crypto.randomUUID();

      if (!isUndefined(setToastData)) {
        setToastData((prevContext) => {
          return {
            // object that we want to update
            ...(prevContext || {}), // keep all other key-value pairs
            [id]: {
              primaryButtonType: 'ANCHOR',
              linkType: 'EXTERNAL',
              primaryButtonText: 'VIEW ON ETHERSCAN',
              link: `${getExplorerLink(hash, ExplorerDataType.TRANSACTION, chainId)}`
            }
          } as ToastDataInterface;
        });
      }

      await toast.promise(
        tx.wait(),
        {
          loading: 'Transaction Pending...',
          success: 'Transaction Completed',
          error: 'Transaction Failed'
        },
        { id }
      );

      // * toast message
      id = crypto.randomUUID();

      if (!isUndefined(setToastData)) {
        setToastData((prevContext) => {
          // object that we want to update
          return {
            // keep all other key-value pairs
            ...(prevContext || {}),
            [id]: {
              title: 'Subscription Confirmed',
              severity: 'success',
              primaryButtonType: 'BUTTON',
              primaryButtonText: 'DISMISS',
              buttonActionType: 'DISMISS'
            }
          } as ToastDataInterface;
        });
      }

      toast.success('', { id });
      // * toast message for transfer Id
      id = crypto.randomUUID();
      const response = await tx.wait();
      const event = response.events.find((event) => event.event === 'Bridged');
      const [, transferId] = event.args;

      if (!isUndefined(setToastData)) {
        setToastData((prevContext) => {
          // object that we want to update
          return {
            // keep all other key-value pairs
            ...(prevContext || {}),
            [id]: {
              title: 'Track Transfer on ConnextScan',
              severity: 'success',
              primaryButtonType: 'ANCHOR',
              linkType: 'EXTERNAL',
              primaryButtonText: 'VIEW ON CONNEXTSCAN',
              link: 'https://testnet.connextscan.io/tx/' + transferId
            }
          } as ToastDataInterface;
        });
      }
      toast.success('', { id });
    } catch (err) {
      toast.error('An Error Occurred');
      console.log(err);
      throw new Error(err.message);
    }
  };

  return {
    userDepositRequest,
    getRegistryContract
  };
};

export default useRegistry;
