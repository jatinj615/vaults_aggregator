import { NetworkName } from 'enums';
import { ethers } from 'ethers';
import { useStoreState } from 'store/globalStore';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { useSigner } from './ethereum';
import { SUPPORTED_NETWORKS } from 'constants/networkNames';

const useERC20 = () => {
  const { network } = useStoreState((state) => state);
  const { account, active, library } = useWeb3React<Web3Provider>();
  const signer = useSigner(account, library);

  const erc20 = (underlyingAddress: string) => {
    const ERC20abi = [
      'function balanceOf(address) view returns (uint)',
      'function approve(address spender, uint256 amount) external returns (bool)',
      'function totalSupply() external view returns (uint256)',
      'function allowance(address owner, address spender) external view returns (uint256)',
      'function name() external returns (string memory)',
      'function symbol() external view returns (string memory)'
    ];

    let symbol: () => string | Promise<string> = () => 'WETH';
    let getBalance: () => ethers.BigNumber | Promise<ethers.BigNumber> = () => ethers.constants.Zero;
    let getAllowance: (contractAddress: string) => ethers.BigNumber | Promise<ethers.BigNumber> = () =>
      ethers.constants.MaxUint256;
    let getTotalSupply: () => ethers.BigNumber | Promise<ethers.BigNumber> = () => ethers.constants.Zero;
    let approve;

    if (active && SUPPORTED_NETWORKS.includes(network as NetworkName)) {
      const UnderlyingContract = new ethers.Contract(underlyingAddress, ERC20abi, signer);

      symbol = (): Promise<string> => {
        return UnderlyingContract.symbol();
      };

      getBalance = (): Promise<ethers.BigNumber> => {
        return UnderlyingContract.balanceOf(account);
      };

      getAllowance = (contractAddress): Promise<ethers.BigNumber> => {
        return UnderlyingContract.allowance(account, contractAddress);
      };

      getTotalSupply = (): Promise<ethers.BigNumber> => {
        return UnderlyingContract.totalSupply();
      };

      approve = (amount: ethers.BigNumber, contractAddress): Promise<any> => {
        return UnderlyingContract.connect(signer).approve(contractAddress, amount);
      };
    }

    return {
      symbol,
      getBalance,
      approve,
      getTotalSupply,
      getAllowance
    };
  };

  return erc20;
};

export default useERC20;
