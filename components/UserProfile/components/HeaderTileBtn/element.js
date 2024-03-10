import { Box, styled } from '@mui/material';

export const HeaderTileButton = styled(Box)(({ theme }) => ({
  ...theme.typography.h7,

  color: theme.palette.blue.main,

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '1.2rem 1.4rem',
  gap: '12px',

  border: `1px solid ${theme.palette.blue.main}`,
  'border-radius': '1rem',
}));
