import { styled, Box } from '@mui/material';

export const TableContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  border: `1px solid ${theme.palette.divider}`,
  borderBottom: 'none',
}));

export const LoadingContainer = styled(Box)({
  width: '100%',
  height: '400px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

export const CuratorStatusChip = styled(Box)(({ theme, cursor }) => ({
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
