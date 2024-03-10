import { Box, styled } from '@mui/material';

export const NavButtonGroupContainer = styled(Box)(
  ({ theme, showBorderTop, showBorderBottom }) => ({
    display: 'flex',
    justifyContent: 'center',
    columnGap: '15px',
    borderTop: showBorderTop ? `1px solid ${theme.palette.borderLight}` : '',
    borderBottom: showBorderBottom
      ? `1px solid ${theme.palette.borderLight}`
      : '',
    width: '100%',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    '@media (max-width: 600px)': {
      padding: '16px',
    },
  }),
);

export const RightButtonWrap = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  width: '100%'
}));

export const RightButtonText = styled(Box)(({ theme, hovered, width }) => ({
  color: theme.palette.text.primary,
  borderBottom: `1px solid ${theme.palette.text.primary}`,
  marginRight: 4,
  display: 'flex',
  alignItems: 'center',
  width: !width ? 'unset' : (hovered ? (width + 15) : width),
  transition: 'all 50ms',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
}));

export const PlusIconWrap = styled(Box)(({ theme, hovered }) => ({
  transition: 'all 50ms',
  display: hovered ? 'block' : 'none',
  marginLeft: 4,
  color: theme.palette.text.primary
}));

export const ButtonCountBase = styled(Box)(() => ({
  borderRadius: '80px',
  padding: '3px 14px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const ButtonCountActive = styled(ButtonCountBase)(({ theme }) => ({
  border: `1px solid ${theme.palette.text.inverse}`,
  color: theme.palette.text.inverse,
}));

export const ButtonCountLite = styled(ButtonCountBase)(({ theme }) => ({
  border: `1px solid ${theme.palette.text.label}`,
  color: theme.palette.text.label,
}));
