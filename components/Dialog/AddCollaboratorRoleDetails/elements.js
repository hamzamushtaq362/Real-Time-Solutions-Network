import { Box, styled } from '@mui/material';

export const SubHeading = styled(Box)(({ theme }) => ({
  ...theme.typography.h7,
  color: theme.palette.text.primary,
  fontWeight: 490,
}));

export const InformationDescription = styled(Box)(({ theme, type, color }) => ({
  ...theme.typography.h9,
  color: color
    ? color
    : type === 'error'
    ? theme.palette.snackbar.error.background
    : theme.palette.text.label,
}));

export const MainHeader = styled(Box)(({ theme }) => ({
  ...theme.typography.h5,
  color: theme.palette.text.primary,
  fontWeight: 500,
}));
