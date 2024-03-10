import { Box, styled } from '@mui/material';
import ArrowRightUpIcon from 'components/Icons/ArrowRightUpIcon';
import PlusIcon from 'components/Icons/PlusIcon';

export const FlexBox = styled(Box)(({ theme, alignItems, justifyContent }) => ({
  display: 'flex',
  alignItems: alignItems ?? 'center',
  justifyContent: justifyContent ?? 'flex-start',
}));
export const GridContainer = styled(Box)(({ theme, gap }) => ({
  display: 'grid',
  gap: theme.spacing(gap ? gap : 2.5),
  gridAutoRows: 'minmax(0px, 1fr)',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', // This will make each column take up equal width
}));

export const EventsGridContainer = styled(GridContainer)({
  gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))',
});

export const ArrowRightUpLongIconStyled = styled(ArrowRightUpIcon)(
  ({ hovered }) => ({
    transition: 'transform 150ms cubic-bezier(.4,.4,0,1)',
    transform: hovered ? 'rotate(45deg)' : 'rotate(0deg)',
  }),
);
export const PlusIconStyled = styled(PlusIcon)(({ hovered }) => ({
  transition: 'all 0.25s',
  opacity: hovered ? 1 : 0,
}));
export const CounterWrap = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(1),
  right: theme.spacing(1),
}));

export const CounterText = styled(Box)(({ theme, error }) => ({
  ...theme.typography.h8,
  color: error
    ? theme.palette.snackbar.error.background
    : theme.palette.text.primary,
}));
