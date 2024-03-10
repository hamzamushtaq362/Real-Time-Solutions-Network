import { styled, Box, CardMedia, Typography } from '@mui/material';

export const NFTCardContainer = styled(Box)(({ theme }) => ({
  ...theme.card,
  width: 345,
  // minHeight: "430px",
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
}));

export const NFTCardImage = styled(CardMedia)(({ theme }) => ({
  padding: theme.spacing(2),
  // width: 345-16-16,
}));

export const NFTCardCreatorContainer = styled(Box)(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  width: '100%',
  borderBottom: theme.card.border,
}));

export const NFTCardCreatorImage = styled("img")(({theme}) => ({
  borderRadius: '50%',
  padding: theme.spacing(0.5),
  border: theme.card.border,
  width: 30,
  height: 30,
}));

export const NFTCardCreatorName = styled(Typography)(({theme}) => ({
  color: theme.palette.background.inverse,
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  fontWeight: 400,
  fontSize: 20,
  display: 'flex',
  alignItems: 'center',
}));

export const NFTCardDescription = styled(Typography)(({theme}) => ({
  color: theme.palette.grey[600],
  padding: theme.spacing(2),
  fontWeight: 400,
  fontSize: 14,
  borderBottom: theme.card.border,
  width: '100%'
}));

export const NFTCardLastSoldContainer = styled(Box)(({theme}) => ({
  padding: theme.spacing(2),
  fontWeight: 400,
  fontSize: 14,
  width: '100%'
}));

export const NFTCardLastSoldText = styled(Typography)(({theme}) => ({
  color: theme.palette.grey[600],
  fontWeight: 400,
  fontSize: 12,
  display: 'flex',
  alignItems: 'center'
}));

export const NFTCardLastSoldPrice = styled(Typography)(({theme}) => ({
  color: theme.palette.background.inverse,
  fontWeight: 400,
  fontSize: 24,
  display: 'flex',
  alignItems: 'center',
  paddingBottom: theme.spacing(2),
  paddingTop: theme.spacing(0.5),
}));

export const NFTCardBuyerContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  width: '100%',
}));

export const NFTCardBuyerImage = styled("img")(({theme}) => ({
  borderRadius: '50%',
  padding: theme.spacing(0.5),
  border: theme.card.border,
  width: 30,
  height: 30,
  marginRight: theme.spacing(1)
}));