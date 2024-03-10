import { styled, Box } from '@mui/material';
import ArrowRightUpIcon from 'components/Icons/ArrowRightUpIcon';

export const InfoValue = styled(Box)(({ theme }) => ({
  fontSize: 16,
  lineHeight: '18.2px',
  letterSpacing: '-0.14px',
  color: theme.palette.text.primary,
}));

export const ArrowRightUpLongIconStyled = styled(ArrowRightUpIcon)(
  ({ theme, hovered }) => ({
    transition: 'transform 0.5s cubic-bezier(.4,.4,0,1)',
    transform: hovered ? 'rotate(45deg)' : 'rotate(0deg)',
  }),
);
