import React from 'react';
import { Divider, useTheme } from '@mui/material';

const VerticalDivider = ({color, height}) => {
  const theme = useTheme();
  return (
    <Divider
      orientation="vertical"
      flexItem
      sx={{
        borderColor: `${color ?? theme.palette.borderLight} !important`,
        height: height ?? 'auto',
      }}
    />
  );
};

export default VerticalDivider;
