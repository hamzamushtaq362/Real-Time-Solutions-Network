import { Box, styled, Typography, Avatar } from '@mui/material';
import { PrimaryButton } from '../../Button';

export const FixedPaymentDialogContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  backgroundColor: theme.palette.background.paper,
  flexDirection: 'column',

  justifyContent: 'space-around',
  alignItems: 'center',
  padding: '10px',
}));

export const HeaderRow = styled(Box)({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
});

export const HeaderText = styled(Typography)(({ theme }) => ({
  ...theme.typography.h5,
  textAlign: 'center',
  color: theme.palette.text.primary,
}));

export const MessageText = styled(Typography)(({ theme }) => ({
  ...theme.typography.body4,
  fontWeight: 400,
  width: '80%',
  textAlign: 'center',
  color: theme.palette.text.primary,
}));

export const SuccessImage = styled(Avatar)({
  width: '250px',
  height: '180px',
});

export const ConfirmButton = styled(PrimaryButton)({
  width: '100px',
  borderRadius: '20px',
});
