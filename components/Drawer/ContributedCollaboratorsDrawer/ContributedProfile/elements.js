import { Box, styled } from '@mui/material';

export const WrapContainer = styled(Box)(({ theme }) => ({
  margin: theme.spacing(5, 0),
}));

export const SubHeading = styled(Box)(({ theme, inverse }) => ({
  ...theme.typography.h6,
  color: inverse ? theme.palette.text.primary : theme.palette.text.inverse,

  '@media (max-width: 600px)': {
    marginBottom: theme.spacing(2),
  },
}));
