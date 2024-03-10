import { Box, styled, Typography, Avatar } from '@mui/material';

export const NFTTileContainer = styled(Box)(({ theme, hovered }) => ({
  ...theme.card,
  padding: 0,
  width: 350,
  paddingBottom: '12px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  backgroundColor: hovered
    ? theme.palette.background.cardHover
    : theme.palette.background.card,
  border: `1px solid ${
    hovered ? theme.palette.cardBorderHover : theme.palette.cardBorder
  }`,
  transition: 'all 100ms ease-out',

  '& #view-nft-hover': {
    display: 'none',
  },

  '&:hover': {
    '& #view-nft-hover': {
      display: 'block',
    },
  },
  '@media (max-width: 600px)': {
    margin: 'auto',
  },
}));

export const NFTImage = styled(Avatar)({
  width: '90%',
  height: 300,
  margin: '18px auto 0 auto',
  borderRadius: 0,
});

export const NFTDetailsContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  alignSelf: 'flex-start',
  justifySelf: 'flex-start',
  marginTop: theme.spacing(1),
  padding: theme.spacing(0, 2.3, 2, 2.3),
}));

export const NFTTitleText = styled(Typography)(({ theme }) => ({
  ...theme.typography.h6,
  color: theme.palette.text.primary,
  fontSize: '26px',
  lineHeight: '130%',
  cursor: 'pointer',
}));

export const NFTDataWrap = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
}));

export const NFTDescription = styled(Box)(({ theme }) => ({
  ...theme.typography.h6,
  color: theme.palette.text.primary,
  marginTop: theme.spacing(2),
  height: 28,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}));

export const NFTCategory = styled(Typography)(({ color, theme }) => ({
  fontSize: '14px',
  lineHeight: '20px',
  letterSpacing: '0.7px',
  fontWeight: 400,
  color,
}));

export const HeartButtonContainer = styled(Box)({
  width: '28px',
  height: '28px',
  backgroundColor: '#FFF',
  borderRadius: '7px',
  position: 'absolute',
  top: 10,
  right: 10,
  display: 'none',
});

export const HeartButtonIconContainer = styled(Box)({
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const Divider = styled(Box)({
  width: '100%',
  borderBottom: '1px solid #F2F2F2',
});

export const NoMembersText = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  lineHeight: '20px',
  color: '#808191',
}));
