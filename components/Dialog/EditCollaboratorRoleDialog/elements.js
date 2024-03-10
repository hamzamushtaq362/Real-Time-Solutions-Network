import { Typography, styled } from '@mui/material';

export const DialogHeader = styled(Typography)(({ theme }) => ({
  ...theme.typography.h5,
  color: theme.palette.text.primary,
}));

export const AvatarHeaderText = styled(Typography)(({ color, theme }) => ({
  ...theme.typography.body4,
  color: color ? color : theme.palette.grey.normal6,
}));

export const DetailsLabelKey = styled(Typography)(({ theme }) => ({
  ...theme.typography.body8,
  color: theme.palette.grey.common,
}));

export const DetailsLabelValue = styled(Typography)(({ theme }) => ({
  ...theme.typography.h10,
  color: theme.palette.text.primary,
}));
