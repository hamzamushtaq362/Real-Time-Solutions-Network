import { Box, styled, Typography } from '@mui/material';

export const ApplyCollabContentContainer = styled(Box)(({ theme }) => ({
  padding: '30px',
  background: theme.palette.background.paper,
}));

export const CollabText = styled(Typography)(({ theme }) => ({
  ...theme.typography.body2,
  fontWeight: 400,
  color: theme.palette.text.primary,
}));

export const CollabSubText = styled(Typography)(({ color, theme }) => ({
  ...theme.typography.body5,
  color: color ? color : theme.palette.grey.common,
}));

export const AvatarHeaderText = styled(Typography)(({ color, theme }) => ({
  ...theme.typography.body4,
  color: color ? color : theme.palette.grey.normal6,
}));

export const HeaderLink = styled(AvatarHeaderText)(({ theme }) => ({
  color: theme.palette.blue.main,
  cursor: 'pointer',
}));

export const LabelRow = styled(Box)({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
});
