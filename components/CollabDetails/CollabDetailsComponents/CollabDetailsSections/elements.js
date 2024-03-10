import { styled, Box } from '@mui/material';

export const StatusChip = styled(Box)(({ theme, cursor }) => ({
  width: '125px',
  borderRadius: '30px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '10px',
  columnGap: '5px',
  backgroundColor: theme.palette.grey.normal9,
  ...theme.typography.body4,
  cursor: cursor ? cursor : '',
}));
