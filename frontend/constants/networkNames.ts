import { Network } from 'alchemy-sdk';
import { ChainId, NetworkName } from 'enums';
import { ChainNames } from './chainIds';

export const DEFAULT_NETWORK_NAMES: NetworkName[] = [NetworkName.MAINNET, NetworkName.GOERLI];

export const WethAddressFromChainName: Record<string, string> = {
  [NetworkName.OPTIMISM]: '0x74c6FD7D2Bc6a8F0Ebd7D78321A95471b8C2B806',
  [NetworkName.GOERLI]: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
  [NetworkName.ARBITRUM]: '0x1346786E6A5e07b90184a1Ba58E55444b99DC4A2',
  [NetworkName.MUMBAI]: '0xFD2AB41e083c75085807c4A65C0A14FDD93d55A9'
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
