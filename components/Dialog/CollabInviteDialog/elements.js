import { Box, Typography, styled } from '@mui/material';

export const CollabInviteContainer = styled(Box)(({ theme }) => ({
  padding: '30px',
  background: theme.palette.background.paper,
}));

export const ImagesContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-evenly',
  marginBottom: '3rem',
}));

export const ImageAndName = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  flexDirection: 'column',
}));

export const CollabsShowGroup = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
}));

export const OrText = styled(Typography)(({ theme }) => ({
  ...theme.typography.title5,
  textAlign: 'center',
  color: theme.pallate?.grey?.common,
}));