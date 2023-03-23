import { useState } from 'react';
import { Box, Button, Grid, SelectChangeEvent, Step, StepLabel, Stepper, Typography, useTheme } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import HeroTitle from '../Common/HeroTitle';
import Link from '../Common/Link';
import IObject from 'interfaces/iobject.interface';
import SelectTokens from './SelectTokens';
import SelectVaults from './SelectVaults';
import EnterAmount from './EnterAmount';

interface StepPanelProps {
  children?: JSX.Element;
  index: number | string;
  value: number | string;
}

function StepPanel(props: StepPanelProps) {
  const { children, value, index } = props;

  return value === index && children;
}

const steps = ['Select tokens', 'Select vaults', 'Enter amount'];

type Props = {};

export default function NewBucket({}: Props) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [selectedTokens, setSelectedTokens] = useState<string[]>([]);
  const [selectTokensError, setSelectTokensError] = useState(false);
  const [checkedState, setCheckedState] = useState<IObject>();

  const handleNext = () => {
    if (activeStep === 0) {
      if (selectedTokens && !selectedTokens.length) {
        setSelectTokensError(true);
        return;
      }
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
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

  const handleVaultChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedState((prevCheckedState) => ({
      ...prevCheckedState,
      [e.target.name]: e.target.checked
    }));
  };

  return (
    <Box>
      <Link href="/my-buckets" color="inherit" underline="none">
        <Grid container gap={2} mb={2}>
          <Grid item>
            <ArrowBackIcon />
          </Grid>
          <Grid item>Back to My Buckets</Grid>
        </Grid>
      </Link>
      <HeroTitle title="Create a new bucket" />
      <Stepper activeStep={activeStep} sx={{ width: theme.breakpoints.values.sm, mx: 'auto', pt: 2 }}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};

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
          checkedState={checkedState}
          handleVaultChecked={handleVaultChecked}
          handleBack={handleBack}
          handleNext={handleNext}
        />
      </StepPanel>
      {/* Step 3: enter amount */}
      <StepPanel value={activeStep} index={2}>
        <EnterAmount handleBack={handleBack} handleNext={handleNext} />
      </StepPanel>
      <StepPanel value={activeStep} index={3}>
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>All steps completed - you&apos;re finished</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </>
      </StepPanel>
    </Box>
  );
}
