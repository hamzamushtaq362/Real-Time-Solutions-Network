import { Box, styled } from '@mui/material';

export const SelectedTagContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  padding: '0.5rem 1rem',
  backgroundColor: '#f5f9ff',
  marginRight: '1rem',
  color: '#0144e4',
  fontSize: '1.4rem',
  fontWeight: '500',
  marginBottom: '1rem',
  borderRadius: '11px',
}));

export const SelectedTagDelete = styled(Box)({
  backgroundColor: '#e6effd',
  borderRadius: '100%',
  width: '2.5rem',
  height: '2.5rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#6941c6',
  cursor: 'pointer',
  textAlign: 'center',
  marginLeft: '1rem',
  '&:hover': {
    backgroundColor: '#dbe9ff',
  },
});
