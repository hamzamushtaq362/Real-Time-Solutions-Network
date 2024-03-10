import { styled, Box, Typography } from '@mui/material';

export const MissionCardWrap = styled(Box)(({ theme, hovered }) => ({
  border: `1px solid ${theme.palette.background.inverse}`,
  borderRadius: 4,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: theme.spacing(2),
  height: 170,
  maxWidth: 300,
  marginTop: 20,
  cursor: 'pointer',
  transition: 'all 100ms ease-out',
  background: hovered
    ? theme.palette.background.cardHover
    : theme.palette.background.card,

  '@media (min-width: 1900px)': {
    height: 222,
  },
}));

export const MissionTitle = styled(Typography)(({ theme, color }) => ({
  ...theme.typography.h6,
  fontSize: 22,
  color: color ? color : theme.palette.text.primary,
  marginTop: -4,
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis', // Display ellipsis (...) for overflow text
}));

export const IconWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 40,
  height: 40,
  borderRadius: 20,
  backgroundColor: theme.palette.grey.greyD3,
  marginRight: theme.spacing(2),
}));
