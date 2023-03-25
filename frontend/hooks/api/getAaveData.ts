import { map } from 'lodash-es';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';
import IObject from 'interfaces/iobject.interface';

export function useGetAaveData(): UseQueryResult<IObject[]> {
  return useQuery({
    queryKey: ['get-aave-data'],
    queryFn: () =>
      axios
        .get('https://06mmfe1l86.execute-api.ap-south-1.amazonaws.com/development/v1/subgraph?name=WETH')
        .then(({ data }) => map(data.data, (row: any) => createRowObject(row)))
        .catch((err) => {
          console.error('Error while fetching get aave data', err);
        }),
    staleTime: Infinity,
    cacheTime: Infinity
  });
}

/**
 * To create row object
 * @param stream
 * @param vaultApy
 * @param balancerPools
 * @param kovanPoolData
 * @param rate
 * @returns rowObject
 */
const createRowObject = (row) => {
  const rowObject: IObject = {};
  rowObject.name = row.name;
  rowObject.symbol = row.name;
  rowObject.vaultSymbol = 'AAVE WETH';
  rowObject.totalLiquidity = row.totalLiquidity;
  rowObject.liquidityRate = row.liquidityRate;
  rowObject.chainName = row.chain_name;
  rowObject.chainId = row.chain_id;
  rowObject.aToken = row.aToken.id;
  rowObject.pool = row.pool.pool;
  rowObject.underlyingAddress = row.underlyingAsset;
  rowObject.id = row.aToken.id;
  rowObject.yieldPercentage = row.yield_percentage;

  return rowObject;
};
