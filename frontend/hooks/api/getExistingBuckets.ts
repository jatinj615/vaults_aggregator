import { useQuery, UseQueryResult } from '@tanstack/react-query';
import IObject from 'interfaces/iobject.interface';

export function useGetExistingBuckets(): UseQueryResult<IObject[]> {
  return useQuery({
    queryKey: ['get-existing-buckets'],
    queryFn: () =>
      fetch('https://06mmfe1l86.execute-api.ap-south-1.amazonaws.com/development/v1/buckets')
        .then((res) => res.json())
        .then(({ data }) => data)
        .catch((err) => {
          console.error('Error while fetching get existing buckets', err);
        })
  });
}
