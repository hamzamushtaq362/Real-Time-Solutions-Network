import { Box, styled, Typography, MenuItem } from '@mui/material';

export const RenderItemContainer = styled(MenuItem)({
  width: '100%',
  borderRadius: '10px',
  display: 'flex',
  height: '44px',
  alignItems: 'center',
  padding: '28px 16px !important',
  overflow: 'hidden',
});

export const RenderItemText = styled(Typography)(({ theme }) => ({
  ...theme.typography.body5,
  margingLeft: '10px',
  color: theme.palette.grey.normal8,
}));
export const AvatarWrap = styled(Box)(({ theme, size, inverse }) => ({
  width: size ? size : 180,
  height: size ? size : 180,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '50%',
  cursor: 'pointer',
  opacity: 1,
  transition: 'all 100ms ease-out',
  border: `1px solid ${
    inverse ? theme.palette.borderLightInverse : theme.palette.borderLight
  }`,
  position: 'relative',

  '@media (max-width: 600px)': {
    width: 140,
    height: 140,
  },
  backgroundColor: theme.palette.background.default,
}));
export const CircleWrap = styled(Box)(({ theme }) => ({
  borderRadius: '50%',
  textAlign: 'center',
  overflow: 'hidden',
  position: 'relative',
}));

export const EditWrap = styled(Box)(({ theme, hovered }) => ({
  ...theme.typography.h10,
  backgroundColor: theme.palette.background.inverse,
  height: '20%',
  width: '100%',
  position: 'absolute',
  bottom: 0,
  left: 0,
  color: theme.palette.text.inverse,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  transform: hovered ? 'translate(0, 0)' : 'translate(0, 33px)',
  transition: 'transform 100ms ease-out',
}));
