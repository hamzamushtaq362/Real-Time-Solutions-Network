import { Typography, styled } from '@mui/material';

export const CellNormalText = styled(Typography)(({ theme }) => ({
  ...theme.typography.h8,
  color: theme.palette.text.primary,
  lineHeight: '19.5px',
}));

export const MissionSubmissionHeader = styled(Typography)(({ theme }) => ({
  ...theme.typography.h4,
  color: theme.palette.text.primary,
}));

export const SubmissionsSubHeader = styled(Typography)(({ theme }) => ({
  ...theme.typography.h8,
  color: theme.palette.text.primary,
}));
