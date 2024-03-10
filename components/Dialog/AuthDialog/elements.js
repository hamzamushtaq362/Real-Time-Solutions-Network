import { Box, styled, Typography } from '@mui/material';

export const AuthContentContainer = styled(Box)(({ theme }) => ({
  background: '#262626',
  padding: theme.spacing(4),
  height: '100%',

  '@media (max-width: 600px)': {
    padding: theme.spacing(2),
  }
}));
export const AuthContainer = styled(Typography)(({ theme }) => ({
  background: '#262626',
  display: 'flex',
  alignItems: 'center',
  height: '100%',
  '@media (max-width: 600px)': {
    flexDirection: 'column',
  }
}));

export const AvatarHeaderText = styled(Typography)(({ color, theme }) => ({
  ...theme.typography.body4,
  color: color ? color : theme.palette.grey.normal6,
}));
export const DialogLabelText = styled(Typography)(({ theme }) => ({
  ...theme.typography.h9,
  color: theme.palette.text.label,
}));
export const AuthLink = styled(Box)(({ theme }) => ({
  ...theme.typography.h7,
  color: theme.palette.text.primary,
  cursor: 'pointer',
  textDecoration: 'underline',
}));

export const DialogValueText = styled(Typography)(({ theme }) => ({
  ...theme.typography.h7,
  color: theme.palette.text.text,
}));

export const AuthLeftContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%',
  background: theme.palette.background.paper,
  padding: theme.spacing(4),
  position: 'relative',

  '@media (max-width: 600px)': {
    padding: theme.spacing(2),
  }
}));
export const TopText = styled(Box)(({ theme }) => ({
  color: '#FFF',
  lineHeight: '32.41px',
  letterSpacing: '-7%',
  fontFamily: theme.typography.fontFamilyFreight,
  backgroundColor: 'rgba(217, 217, 217, 0.10)',
  width: 'fit-content',
  padding: theme.spacing(0.5, 1),
  borderRadius: theme.spacing(10),
  zIndex: 1,
  fontSize: 32,
  fontWeight: 400,
}));
export const WelcomeTextHeading = styled(Box)(({ theme }) => ({
  ...theme.typography.h3,
  color: '#FFF',
  letterSpacing: '-0.28px',
  fontFamily: 'SF Display Pro, Inter',
  width: '100%'
}));
