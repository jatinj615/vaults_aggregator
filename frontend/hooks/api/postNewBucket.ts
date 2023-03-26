import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import IObject from 'interfaces/iobject.interface';

export function usePostNewBucket() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newBucket: IObject) =>
      axios
        .post('https://06mmfe1l86.execute-api.ap-south-1.amazonaws.com/development/v1/buckets', newBucket)
        .then(({ data }) => data.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-explore-buckets'] });
    },
    onError: (error: AxiosError<IObject>) => {
      return error.response.data;
    }
  });
}
