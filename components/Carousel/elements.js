import { Box, styled } from '@mui/material';

export const CarouselArrowsContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  bottom: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
}));
export const CarouselArrowLeft = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.background.inverse,
  boxShadow: `2px 2px 12px 0px rgba(0,0,0,0.15)`,
  borderRadius: 50,
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  left: theme.spacing(2),
  padding: theme.spacing(1.5),
  cursor: 'pointer',
  zIndex: 100,
}));

export const CarouselArrowRight = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.background.inverse,
  boxShadow: `2px 2px 12px 0px rgba(0,0,0,0.15)`,
  borderRadius: 50,
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  right: theme.spacing(2),
  padding: theme.spacing(1.5),
  cursor: 'pointer',
  zIndex: 100,
}));
export const SliderContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
}));

export const collabCarouselResponsiveRules = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3.3,
  slidesToScroll: 2,
  initialSlide: 0,
  adaptiveHeight: true,
  arrows: false,
  variableWidth: true,
  responsive: [
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
