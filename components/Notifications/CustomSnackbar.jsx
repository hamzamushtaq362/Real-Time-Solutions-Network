/* eslint-disable react/display-name */
import React, { forwardRef } from 'react';
import { Box, useTheme } from '@mui/material';
import {
  getSnackbarBackgroundColor,
  getSnackbarIcon,
  getSnackbarTextColor,
} from '~/wrappers';

const CustomSnackbar = forwardRef((props, ref) => {
  const theme = useTheme();
  const { message, variant } = props;
  const textColor = getSnackbarTextColor(variant, theme.palette.snackbar);
  const backgroundColor = getSnackbarBackgroundColor(
    variant,
    theme.palette.snackbar,
  );
  return (
    <Box
      {...props}
      ref={ref}
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: '13px 70px 13px 70px',
        height: '60px',
        backgroundColor,
        borderRadius: '30px',
        width: '100%',
      }}
    >
      {getSnackbarIcon(variant, textColor)}
      <Box style={{ marginLeft: '1rem', fontSize: '20px', color: textColor }}>
        {message}
      </Box>
    </Box>
  );
});
export default CustomSnackbar;
