import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';
import IObject from 'interfaces/iobject.interface';

export function useGetExploreBuckets(userAddress: string = ''): UseQueryResult<IObject[]> {
  return useQuery({
    queryKey: ['get-explore-buckets', userAddress],
    queryFn: () =>
      axios
        .get(
          `https://06mmfe1l86.execute-api.ap-south-1.amazonaws.com/development/v1/buckets?userAddress=${userAddress}`
        )
        .then(({ data }) => data.data)
        .catch((err) => {
          console.error('Error while fetching get explore buckets', err);
        })
  });
}
