import { Box, styled, Typography, Button } from '@mui/material';

export const HeroContainer = styled(Box)(({ theme }) => ({
  height: '100vh',
  display: "flex",
  flexDirection: 'column',
  justifyContent: "center",
  alignItems: "center",
  width: '100%',
  position: 'relative',
  background: 'radial-gradient(161.86% 473.17% at -3.34% -10.16%, #0904FF 0%, rgba(169, 83, 255, 0.53) 33.33%, rgba(255, 57, 57, 0.53) 66.67%, rgba(0, 0, 0, 0.00) 100%)',
  '@media (max-width: 500px)': {
    height: "100vh",
    overflow: 'hidden'
  },
}));

export const Heading = styled(Typography)(({ theme }) => ({
  width: '70%',
  margin: '0 auto',
  fontSize: 80,
  color: 'rgba(0, 0, 0, 0.88)',
  fontWeight: 400,
  lineHeight: '71.5px',
  letterSpacing: '0.01em',
  textAlign: 'center',
  fontFamily: theme.typography.fontFamilyFreight,

  '@media (max-width: 900px)': {
    fontSize: 60,
  },
  '@media (max-width: 600px)': {
    fontSize: 40,
    width: '90%',
    lineHeight: '50px',
  },
}));

export const SmallText = styled(Typography)(({ theme }) => ({
  fontSize: 22,
  color: 'rgba(0, 0, 0, 0.70)',
  marginBottom: theme.spacing(1),

  '@media (max-width: 900px)': {
    fontSize: 20,
  },
}));

export const StartButton = styled(Button)(({ theme, marginTop, height, width }) => ({
  background: 'linear-gradient(97deg, rgb(47, 47, 47) 9.16%, rgb(0, 0, 0) 43.89%, rgb(32, 29, 41) 64.72%)',
  borderRadius: 33,
  color: 'rgb(247, 248, 248)',
  marginTop: marginTop ?? theme.spacing(6),
  padding: theme.spacing(1, 2),
  fontFamily: 'SF Display Pro, Inter',
  fontSize: 11,
  letterSpacing: '2.8px',
  lineHeight: '1.7px',
  transition: 'background 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  width,
  height,
  '@media (max-width: 600px)': {
    fontSize: 14,
  },
}));
