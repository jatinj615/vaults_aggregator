import { useContext, useEffect, useState } from 'react';
import { Box, Button, Grid, SelectChangeEvent, Step, StepLabel, Stepper, Typography, useTheme } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import HeroTitle from '../Common/HeroTitle';
import Link from '../Common/Link';
import IObject from 'interfaces/iobject.interface';
import SelectTokens from './SelectTokens';
import SelectVaults from './SelectVaults';
import FinaliseDetails from './FinaliseDetails';
import { some } from 'lodash-es';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { useGetAaveData } from 'hooks/api/getAaveData';
import { usePostNewBucket } from 'hooks/api/postNewBucket';
import { ToastContext } from 'context/toastContext';
import { showNewBucketError, showNewBucketSuccess } from 'utils/showToast';

interface StepPanelProps {
  children?: JSX.Element;
  index: number | string;
  value: number | string;
}

function isSomeVaultSelected(vaults: IObject) {
  return vaults && vaults.length ? some(vaults, (value) => value.checked) : false;
}

function StepPanel(props: StepPanelProps) {
  const { children, value, index } = props;

  return value === index && children;
}

const enterBucketName = 'Please enter a bucket name!';
const steps = ['Create bucket', 'Select vaults'];

type Props = {};

export default function NewBucket({}: Props) {
  const theme = useTheme();
  const { account } = useWeb3React<Web3Provider>();
  const { data: aaveData = [], isLoading, isFetching } = useGetAaveData();
  const loading = isFetching || isLoading;
  const { mutate, isError, isLoading: txPending, isSuccess, data, error } = usePostNewBucket();
  const { setToastData } = useContext(ToastContext);

  const [activeStep, setActiveStep] = useState(0);
  const [bucketName, setBucketName] = useState('');
  const [bucketNameError, setBucketNameError] = useState(false);
  const [bucketNameErrorMessage, setBucketNameErrorMessage] = useState('');
  const [selectedTokens, setSelectedTokens] = useState<string[]>([]);
  const [selectTokensError, setSelectTokensError] = useState(false);
  const [selectedVaults, setSelectedVaults] = useState<IObject[]>([]);
  const [selectVaultsError, setSelectVaultsError] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      showNewBucketSuccess(setToastData, data.name);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      showNewBucketError(setToastData, error.response.data.message);
    }
  }, [isError]);

  const handleNext = () => {
    if (activeStep === 0) {
      if (!bucketName) {
        setBucketNameError(true);
        setBucketNameErrorMessage(enterBucketName);
        return;
      }
      if (selectedTokens && !selectedTokens.length) {
        setSelectTokensError(true);
        return;
      }
    }
    if (activeStep === 1 && !isSomeVaultSelected(selectedVaults)) {
      setSelectVaultsError(true);
      return;
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = () => {
    mutate({
      name: bucketName,
      userAddress: account,
      constituents: selectedVaults
        .filter((vault) => vault.checked)
        .map((vault) => ({
          vaultSymbol: `${vault.vaultSymbol} - ${vault.chainName}`,
          tokenSymbol: vault.symbol,
          tokenAddress: vault.underlyingAddress,
          vaultAddress: vault.pool,
          chainID: vault.chainId,
          network: vault.chainName
        }))
    });
  };

  const handleChangeBucketName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value }
    } = e;
    if (value) {
      setBucketNameError(false);
      setBucketNameErrorMessage('');
    }
    setBucketName(value);
  };

  const handleListChange = (e: SelectChangeEvent<typeof selectedTokens>) => {
    const {
      target: { value }
    } = e;
    if (value) setSelectTokensError(false);
    setSelectedTokens(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const handleVaultChecked = (checked: boolean, bucket: IObject) => {
    setSelectedVaults((prevSelectedVaults) => {
      if (prevSelectedVaults && prevSelectedVaults.length) {
        if (
          prevSelectedVaults.some(
            (selectedVault) => selectedVault.name === bucket.name && selectedVault.chainName === bucket.chainName
          )
        ) {
          return prevSelectedVaults.map((selectedVault) => {
            if (selectedVault.name === bucket.name && selectedVault.chainName === bucket.chainName)
              return { ...selectedVault, checked };
            else return selectedVault;
          });
        } else {
          return [
            ...prevSelectedVaults,
            {
              ...bucket,
              checked
            }
          ];
        }
      } else {
        return [
          {
            ...bucket,
            checked
          }
        ];
      }
    });
    if (checked) setSelectVaultsError(false);
  };

  return (
    <Box>
      <Link href="/" color="inherit" underline="none">
        <Grid container gap={2} mb={2}>
          <Grid item>
            <ArrowBackIcon />
          </Grid>
          <Grid item>Back to Explore Buckets</Grid>
        </Grid>
      </Link>
      <HeroTitle title="Create a new bucket" />
      <Stepper activeStep={activeStep} sx={{ width: theme.breakpoints.values.sm, mx: 'auto', pt: 2 }}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
            error?: boolean;
          } = {};
          if (index === 1 && selectVaultsError) {
            labelProps.optional = (
              <Typography variant="caption" color="error">
                Please select at least 1 vault!
              </Typography>
            );
            labelProps.error = selectVaultsError;
          }

          return (
            <Step key={index} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {/* Step 1: select tokens */}
      <StepPanel value={activeStep} index={0}>
        <SelectTokens
          bucketName={bucketName}
          handleChangeBucketName={handleChangeBucketName}
          bucketNameError={bucketNameError}
          bucketNameErrorMessage={bucketNameErrorMessage}
          selectedTokens={selectedTokens}
          handleListChange={handleListChange}
          selectTokensError={selectTokensError}
          handleBack={handleBack}
          handleNext={handleNext}
        />
      </StepPanel>
      {/* Step 2: select vaults */}
      <StepPanel value={activeStep} index={1}>
        <SelectVaults
          aaveData={aaveData}
          loading={loading}
          selectedVaults={selectedVaults}
          handleVaultChecked={handleVaultChecked}
          handleBack={handleBack}
          handleNext={handleNext}
        />
      </StepPanel>
      {/* Step 3: finalise details */}
      <StepPanel value={activeStep} index={2}>
        <FinaliseDetails
          bucketName={bucketName}
          isLoading={txPending}
          selectedTokens={selectedTokens}
          selectedVaults={selectedVaults}
          handleBack={handleBack}
          handleSubmit={handleSubmit}
        />
      </StepPanel>
    </Box>
  );
}
