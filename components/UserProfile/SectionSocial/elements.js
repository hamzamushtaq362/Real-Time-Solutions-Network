import { Typography, styled, Box } from '@mui/material';

export const CountLabel = styled(Typography)(({ theme }) => ({
  ...theme.typography.body8,

  color: theme.palette.grey.commonText,
  marginLeft: '5px',
}));

export const InfoDataContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  marginRight: '15px',
  fontSize: '12px',
  cursor: 'pointer',
}));

export const SectionSocialContainer = styled(Box)({
  display: 'grid',
  'grid-template-columns': 'repeat(auto-fit, minmax(35rem, 1fr))',
});

export const SectionBanneInfoContainer = styled(Box)({
  display: 'grid',
  'grid-template-columns': 'minmax(60rem, 70%) 1fr',
  margin: '9rem 0 2rem 0',
});
export const SectionBanneInfoLeftName = styled(Typography)(({ theme }) => ({
  ...theme.typography.h5,
  'margin-bottom': '1rem',
  'text-transform': 'capitalize',
  color: theme.palette.text.primary,
}));

export const SectionBanneInfoLeftAddress = styled(Box)({
  display: 'flex',
  'align-items': 'center',
  'margin-right': '1rem',
  'min-width': '60rem',
  'font-size': '1rem',
});

export const SectionSocialRightContainer = styled(Box)({
  display: 'flex',
  'align-items': 'center',
  'justify-self': 'right',
});
