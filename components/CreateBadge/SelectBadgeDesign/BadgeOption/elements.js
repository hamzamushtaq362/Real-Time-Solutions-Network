import { styled, Box, Typography } from '@mui/material';

export const SelectBadgeDesignContainer = styled(Box)(() => ({
  display: 'flex',
  gap: '5rem',
  alignItems: 'center',
}));

export const SelectBadgeDesignSubHeader = styled(Typography)(({ theme }) => ({
  fontSize: '1.2rem',
  color: theme.palette.text.label,
}));

export const SelectBadgeOptionHeader = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 400,
  fontSize: 26,
}));

export const SelectedBadgeOptionFlexBox = styled(Box)(() => ({
  display: 'flex',
  gap: '1rem',
  flexDirection: 'column',
  width: '15rem',
}));

export const InformationDescription = styled(Box)(({ theme, type, color }) => ({
  ...theme.typography.h9,
  color: color
    ? color
    : type === 'error'
    ? theme.palette.red.main
    : theme.palette.text.label,
}));
