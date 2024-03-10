import { styled, Box, Typography } from '@mui/material';

export const LaunchPadContentContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  // padding: theme.spacing(3, 4),
  padding: 0,
}));

export const SubHeading = styled(Typography)(({ theme }) => ({
  ...theme.typography.h3,
  color: theme.palette.text.primary,

  '@media (max-width: 600px)': {
    marginBottom: theme.spacing(2),
  },
}));
