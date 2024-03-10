import { Box, styled } from '@mui/material';

export const DrawerWrapContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6),
}));

export const DialogTitle = styled(Box)(({ theme }) => ({
  ...theme.typography.h1,
  color: theme.palette.text.inverse,
  width: '80%',
  marginBottom: '16px',
}));

export const RenderItemText = styled('p')(({ theme, inverse }) => ({
  ...theme.typography.body5,
  color: inverse
    ? theme.palette.text.inverseSecondary
    : theme.palette.text.secondary,
}));
