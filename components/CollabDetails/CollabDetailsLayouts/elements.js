import { Box, Typography, styled } from '@mui/material';

export const CollabDetailsContainer = styled(Box)(({ theme }) => ({
  width: '100%',
}));

export const CollabWithCreatorDetailsContentContainer = styled(Box)(
  ({ theme }) => ({
    width: '100%',
  }),
);

export const CollabDetailsDefaultUserContainer = styled(Box)({
  width: '100%',
});

export const CollabHeaderText = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  lineHeight: '21px',
  letterSpacing: '0.1px',
  color: theme.palette.text.primary,
}));

export const CollabDetailsPublicContainer = styled(Box)({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  padding: '20px 60px',

  '@media (max-width: 1300px)': {
    padding: '16px 50px',
  },

  '@media (max-width: 900px)': {
    padding: '16px 20px',
  },
});

export const JoinConsoleContainer = styled(Box)(({ maxWidth, theme }) => ({
  marginTop: '20px',
  minWidth: '580px',
  maxWidth: maxWidth,
  padding: '16px 18px',
  borderRadius: '6px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.blue.active,

  '@media (max-width: 900px)': {
    minWidth: '400px',
  },
}));

export const JoinConsoleText = styled(Typography)(({ color, theme }) => ({
  ...theme.typography.h7,
  lineHeight: '22px',
  color: color ? color : theme.palette.blue.main,

  '@media (max-width: 900px)': {
    fontSize: '12px',
  },
}));

export const SpinnerCenterContainer = styled(Box)({
  width: '100%',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
});

export const NormalLabelText = styled(Typography)(
  ({ color, fontWeight, fontSize, theme }) => ({
    fontFamily: 'inherit',
    fontWeight: fontWeight ? fontWeight : 400,
    fontSize: fontSize ? fontSize : '14px',
    lineHeight: '24px',
    letterSpacing: '0.1px',
    color: color ? color : theme.palette.text.primary,
  }),
);

export const NegotiateText = styled(Typography)(({ theme }) => ({
  color: theme.palette.blue.main,
  ...theme.typography.h11,
  lineHeight: '24px',
  letterSpacing: '0.1px',
  cursor: 'pointer',
}));
export const NavigateBack = styled(Box)(({ theme }) => ({
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  width: 'fit-content',

  '& svg': {
    transition: 'transform 100ms ease-out',
    transform: 'translateX(0)',
  },
  '&:hover': {
    '& svg': {
      transform: 'translateX(-6px)',
    },
  },
}));
export const BackText = styled(Box)(({ theme }) => ({
  ...theme.typography.h11,
  color: theme.palette.text.label,
  fontSize: 18,
  lineHeight: '130%',
  letterSpacing: '-0.01em',
  marginLeft: theme.spacing(1),
}));

export const NavItemWrap = styled(Box)(({ theme, isActive }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 4),
  borderRadius: theme.spacing(5),
  cursor: 'pointer',
  transition: 'background 100ms ease-out, transform 100ms ease-out',
  border: isActive
    ? `1px solid transparent`
    : `1px solid ${theme.palette.text.disabled}`,
  backgroundColor: isActive
    ? theme.palette.background.inverse
    : theme.palette.background.paper,
  color: isActive ? theme.palette.text.inverse : theme.palette.text.primary,
  marginRight: theme.spacing(1),
  '&:hover': {
    backgroundColor: theme.palette.background.inverse,
    color: theme.palette.text.inverse,
    border: '1px solid transparent',
  },
  '&:active': {
    transform: 'translateY(3px)',
  },
  '@media (max-width: 500px)': {
    padding: theme.spacing(2, 3),
  },
  '@media (max-width: 420px)': {
    padding: theme.spacing(2, 3),
  },
}));
export const NavbarContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
}));

export const NavActionsWrap = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));
export const CollabOverviewWrap = styled(Box)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.borderLight}`,
  padding: theme.spacing(5, 4, 4, 4),
}));

export const CollabOverviewTitle = styled(Box)(({ theme }) => ({
  ...theme.typography.h2,
  color: theme.palette.text.primary,
  margin: theme.spacing(3, 0),
  '& button': {
    position: 'absolute',
    right: 0,
  },
}));

export const CollabTitle = styled(Typography)(({ theme }) => ({
  ...theme.typography.h2,
  color: theme.palette.text.primary,
  width: '100%',
}));

export const SubHeading = styled(Typography)(({ theme }) => ({
  ...theme.typography.h4,
  color: theme.palette.text.primary,

  '@media (max-width: 600px)': {
    marginBottom: theme.spacing(2),
  },
}));

export const MemberWrap = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(4, 0),
  borderBottom: `1px solid ${theme.palette.borderLight}`,
}));

export const AddMoreText = styled(Box)(({ theme }) => ({
  ...theme.typography.h7,
  color: theme.palette.text.secondary,
}));

export const CenterFlex = styled(Box)({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
});
