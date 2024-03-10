import { Box, styled, Typography } from '@mui/material';

export const NoResultsContainer = styled(Box)({
  marginTop: '50px',
  marginBottom: '50px',
  width: '100%',
  height: '6rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const NoResultsText = styled(Typography)(({ theme }) => ({
  ...theme.typography.body3,
  fontWeight: 400,
  color: theme.palette.grey.common,
}));
