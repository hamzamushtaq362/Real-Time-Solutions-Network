import { styled, Box, Typography } from '@mui/material';

export const BlockConfirmationDialogContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  rowGap: '2rem',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '4rem 0rem',
  backgroundColor: theme.palette.background.paper,
}));

export const HeaderRow = styled(Box)({
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-end',
});

export const MessageText = styled(Typography)(({ theme }) => ({
  ...theme.typography.h4,
  textAlign: 'center',
  color: theme.palette.text.primary,
  width: '70%',
}));

export const BtnContainer = styled(Box)({
  width: '100%',
  display: 'flex',
  gap: '1rem',
  justifyContent: 'center',
});
