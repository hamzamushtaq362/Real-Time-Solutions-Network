import { Typography, styled, Box, Button } from '@mui/material';

export const SectionContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paperLanding,
  width: '100%'
}))

export const SectionHeaderContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: '80px 30px 55px',

  '@media (max-width : 900px)': {
    padding: '80px 20px 30px',
  },

  '@media (max-width : 600px)': {
    padding: '65px 16px 30px',
  },
}));

export const HeaderText = styled(Typography)(({ theme, fontSize }) => ({
  fontSize: fontSize ?? 92,
  fontWeight: 400,
  color: theme.palette.text.primary,
  letterSpacing: '-0.02em',
  lineHeight: '100%',
  padding: 0,

  '@media (max-width: 800px)': {
    fontSize: '52px',
  },
  '@media (max-width: 500px)': {
    fontSize: '32px',
  },
}));

export const SubText = styled(Typography)(({ theme, fontSize }) => ({
  fontSize: fontSize ?? 28,
  fontWeight: 400,
  color: theme.palette.text.secondary,
  marginTop: theme.spacing(3),

  '@media (max-width: 800px)': {
    fontSize: 22,
    marginTop: theme.spacing(1),
  },
  '@media (max-width: 500px)': {
    fontSize: 16,
    marginTop: theme.spacing(1),
  },
}));

export const TitleText = styled(Typography)(({ theme }) => ({
  fontSize: '40px',
  fontWeight: 700,
  lineHeight: '53px',
  color: '#191A1F',
  display: 'inline-block',

  '@media (max-width: 600px)': {
    fontSize: '30px',
  },
}));

export const TitleTextGradient = styled(TitleText)({
  background: '-webkit-linear-gradient(#BA319E, #E95D34)',
  '-webkit-background-clip': 'text',
  '-webkit-text-fill-color': 'transparent',
  display: 'inline-block',
});

export const SmallHeading = styled(Typography)(({ color, theme }) => ({
  fontSize: '26px',
  fontWeight: 700,
  lineHeight: '30px',
  color: color ? color : '#191A1F',
}));

export const SmallText = styled(Box)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 400,
  lineHeight: '24px',
  color: '#787F84',
}));

export const ExtraSmallHeading = styled(Box)(({theme}) => ({
  fontSize: '17px',
  fontWeight: 400,
  lineHeight: '26px',
  color: '#191A1F',
}));

export const SignupEarlySuccessButton = styled(Button)(({ theme }) => ({
  width: '283px',
  borderRadius: '6px',
  height: '52px',
  fontSize: '18px',
  fontWeight: 600,
  lineHeight: '24px',
  color: '#191A1F',
  textTransform: 'none',
  boxShadow: 'none',
  backgroundColor: '#FFFFFF',

  '&:hover': {
    boxShadow: 'none',
    backgroundColor: '#FFFFFF',
  },
}));

export const MaxWidthContentWrapper = styled(Box)({
  maxWidth: '2200px',
  width: '100%',
  // border: '1px solid red',
});

export const Circle = styled(Box)(({ theme }) => ({
  width: 25,
  height: 25,
  background: theme.palette.background.inverse,
  borderRadius: 50,
  marginRight: theme.spacing(2),

  '@media (max-width: 500px)': {
    width: 20,
    height: 20,
  }
}));

export const Number = styled(Box)(({ theme }) => ({
  ...theme.typography.h6,
  fontSize: 30,
  color: theme.palette.text.primary,

  '@media (max-width: 500px)': {
    fontSize: 22,
  }
}));

export const StandOutWrap = styled(Box)(({ theme }) => ({
  width: '100%',
  borderBottom: `1px solid ${theme.palette.border}`,
  height: 1000,
}));
