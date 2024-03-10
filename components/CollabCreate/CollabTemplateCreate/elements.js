import { styled, Box } from '@mui/material';

export const ActionsContainer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export const ActionsWrap = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export const AddProjectMainHeader = styled(Box)(({ theme }) => ({
  ...theme.typography.h3,
  color: theme.palette.text.primary,
}));
