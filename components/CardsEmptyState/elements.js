import { Box, styled, Typography } from '@mui/material';

export const EmptyStateContainer = styled(Box)(() => ({
  height: 'calc(100vh - 20rem)',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const EmptyStateDetailsHeader = styled(Typography)(({ theme }) => ({
  ...theme.typography.h7,
  letterSpacing: '0.1px',
  color: theme.palette.text.primary,
}));

export const ImageContainer = styled('img')(() => ({
  width: '30rem',
  height: '30rem',
  objectFit: 'cover',
}));
