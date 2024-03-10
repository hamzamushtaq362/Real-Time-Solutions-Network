import { styled, Box, Tooltip, AppBar, Toolbar } from '@mui/material';
import { withStyles } from '@mui/styles';

export const DashboardNavbarContainer = styled(AppBar)(
  ({ theme, showBanner, isMobileView }) => ({
    width: '100%',
    position: 'fixed',
    top: showBanner ? 55 : 0,
    display: 'flex',
    height: isMobileView ? 60 : 64,
    background: theme.palette.background.default,
    zIndex: 100,
    alignItems: 'center',
    borderBottom: `1px solid ${theme.palette.borderLight}`,
  }),
);
export const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  padding: theme.spacing(0),
  width: '100%',
  '@media (max-width : 496px)': {
    padding: theme.spacing(0, 2),
  },
}));

export const NavRightActionsContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '150px',
});

export const ProfileMenuContainer = styled(Box)(({ theme, isMobileView }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: isMobileView ? 'flex-end' : 'center',
  width: isMobileView ? '100%' : '150px',
  marginRight: theme.spacing(isMobileView ? 2 : 0),
}));

export const IconButtonContainer = styled(Box)({
  cursor: 'pointer',
  padding: '10px 0',
});

export const SearchContainer = styled(Box)(({ theme }) => ({
  flex: 4,
}));

export const SectionsContainer = styled(Box)(({ theme }) => ({
  flex: 6,
  display: 'flex',
  alignItems: 'center',
  paddingLeft: theme.spacing(6),
}));

export const SectionContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1.5, 2.5),
  borderRadius: theme.spacing(5),
  cursor: 'pointer',
  transition: 'transform 100ms',
  '&:hover': {
    backgroundColor: theme.palette.grey.normal9,
  },
  '&:active': {
    transform: 'translateY(3px)',
  },
}));
export const SectionText = styled(Box)(({ theme, isActive }) => ({
  ...theme.typography.h6,
  color: isActive
    ? theme.palette.grey.greyDark
    : theme.palette.grey.greyLight,
  fontWeight: isActive ? 400 : 300,
  marginLeft: theme.spacing(0.4),
  letterSpacing: '0.02em'
}));
export const StyledTooltip = withStyles({
  tooltip: {
    fontSize: 12,
  },
})(Tooltip);

export const MobileSearchContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1, 3),
}));
export const SearchInputContainer = styled(Box)(({ theme, landing }) => ({
  backgroundColor: landing ? theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.20)' : 'rgba(255, 255, 255, 0.20)' : theme.palette.borderLight,
  boxShadow: landing ?
    (theme.palette.mode === 'dark' ? '0px -0.73023px 0.73023px 0px rgba(255, 255, 255, 0.35) inset, 1.46045px 2.92091px 2.92091px -0.73023px rgba(0, 0, 0, 0.25) inset' : '0px -0.73023px 0.73023px 0px rgba(0, 0, 0, 0.1) inset, 1.46045px 2.92091px 2.92091px -0.73023px rgba(0, 0, 0, 0.15) inset'): 'none',
  borderRadius: landing ? 100 : 30,
  width: landing ? 400 : '',
  flex: 1,
  margin: landing ? 'auto': 0,
}));
