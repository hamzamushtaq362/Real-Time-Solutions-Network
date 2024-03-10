import { Box, styled, Typography, Avatar } from '@mui/material';

export const ProfileTopSectionContainer = styled(Box)(({ theme }) => ({
  padding: 6,
  position: 'relative',
  height: '100%',
}));

export const ProfileCoverImage = styled(Avatar)({
  width: '100%',
  height: '145px',
  borderRadius: 4,
});

ProfileCoverImage.defaultProps = {
  variant: 'square',
};

export const RolesContainer = styled(Box)(() => ({
  width: '98%',
  height: '7rem',
  // borderBottom: `1px solid ${hovered ? theme.palette.borderLightInverse : theme.palette.borderLight}`,
  padding: '16px',
  paddingTop: '10px',
}));

export const RolesText = styled(Typography)(({ theme }) => ({
  ...theme.typography.h6,
  color: theme.palette.text.primary,
}));
export const NotFoundText = styled(Typography)(({ theme, hovered }) => ({
  ...theme.typography.h8,
  fontWeight: 400,
  color: hovered
    ? theme.palette.text.inverseSecondary
    : theme.palette.text.secondary,
  marginTop: theme.spacing(-1),
}));

export const PlaceholderText = styled(Typography)(({ theme }) => ({
  ...theme.typography.body4,
  color: theme.palette.text.primary,
}));

export const PlaceholderContentContainer = styled(Box)({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  rowGap: '20px',
});
export const ProfileName = styled(Box)(({ theme, hovered }) => ({
  fontSize: 22,
  lineHeight: '18.4px',
  letterSpacing: '0.44px',
  fontWeight: 300,
  width: 'max-content',
  color: theme.palette.background.full,
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  '&::after': {
    content: "''",
    position: 'absolute',
    zIndex: 1,
    left: hovered ? 0 : 'unset',
    right: hovered ? 'auto' : 0,
    width: hovered ? '100%' : 0,
    bottom: -2,
    backgroundColor: theme.palette.text.primary,
    height: 1.5,
    transitionProperty: 'width',
    transitionDuration: '100ms',
    transitionTimingFunction: 'ease-out',
  },
  '&:hover::after, &:focus::after, &:active::after': {
    left: 0,
    right: 'auto',
    width: '100%',
  },
}));

export const ProfileAvatar = styled('img')(({ theme }) => ({
  width: 270,
  height: 270,
  objectFit: 'cover',
}));

export const ProfileSubText = styled(Typography)(({ theme, height }) => ({
  color: theme.palette.background.full,
  fontSize: 16,
  letterSpacing: '0.32px',
  fontWeight: 300,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 1,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  height: height ?? 20,
  width: '270px',
  lineHeight: 'normal',
}));
