import { Box, styled } from '@mui/material';

export const CollabTileContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '440px',
  minHeight: '400px',
  boxSizing: 'border-box',
  borderRadius: '15px',

  backgroundColor: theme.palette.background.paper,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  overflow: 'hidden',
  // boxShadow: `0px 40px 64px -12px rgba(0, 0, 0, 0.08), 0px 0px 14px -4px rgba(0, 0, 0, 0.05), 0px 32px 48px -8px rgba(0, 0, 0, 0.03)`,
  boxShadow: `0px 20px 25px -12px rgba(0, 0, 0, 0.08), 0px 0px 8px -4px rgba(0, 0, 0, 0.15), 0px 32px 48px -8px rgba(0, 0, 0, 0.02)`,
  '& #heart-button-hover': {
    display: 'none',
  },

  '&:hover': {
    '& #heart-button-hover': {
      display: 'block',
    },

    '& .created-by-hover': {
      display: 'none',
    },
  },
}));
