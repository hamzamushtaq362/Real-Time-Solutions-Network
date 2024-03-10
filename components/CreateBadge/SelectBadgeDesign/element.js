import { Box, styled, Typography } from '@mui/material';

export const SelectBadgeDesignTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 400,
  fontSize: 36,
  width: '100%',
}));

export const SelectedBadgeDesignFlexBox = styled(Box)(() => ({
  display: 'flex',
  gap: '1rem',
  flexDirection: 'column',
  margin: '1rem',
}));
export const SubHeading = styled(Box)(({ theme }) => ({
  ...theme.typography.h6,
  color: theme.palette.text.primary,
}));
export const InformationDescription = styled(Box)(({ theme, type, color }) => ({
  ...theme.typography.h9,
  color: color
    ? color
    : type === 'error'
    ? theme.palette.red.main
    : theme.palette.text.label,
}));
