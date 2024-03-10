import { Box, Typography, styled, Autocomplete } from '@mui/material';

export const LabelContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.palette.grey.normal2,
  borderRadius: '6px',
  boxSizing: 'border-box',
  marginBottom: theme.spacing(0.5),
  padding: theme.spacing(1),
}));

export const LabelText = styled(Typography)(({ theme }) => ({
  ...theme.typography.h7,
  textAlign: 'center',
  fontWeight: 400,
  color: theme.palette.grey.normal7,
}));

export const CapsuleLabelContainer = styled(LabelContainer)(() => ({
  borderRadius: '30px',
}));

export const CapsuleLabelText = styled(Typography)(({ theme }) => ({
  ...theme.typography.body5,
  color: theme.palette.text.primary,
}));

export const BadgeLabelContainer = styled(Box)(
  ({ type, height, minWidth, theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    minWidth: minWidth ? minWidth : '',
    alignItems: 'center',
    height: height ? height : '40px',
    backgroundColor: theme.palette.background.inverseLight,
    borderRadius: '2rem',
    paddingLeft: type === 'cross-button' ? '15px' : '13px',
    paddingRight: type === 'cross-button' ? '10px' : '13px',
    boxSizing: 'border-box',
    cursor: type !== 'cross-button' ? 'pointer' : '',
    gap: '10px',

    '&:hover': {
      backgroundColor:
        type === 'cross-button'
          ? theme.palette.black.main
          : theme.palette.grey.normal2,
    },
  }),
);

export const CrossButtonLabelText = styled(Typography)(({ theme }) => ({
  ...theme.typography.h8,
  color: theme.palette.background.default,
}));

export const MiniLabelContainer = styled(Box)(({ theme }) => ({
  padding: '6px 12px',
  backgroundColor: theme.palette.grey.normal2,
  borderRadius: '10px',
  marginTop: '4px',
}));

export const MiniLabelText = styled(Typography)(({ theme }) => ({
  fontFamily: 'inherit',
  fontWeight: 400,
  fontSize: '12px',
  lineHeight: '18px',
  color: theme.palette.grey.normal7,
}));

export const StatusLabelContainer = styled(Box)(
  ({ theme, variant = 'medium' }) => ({
    border: `1px solid ${theme.palette.borderLight}`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    color: theme.palette.text.primary,
    padding: variant === 'small' ? theme.spacing(1, 1) : theme.spacing(2, 3),
  }),
);

export const StyledAutocomplete = styled(Autocomplete)(() => ({
  '& .MuiAutocomplete-noOptions': {
    fontSize: '14px !important',
  },
  '& .MuiAutocomplete-listItem .MuiAutocomplete-listItemButton:hover': {
    backgroundColor: 'rgba(0, 123, 255, 0.1) !important',
  },
}));
