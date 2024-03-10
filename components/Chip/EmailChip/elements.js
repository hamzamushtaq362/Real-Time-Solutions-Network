import { Box, styled, Typography } from '@mui/material';

export const EmailChipContainer = styled(Box)(({ theme, marginLeft }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '.5rem',
  borderRadius: '25px',
  padding: '.5rem 1rem',
  background: theme.palette.background.default,
  margin: '.1rem',
  marginLeft: marginLeft ? marginLeft : '0',
}));

export const EmailChipOutsideContainer = styled(Box)({
  flex: 1,
  marginTop: '1rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  columnGap: '1rem',
  flexWrap: 'wrap',
});

export const EmailText = styled(Typography)(({ theme }) => ({
  ...theme.typography.h6,
  color: theme.palette.text.primary,
  fontSize: '16px',
  lineHeight: '130%',
}));

export const SentText = styled(Box)(({ theme }) => ({
  ...theme.typography.h6,
  color: theme.palette.text.inverse,
  fontSize: '20px',
  lineHeight: '130%',
}));
