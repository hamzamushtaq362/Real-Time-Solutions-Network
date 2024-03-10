import { styled, Box } from '@mui/material';

export const ProgressInactiveBar = styled(Box)(({ theme }) => ({
  width: '108px',
  height: '12px',
  minHeight: '12px',
  borderRadius: '20px',
  backgroundColor: theme.palette.background.activeSecondary,
}));

export const ProgressActiveBar = styled(Box)(({ theme }) => ({
  width: '192px',
  height: '12px',
  minHeight: '12px',
  borderRadius: '20px',
  backgroundColor: theme.palette.blue.main,
}));
