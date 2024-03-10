import { Box, styled, Typography } from '@mui/material';

export const FeaturedPreviewDialogContainer = styled(Box)(({ theme }) => ({
  padding: '30px',
  background: theme.palette.background.paper,
}));

export const FeaturedInPreviewTitle = styled(Box)(({ theme }) => ({
  ...theme.typography.title5,
  color: theme.palette.text.primary,
}));

export const FeaturedInLinkContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  border: `1px solid ${theme.palette.grey.normal1}`,
  borderRadius: '8px',
  padding: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

export const FeaturedInURLText = styled(Typography)(({ theme }) => ({
  ...theme.typography.subTitle5,
  color: theme.palette.grey.common,

  '&:hover': {
    color: theme.palette.blue.main,
    cursor: 'pointer',
  },
}));
