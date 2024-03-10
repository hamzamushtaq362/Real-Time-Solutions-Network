import { Box, styled, Typography, Avatar } from '@mui/material';
import { PrimaryButton } from '../../Button';

export const ConfirmDialogContainer = styled(Box)(({ theme }) => ({
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
  justifyContent: 'flex-end',
});

export const MessageText = styled(Typography)(({ theme }) => ({
  ...theme.typography.title3,
  fontWeight: 500,
  width: '80%',
  textAlign: 'center',
  color: theme.palette.text.primary,
}));

export const SuccessImage = styled(Avatar)({
  width: '250px',
  height: '180px',
});

export const ConfirmButton = styled(PrimaryButton)({
  width: '180px',
  borderRadius: '20px',
});
