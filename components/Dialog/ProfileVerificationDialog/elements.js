import { Box, Typography, styled } from '@mui/material';

export const ProfileVerificationContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: '20px 120px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.palette.background.paper,

  '@media (max-width: 900px)': {
    padding: '20px',
  },
}));

export const ProfileVerficationHeader = styled(Typography)(({ theme }) => ({
  ...theme.typography.title1,
  color: theme.palette.text.primary,
}));

export const ProfileVerificationSubHeader = styled(Typography)(({ theme }) => ({
  ...theme.typography.h6,
  lineHeight: '28px',
  fontWeight: 400,
  color: theme.palette.grey.common,
  width: '70%',

  '@media (max-width: 900px)': {
    width: '90%',
  },
}));

export const SectionHeader = styled(Typography)(({ theme }) => ({
  ...theme.typography.body3,
  alignSelf: 'flex-start',
  color: theme.palette.text.primary,
}));

export const NormalText = styled(Typography)(({ theme }) => ({
  ...theme.typography.body6,
  lineHeight: '30px',
  color: theme.palette.grey.common,
}));

export const ClickHereToAddLink = styled(NormalText)(({ theme }) => ({
  cursor: 'pointer',
  color: theme.palette.blue.main,
}));
