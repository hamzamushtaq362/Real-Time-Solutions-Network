import { Box, styled, Typography } from '@mui/material';

export const CollabsExploreContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(5),
  padding: theme.spacing(3, 4),
  overflowX: 'hidden',
}));

export const CollabsExploreContainerGrid = styled(Box)({
  width: '100%',
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
  gridGap: '3rem',
  justifyContent: 'flex-start',
  padding: '0 10px',
});

export const CollabTilesContainer = styled(Box)({
  width: '100%',
  display: 'flex',
  flexWrap: 'wrap',
  columnGap: '20px !important',
  rowGap: '15px',
});

export const SectionHeaderText = styled(Typography)(({ theme }) => ({
  ...theme.typography.h5,
  color: theme.palette.text.primary,
}));

export const ExplorePageTitle = styled(Typography)(({ theme }) => ({
  ...theme.typography.h1,
  color: theme.palette.text.primary,
}));

export const ExploreTopContainer = styled(Box)({
  width: '100%',
  padding: '40px 30px 15px 30px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const TemplateEmptyState = styled(Box)({
  width: '100vw',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '60vh',
});

export const ExploreLocationHeaderContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  borderBottom: `1px solid ${theme.palette.borderLight}`,
}));

export const LocationHeaderText = styled(Typography)(({ theme }) => ({
  fontSize: '20px',
  fontWeight: 400,
  lineHeight: '41.6px',
  color: theme.palette.text.primary,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  flex: 1,

  marginTop: '1.5px',
}));
