import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Box, useTheme, Grid, Divider, Stack, Button, TextField, Typography } from '@mui/material';
import { Error as ErrorIcon } from '@mui/icons-material';

import MaxInputInterface from 'interfaces/maxinput.interface';

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& input': {
      fontSize: theme.typography.pxToRem(18),
      color: theme.palette.text.primary,
      lineHeight: theme.typography.pxToRem(21),
      letterSpacing: theme.typography.pxToRem(0.385075),
      padding: `${theme.spacing(1)} 0`,
      textAlign: 'right'
    },
    '& input[type=number]': {
      MozAppearance: 'textfield'
    },
    '& input[type=number]::-webkit-outer-spin-button': {
      WebkitAppearance: 'none',
      margin: 0
    },
    '& input[type=number]::-webkit-inner-spin-button': {
      WebkitAppearance: 'none',
      margin: 0
    },
    '& fieldset': {
      background: 'transparent',
      border: 'none',
      borderRadius: 0,
      padding: 0,
      width: theme.typography.pxToRem(150)
    },
    '&.Mui-focused fieldset': {
      outline: 'none'
    }
  }
}));

const MaxInput = ({
  id,
  primaryText,
  secondaryText,
  disabled = false,
  value,
  step = 1,
  error = false,
  errorMessage,
  placeholder,
  handleInput,
  handleClickMaxBtn,
  customStyles = {},
  ...restProps
}: MaxInputInterface) => {
  const theme = useTheme();
  const ref = React.useRef<HTMLInputElement>();

  const handleWheel = (e: any) => {
    e.target.blur();
  };

  return (
    <>
      <Grid
        container
        direction="column"
        p={1}
        alignItems="center"
        justifyContent="space-between"
        sx={{
          bgcolor: theme.vaggr.maxinput.backgroundColor,
          position: 'relative',
          width: '100%',
          borderRadius: theme.typography.pxToRem(8),
          // on error show a different red color
          border: `2px solid ${error ? theme.palette.error.light : theme.vaggr.maxinput.borderColor}`,
          ...customStyles
        }}
        onClick={() => {
          ref?.current?.focus();
        }}
      >
        <Grid container item alignItems="center" justifyContent="space-between">
          <Grid item>
            {/* Incase of an error we'll not show this block */}
            {error ? (
              <></>
            ) : (
              <Box
                sx={{
                  color: theme.palette.text.primary,
                  fontWeight: theme.typography.fontWeightRegular,
                  fontSize: theme.typography.pxToRem(14),
                  lineHeight: theme.typography.pxToRem(21),
                  letterSpacing: theme.typography.pxToRem(0.385075),
                  pl: 0.625
                }}
              >
                {primaryText}
              </Box>
            )}
          </Grid>
          <Grid item>
            <Button
              sx={{ py: 0, minWidth: 'min-content' }}
              id={`max-input-btn-${id}`}
              size="small"
              variant="text"
              disabled={disabled}
              onClick={handleClickMaxBtn}
            >
              MAX
            </Button>
          </Grid>
        </Grid>
        <Grid container item alignItems="center" justifyContent="space-between">
          <Grid item xs>
            <Stack direction="row" alignItems="center">
              <StyledTextField
                id={`select-input-${id}`}
                type="number"
                placeholder={placeholder}
                disabled={disabled}
                error={error}
                variant="outlined"
                value={value}
                onChange={handleInput}
                onWheel={handleWheel}
                inputProps={{ min: 0, step }}
                fullWidth
                {...restProps}
              />
            </Stack>
          </Grid>
          {
            // for errors show this icon
            error ? (
              <ErrorIcon
                sx={{
                  position: 'absolute',
                  left: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: theme.palette.error.dark
                }}
              />
            ) : (
              <></>
            )
          }
        </Grid>
        <Grid container item alignItems="center" justifyContent="space-between">
          <Grid item xs>
            {/* Incase of an error we'll not show this block */}
            {error ? (
              <></>
            ) : (
              <Box
                sx={{
                  color: theme.palette.text.primary,
                  fontWeight: theme.typography.fontWeightRegular,
                  fontSize: theme.typography.pxToRem(14),
                  lineHeight: theme.typography.pxToRem(21),
                  letterSpacing: theme.typography.pxToRem(0.385075),
                  pl: 0.625
                }}
              >
                {secondaryText}
              </Box>
            )}
          </Grid>
        </Grid>
      </Grid>
      {/* error text */}
      {error ? (
        <Typography
          variant="overline"
          display="block"
          gutterBottom
          sx={{
            color: theme.palette.error.main
          }}
        >
          {errorMessage}
        </Typography>
      ) : (
        <></>
      )}
    </>
  );
};

export default MaxInput;
