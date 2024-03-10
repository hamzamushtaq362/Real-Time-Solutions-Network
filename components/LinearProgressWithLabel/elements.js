import { Box, styled } from '@mui/material';


export const ProgressText = styled(Box)(({ theme }) => ({
  ...theme.typography.h9,
  color: theme.palette.text.primary,
}));