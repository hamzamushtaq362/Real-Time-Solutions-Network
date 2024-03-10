import { Box, Typography, styled } from '@mui/material';

export const PublicInfoBoxContainer = styled(Box)(
  ({ maxWidth, theme, backgroundColor, marginTop }) => ({
    marginTop: marginTop ? marginTop : '20px',
    minWidth: '580px',
    maxWidth: maxWidth,
    padding: '16px 18px',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: backgroundColor
      ? backgroundColor
      : theme.palette.blue.active,

    '@media (max-width: 900px)': {
      minWidth: '400px',
    },
  }),
);

export const InfoText = styled(Typography)(({ color, theme }) => ({
  ...theme.typography.h7,
  color: color ? color : theme.palette.blue.main,

  '@media (max-width: 900px)': {
    fontSize: '12px',
  },
}));
