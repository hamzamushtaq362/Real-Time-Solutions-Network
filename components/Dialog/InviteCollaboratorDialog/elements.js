import { Box, Typography, MenuItem, styled } from '@mui/material';

export const InviteCollaboratorContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: '30px',
  backgroundColor: theme.palette.background.paper,
}));

export const CollabText = styled(Typography)(({ theme }) => ({
  fontSize: '20px',
  lineHeight: '26px',
  fontWeight: 400,
  color: '#191A1F',
}));

export const CollabSubText = styled(Typography)(({ color, theme }) => ({
  fontSize: '14px',
  lineHeight: '20px',
  fontWeight: 400,
  color: color ? color : theme.palette.grey.common,
}));

export const AvatarHeaderText = styled(Typography)(({ color, theme }) => ({
  fontSize: '16px',
  lineHeight: '24px',
  fontWeight: 400,
  color: color ? color : '#171725',
}));

export const HeaderLink = styled(AvatarHeaderText)({
  color: '#2F62FD',
  cursor: 'pointer',
});

export const LabelRow = styled(Box)({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
});

export const RenderItemContainer = styled(MenuItem)({
  width: '100%',
  borderRadius: '10px',
  display: 'flex',
  height: '44px',
  alignItems: 'center',
});

export const RenderItemText = styled(Typography)(({ theme }) => ({
  ...theme.typography.body5,

  maringLeft: '10px',
  color: theme.palette.grey.normal8,
}));
