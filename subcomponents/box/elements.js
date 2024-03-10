import { Typography, styled } from '@mui/material';

export const DetailsBoxValue = styled(Typography)(({ theme }) => ({
  ...theme.typography.body1,
  color: theme.palette.text.primary,
}));
