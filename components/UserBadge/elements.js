import { Box, Typography, styled } from '@mui/material';

export const UserBadgeContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  rowGap: '4px',
});

export const UserBadgeText = styled(Typography)(({ theme }) => ({
  fontSize: '8px',
  lineHeight: '7px',
  textAlign: 'center',
  fontWeight: 400,
  color: theme.palette.grey.common,
}));

export const BadgeWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});
