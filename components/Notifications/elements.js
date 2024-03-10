import { Box, MenuItem, styled, Typography } from '@mui/material';

export const NotificationHeaderLink = styled(Typography)(({ theme }) => ({
  ...theme.typography.body5,
  color: theme.palette.blue.main,
  cursor: 'pointer',
}));

export const NotificationTitle = styled(Typography)(({ theme }) => ({
  ...theme.typography.h7,
}));

export const NotificationMenuItemContainer = styled(MenuItem)(({ theme }) => ({
  width: '100%',
  margin: 'auto',
  padding: 0,
  minHeight: '74px',
  height: '100%',
  borderRadius: '8px',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  '&:hover': {
    backgroundColor: 'unset',
  },
}));

export const NotificationAvatarContainer = styled(Box)({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
});
export const NotificationHeader = styled(Box)({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 8,
});

export const TimeStampText = styled(Typography)(({ theme }) => ({
  ...theme.typography.body6,
  align: 'right',
  color: theme.palette.grey.commonSecondary,
}));

export const NotificationTextContainer = styled(Box)({
  marginLeft: '10px',
  alignSelf: 'center',
  width: '100%',
});

export const UserText = styled(Typography)(({ theme }) => ({
  ...theme.typography.h7,
  letterSpacing: '0.1px',
  color: theme.palette.text.inverse,
}));

export const NotificationLightText = styled(Box)(({ theme }) => ({
  ...theme.typography.body5,
  color: theme.palette.grey.common,
  wordWrap: 'break-word',
}));

export const NotificationAssetText = styled(UserText)({
  fontSize: '14px',
  whiteSpace: 'normal',
  width: '100%',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});
