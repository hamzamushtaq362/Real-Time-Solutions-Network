import { Box, styled, Typography } from '@mui/material';

export const PlatformCardContainer = styled(Box)(({ theme }) => ({
  padding: '2rem',
  borderRadius: '1.2rem',
  border: `solid 0.15rem ${theme.palette.background.border}`,
  'background-color': theme.palette.background.paper,
  'min-width': '35rem',
}));

export const PlatformCardTitle = styled(Typography)(({ theme }) => ({
  ...theme.typography.h6,
  marginBottom: '1.2rem',
  color:
    theme.palette.mode === 'dark' ? theme.palette.text.primary : '#2a2c33',
}));

export const PlatformSocialContainer = styled(Box)({
  display: 'flex',

  '& img': {
    width: '3rem',
    height: '3rem',
    marginRight: '2rem',
  },
});

export const PlatformMarketPlaceContainer = styled(Box)({
  display: 'flex',

  '& img': {
    width: '2.5rem',
    height: '2.5rem',
    marginRight: '2rem',
  },
});

export const PlatformBottomContainer = styled(Box)({
  justifySelf: 'right',
});
export const PlatformCenterLine = styled(Box)(({ theme }) => ({
  height: '1px',
  margin: '24px 0',
  'background-color': theme.palette.background.border,
}));

export const PlatformRightMarketplaceIcons = styled(Box)({
  display: 'flex',
  alignItems: 'center',
});
