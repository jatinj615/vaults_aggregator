import { Box, Button, Card, CardContent, CardHeader, Checkbox, Divider, Grid, useTheme } from '@mui/material';

type Props = {
  handleBack: () => void;
  handleNext: () => void;
};

export default function EnterAmount({ handleBack, handleNext }: Props) {
  return (
    <>
      Enter amount
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
          Back
        </Button>
        <Box sx={{ flex: '1 1 auto' }} />
        <Button onClick={handleNext}>Finish</Button>
      </Box>
    </>
  );
}
