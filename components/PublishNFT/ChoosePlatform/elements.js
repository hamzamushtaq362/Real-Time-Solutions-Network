import { Box, Typography, styled } from '@mui/material';

export const ProceedButtonText = styled(Typography)(({ theme }) => ({
  color: theme.palette.white.main,
  fontSize: '15px',
  lineHeight: '24px',
}));

export const StepHeaderContainer = styled(Box)({
  width: '100%',
  display: 'flex',
  alignItems: 'flex-end',
});

export const StepHeaderText = styled(Typography)(({ theme }) => ({
  ...theme.typography.body2,
  lineHeight: '30px',
  color: theme.palette.text.primary,
}));
export const PlatformWrap = styled(Box)(({ theme, active }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1),
  border: `1px solid ${theme.palette.borderLight}`,
  borderRadius: 100,
  width: 220,
  cursor: 'pointer',
  transition: 'all 100ms ease-out',
  backgroundColor: active ? theme.palette.background.inverse : theme.palette.background.paper,
}));

export const PlatformImage = styled('img')(({ theme, active }) => ({
  width: 40,
  height: 40,
  borderRadius: '50%',
  backgroundColor: active ? theme.palette.background.inverse : theme.palette.background.paper,
}));
export const PlatformText = styled(Typography)(({ theme, active }) => ({
  ...theme.typography.h7,
  color: active ? theme.palette.text.inverse : theme.palette.text.primary,
  marginLeft: theme.spacing(1)
}));

