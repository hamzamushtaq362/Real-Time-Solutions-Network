import { styled, Box, Typography } from '@mui/material';

export const LoadingMoreContainer = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'linear-gradient(180deg, rgba(241, 241, 241, 0) 5%, #F1F1F1 120.12%)',
  position: 'absolute',
  bottom: 0,
  height: 220,
  zIndex: 10,
}));

export const LoadingMoreText = styled(Typography)(({ theme }) => ({
  ...theme.typography.body3,
  color: theme.palette.background.paper,
  backgroundColor: theme.palette.background.inverse,
  padding: '14px',
  borderRadius: '50%',
}));
export const LoaderWrap = styled(Box)(({theme}) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}))