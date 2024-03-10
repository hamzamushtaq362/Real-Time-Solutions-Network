import { styled, Box } from '@mui/material';

export const NavigateBackContainer = styled(Box)(({ theme }) => ({
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  width: 'fit-content',
  marginBottom: theme.spacing(2),
}));

export const BackText = styled(Box)(({ theme }) => ({
  ...theme.typography.h11,
  color: theme.palette.text.label,
  fontSize: 18,
  lineHeight: '130%',
  letterSpacing: '-0.01em',
  marginLeft: theme.spacing(1),
}));
