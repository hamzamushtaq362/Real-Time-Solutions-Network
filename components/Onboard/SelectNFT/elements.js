import { Box, styled, Typography } from '@mui/material';

export const OnBoardRightSelectNFTContainer = styled(Box)({
  textAlign: 'center',
});
export const OnBoardRightSelectNFTTitle = styled(Typography)(({ theme }) => ({
  fontSize: '3rem',
  fontWeight: '700',
  textAlign: 'center',
  marginBottom: '1rem',
  color: theme.palette.text.primary,
}));

export const OnBoardRightSelectNFTSelectAll = styled(Typography)(
  ({ theme }) => ({
    fontSize: '1.4rem',
    textAlign: 'center',
    color: theme.palette.text.primary,
  }),
);

export const OnBoardRightSelectNFTTagsContainer = styled(Box)({
  width: '100%',
  margin: 'auto',
  display: 'flex',
  flexWrap: 'wrap',
  marginTop: '3rem',
  paddingRight: '2rem',
});
export const SelectNftButtonContainer = styled(Box)({
  display: 'flex',
  columnGap: '30px',
  marginTop: '2rem',
});
