import { styled, Typography, Box } from '@mui/material';

export const ConsoleBrandText = styled(Typography)(({ theme }) => ({
  ...theme.typography.h4,
  color: theme.palette.text.brand,
  marginLeft: '10px',
}));

export const TopContainer = styled(Box)(({ open }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: open ? 'flex-start' : 'center',
  cursor: 'pointer',
  padding: '10px 0'
}));
