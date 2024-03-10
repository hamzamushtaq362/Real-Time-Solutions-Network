import { styled, Typography } from '@mui/material';

export const TagsLabel = styled(Typography)(({ theme }) => ({
  'margin-bottom': '1rem',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'left',
  ...theme.typography.body5,
  color: theme.palette.text.primary,
}));
