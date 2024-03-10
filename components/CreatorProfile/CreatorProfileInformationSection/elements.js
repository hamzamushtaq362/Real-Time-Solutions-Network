import { Box, styled, Typography } from '@mui/material';

export const InformationSectionContainer = styled(Box)(({theme}) => ({
  width: '100%',
  display: 'flex',
  flex: 1,

  '@media (max-width: 600px)': {
    flexDirection: 'column',
  }
}));

export const InformationContainer1 = styled(Box)(({ theme }) => ({
  flex: 0.7,
  borderRight: theme.palette.borderRight,
  '@media (max-width: 600px)': {
    order: 1,
  }
}));

export const BiographyContainer = styled(Box)({
  flex: 0.4,
  padding: '24px',
});

export const BioSkillWrap = styled(Box)({
  display: 'flex',

  '@media (max-width: 600px)': {
    flexDirection: 'column',
  }
});


export const SkillsContainer = styled(Box)({
  flex: 0.6,
  padding: '24px',
});

export const AchievementsContainer = styled(Box)({
  flex: 0.4,
  padding: '24px',
});

export const FeaturedInContainer = styled(Box)({
  flex: 0.6,
  padding: '24px',
});

export const InformationContainer2 = styled(Box)(({ theme }) => ({
  flex: 0.2,
  borderLeft: `1px solid ${theme.palette.borderLight}`,
  padding: '24px',

  '@media (max-width: 600px)': {
    marginTop: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.borderLight}`,
  }
}));
export const InformationContainer3 = styled(Box)(({ theme }) => ({
  flex: 0.3,
  borderLeft: `1px solid ${theme.palette.borderLight}`,
  padding: '24px',

  '@media (max-width: 600px)': {
    marginTop: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.borderLight}`,
  }
}));

export const InformationHeader = styled(Typography)(({ theme }) => ({
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

export const InformationSubText = styled(Box)(({ theme, flex }) => ({
  ...theme.typography.subTitle5,
  fontWeight: 400,
  color: theme.palette.text.primary,
  minWidth: '120px',
  flex: flex ? flex : 1,
  display: 'flex',
  alignItems: 'center',
}));

export const FeaturedInLink = styled(Box)(({ theme }) => ({
  ...theme.typography.h9,
  color: theme.palette.grey.common,
  textAlign: 'left',
  flex: 2,
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer'
}));
export const RightLink = styled(Box)(({ theme }) => ({
  ...theme.typography.h9,
  color: theme.palette.grey.common,
  textAlign: 'left',
  flex: 2,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  cursor: 'pointer',
}));

export const InformationLabel = styled(Typography)(({ theme }) => ({
  ...theme.typography.h6,
  lineHeight: '130%',
  color: theme.palette.text.primary,
}));

export const LabelChipsContainer = styled(Box)({
  display: 'flex',
  gap: '6px',
  flexWrap: 'wrap',
});

export const LabelValueRow = styled(Box)({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
});

export const SmallLabel = styled(Typography)(({ theme, color }) => ({
  ...theme.typography.body5,
  color: color ? color : theme.palette.grey.common,
}));

export const LinkText = styled(Typography)(({ theme }) => ({
  ...theme.typography.body5,
  color: theme.palette.text.primary,
  '&:hover': {
    color: theme.palette.blue.main,
    cursor: 'pointer',
  }
}));

export const LabelBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  columnGap: '5px',
  alignItems: 'flex-start',

  '&:hover': {
    '& div, & path': {
      color: theme.palette.blue.main,
      cursor: 'pointer',
    }
  }
}));

export const PlatformsContainer = styled(Box)({
  display: 'flex',
  gap: '4px',
  flexWrap: 'wrap',
});
