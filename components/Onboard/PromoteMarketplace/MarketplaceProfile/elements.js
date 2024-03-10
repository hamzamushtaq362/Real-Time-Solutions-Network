import { Box, Input, styled, Typography } from '@mui/material';

export const OnBoardRightMarketplaceProfileDropdown = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  marginTop: '1.5rem',
});

export const OnBoardRightMarketplaceProfileItem = styled(Box)({
  flex: '0.5',
  display: 'flex',
  flexDirection: 'row',
});
export const OnBoardRightMarketplaceProfileSelectedImage = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  flex: '0.1',
  '& img': {
    width: '2.5rem',
    height: '2.5rem',
  },
});
export const OnBoardRightMarketplaceProfileSelectContainer = styled(Box)({
  width: '100%',
});
export const OnBoardRightMarketplaceProfileInputContainer = styled(Box)({
  flex: '0.5',
  marginLeft: '1rem',
});
export const OnBoardRightMarketplaceProfileInputElement = styled(Input)({
  width: '100%',
  height: '38px',
  padding: '1.1rem',
  border: '1px solid hsl(0, 0%, 80%)',
  borderRadius: '0.3rem',
});

export const MarketPlaceItemContainer = styled(Box)({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  columnGap: '15px',
});

export const MarketPlaceText = styled(Typography)(({ theme }) => ({
  ...theme.typography.body5,
}));
