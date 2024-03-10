import { styled, Box, MenuItem } from '@mui/material';

export const HorizontalMenuWrap = styled(Box)(({ theme}) => ({
  width: '100%',
  display: 'flex',
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.border2}`,
  borderRadius: 20,
  padding: 10
}))
export const DropdownItemWrap = styled(MenuItem)(({ theme, inverse }) => ({
  ...theme.typography.h7,
  color: inverse ? theme.palette.text.primary : theme.palette.text.inverse,
  transition: 'transform 100ms ease-out',
  '&:hover': {
    backgroundColor: 'transparent',
    '& svg': {
      transform: 'translateY(0)',
    }
  },
  '&:active': {
    transform: 'translateY(2px)',
  },
}));