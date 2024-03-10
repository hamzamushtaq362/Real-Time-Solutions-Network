import { styled, Box, Typography, Button } from '@mui/material';

export const AvatarWrapper = styled(Box)(
  ({ size, withBorder, borderRadius }) => ({
    position: 'relative',
    width: size ? size : '45px',
    height: size ? size : '45px',
    minHeight: size ? size : '45px',
    minWidth: size ? size : '45px',

    borderRadius: borderRadius ?? (withBorder ? '50%' : ''),
  }),
);

export const AvatarNumberContainer = styled(Box)(({ size, withBorder }) => ({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: size ? size : '40px',
  height: size ? size : '40px',
  border: withBorder ? '2px solid #FFF' : '',
  borderRadius: withBorder ? '50%' : '',
  backgroundColor: '#A1AFC9',
  fontSize: '14px',
  color: '#FFF',
}));

export const BadgeIconContainer = styled(Box)(({ right, bottom }) => ({
  position: 'absolute',
  right: right ? right : -6,
  bottom: bottom ? bottom : -15,
  borderRadius: '50%',
}));

export const NameAvatarContainer = styled(Box)(({ theme }) => ({
  ...theme.card,
  padding: theme.spacing(3, 2),
  margin: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  '@media (max-width: 500px)': {},
}));

export const NameAvatarTextContainer = styled(Box)({
  marginLeft: '10px',
});

export const AvatarNameText = styled(Typography)(({ theme }) => ({
  ...theme.typography.h6,
  fontFamily: 'inherit',
  fontSize: '16px',
  lineHeight: '28px',
  fontStyle: 'normal',
  fontWeight: 500,
  color: theme.palette.text.primary,
  marginRight: theme.spacing(1),
}));

export const TagText = styled(Box)(({ theme }) => ({
  ...theme.typography.h6,
  fontSize: 14,
  color: theme.palette.text.primary,
  borderRadius: 50,
  border: `1px solid ${theme.palette.border2}`,
  display: 'inline',
  padding: theme.spacing(0, 1),
}));

export const AvatarUserNameText = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 400,
  color: theme.palette.grey.common,
}));

export const InviteButton = styled(Button)({
  width: '100px',
  alignItems: 'center',
  borderRadius: '10px',
  padding: '8px 6px',
  height: '36px',
  backgroundColor: '#EAEFFF',
  color: '#2F62FD',
  textTransform: 'none',
  boxShadow: 'none',

  fontFamily: 'inherit',
  fontWeight: 400,
  lineHeight: '20px',
  fontSize: '14px',

  '&:hover': {
    boxShadow: 'none',
    backgroundColor: '#EAEFFF',
  },

  '&.MuiButtonBase-root': {
    '&.Mui-disabled': {
      width: '90px',
      // color: '#FFF',
    },
  },
});

InviteButton.defaultProps = {
  variant: 'contained',
};

export const InviteText = styled(Typography)({});

export const CrossableNameAvatarContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: theme.palette.background.card,
  gap: '1rem',
  width: '22rem',
  height: '7rem',
  borderRadius: '1rem',
}));

const getRingStyles = (
  theme,
  hovered,
  showRing,
  ringColor,
  ringSize,
  filledColor,
  ringBorderWidth,
  borderRadius,
) => {
  if (showRing) {
    return {
      border: `${
        ringBorderWidth ? parseInt(ringBorderWidth) : 2
      }px solid ${ringColor}`,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: borderRadius ?? '50%',
      width: ringSize ?? 42,
      height: ringSize ?? 42,
      transition: 'all 100ms ease-out',
      backgroundColor: hovered
        ? theme.palette.background.inverse
        : 'transparent',
    };
  } else {
    return {};
  }
};

export const AvatarRing = styled(Box)(
  ({
    theme,
    showRing,
    ringColor,
    ringSize,
    filledColor,
    ringBorderWidth,
    hovered,
    borderRadius,
  }) => ({
    ...getRingStyles(
      theme,
      hovered,
      showRing,
      ringColor ? ringColor : theme.palette.grey.common,
      ringSize,
      filledColor,
      ringBorderWidth,
      borderRadius,
    ),
  }),
);
