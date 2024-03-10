import { styled, Box, Typography } from '@mui/material';

export const HeaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  alignItems: 'center',

  padding: theme.spacing(4, 4, 2, 5),
}));

export const SubHeaderContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(1, 4, 1, 5),
  display: 'flex',
  alignItems: 'center',
  columnGap: '1rem',
}));

export const DescriptionContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(1, 4, 1, 5),
  minHeight: '14rem',
  maxHeight: '20rem',
}));

export const SubHeaderText = styled(Typography)(({ theme }) => ({
  ...theme.typography.body3,
  fontWeight: 400,
  color: theme.palette.grey.common,
}));

export const CircleDividier = styled(Box)(({ theme }) => ({
  width: '0.3rem',
  height: '0.3rem',
  borderRadius: '50%',
  backgroundColor: theme.palette.background.default,
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

export const CollaboratorsContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(1, 4, 1, 5),
  minHeight: '10rem',
}));

export const CollaboratorsHeader = styled(Typography)(({ theme }) => ({
  ...theme.typography.body2,
  fontWeight: 400,
  color: theme.palette.text.inverse,
  marginBottom: theme.spacing(1),
}));

export const CollaboratorsAvatarContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  rowGap: '1rem',
  columnGap: '2rem',
  marginBottom: theme.spacing(1),
  flexWrap: 'wrap',
}));

export const AvatarBox = styled(Box)(({ theme }) => ({
  // maxWidth: '8rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  columnGap: '0.2rem',
}));

export const AvatarText = styled(DescriptionText)(({ theme }) => ({
  textAlign: 'center',
}));

export const SubFooterContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(1, 4, 1, 5),
  display: 'flex',
  columnGap: '1rem',
}));

export const SubFooterText = styled(Typography)(({ theme }) => ({
  ...theme.typography.body4,
  fontWeight: 400,
  color: theme.palette.text.inverse,
}));

export const VisitEventPageText = styled(SubFooterText)(({ theme }) => ({
  textDecoration: 'none', // Remove default underline
  position: 'relative', // Required for absolute positioning of the pseudo-element
  '&::after': {
    content: '""',
    position: 'absolute',
    left: 0,
    bottom: -4, // Adjust this value to control the gap between the text and the underline
    width: '100%',
    borderBottom: `1px solid ${theme.palette.text.inverse}`, // Customize the underline
  },
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
