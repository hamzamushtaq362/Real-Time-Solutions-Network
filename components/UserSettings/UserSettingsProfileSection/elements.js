import { styled, Box, Avatar, Typography } from '@mui/material';

export const ProfileContentContainer = styled(Box)({
  width: '100%',
  padding: '2rem',
});

export const ProfilePhotoContainer = styled(Box)(({ theme }) => ({
  width: '110px',
  height: '110px',
  borderRadius: '50%',
  border: `1px solid ${theme.palette.borderLight}`,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  cursor: 'pointer',
}));

export const ProfilePhotoImage = styled(Avatar)({
  width: '88px',
  height: '88px',
  borderRadius: '50%',
});

export const AchievementsMainContainer = styled(Box)({
  width: '100%',
  flex: 4,
  display: 'flex',
  flexDirection: 'column',
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
export const LinkText = styled(Box)(({ theme, width }) => ({
  ...theme.typography.h6,
  color: theme.palette.text.primary,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  width: width ?? 'fit-content',
  backgroundColor: theme.palette.radio.boxShadow10,
  padding: '4px 12px',
  borderRadius: '24px',
  '& span': {
    width: 0,
    transition: 'all 150ms ease-in-out',
    opacity: 0
  },
  '&:hover span': {
    width: 10,
    opacity: 1,
    marginLeft: 6
  }
}));
