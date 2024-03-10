import { styled, Box } from '@mui/material';

export const CollectiveTileContainer = styled(Box)(({ theme, hovered }) => ({
  ...theme.card,
  padding: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  margin: 0,
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  backgroundColor: hovered
    ? theme.palette.background.cardHover
    : theme.palette.background.card,
  border: `1px solid ${
    hovered ? theme.palette.borderLightInverse : theme.palette.borderLight
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

export const MembersWrap = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1.5, 2.3),
  display: 'flex',
  alignItems: 'center',
}));
export const HeadingWrap = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.3)
}));

export const AvatarWrap = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.border2}`,
  borderRadius: '50%',
  display: "inline-block",
  position: "relative",
  "&:not(:first-child)": {
    marginLeft: "-15px",
  }
}));

export const CollectiveDescription = styled(Box)(({ theme }) => ({
  ...theme.typography.h6,
  color: theme.palette.text.primary,
  padding: theme.spacing(1.5, 2.3),
  height: 60,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  marginBottom: 10
}));

export const SeeAllWrap = styled(Box)(({ theme, hovered }) => ({
  ...theme.typography.h6,
  color: hovered ? theme.palette.text.inverse : theme.palette.text.primary,
  borderBottom: `1px solid ${hovered ? theme.palette.text.inverse : theme.palette.text.primary}`,
  marginLeft: theme.spacing(2)
}));
