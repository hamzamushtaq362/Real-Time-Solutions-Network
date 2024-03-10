import {
  Box,
  Grid,
  styled,
  Tooltip,
  Typography,
} from '@mui/material';
import { withStyles } from '@mui/styles';

export const DashboardContentContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  paddingBottom: theme.spacing(3),
  background: theme.palette.background.default,
  '@media (max-width: 420px)': {
    padding: theme.spacing(3, 1),
  },
}));

export const CollabsContentContainer = styled(Grid)(({ theme }) => ({
  width: '100%',
  '@media (max-width: 500px)': {},
}));

export const CreatorsSkeletonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  '& > div': {
    width: '100%',
  },
  '@media (max-width: 500px)': {},
}));

export const DashboardSectionContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  margin: theme.spacing(3, 0, 6, 0),

  '@media (max-width: 500px)': {},
}));

export const DashboardHeaderContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  marginBottom: '6px',

  '@media (max-width: 500px)': {},
}));

export const DashboardTitle = styled(Box)(({ theme }) => ({
  ...theme.typography.h1,
  color: theme.palette.text.primary,

  '@media (max-width: 500px)': {},
}));

export const SeeAllButton = styled(Box)(({ theme }) => ({
  ...theme.typography.h6,
  color: theme.palette.text.primary,
  border: `1px solid ${theme.palette.borderLight}`,
  padding: theme.spacing(1.2, 3),
  borderRadius: 50,
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',

  '@media (max-width: 500px)': {},
}));

export const TitleInfoText = styled(Box)(({ theme }) => ({
  ...theme.typography.h6,
  color: theme.palette.text.secondary,
  textTransform: 'uppercase',

  '@media (max-width: 500px)': {},
}));

export const ActionWrap = styled(Box)(({ theme, hovered }) => ({
  border: `1px solid ${
    hovered ? theme.palette.cardBorderHover : theme.palette.cardBorder
  }`,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: theme.spacing(2),
  height: 170,
  marginTop: 20,
  cursor: 'pointer',
  transition: 'all 100ms ease-out',
  background: hovered
    ? theme.palette.background.cardHover
    : theme.palette.background.card,

  '@media (min-width: 1900px)': {
    height: 222,
  },
}));

export const ActionTitle = styled(Box)(({ theme }) => ({
  ...theme.typography.h6,
  fontSize: 22,
  color: theme.palette.text.primary,

  '@media (max-width: 500px)': {},
}));

export const ActionText = styled(Box)(({ theme, hovered, underlineHeight, hoverMb, disabled }) => ({
  ...theme.typography.h6,
  fontSize: 16,
  color: disabled ? theme.palette.text.label : theme.palette.text.primary,
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
    right: hovered ? 'auto': 0,
    width: hovered ? '100%': 0,
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
}));

export const nftCarouselResponsiveRules = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToScroll: 2,
  initialSlide: 0,
  adaptiveHeight: true,
  arrows: false,
  variableWidth: true,
  responsive: [
    {
      breakpoint: 1400,
      settings: {
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToScroll: 1,
      },
    },
  ],
};

export const collabCarouselResponsiveRules = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToScroll: 2,
  initialSlide: 0,
  adaptiveHeight: true,
  arrows: false,
  variableWidth: true,
  responsive: [
    {
      breakpoint: 1400,
      settings: {
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToScroll: 1,
      },
    },
  ],
};

export const StyledTooltip = withStyles({
  tooltip: {
    fontSize: 12,
  },
})(Tooltip);

export const SearchCollabsWrap = styled(Box)(({ theme }) => ({
  margin: 32,
  borderRadius: 34,
  background: theme.palette.mode === 'dark' ? 'linear-gradient(90deg, #2D2D2D 0.24%, rgba(46, 44, 44, 0.66) 49.62%, rgba(11, 9, 12, 0.28) 105.83%, rgba(0, 0, 0, 0.11) 146.1%)' : 'linear-gradient(90deg, rgba(232,232,232,1) 0%, rgba(212,211,211,1) 100%)',
  padding: 40,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',

}));

export const SearchTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.mode === 'dark' ? '#B6B6B6': '#494949',
  fontSize: 34,
  lineHeight: '67.6px',
  fontWeight: 300,
}));

export const SuggestionText = styled(Box)(({ theme }) => ({
  color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.22)' : 'rgba(0, 0, 0, 0.22)',
  lineHeight: '20px',
  letterSpacing: '-0.408px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 18,
  textAlign: 'center',
  width: '100%',
  marginTop: 20,
}));

export const Suggestion = styled(Box)(({ theme }) => ({
  textDecoration: 'underline',
  marginLeft: 8
}));
