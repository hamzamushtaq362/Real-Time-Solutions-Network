import { Typography, styled, Box } from '@mui/material';
import { ScrollStyles } from '~/components';

export const MetaworldsContainer = styled(Box)({
  width: '100%',
  // display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  height: '100%',
});

export const MetaworldsTitle = styled(Typography)(({ theme }) => ({
  fontSize: '3rem',
  fontWeight: 700,
  textAlign: 'center',
  marginTop: '7rem',
  color: theme.palette.text.primary,
}));

export const MetaworldsSubTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.4rem',
  textAlign: 'center',
  color: theme.palette.text.primary,
}));

export const MetaworldsItemsContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  minHeight: '344px',
  maxHeight: '484px',
  height: '100%',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr 1fr',
  columnGap: '30px',
  rowGap: '20px',
  flexWrap: 'wrap',
  padding: '20px',
  border: `0.15rem solid ${theme.palette.background.borderSecondary}`,
  borderRadius: '8px',
  boxSizing: 'border-box',
  overflowY: 'scroll',
  ...ScrollStyles(theme),
}));
