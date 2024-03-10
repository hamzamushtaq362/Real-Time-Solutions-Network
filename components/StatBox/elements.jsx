import { styled, Box, Typography } from '@mui/material';

export const StatsSubContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '175px',
  border: `1px solid ${theme.palette.borderLight}`,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: theme.spacing(3),
  '@media (max-width: 800px)': {
    height: '120px',
  },
}));
export const StatsContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  marginRight: theme.spacing(2),
  '@media (max-width: 800px)': {
    height: '120px',
  },
}));
export const StatTitle = styled(Typography)(({ theme }) => ({
  ...theme.typography.h2,
  color: theme.palette.text.primary,
}));

export const StatSubTitle = styled(Typography)(({ theme }) => ({
  ...theme.typography.h7,
  color: theme.palette.text.primary,
}));
