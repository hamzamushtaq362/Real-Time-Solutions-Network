import { Box, styled, Typography } from '@mui/material';
import { CollectiveAboutBanner } from 'assets/png';
export const CollectiveAboutMainDiv = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  gap: '1rem',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '10rem',
}));

export const CreateCollectiveTopDiv = styled(Box)(() => ({
  width: '80%',
  display: 'flex',
  gap: '2rem',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '6rem 5rem',
  backgroundColor: '#F3F3F3',
}));

export const CreateCollectiveBackgroundDiv = styled(Box)(() => ({
  width: '300rem',
  height: '30rem',
  display: 'flex',
  gap: '2rem',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundImage: `url(${CollectiveAboutBanner.src})`,
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'contain',
}));

export const AboutFooterDiv = styled(Box)(() => ({
  width: '80%',
  display: 'flex',
  margin: '2rem',
}));

export const BorderBox = styled(Box)(() => ({
  width: '25%',
  height: '20rem',
  border: '1px solid black',
  borderRight: 'none',
  float: 'left',
  paddingLeft: '5rem',
  display: 'flex',
  gap: '3rem',
  alignItems: 'start',
  justifyContent: 'center',
  flexDirection: 'column',
}));

export const CreateCollectiveHeader = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.h1,
  color: theme.palette.primary?.common,
}));
export const CreateCollectivePara = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  color: theme.palette.primary?.common,
}));
export const BoxContent = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  color: theme.palette.grey.common,
}));

export const IconContainer = styled('img')({
  alignItems: 'center',
  width: '4rem',
  height: '4rem',
  objectFit: 'cover',
});
