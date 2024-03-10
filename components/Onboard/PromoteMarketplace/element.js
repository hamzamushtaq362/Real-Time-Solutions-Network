import { Box, IconButton, styled } from '@mui/material';

export const OnBoardRightMarketplaceContainer = styled(Box)({
  width: '90%',
  margin: 'auto',
});

export const OnBoardRightMarketplaceTitleContainer = styled(Box)(
  ({ theme }) => ({
    ...theme.typography.h4,
    textAlign: 'center',
    color: theme.palette.text.primary,
  }),
);

export const OnBoardRightMarketplacePlusContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  marginTop: '1rem',
});
export const OnBoardRightMarketplacePlus = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.background.inverse,
  '&:hover': {
    backgroundColor: theme.palette.background.inverse,
  },
}));

export const OnBoardRightMarketplaceButtonContainer = styled(Box)({
  marginTop: '4rem',
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  columnGap: '30px',
});
export const OnBoardRightMarketplaceSkipButton = styled('button')(
  ({ theme }) => ({
    width: '15rem',
    padding: '1rem',
    height: '38px',
    marginTop: '1rem',
    marginBottom: '2rem',
    fontSize: '1.4rem',
    borderRadius: '2.5rem',
    border: `0.15rem solid ${theme.palette.background.borderSecondary}`,
    textAlign: 'center',
    backgroundColor: theme.palette.background.default,
    color: theme.palette.background.inverse,
    fontWeight: '700',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    '&: hover': {
      backgroundColor: theme.palette.grey.normal2,
    },
  }),
);
