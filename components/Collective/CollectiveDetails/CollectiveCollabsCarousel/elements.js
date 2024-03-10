import { Typography, styled } from '@mui/material';

export const NoCollabsFountText = styled(Typography)(({ theme }) => ({
  ...theme.typography.body5,
  color: theme.palette.grey.common,
}));
