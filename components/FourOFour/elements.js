import { styled, Typography, Box } from '@mui/material';

export const HeaderText = styled(Typography)(({ theme }) => ({
  ...theme.typography.h2,
  color: theme.palette.text.primary,
  textAlign: 'center',
}));

export const SubHeaderText = styled(Typography)(({ theme }) => ({
  ...theme.typography.body3,
  color: theme.palette.grey.common,
  textAlign: 'center',
}));

export const MainContainer = styled(Box)({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const ContentContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: 'calc(100vh - 8rem)',
});
