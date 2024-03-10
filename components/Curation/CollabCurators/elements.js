import { Box, Typography, styled } from '@mui/material';

export const CuratorsTablePadder = styled(Box)({
  width: '100%',
  padding: '30px 0',
});

export const EnableCuration = styled(Typography)(({ theme }) => ({
  ...theme.typography.h6,
  color: theme.palette.grey.common,
}));
