import { styled, Box, Typography } from '@mui/material';

export const DisconnectSocialAccountDialogContainer = styled(Box)(
  ({ theme }) => ({
    padding: '2rem',
    textAlign: 'center',
    background: theme.palette.white.main,
  }),
);

export const DisconnectDiscordHeader = styled(Typography)(({ theme }) => ({
  ...theme.typography.h4,
  color: theme.palette.black.main,
  marginBottom: '1rem',
}));

export const DisconnectDiscordLabel = styled(Typography)(({ theme }) => ({
  ...theme.typography.body4,
  color: theme.palette.black.main,
}));
