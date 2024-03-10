import { styled, Box, Typography } from '@mui/material';

export const LaunchpadLandingHeaderContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(1.8, 4),
  borderBottom: `1px solid ${theme.palette.borderLight}`,
}));

export const HeaderTitle = styled(Typography)(({ theme }) => ({
  fontSize: '32px',
  fontWeight: 400,
  lineHeight: '41.6px',
  letterSpacing: '-1%',
  color: theme.palette.text.primary,

  whiteSpace: 'nowrap', // Prevent text from wrapping
}));

export const LaunchpadHeader = styled(HeaderTitle)(({ theme }) => ({
  fontWeight: 300,
}));

export const LandingCardsGrid = styled(Box)(({ theme }) => ({
  display: 'flex',
  columnGap: '20px',
  padding: '0 32px',
  flexWrap: 'wrap',
}));

export const LaunchpadCardWrap = styled(Box)(
  ({ theme, hovered, disabled }) => ({
    border: `1px solid ${
      hovered ? theme.palette.cardBorderHover : theme.palette.cardBorder
    }`,
    borderRadius: 4,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: theme.spacing(2),
    opacity: disabled ? 0.5 : 1,
    height: 170,
    maxWidth: 300,
    marginTop: 20,
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 100ms ease-out',
    background: hovered
      ? theme.palette.background.cardHover
      : theme.palette.background.card,

    '@media (min-width: 1900px)': {
      height: 222,
    },
  }),
);

export const LaunchpadCardTitle = styled(Typography)(({ theme, color }) => ({
  ...theme.typography.h6,
  fontSize: 22,
  color: color ? color : theme.palette.text.primary,
  marginTop: -4,

  '@media (max-width: 500px)': {},
}));

export const LaunchpadActionText = styled(Typography)(
  ({ theme, hovered, underlineHeight, hoverMb, disabled, color }) => ({
    ...theme.typography.h6,
    fontSize: 16,
    color: disabled
      ? theme.palette.text.label
      : color
      ? color
      : theme.palette.text.primary,
    display: 'flex',
    cursor: 'pointer',
    alignItems: 'center',
    position: 'relative',
    width: 'max-content',

    '&::after': {
      content: "''",
      position: 'absolute',
      zIndex: 1,
      left: hovered ? 0 : 'unset',
      right: hovered ? 'auto' : 0,
      width: hovered ? '100%' : 0,
      bottom: hoverMb ?? -5,
      backgroundColor: theme.palette.text.primary,
      height: disabled ? 0 : underlineHeight ?? 1,
      transitionProperty: 'width',
      transitionDuration: '50ms',
      transitionTimingFunction: 'ease-out',
    },
    '&:hover::after, &:focus::after, &:active::after': {
      left: 0,
      right: 'auto',
      width: '100%',
    },
  }),
);

export const ActionIconWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 40,
  height: 40,
  borderRadius: 20,
  backgroundColor: theme.palette.grey.greyD3,
  marginRight: theme.spacing(2),
}));

export const DividingHeaderRowContainer = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  padding: '0 32px',
  marginBottom: -10,
  marginTop: 10,
}));

export const MidlineDivider = styled(Box)(({ theme }) => ({
  width: '100%',
  border: `0.5px solid ${theme.palette.borderLight}`,
  margin: '10px',
  marginTop: '16px',
}));

export const MissionsGrid = styled(Box)(({ theme }) => ({
  display: 'flex',
  columnGap: '20px',
  padding: '0 32px',
  flexWrap: 'wrap',
}));

export const SpinnerContainer = styled(Box)(() => ({
  width: '100%',
  height: '80vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));
