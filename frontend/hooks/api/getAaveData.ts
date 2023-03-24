import { map } from 'lodash-es';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import IObject from 'interfaces/iobject.interface';

export function useGetAaveData(): UseQueryResult<IObject[]> {
  return useQuery({
    queryKey: ['get-aave-data'],
    queryFn: () =>
      fetch('https://06mmfe1l86.execute-api.ap-south-1.amazonaws.com/development/v1/subgraph')
        .then((res) => res.json())
        .then(({ data }) => map(data, (row: any) => createRowObject(row)))
        .catch((err) => {
          console.error('Error while fetching get aave data', err);
        })
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
