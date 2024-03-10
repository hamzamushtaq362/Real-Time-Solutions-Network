import { styled, Box } from '@mui/material';

export const BottomText = styled('p')(({ theme, inverse, highlight }) => ({
  ...theme.typography.body5,
  color: inverse
    ? highlight
      ? theme.palette.text.inverse
      : theme.palette.text.label
    : highlight
    ? theme.palette.text.primary
    : theme.palette.text.label,
}));

export const UserFullName = styled(Box)(({ theme, inverse }) => ({
  ...theme.typography.h6,
  color: inverse ? theme.palette.text.inverse : theme.palette.text.primary,
}));
