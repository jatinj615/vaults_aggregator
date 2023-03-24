import * as React from 'react';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

export default function FixedRatesIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <path d="M0 14C0 15.1045 0.895447 16 2 16H8V22C8 23.1045 8.89545 24 10 24H22C23.1046 24 24 23.1045 24 22V10C24 8.89551 23.1046 8 22 8H16V2C16 0.895508 15.1046 0 14 0H2C0.895447 0 0 0.895508 0 2L0 14Z" />
    </SvgIcon>
  );
}
