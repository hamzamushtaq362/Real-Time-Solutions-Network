import { Box, styled, Typography, Avatar } from '@mui/material';
import { PrimaryButton } from '../../Button';

export const InformationDescription = styled(Box)(({ theme, type, color }) => ({
  ...theme.typography.h9,
  color: color
    ? color
    : type === 'error'
    ? theme.palette.snackbar.error.background
    : theme.palette.text.label,
}));

export const SubHeading = styled(Box)(({ theme }) => ({
  ...theme.typography.h6,
  color: theme.palette.text.primary,
}));

export const ConfirmDialogContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '10px',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '30px',
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
