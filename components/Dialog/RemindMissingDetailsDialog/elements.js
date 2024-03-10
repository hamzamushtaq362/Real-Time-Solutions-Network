import { Box, Typography, styled } from '@mui/material';

export const RemindDetailsContainer = styled(Box)(({ theme }) => ({
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

export const RemindDetailsHeader = styled(Typography)(({ theme }) => ({
  ...theme.typography.title1,
  color: theme.palette.text.primary,
}));

export const RemindDetailsSubHeader = styled(Typography)(({ theme }) => ({
  ...theme.typography.h6,
  lineHeight: '28px',
  fontWeight: 400,
  color: theme.palette.grey.common,
  width: '70%',
  fontSize: '16px',

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
export const DialogList = styled('ul')(({theme}) => ({
  color: theme.palette.grey.common,
  listStyleType: 'upper-roman',
  width: '62%',

  '@media (max-width: 900px)': {
    width: '90%',
  },
}));
export const DialogListItem = styled('li')(({theme}) => ({
  color: theme.palette.grey.common,
  "&::marker": {
    fontSize: '14px'
  }
}))
export const ClickHereToAddLink = styled(NormalText)(({ theme }) => ({
  cursor: 'pointer',
  color: theme.palette.blue.main,
}));
