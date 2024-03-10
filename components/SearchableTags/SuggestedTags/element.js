import { Box, styled, Typography } from '@mui/material';

export const SuggestedTagsListContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
});
export const SuggestedTagsContainer = styled(Box)({
  marginTop: '1rem',
});
export const SuggestedTagsLabel = styled(Typography)(({ theme }) => ({
  fontWeight: '400',
  fontSize: '1.4rem',
  color:
    theme.palette.mode === 'dark' ? theme.palette.text.primary : '#5D5D5B',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'left',
  marginBottom: '2rem',
}));
export const MaxSelected = styled(Typography)(({ theme }) => ({
  marginTop: '3rem',
  color:
    theme.palette.mode === 'dark' ? theme.palette.text.primary : '#5d5d5b',
  fontWeight: '400',
  marginBottom: '3rem',
  textAlign: 'center',
}));
