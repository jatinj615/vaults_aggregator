import { ChainId } from 'enums';

export const ChainNames: Record<ChainId, string> = {
  [ChainId.MAINNET]: 'Ethereum Mainnet',
  [ChainId.GOERLI]: 'Goerli Testnet'
};

export const DEFAULT_CHAIN_IDS: ChainId[] = [ChainId.MAINNET, ChainId.GOERLI];
