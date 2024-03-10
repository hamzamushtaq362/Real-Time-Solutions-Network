import { Box, styled, Typography } from '@mui/material';

export const CollabTileContainer = styled(Box)(
  ({ theme, hovered, isDashboardCard, draft, windowWidth }) =>
    () => ({
      ...theme.card,
      width: 340,
      height: 454,
      padding: theme.spacing(1.5, 2.5),
      paddingTop: theme.spacing(3),
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      transition: 'background-color 100ms ease-out',
      backgroundColor: hovered
        ? theme.palette.background.cardHover
        : isDashboardCard
        ? theme.palette.background.paperLanding
        : theme.palette.background.card,
      border: `${draft ? '3px dotted' : '1px solid'} ${
        hovered ? theme.palette.cardBorderHover : theme.palette.cardBorder
      }`,

      '& #icon-button-hover': {
        display: 'none',
      },
      '&:hover': {
        '& #icon-button-hover': {
          display: 'block',
        },
      },
      '@media (max-width: 1290px)': {
        width: 288,
      },
      '@media (max-width: 420px)': {
        width: `${windowWidth - 92}px`,
      },
    }),
);

export const CollabTitleRow = styled(Box)(
  ({ isDashboardCard, theme, marginBottom }) => ({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: isDashboardCard ? 100 : 170,
    marginBottom: marginBottom ? marginBottom : theme.spacing(4),

    '@media (max-width: 1290px)': {
      width: '94%',
    },
    '@media (max-width: 420px)': {},
  }),
);

export const CollabHeader = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  '@media (max-width: 500px)': {},
}));

export const CardHeading = styled(Box)(({ theme }) => ({
  ...theme.typography.h6,
  color: theme.palette.text.secondary,
  fontSize: 14,
  textTransform: 'lowercase',
  display: 'flex',
  alignItems: 'center',

  '@media (max-width: 500px)': {},
}));

export const CollabTitle = styled(Typography)(({ theme }) => ({
  letterSpacing: '-0.01em',
  color: theme.palette.text.primary,
  fontWeight: 400,
  fontSize: 26,
  width: '100%',
  marginTop: -5,

  '@media (max-width: 1290px)': {
    height: 100,
  },
}));

export const FlexContainer = styled(Box)({
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  flexWrap: 'wrap',
});
export const RoleText = styled(Box)(({ theme }) => ({
  ...theme.typography.h6,
  color: theme.palette.text.primary,
}));
export const DotWrap = styled(Box)(({ theme }) => ({
  ...theme.typography.h6,
  color: theme.palette.text.secondary,
  fontSize: 16,
  borderRadius: 50,
  margin: '0 4px',
}));

export const CreatorInfo = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '10px',
  borderRadius: '15px',
}));

export const CreatorInfoData = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}));

export const CreatorInfoDataContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  marginRight: '15px',
  fontSize: '12px',
  cursor: 'pointer',
}));
export const CollabMetricText = styled(Box)(({ theme }) => ({
  ...theme.typography.h6,
  fontSize: 14,
  color: theme.palette.text.primary,
  display: 'flex',
  alignItems: 'center',
}));

export const MetricLabel = styled(Box)(({ theme }) => ({
  ...theme.typography.h6,
  fontSize: 14,
  color: theme.palette.text.secondary,
  marginLeft: '2.6px',
}));

export const CreatorInfoName = styled(Box)(({ theme }) => ({
  textTransform: 'capitalize',
  fontSize: '16px',
  color: theme.palette.text.primary,
}));

export const CollabConnectionDiv = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '.5rem',
});

export const LookingForWrap = styled(Box)(
  ({ theme, isDashboardCard, height }) => ({
    marginBottom: theme.spacing(3),
    height: height ? height : isDashboardCard ? 80 : 120,
    '@media (max-width: 1290px)': {
      height: height ? height : 80,
    },
  }),
);

export const CollabTileAddPlaceholderContainer = styled(CollabTileContainer)(
  ({ minHeight, width, height }) => ({
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: minHeight ? minHeight : '458.2px',
    width,
    height
  }),
);

export const PlaceholderContentContainer = styled(Box)({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  rowGap: '20px',
});

export const PlaceholderText = styled(Typography)(({ theme }) => ({
  ...theme.typography.h6,
  color: theme.palette.text.primary,
}));

export const CollabEventCardHeading = styled(CardHeading)({
  fontWeight: 300,
  height: '20px',
});

export const CollabEventCardTitle = styled(CollabTitle)({
  fontWeight: 300,
  lineHeight: '33.8px',
  letterSpacing: '0.26px',
  marginTop: -4,
});

export const CollabEventDateText = styled(Typography)(({ theme }) => ({
  fontWeight: 300,
  fontSize: 18,
  lineHeight: '23.4px',
  letterSpacing: '-0.18px',
  color: theme.palette.text.primary,
}));

export const CollabEventMemberText = styled(Typography)(({ theme }) => ({
  fontWeight: 300,
  fontSize: 15,
  lineHeight: '18.2px',
  letterSpacing: '0.14px',
  color: theme.palette.text.primary,
}));

export const NearbyTag = styled(Box)(({ theme }) => ({
  ...theme.typography.h6,
  color: theme.palette.blue.main,
  fontSize: 13,
  borderRadius: 12,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '120px',
  height: '20px',
  backgroundColor: theme.palette.blue.blueDBDDFF,
  marginTop: '4px',
  marginLeft: '4px',
}));

export const EventsGridContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  columnGap: '20px',
  rowGap: '20px',
}));
