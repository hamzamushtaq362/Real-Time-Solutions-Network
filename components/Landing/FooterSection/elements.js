import { Box, Typography, styled } from '@mui/material';

export const FooterWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.paperLanding,
  zIndex: 2,
}));

export const FooterMainContainer = styled(Box)({
  width: '100%',

  '@media (max-width: 900px)': {},
});

export const BrandContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  columnGap: '6px',
});

export const LogosContainer = styled(Box)({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
});
export const BigHeading = styled(Box)(({ theme }) => ({
  fontFamily: 'PP Monument, sans-serif',
  fontSize: '25vw',
  fontWeight: 500,
  lineHeight: '112%',
  color: theme.palette.text.primary,
}));

export const FooterBottom = styled(Box)(({ theme, backgroundColor }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(2, 6),
  borderTop: `1px solid ${theme.palette.borderLight}`,
  backgroundColor: backgroundColor
    ? backgroundColor
    : theme.palette.background.default,
  marginTop: 'auto',

  '@media (max-width : 500px)': {
    display: 'block',
    padding: theme.spacing(4, 2),
  },
}));
export const NavigationsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginRight: theme.spacing(3),
}));
export const NavItem = styled(Box)(({ theme }) => ({
  ...theme.typography.h8,
  fontSize: '12px',
  cursor: 'pointer',
  margin: theme.spacing(0, 3),
  color: theme.palette.text.secondary,

  '@media (max-width : 500px)': {
    fontSize: '10px',
    margin: theme.spacing(0, 3, 0, 0),
  },
}));

export const TradeMarkText = styled(Typography)(({ theme }) => ({
  ...theme.typography.h8,
  color: theme.palette.text.secondary,
  fontSize: '12px',

  '@media (max-width : 500px)': {
    fontSize: '10px',
  },
}));

export const SocialMediaImage = styled('img')({
  maxWidth: '40px',
  cursor: 'pointer',
});
