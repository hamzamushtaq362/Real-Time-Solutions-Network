import { styled, Box, Typography, Avatar } from '@mui/material';

export const HeaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  alignItems: 'center',

  padding: theme.spacing(4, 4, 2, 5),
}));

export const DescriptionContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(1, 4, 1, 5),
  minHeight: '12rem',
  maxHeight: '20rem',
}));

export const DescriptionText = styled(Typography)(({ theme }) => ({
  ...theme.typography.body3,
  fontWeight: 300,
  letterSpacing: '0.01rem',
  lineHeight: '1.5rem',
  color: theme.palette.text.inverse,
}));

export const DrawerTitle = styled(Box)(({ theme }) => ({
  ...theme.typography.h2,
  color: theme.palette.text.inverse,
  width: '80%',
}));

export const MediaContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(1, 4, 1, 5),
  minHeight: '10rem',
}));

export const SubHeader = styled(Typography)(({ theme }) => ({
  ...theme.typography.body1,
  fontWeight: 400,
  color: theme.palette.text.inverse,
  marginBottom: theme.spacing(1),
}));

export const MediaGridContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '0.4rem',
  flexWrap: 'wrap',
  marginBottom: theme.spacing(1),
}));

export const AvatarText = styled(DescriptionText)(({ theme }) => ({
  textAlign: 'center',
}));

export const SubFooterText = styled(Typography)(({ theme }) => ({
  ...theme.typography.body4,
  fontWeight: 400,
  color: theme.palette.text.inverse,
}));

export const FooterContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(1.5, 4, 1.5, 5),
  display: 'flex',
  columnGap: '1rem',
}));

export const IconBox = styled(Box)({
  cursor: 'pointer',
});

export const ImagePreviewContainer = styled(Avatar)(({ width, height }) => ({
  width: width ? width : 350,
  height: height ? height : 300,
  borderRadius: '0 !important',
  cursor: 'pointer',
}));

export const NameAvatarContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  padding: theme.spacing(1, 4, 1, 5),
  alignItems: 'center',
  columnGap: '0.5rem',
}));
