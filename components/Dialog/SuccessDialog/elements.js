import { Box, styled, Typography, Avatar } from '@mui/material';

export const SuccessDialogContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  padding: '24px',
  backgroundColor: theme.palette.background.paper,
}));

export const HeaderRow = styled(Box)({
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-end',
});

export const MessageText = styled(Typography)(({ theme }) => ({
  ...theme.typography.body1,

  textAlign: 'center',
  color: theme.palette.text.primary,
  width: '80%',
}));

export const SuccessImage = styled(Avatar)({
  width: '250px',
  height: '180px',
});

export const LinkText = styled(Typography)(({ theme }) => ({
  ...theme.typography.body5,
  lineHeight: '28px',
  color: theme.palette.blue.main,
  cursor: 'pointer',
}));
