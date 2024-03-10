import { styled, Box, Typography } from '@mui/material';

export const BecomeCuratorContainer = styled(Box)(({ theme }) => ({
  padding: '30px',
  background: theme.palette.background.paper,
}));

export const FieldHeaderText = styled(Typography)(({ color, theme }) => ({
  ...theme.typography.body4,
  color: color ? color : theme.palette.grey.normal6,
}));

export const InterestedCollabsLabelsContainer = styled(Box)({
  width: '100%',
  display: 'flex',
  columnGap: '0',
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
  rowGap: '10px',
});

export const InfoText = styled(Box)(({ theme, color }) => ({
  ...theme.typography.body5,
  color: color,
}));

export const ButtonContainer = styled(Box)({
  display: 'flex',
  width: '100%',
  justifyContent: 'center',
});

export const DialogFullHeight = styled(Box)({
  width: '100%',
  height: '280px',
});
