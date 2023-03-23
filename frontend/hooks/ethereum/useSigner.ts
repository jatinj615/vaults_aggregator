import { useMemo } from 'react';
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers';

/**
 * gets a signer that's authorized to post transactions.  NOTE: this should only be used at Page
 * level components so that lower level components don't need to know about Web3Context.
 * @param account the address of the signer
 * @param library web3provider that has a getSigner() function
 * @returns Signer
 */
export function useSigner(
  account: string | null | undefined,
  library: Web3Provider | undefined
): JsonRpcSigner | undefined {
  return useMemo(() => {
    // returns a new instance evertime so we memoize
    return account ? library.getSigner(account) : undefined;
  }, [account, library]);
}
