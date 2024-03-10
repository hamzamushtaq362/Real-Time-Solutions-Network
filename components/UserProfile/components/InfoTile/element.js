import { Box, styled, Typography } from '@mui/material';

export const InfoTile1Container = styled(Box)({
  margin: '2rem 0',
});

export const InfoTile1InfoText = styled(Typography)(({ theme }) => ({
  fontStyle: 'normal',
  fontWeight: '400',
  fontSize: '1.6rem',
  lineHeight: '22px',
  color: theme.palette.grey.common, //#808191,
}));

export const InfoTile4Container = styled(Box)({
  marginBottom: '3rem',
});

export const InfoTile4Title = styled(Typography)(({ theme }) => ({
  fontStyle: 'normal',
  fontWeight: '500',
  fontSize: '1.7rem',
  lineHeight: '20px',
  marginBottom: '1.2rem',
  color:
    theme.palette.mode === 'dark' ? theme.palette.text.primary : '#2A2C33',
}));

export const InfoTile4InfoContainer = styled(Box)({
  display: 'flex',
  'flex-wrap': 'wrap',
});
