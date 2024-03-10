import { styled, Box, Typography } from '@mui/material';

export const ProfileCardMiddleContainer = styled(Box)({
  margin: '2rem',
  marginTop: '6rem',
  position: 'relative',
});

export const MiddleButtonContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  right: 0,
  top: '-5rem',
  fontSize: '1.4rem',
});

export const ProfileName = styled(Typography)(({ theme }) => ({
  ...theme.typography.subTitle3,
  fontWeight: 600,
  color: theme.palette.text.primary,
}));

export const ProfileSubName = styled(Typography)(({ theme }) => ({
  ...theme.typography.body5,
  lineHeight: '21px',
  letterSpacing: '0.1px',
  marginBottom: '0.5rem',
  color: theme.palette.grey.common,
}));

export const ProfileBio = styled(Typography)(({ theme }) => ({
  ...theme.typography.body5,
  lineHeight: '24px',
  letterSpacing: '0.1px',

  height: '4.8rem',
  overflow: 'hidden',
  color: theme.palette.grey.normal7,
}));

export const RolesText = styled(Typography)(({ theme }) => ({
  ...theme.typography.h10,
  letterSpacing: '0.1px',

  marginBottom: '0.7rem',
  color: theme.palette.grey.commonSecondary,
}));

export const RolesContainer = styled(Box)({
  height: '3.8rem',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
});
