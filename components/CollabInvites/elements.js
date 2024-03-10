import { Box, Typography, styled } from '@mui/material';

export const InvitationsContainer = styled(Box)(({ padding }) => ({
  width: '100%',
  padding: padding ? padding : '0 50px',
}));
export const InvitationsGridContainer = styled(Box)({
  width: '100%',
  display: 'grid',
  gridTemplateColumns: ' repeat(auto-fill, minmax(275px, 1fr))',
  gridGap: '20px',
  justifyContent: 'space-between',
});

export const InvitesTitle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subTitle2,
  color: theme.palette.text.primary,
}));
