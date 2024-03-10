import { styled, Box, Avatar } from '@mui/material';

export const ProjectSkeletonContainer = styled(Box)(({ theme }) => ({
  ...theme.card,
  padding: 0,
  width: '100%',
  paddingBottom: '12px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  backgroundColor: theme.palette.background.card,
  border: `1px solid ${theme.palette.borderLight}`,
}));
export const ProjectTileContainer = styled(Box)(({ theme, hovered }) => ({
  ...theme.card,
  padding: theme.spacing(2, 2, 5, 2),
  width: 350,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  backgroundColor: hovered ? theme.palette.background.cardHover : theme.palette.background.card,
  border: `1px solid ${hovered ? theme.palette.borderLightInverse: theme.palette.borderLight}`,
  transition: 'all 100ms ease-out',
}));
export const ProjectImage = styled(Avatar)(({ theme, hovered, selected }) => ({
  width: '100%',
  height: 350,
  borderRadius: 0,
  position: 'relative',

  '&:after': {
    content: '""',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url(.jpg)',
    display: (selected || hovered) ? 'block': 'none'
  }
}));

export const ProjectAddedLabel = styled(Box)(({ theme }) => ({
  ...theme.typography.h6,
  color: theme.palette.text.inverse
}));
export const ProjectContentContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  alignSelf: 'flex-start',
  justifySelf: 'flex-start',
  marginTop: theme.spacing(1),
}));
export const ProjectLabelWrap = styled(Box)(({ theme, selected }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  left: 16,
  top: 16,
  opacity: selected ? 1 : 0,
  transition: 'opacity 100ms ease-out'
}));

export const ProjectIconWrap = styled(Box)(({ theme }) => ({
  width: 34,
  height: 34,
  backgroundColor: theme.palette.snackbar.success.background,
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));
