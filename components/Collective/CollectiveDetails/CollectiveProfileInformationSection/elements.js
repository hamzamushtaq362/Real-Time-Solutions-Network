import { Box, styled, Typography } from '@mui/material';

export const InformationSectionContainer = styled(Box)(() => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexGrow: 1
}));

export const InformationLeftContainer = styled(Box)(({ theme }) => ({
  flex: 0.7,
  borderRight: theme.palette.borderRight,
  // display: 'flex',
}));

export const BiographyContainer = styled(Box)({
  flex: 1,
  padding: '24px',
});

export const AchievementsContainer = styled(Box)({
  flex: 0.4,
  padding: '24px',
});

export const FeaturedInContainer = styled(Box)(({ padding }) => ({
  flex: 0.6,
  padding: padding ?? '24px',
}));

export const InformationRightContainer = styled(Box)(({ theme }) => ({
  flex: 0.3,
  borderLeft: `1px solid ${theme.palette.borderLight}`,
  padding: '24px',
}));

export const InformationHeader = styled(Typography)(({ theme }) => ({
  ...theme.typography.subTitle1,
  fontWeight: 400,
  lineHeight: '130%',
  color: theme.palette.text.primary,
  letterSpacing: '-0.01em',
}));

export const InformationPara = styled(Typography)(({ theme }) => ({
  ...theme.typography.h8,
  color: theme.palette.text.primary,
  whiteSpace: 'pre-wrap'
}));
export const InformationLabel = styled(Typography)(({ theme }) => ({
  ...theme.typography.h6,
  lineHeight: '130%',
  color: theme.palette.text.primary,
}));
export const LabelValueRow = styled(Box)({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
});

export const SmallLabel = styled(Typography)(({ theme, color }) => ({
  ...theme.typography.body5,
  color: color ? color : theme.palette.grey.common,
}));

export const LabelBox = styled(Box)({
  display: 'flex',
  columnGap: '5px',
  alignItems: 'flex-start',
});

export const GroupItemsContainer = styled(Box)({
  display: 'flex',
  gap: '4px',
  flexWrap: 'wrap',
});

export const SmallLink = styled(Typography)(({ theme }) => ({
  ...theme.typography.h9,
  color: theme.palette.text.primary,
  textDecoration: 'underline',
  lineHeight: '130%',
  cursor: 'pointer',
}));
