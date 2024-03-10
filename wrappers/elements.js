import { Box, styled } from '@mui/material';

export const ThemeGlobalStyleContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default || '#FFF',
  minHeight: '100vh',
}));
