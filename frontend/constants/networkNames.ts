import { Network } from 'alchemy-sdk';
import { ChainId, NetworkName } from 'enums';
import { ChainNames } from './chainIds';

export const DEFAULT_NETWORK_NAMES: NetworkName[] = [NetworkName.MAINNET, NetworkName.GOERLI];

export const ChainNameFromWethAddress: Record<string, string> = {
  [NetworkName.OPTIMISM]: '0x09badef78f92f20fd5f7a402dbb1d25d4901aab2',
  [NetworkName.GOERLI]: '0x2e3a2fb8473316a02b8a297b982498e661e1f6f5',
  [NetworkName.ARBITRUM]: '0xcda739d69067333974cd73a722ab92e5e0ad8a4f',
  [NetworkName.MUMBAI]: '0xd575d4047f8c667e064a4ad433d04e25187f40bb'
};

export const NetworkNameFromAlchemyNetwork: Record<any, string> = {
  [Network.OPT_GOERLI]: 'optimism',
  [Network.ETH_GOERLI]: 'goerli',
  [Network.ARB_GOERLI]: 'arbitrum',
  [Network.MATIC_MUMBAI]: 'mumbai'
};

export const ChainNameFromNetworkName: Record<NetworkName, string> = {
  [NetworkName.MAINNET]: ChainNames[ChainId.MAINNET],
  [NetworkName.GOERLI]: ChainNames[ChainId.GOERLI],
  [NetworkName.ARBITRUM]: ChainNames[ChainId.ARBITRUM],
  [NetworkName.OPTIMISM]: ChainNames[ChainId.OPTIMISM],
  [NetworkName.MUMBAI]: ChainNames[ChainId.MUMBAI]
};

export const SUPPORTED_NETWORK: NetworkName = NetworkName[process.env.NEXT_PUBLIC_SUPPORTED_NETWORK];
export const SUPPORTED_NETWORKS: NetworkName[] = [
  NetworkName.ARBITRUM,
  NetworkName.GOERLI,
  NetworkName.MUMBAI,
  NetworkName.OPTIMISM
];

export const APP_REDIRECT_NETWORK: NetworkName = NetworkName[process.env.NEXT_PUBLIC_APP_REDIRECT_NETWORK];
