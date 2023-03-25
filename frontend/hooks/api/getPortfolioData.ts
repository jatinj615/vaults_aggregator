import { NetworkNameFromAlchemyNetwork } from 'constants/networkNames';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { Alchemy, Network } from 'alchemy-sdk';
import IObject from 'interfaces/iobject.interface';
import { find, map } from 'lodash-es';

const configs = [
  {
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
    network: Network.OPT_GOERLI
  },
  {
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
    network: Network.ETH_GOERLI
  },
  {
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
    network: Network.ARB_GOERLI
  },
  {
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
    network: Network.MATIC_MUMBAI
  }
];

const alchemyConfigs = configs.map((config) => ({ alchemyConfig: new Alchemy(config), network: config.network }));

export function useGetPortfolioData(userAddress: string = '', aaveData: IObject[]): UseQueryResult<IObject[]> {
  const tokenContractAddressesMap = new Map();
  aaveData.forEach((bucket) => {
    tokenContractAddressesMap.set(bucket.chainName, bucket.aTokenId);
  });

  return useQuery({
    queryKey: ['get-portfolio-data', userAddress, aaveData],
    queryFn: async () => {
      const alchemyPromises = map(alchemyConfigs, ({ alchemyConfig, network }) =>
        alchemyConfig.core.getTokenBalances(userAddress, [
          tokenContractAddressesMap.get(NetworkNameFromAlchemyNetwork[network])
        ])
      );

      const alchemyResults = await Promise.all(alchemyPromises);
      return map(aaveData, (bucket) => ({
        ...bucket,
        tokenBalance: parseInt(
          find(alchemyResults, (res) => res.tokenBalances?.[0]?.contractAddress === bucket.aTokenId)?.tokenBalances?.[0]
            ?.tokenBalance,
          16
        )
      }));
    },
    // The query will not execute until the conditions are true
    enabled: !!userAddress && !!aaveData.length
  });
}
