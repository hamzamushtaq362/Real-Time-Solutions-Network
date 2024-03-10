import { Box, Typography, styled } from '@mui/material';

export const RecommendTileContainer = styled(Box)({
  display: 'flex',
  'align-items': 'flex-start',
  margin: '3rem 0',
});

export const RecommendTileLeftContainer = styled(Box)({
  'margin-right': '1.5rem',
  width: '9rem',
  height: '9rem',
  minWidth: '9rem',
  minHeight: '9rem',
  borderRadius: '50%',
});

export const RecommendTileRightName = styled(Typography)(({ theme }) => ({
  ...theme.typography.h7,
  marginBottom: '1rem',

  color: theme.palette.text.primary,
}));

export const RecommendTileRightSubName = styled(Typography)(({ theme }) => ({
  ...theme.typography.body4,
  marginBottom: '1.5rem',
  color: theme.palette.grey.common,
}));

export const RecommendTileRightDescription = styled(Typography)(
  ({ theme }) => ({
    ...theme.typography.body4,
    marginBottom: '1.5rem',
    color: theme.palette.text.primary,
  }),
);

export const RecommendTileRightDate = styled(Typography)(({ theme }) => ({
  ...theme.typography.body4,
  color: theme.palette.grey.common,
}));
