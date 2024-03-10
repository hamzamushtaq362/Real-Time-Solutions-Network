import { Typography, styled, Box, Avatar } from '@mui/material';

export const CollectiveDetailsContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  minHeight: 'calc(100vh - 55px)',
});
export const CollectiveProfileContainer = styled(Box)({
  width: '100%',
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
});

export const SectionBanneInfoLeftName = styled(Typography)(({ theme }) => ({
  ...theme.typography.h5,
  'text-transform': 'capitalize',
  color: theme.palette.text.primary,
}));

export const CollectiveBio = styled(Typography)(({ theme }) => ({
  ...theme.typography.h10,
  color: theme.palette.text.primary,
  marginTop: '1rem',
}));

export const SectionMainContainer = styled(Box)({
  width: '100%',
  minHeight: '40vh',
  padding: '20px',
});

export const NoResultsSubText = styled(Typography)(({ theme }) => ({
  ...theme.typography.h7,
  // color: theme.palette.grey.commonText,
  color: 'black',

  lineHeight: '130%',
  letterSpacing: '-0.01em',
  textAlign: 'center',
}));

export const SectionBannerCoverImage = styled(Avatar)(({ src, alt, sx }) => ({
  src: src?.src,
  alt: alt?.alt,
  sx: sx?.sx,
}));
