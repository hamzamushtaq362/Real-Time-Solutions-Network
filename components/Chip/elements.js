import { styled, Chip, Box } from '@mui/material';

export const StyledChip = styled(Chip)(({ theme, Default }) => ({
  borderRadius: 100,
  color: 'rgba(38, 38, 38, 1)',
  backgroundColor: Default
    ? theme.palette.background.cardHover
    : 'rgb(241 235 235)',
  padding: theme.spacing(2, 1),
  marginRight: '10px',
  border: 'none',
  '& .MuiChip-label': {
    fontFamily: 'SF Pro Text, sans-serif',
    fontSize: 15,
    letterSpacing: '0.02em',
  },
  '& .MuiChip-deleteIcon': {
    width: 0,
    transition: 'all 0.25s ease-in-out',
  },
  '&:hover .MuiChip-deleteIcon': {
    width: 20,
  },
}));

export const SuggestedKeywordsHeader = styled(Box)(({ theme }) => ({
  ...theme.typography.h7,
  color: theme.palette.text.primary,
}));
