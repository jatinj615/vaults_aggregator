import { Card as MuiCard } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Card = styled(MuiCard)(({ theme }) => ({
  transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
  background: theme.vaggr.card.backgroundColor,
  boxShadow: '2px 2px 4px 0 rgba(0,0,0,0.5) !important',
  '&:hover': {
    boxShadow: `2px 3px 6px 1px ${theme.palette.primary.main} !important`
  },
  borderRadius: theme.typography.pxToRem(12)
}));
