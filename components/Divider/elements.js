import { Box, styled } from '@mui/material';

export const Divider = styled(Box)(({ color, width, height, strokeWidth, theme, margin, hovered }) => ({
  width: width ? width : '100%',
  height,
  margin: margin ?? '2px auto',
  borderBottom: `${strokeWidth ? strokeWidth : '1px'} solid ${
    color ? color : hovered ? theme.palette.borderLightInverse : theme.palette.borderLight
  }`,
}));
