import { Box, Typography, styled } from '@mui/material';

export const PublicNavbarContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: '14px 16px',
  borderBottom: `1px solid ${theme.palette.borderLight}`,
  display: 'flex',
  justifyContent: 'space-between',
}));

export const ConsoleText = styled(Typography)(({ theme }) => ({
  fontSize: '22px',
  fontWeight: 500,
  lineHeight: '26px',
  color: theme.palette.text.brand,
}));

export const BrandContentContainer = styled(Box)({
  display: 'flex',
  columnGap: '6px',
  marginTop: '4px',
  alignItems: 'center',
});
