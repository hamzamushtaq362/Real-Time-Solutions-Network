import { Box, styled, Typography } from '@mui/material';

export const OnBoardRightDiscoverContainer = styled(Box)({
  width: '100%',
});
export const OnBoardRightDiscoverTitle = styled(Typography)(({ theme }) => ({
  fontSize: '3rem',
  fontWeight: '700',
  textAlign: 'center',
  marginBottom: '.3rem !important',
  color: theme.palette.text.primary,
}));
export const OnBoardRightDiscoverSelectAll = styled(Typography)(
  ({ theme }) => ({
    textAlign: 'center',
    fontSize: '1.4rem',
    color: theme.palette.text.primary,
  }),
);
export const OnBoardRightDiscoverTagsContainer = styled(Box)({
  width: '100%',
  margin: 'auto',
  display: 'flex',
  flexWrap: 'wrap',
  marginTop: '3rem',
  minHeight: '37vh',
});
