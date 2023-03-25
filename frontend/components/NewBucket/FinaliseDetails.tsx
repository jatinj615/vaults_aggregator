import { useContext } from 'react';
import { Box, Button, Chip, Grid, InputLabel, Stack, Typography, useTheme } from '@mui/material';
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { ToastContext } from 'context/toastContext';
import WalletIcon from 'icons/WalletIcon';
import SaveIcon from '@mui/icons-material/Save';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import IObject from 'interfaces/iobject.interface';
import { filter, map } from 'lodash-es';
import Loader from '../Common/Loader';

type Props = {
  bucketName: string;
  isLoading: boolean;
  selectedTokens: string[];
  selectedVaults: IObject[];
  handleBack: () => void;
  handleSubmit: () => void;
};

export default function FinaliseDetails({
  bucketName,
  isLoading,
  selectedTokens,
  selectedVaults,
  handleBack,
  handleSubmit
}: Props) {
  const { active } = useWeb3React<Web3Provider>();
  const theme = useTheme();
  const { setShowConnectWalletModal } = useContext(ToastContext);

  const handleConnect = () => {
    setShowConnectWalletModal(true);
  };

  const getSubmitBtnText = () => {
    if (!active) {
      return 'Connect wallet to submit';
    }
    if (isLoading) {
      return <Loader size={3} color="inherit" />;
    } else {
      return 'Submit';
    }
  };

  return (
    <Grid
      sx={{
        width: theme.breakpoints.values.sm,
        mx: 'auto',
        height: '100%'
      }}
      container
      direction="column"
      justifyContent="center"
      rowSpacing={3}
    >
      <Grid item>
        <Typography variant="h4" gutterBottom textAlign="center">
          Finalise Details
        </Typography>
      </Grid>
      <Grid item>
        <Typography>Bucket Name: {bucketName}</Typography>
      </Grid>
      <Grid container direction="column" item rowGap={1}>
        <InputLabel id="select-tokens-label">Selected Tokens</InputLabel>
        <Stack direction="row" spacing={1}>
          {map(selectedTokens, (token) => (
            <Chip key={token} label={token} />
          ))}
        </Stack>
      </Grid>
      <Grid container direction="column" item rowGap={1}>
        <InputLabel id="select-vaults-label">Selected Vaults</InputLabel>
        <Stack direction="row" spacing={1}>
          {map(
            filter(selectedVaults, (vault) => vault.checked),
            (vault) => (
              <Chip key={vault.id} label={`${vault.symbol}_${vault.chainName}`} />
            )
          )}
        </Stack>
      </Grid>
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Button
          color="inherit"
          onClick={handleBack}
          sx={{
            padding: theme.typography.pxToRem(12)
          }}
          startIcon={<ChevronLeftIcon />}
        >
          Back
        </Button>
        <Box sx={{ flex: '1 1 auto' }} />
        <Button
          variant="contained"
          disabled={isLoading}
          color={active ? 'success' : 'error'}
          onClick={active ? handleSubmit : handleConnect}
          sx={{
            padding: theme.typography.pxToRem(12)
          }}
          startIcon={!active ? <WalletIcon /> : null}
          endIcon={active && !isLoading ? <SaveIcon /> : null}
        >
          {getSubmitBtnText()}
        </Button>
      </Box>
    </Grid>
  );
}
