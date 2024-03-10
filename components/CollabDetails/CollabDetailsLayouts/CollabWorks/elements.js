import { styled, Box, Avatar, Typography } from '@mui/material';

export const CollabWorksContainer = styled(Box)({
  width: '100%',
  display: 'flex',
  columnGap: '15px',
});

export const collabWorksResponsiveRules = {
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

export const WorkText = styled(Box)(({ hovered, theme }) => ({
  fontSize: 18,
  color: theme.palette.text.primary,
  letterSpacing: '0.01em',
  fontWeight: 400,
  marginTop: 8,
  width: 'max-content',
  position: 'relative',

  '&::after': {
    content: "''",
    position: 'absolute',
    left: hovered ? 0 : 'unset',
    right: hovered ? 'auto' : 0,
    width: hovered ? '100%' : 0,
    bottom: -1,
    backgroundColor: theme.palette.text.primary,
    height: 1.5,
    transitionProperty: 'width',
    transitionDuration: '500ms',
    transitionTimingFunction: 'ease-out',
  },
}));
export const CollabWorkWrap = styled(Box)(({ theme }) => ({
  cursor: 'pointer',
}));

export const WorkImage = styled(Avatar)(({ theme }) => ({
  width: 350,
  height: 270,
}));

WorkImage.defaultProps = {
  variant: 'square',
};

export const AddWorkPlaceholderContainer = styled(Box)(
  ({ theme, hovered }) => ({
    width: 350,
    height: 300,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    backgroundColor: hovered
      ? theme.palette.background.cardHover
      : theme.palette.background.card,
    border: `1px solid ${
      hovered ? theme.palette.cardBorderHover : theme.palette.cardBorder
    }`,
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
