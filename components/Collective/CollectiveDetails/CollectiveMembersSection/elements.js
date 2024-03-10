import { Box, styled } from '@mui/material';

export const CollectiveMembersGrid = styled(Box)({
  display: 'grid',
  'grid-template-columns': 'repeat(auto-fit, minmax(300px, 1fr))',
});
