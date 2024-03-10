import { Box, styled } from '@mui/material';

export const EventsGridContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  columnGap: '20px',
  rowGap: '20px',
}));
