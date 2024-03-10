import { styled, Box, Tooltip, Toolbar } from '@mui/material';
import { withStyles } from '@mui/styles';

export const DashboardNavbarContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  top: 0,
  left: 0,
  position: 'fixed',
  display: 'flex',
  height: 60,
  background:
    theme.palette.mode === 'dark'
      ? '#262626'
      : 'linear-gradient(90deg, #fff 65.75%, rgba(255, 255, 255, 0.9) 100%)',
  borderBottom: `1px solid ${theme.palette.borderLight}`,
  zIndex: 100,
  alignItems: 'center',
  transition: 'all 500ms cubic-bezier(0.4, 0, 0.2, 1)',
  // visibility: visible ? 'visible' : 'hidden',
  // transform: visible ? 'translateY(0)' : 'translateY(-100%)',
}));
export const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  padding: theme.spacing(0),
  width: '100%',
  height: '100%',

  display: 'flex', // new design styles
  justifyContent: 'space-between',

  '@media (max-width : 496px)': {
    padding: theme.spacing(0, 2),
  },
}));
export const ConnectContainer = styled(Box)(({ isMobileView, width }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: isMobileView ? 'flex-end' : 'center',
  width: isMobileView ? '100%' : width ?? '205px',
  marginRight: 32,
}));

export const MenuContainer = styled(Box)(({ isMobileView }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: isMobileView ? 'flex-end' : 'center',
  width: isMobileView ? '100%' : '205px',
}));

export const MenuText = styled(Box)(({ theme }) => ({
  ...theme.typography.h6,
  fontSize: 18,
  color: theme.palette.text.primary,
  marginRight: theme.spacing(1),
}));

export const SectionsContainer = styled(Box)(({ theme }) => ({
  flex: 6,
  display: 'flex',
  alignItems: 'center',
  paddingLeft: theme.spacing(3),
}));

export const SectionContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '11px 14px',
  borderRadius: theme.spacing(6),
  cursor: 'pointer',
  border: `1px solid ${theme.palette.border2}`,
  backgroundColor: theme.palette.background.paperLanding,
  color: theme.palette.text.primary,
  transition: 'all 100ms',
  marginRight: '6px',
  '&:hover': {
    backgroundColor: theme.palette.background.inverse,
    color: theme.palette.text.inverse,
  },
  '&:active': {
    transform: 'translateY(3px)',
  },
}));
export const SectionText = styled(Box)(({ theme }) => ({
  ...theme.typography.h7,
}));
export const StyledTooltip = withStyles({
  tooltip: {
    fontSize: 12,
  },
})(Tooltip);
