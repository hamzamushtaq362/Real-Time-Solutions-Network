import { Box, Typography, styled } from '@mui/material';

export const BackButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  'align-items': 'center',
  cursor: 'pointer',
  color: theme.palette.grey.common,
  margin: '2rem 0',
  'padding-bottom': '0.2rem',

  '&:hover': {
    'text-decoration': 'underline',
  },
}));

export const BackButtonText = styled(Typography)({
  fontSize: '1.6rem',
  lineHeight: '2.4rem',
  alignItems: 'center',
  marginLeft: '0.5rem',
});
