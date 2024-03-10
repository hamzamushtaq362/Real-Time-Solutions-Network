import { Box, styled } from '@mui/material';

export const SuggestionWrap = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(4, 0),
  borderBottom: `1px solid ${theme.palette.borderLight}`,
}));
