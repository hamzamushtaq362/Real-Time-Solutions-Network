import { Box, Typography, styled } from '@mui/material';

export const HeaderTileContainer = styled(Box)({});

export const HeaderTileLeftName = styled(Typography)(({ theme }) => ({
  ...theme.typography.h5,
  color: theme.palette.text.primary,
}));

export const HeaderTileLeftSubName = styled(Typography)(({ theme }) => ({
  ...theme.typography.body4,
  color: theme.palette.grey.common,
}));
