import { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Chip,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
  useTheme
} from '@mui/material';
import { useStoreState } from 'store/globalStore';
import { NetworkName } from 'enums';
import IObject from 'interfaces/iobject.interface';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

type Props = {
  bucketName: string;
  handleChangeBucketName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  bucketNameError: boolean;
  bucketNameErrorMessage: string;
  selectedTokens: string[];
  handleListChange: (e: SelectChangeEvent<string[]>) => void;
  selectTokensError: boolean;
  handleBack: () => void;
  handleNext: () => void;
};

export default function SelectTokens({
  bucketName,
  handleChangeBucketName,
  bucketNameError,
  bucketNameErrorMessage,
  selectedTokens,
  handleListChange,
  selectTokensError,
  handleBack,
  handleNext
}: Props) {
  const theme = useTheme();
  const { network } = useStoreState((state) => state);
  const [listItems, setListItems] = useState<IObject[]>([{ label: 'WETH', value: 'weth' }]);

  return (
    <Grid
      sx={{ width: theme.breakpoints.values.sm, mx: 'auto', height: '100%' }}
      container
      direction="column"
      justifyContent="center"
      rowSpacing={3}
    >
      <Grid item>
        <Typography>
          Current Network: {network && network === NetworkName.MAINNET ? 'mainnet' : network || NetworkName.GOERLI}
        </Typography>
      </Grid>
      <Grid item>
        <TextField
          error={bucketNameError}
          required
          label="Enter a bucket name"
          value={bucketName}
          onChange={handleChangeBucketName}
          helperText={bucketNameErrorMessage}
          fullWidth
        />
      </Grid>
      <Grid item>
        <FormControl error={selectTokensError} fullWidth>
          <InputLabel id="select-tokens-label">Select Tokens</InputLabel>
          <Select
            labelId="select-tokens-label"
            id="select-tokens"
            multiple
            value={selectedTokens}
            onChange={handleListChange}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {listItems.map((item, index) => (
              <MenuItem key={index} value={item?.value}>
                <Checkbox checked={selectedTokens.indexOf(item?.value) > -1} />
                {item?.label}
              </MenuItem>
            ))}
          </Select>
          {selectTokensError && <FormHelperText>Please select at least 1 token!</FormHelperText>}
        </FormControl>
      </Grid>
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Button
          color="inherit"
          disabled
          sx={{
            padding: theme.typography.pxToRem(12)
          }}
          onClick={handleBack}
          startIcon={<ChevronLeftIcon />}
        >
          Back
        </Button>
        <Box sx={{ flex: '1 1 auto' }} />
        <Button
          sx={{
            padding: theme.typography.pxToRem(12)
          }}
          onClick={handleNext}
          endIcon={<ChevronRightIcon />}
        >
          Next
        </Button>
      </Box>
    </Grid>
  );
}
