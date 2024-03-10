import { styled, Box } from '@mui/material';

export const ProfileCardContainer = styled(Box)(({ theme }) => ({
  ...theme.card,
  height: '44rem',
  overflow: 'hidden',

  '& #buttons-container': {
    display: 'none',
  },

  '&:hover': {
    boxShadow: `0 0 0 2pt ${theme.palette.background.inverse} !important`,
    '& #buttons-container': {
      display: 'block',
    },
  },
}));
