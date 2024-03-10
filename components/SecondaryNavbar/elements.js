import { styled, Box } from '@mui/material';

export const RightButtonText = styled(Box)(({ theme }) => ({
  ...theme.typography.body4,
  display: 'flex',
}));

export const SecondarybarHeader = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  borderBottom: `1px solid ${theme.palette.borderLight}`,
}));
