import { Box, styled, Typography } from '@mui/material';

export const ErrorMainContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: theme.palette.background.default,
}));

export const ErrorImage = styled('img')({
  maxWidth: '390px',
});

ErrorImage.defaultProps = {
  alt: 'Something went wrong!',
};

export const HeaderText = styled(Typography)(({ theme }) => ({
  ...theme.typography.h2,
  color: theme.palette.text.primary,
  textAlign: 'center',
}));

export const SubHeaderText = styled(Typography)(({ theme }) => ({
  ...theme.typography.body5,
  color: theme.palette.grey.common,
  textAlign: 'center',
}));
