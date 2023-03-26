import { SUPPORTED_NETWORK } from 'constants/networkNames';
import { ChainId, NetworkName } from 'enums';

export let contract;

if (NetworkName.MAINNET === SUPPORTED_NETWORK) {
  contract = Object.freeze({});
} else if (NetworkName.GOERLI === SUPPORTED_NETWORK) {
  contract = Object.freeze({
    tokens: {
      dai: '0xdf1742fe5b0bfc12331d8eaec6b478dfdbd31464',
      weth: '0x9A1000D492d40bfccbc03f413A48F5B6516Ec0Fd',
      usdc: '0x78dEca24CBa286C0f8d56370f5406B48cFCE2f86'
    },
    vaults: {
      aave: {
        dai: '0x310839be20fc6a8a89f33a59c7d5fc651365068f',
        weth: '0xA61ca04DF33B72b235a8A28CfB535bb7A5271B70'
      },
      compound: {
        dai: '0xf0d0eb522cfa50b716b3b1604c4f0fa6f04376ad',
        usdc: '0x4a92E71227D294F041BD82dd8f78591B75140d63',
        usdt: '0x3f0A0EA2f86baE6362CF9799B523BA06647Da018'
      },
      yearn: {
        dai: '0x5C2EEa0A960Cc1f604bF3c35A52Ca2273F12e67E'
      }
    },
    core: '0x2b59509CdfFcf1969A333d227C21503410198616',
    treasury: '0x047BFF55847C58dB6366c5fB777bAe6d5976c063',
    balancerVault: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
    weightedPoolFactory: '0x8E9aa87E45e92bad84D5F8DD1bff34Fb92637dE9',
    convergentCurvePoolFactory: '0x11C32ddBA3E7634989346Bb7e4b26a02879aD939',
    epochs: [
      {
        expiration: '1677538608',
        address: '0x3a013834De4b695DECab7e1b2dBE1A36c26512d2',
        duration: 15768000,
        ytPool: {
          address: '0xf643B222334d6950B9C2C6686397D1BeD9BdF3F3',
          poolId: '0xf643b222334d6950b9c2c6686397d1bed9bdf3f30002000000000000000001c5',
          fee: '0.003'
        },
        otPool: {
          address: '0xd173b9F9981A5814Fdf9018c574019180a446E7C',
          poolId: '0xd173b9f9981a5814fdf9018c574019180a446e7c0002000000000000000000f6',
          fee: '0.004',
          timeStretch: 37
        }
      }
    ]
  });
}

// for approval
export const ContractAddressFromChainId: Record<ChainId, string> = {
  [ChainId.MAINNET]: '',
  [ChainId.GOERLI]: '0xF2217656B69a0f822d6dBD54B42641B44697dAb8',
  [ChainId.OPTIMISM]: '0x46539763C1eA530f8CC88E81d911Efc48a1411f3',
  [ChainId.MUMBAI]: '0x1BA989F00755F20936DDA2B781D38470529B9C53',
  [ChainId.ARBITRUM]: '0x46539763C1eA530f8CC88E81d911Efc48a1411f3'
};

export const RouteIdFromChainId: Record<ChainId, number> = {
  [ChainId.MAINNET]: 0,
  [ChainId.GOERLI]: 1735353714,
  [ChainId.OPTIMISM]: 1735356532,
  [ChainId.MUMBAI]: 9991,
  [ChainId.ARBITRUM]: 421613
};
