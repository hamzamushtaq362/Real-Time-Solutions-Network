import { styled, Typography } from '@mui/material';

export const LinkLabelValue = styled(Typography)(({ theme }) => ({
  ...theme.typography.h9,
  color: theme.palette.text.primary,

  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  columnGap: 1,
}));
