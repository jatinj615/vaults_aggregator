import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { ethers } from 'ethers';
import toast from 'react-hot-toast';
import { debounce } from 'lodash-es';

import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
  useTheme
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import MaxInput from 'components/Common/Maxinput';
import ApprovalCard from 'components/Common/ApprovalCard';
import Loader from 'components/Common/Loader';
import SkeletonLoader from 'components/Common/SkeletonLoader';

import { useStoreState } from 'store/globalStore';
import { formatNumber, intlFormatNumber, isIncorrectNumberFormat } from 'utils';
import { constantStrings } from 'utils/constants';
import { bnum, ZERO } from 'utils/poolCalc/utils/bignumber';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { SUPPORTED_NETWORK } from 'constants/networkNames';
import { getCurrencyPath } from 'constants/currencyPaths';
import { ToastContext } from 'context/toastContext';
import WalletIcon from 'icons/WalletIcon';
import IObject from 'interfaces/iobject.interface';
import useERC20 from 'hooks/useERC20';

interface IInvestModalProps {
  showDialog: boolean;
  setShowDialog: (showDialog: boolean) => void;
  underlyingTokenSymbol: string;
  otSymbol: string;
  ytSymbol: string;
  durationSeconds: number;
  protocol: string;
  otAddress: string;
  ytAddress: string;
  streamKey: string;
  underlying: string;
  underlyingDecimals: number;
  constituents: IObject[];
}

const BootstrapDialogTitle = (props: any) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, px: 6, pt: 5, pb: 0 }} {...other}>
      <Grid container justifyContent="flex-end">
        {children}
        {onClose ? (
          <Grid item>
            <IconButton
              aria-label="close"
              onClick={onClose}
              sx={{
                marginRight: -1,
                color: (theme) => theme.palette.grey[500]
              }}
            >
              <CloseIcon />
            </IconButton>
          </Grid>
        ) : null}
      </Grid>
    </DialogTitle>
  );
};

export default function InvestModal({
  showDialog,
  setShowDialog,
  underlyingTokenSymbol,
  otSymbol,
  ytSymbol,
  durationSeconds,
  protocol,
  otAddress,
  ytAddress,
  streamKey,
  underlying = 'atoken.id from aavedata api',
  underlyingDecimals,
  constituents
}: IInvestModalProps) {
  const erc20 = useERC20();
  const underlyingToken = useMemo(() => erc20(underlying), [erc20, underlying]);
  const { network } = useStoreState((state) => state);
  // const { mint, getOTYTCount, redeemPrinciple, redeemYield } = useUnrealCore(streamKey);
  const { setShowConnectWalletModal } = useContext(ToastContext);
  const {
    activate: activateActiveConnector,
    deactivate: deactivateActiveConnector,
    active,
    library
  } = useWeb3React<Web3Provider>();

  const [otAmount, setotAmount] = useState<string>('');
  const [amountError, setAmountError] = useState<boolean>(false);
  const [ytAmount, setytAmount] = useState<string>('');
  const [txPending, setTxPending] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [otytAmountLoading, setotytAmountLoading] = useState<boolean>(false);
  const [approvalPending, setApprovalPending] = useState<boolean>(false);
  const [isApproving, setIsApproving] = useState<boolean>(false);
  const [approvedLimit, setApprovedLimit] = useState<ethers.BigNumber>(ethers.constants.MaxUint256);
  const [balance, setBalance] = useState<ethers.BigNumber>(ethers.BigNumber.from('0'));
  const [underlyingSymbol, setUnderlyingSymbol] = useState<string>(underlyingTokenSymbol ? underlyingTokenSymbol : '-');
  const [amount, setAmount] = useState<string>('0');
  const [amountPercentage, setAmountPercentage] = useState<number>(0);
  const theme = useTheme();

  const hideDialog = () => {
    setShowDialog(false);
  };

  const approvalMessage = useMemo(
    () => `You need to grant Unreal approval to spend your ${underlyingSymbol} in order to perform this transaction.`,
    [underlyingSymbol]
  );

  const handleConnect = () => {
    setShowConnectWalletModal(true);
  };

  const handleSubmit = async () => {
    setTxPending(true);

    try {
      const amountToSubscribe = ethers.utils.parseUnits(amount, underlyingDecimals);

      if (approvedLimit.gte(amountToSubscribe)) {
        // await mint(amountToSubscribe, otAddress, ytAddress, protocol, underlying, durationSeconds, otSymbol, ytSymbol);

        setAmount('');
        setAmountPercentage(0);
        setotAmount('');
        setytAmount('');
        // const balance = await underlyingToken.getBalance();
        setBalance(balance);
        // const limit = await underlyingToken.getAllowance(core.address);
        // setApprovedLimit(limit);
        setShowDialog(false);
      } else {
        setApprovalPending(true);
      }
    } finally {
      setTxPending(false);
    }
  };

  const getOTYTCountDebounced = useRef(
    debounce(async (fn: Function, input: ethers.BigNumber) => {
      const { ot, yt } = await fn(input);
      setotAmount(intlFormatNumber(bnum(ethers.utils.formatEther(ot)).dp(6, 1).toString(), 6));
      setytAmount(intlFormatNumber(bnum(ethers.utils.formatEther(yt)).dp(6, 1).toString(), 6));
      setotytAmountLoading(false);
    }, 500)
  ).current;

  const handleInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      const balanceFormatted = bnum(ethers.utils.formatUnits(balance, underlyingDecimals));
      const newValue = balanceFormatted.gt(ZERO)
        ? bnum(e.target.value).multipliedBy(100).div(balanceFormatted).toNumber()
        : 0;
      setAmount(e.target.value);
      setAmountPercentage(newValue);
      setotytAmountLoading(true);
      if (isIncorrectNumberFormat(e.target.value)) {
        setAmountError(true);
        getOTYTCountDebounced.cancel();
        setotytAmountLoading(false);
      } else {
        const newB = parseFloat(ethers.utils.formatUnits(balance, underlyingDecimals));
        const newI = parseFloat(e.target.value);
        if (newI > newB) {
          setAmountError(true);
          getOTYTCountDebounced.cancel();
          setotAmount('');
          setytAmount('');
          setotytAmountLoading(false);
        } else {
          setAmountError(false);
          getOTYTCountDebounced.cancel();
          // await getOTYTCountDebounced(getOTYTCount, ethers.utils.parseEther(e.target.value));
        }
      }
    } else {
      setAmount('');
      setAmountPercentage(0);
      setAmountError(false);
      getOTYTCountDebounced.cancel();
      setotAmount('');
      setytAmount('');
      setotytAmountLoading(false);
    }
  };

  const handleClickMaxBtn = async () => {
    const balanceFormatted = bnum(ethers.utils.formatUnits(balance, underlyingDecimals));
    const maxAmount = formatNumber(balanceFormatted.dp(6, 1).toString(), 6);
    setAmount(maxAmount);
    setAmountPercentage(balanceFormatted.gt(ZERO) ? 100 : 0);
    setAmountError(false);
    setotytAmountLoading(true);
    getOTYTCountDebounced.cancel();
    // await getOTYTCountDebounced(getOTYTCount, ethers.utils.parseEther(maxAmount));
  };

  const handleApprove = async () => {
    setIsApproving(true);

    try {
      // const tx = await underlyingToken.approve(ethers.constants.MaxUint256, core.address);

      // await toast.promise(tx.wait(), {
      //   loading: constantStrings.approvalPending,
      //   success: constantStrings.approvalCompleted,
      //   error: constantStrings.approvalFailed
      // });

      // const limit = await underlyingToken.getAllowance(core.address);
      // setApprovedLimit(limit);
      setApprovalPending(false);
    } catch (error) {
      console.error('Error from deposit card approval', error);
    } finally {
      setIsApproving(false);
    }
  };

  useEffect(() => {
    // Clean the state when the component is unmounted
    return () => {
      getOTYTCountDebounced.cancel();
    };
  }, [getOTYTCountDebounced]);

  const getAvailableBalance = () => {
    if (!active) {
      return 'No wallet connected';
    }
    if (loading && network === SUPPORTED_NETWORK) {
      return (
        <Grid container item wrap="nowrap" columnGap={1}>
          <SkeletonLoader width={50} /> {underlyingSymbol}
        </Grid>
      );
    } else {
      return `${intlFormatNumber(
        bnum(ethers.utils.formatUnits(balance, underlyingDecimals)).dp(2, 1).toString(),
        2
      )} ${underlyingSymbol}`;
    }
  };

  const getSubmitBtnText = () => {
    if (!active) {
      return 'Connect wallet to Deposit';
    }
    if (txPending) {
      return <Loader size={3} color="inherit" />;
    }
    if (amountError) {
      return 'Insufficient Balance';
    } else {
      return `Deposit ${underlyingSymbol}`;
    }
  };

  const isSubmitBtnDisabled = () => {
    if (active) {
      return (
        amountError ||
        amount === '' ||
        parseFloat(amount) === 0 ||
        approvalPending ||
        txPending ||
        network !== SUPPORTED_NETWORK
      );
    }
  };

  const isSliderDisabled = () => {
    return (
      bnum(ethers.utils.formatUnits(balance, underlyingDecimals)).lte(ZERO) ||
      !(active && network === SUPPORTED_NETWORK) ||
      loading
    );
  };

  return (
    <Dialog
      open={showDialog}
      onClose={hideDialog}
      sx={{
        '& .MuiDialog-paper': {
          background: theme.vaggr.modal.backgroundColor,
          borderRadius: theme.typography.pxToRem(16)
        }
      }}
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={hideDialog}></BootstrapDialogTitle>
      <DialogContent sx={{ p: 6 }}>
        <Grid py={4} container alignItems="center" justifyContent="space-between">
          <Grid item xs={6} container direction="column">
            <Grid item>
              <Typography variant="caption" display="block" gutterBottom>
                Mint ownership and yield tokens using
              </Typography>
            </Grid>
            <Grid container spacing={1.5} item alignItems="center">
              <Grid item>
                <Avatar alt="Currency Logo" src={getCurrencyPath(underlyingSymbol)} sx={{ width: 28, height: 28 }} />
              </Grid>
              <Grid item>
                <Typography sx={{ fontWeight: theme.typography.fontWeightMedium }}>{underlyingSymbol}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} container direction="column" alignItems="flex-end">
            <Grid item>
              <Typography variant="caption" display="block">
                Available Balance
              </Typography>
            </Grid>
            <Grid item>
              <Typography fontWeight="bold" component="div">
                {getAvailableBalance()}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        {constituents.map((constituent, index) => (
          <MaxInput
            key={index}
            id={`constituent-amount-${index}`}
            value={amount}
            disabled={!(active && network === SUPPORTED_NETWORK) || loading}
            error={amountError}
            errorMessage={`Not enough ${underlyingSymbol} or invalid amount`}
            placeholder="Enter amount"
            handleInput={handleInput}
            handleClickMaxBtn={handleClickMaxBtn}
            customStyles={{ bgcolor: theme.palette.background.default }}
          />
        ))}
        <ApprovalCard
          approvalPending={approvalPending}
          approvalMessage={approvalMessage}
          handleApprove={handleApprove}
          loading={isApproving}
          customStyles={approvalPending ? { mt: 4 } : {}}
        />
      </DialogContent>
      <DialogActions
        sx={{
          backgroundColor: theme.vaggr.modal.buttonContainerBackgroundColor,
          height: theme.typography.pxToRem(100),
          padding: `${theme.spacing(4)} ${theme.spacing(6)}`,
          justifyContent: 'space-between'
        }}
      >
        <Grid item xs={3}>
          <Button
            onClick={hideDialog}
            sx={{
              padding: theme.typography.pxToRem(18)
            }}
          >
            Cancel
          </Button>
        </Grid>
        <Grid item xs={9}>
          <Button
            variant="contained"
            color={active ? 'primary' : 'error'}
            disabled={isSubmitBtnDisabled()}
            onClick={active ? handleSubmit : handleConnect}
            sx={{
              padding: theme.typography.pxToRem(18)
            }}
            startIcon={!active ? <WalletIcon /> : null}
            fullWidth
          >
            {getSubmitBtnText()}
          </Button>
        </Grid>
      </DialogActions>
    </Dialog>
  );
}
