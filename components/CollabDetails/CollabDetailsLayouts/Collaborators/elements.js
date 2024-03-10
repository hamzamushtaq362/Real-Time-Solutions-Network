import { styled, Box } from '@mui/material';

export const CollaboratorCardContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
}));

export const EditIconContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 8,
  right: 8,
  zIndex: 2,
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
}));

export const CollaboratorTitle = styled(Box)(({ theme, hovered }) => ({
  fontSize: 22,
  lineHeight: '18.4px',
  letterSpacing: '0.01em',
  fontWeight: 400,
  marginTop: 8,
  width: 'max-content',
  color: theme.palette.text.primary,
  position: 'relative',
  '&::after': {
    content: "''",
    position: 'absolute',
    zIndex: 1,
    left: hovered ? 0 : 'unset',
    right: hovered ? 'auto' : 0,
    width: hovered ? '100%' : 0,
    bottom: -1,
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
export const CollaboratorSkill = styled(Box)(({ theme }) => ({
  fontSize: 14,
  lineHeight: '5.4px',
  letterSpacing: '0.01em',
  color: theme.palette.text.primary70,
}));

export const collabWorksResponsiveRules = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToScroll: 2,
  initialSlide: 0,
  adaptiveHeight: true,
  arrows: false,
  variableWidth: true,
};
