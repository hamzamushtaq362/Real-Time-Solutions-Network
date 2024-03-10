import { styled, Box } from '@mui/material';

export const ActionChipItemContainer = styled(Box)(
  ({ theme, hovered, disabled }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: '4px 8px',
    borderRadius: '10px',
    columnGap: '3px',
    opacity: disabled ? 0.5 : 1,

    background: hovered
      ? theme.palette.background.cardHover
      : theme.palette.background.card,
    cursor: disabled ? 'not-allowed' : 'pointer',
  }),
);

export const ActionChipItemText = styled(Box)(({ theme }) => ({
  fontSize: '12px',
  fontWeight: '500',
  lineHeight: '16px',
  letterSpacing: '0.4px',
  color: theme.palette.text.primary,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: '100%',
}));
