import { styled, Box } from '@mui/material';

export const WorksGridContainer = styled(Box)(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  columnGap: '8px',
  rowGap: '8px',
}));

export const SocialHighlightTitle = styled(Box)(() => ({
  fontSize: '16px',
  fontWeight: 'bold',
  marginBottom: '10px',
}))