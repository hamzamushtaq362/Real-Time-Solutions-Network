import { Box, Dialog as MuiDialog, styled, Typography } from '@mui/material';
import { TextField } from '~/components';

export const Dialog = styled(MuiDialog)(({ theme, width, height, maxHeight, borderRadius }) => ({
  '& .MuiPaper-root': {
    width: width ? width : '600px',
    height: height,
    borderRadius: borderRadius ?? theme.spacing(3),
    maxHeight: maxHeight ?? '96vh',

    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#D3D3D3',
      border: '4px solid transparent',
      borderRadius: '8px',
      backgroundClip: 'padding-box',
    },

    '&::-webkit-scrollbar': {
      width: 0,
    },
  },
}));

Dialog.defaultProps = {
  maxWidth: 'xl',
};

export const DialogHeaderText = styled(Typography)(({ theme }) => ({
  color: 'rgba(248, 244, 244, 0.60)',
  fontFamily: 'SF Pro Display, Inter',
  fontSize: '14px',
  fontStyle: 'normal',
  fontWeight: 300,
  lineHeight: '14.12px',
  letterSpacing: '-0.16px',
  marginTop: theme.spacing(1)
}));

export const AuthLabel = styled(Typography)(({ theme }) => ({
  color: 'rgba(255, 255, 255, 0.60)',
  fontFamily: 'SF Pro Display, Inter',
  fontSize: '18px',
  fontWeight: 400,
  lineHeight: '36.4px',
  letterSpacing: '-0.28px',
  marginBottom: 0
}));

export const LabelWrap = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
}))

export const DialogSubHeaderText = styled(Typography)(
  ({ width, textAlign, fontSize, color, cursor, theme }) => ({
    width: width ? width : '',
    textAlign: textAlign ? textAlign : '',
    ...theme.typography.body4,
    fontSize: fontSize ? fontSize : '16px',
    color: color ? color : theme.palette.grey.common,
    cursor: cursor ? cursor : '',
  }),
);

export const LogoText = styled(Box)(({ theme }) => ({
  color: '#FFF',
  lineHeight: '32.41px',
  letterSpacing: '-7%',
  fontFamily: theme.typography.fontFamilyFreight,
  width: 'fit-content',
  zIndex: 1,
  fontSize: 32,
  fontWeight: 400,
}));

export const SignupEmailInput = styled(TextField)(({ theme, height }) => ({
  borderRadius: 11,
    '& .MuiOutlinedInput-root': {
      ...theme.typography.h6,
      borderRadius: 11,
      border: '1px solid rgba(241, 241, 241, 0.15)',
      padding: theme.spacing(1, 2),
      position: 'relative',
      color: '#FFF',
      height: height ? height : 40,
      transition: 'borderColor 0.2s ease-in-out',
      background: '#2C2C2C',
      '&:hover': {
        border: '1.2px solid rgba(241, 241, 241, 0.35)',
      },
      '&.Mui-focused': {
        border: '1.5px solid rgba(241, 241, 241, 0.66)',
      },
    },
    '& .MuiOutlinedInput-root.Mui-error': {
      borderColor: theme.palette.snackbar.error.background,
    },
    '& .MuiFormHelperText-root': {
      ...theme.typography.h9,
      marginTop: 8,
      marginLeft: 4,
      color: theme.palette.snackbar.error.background,
    },
  }),
);
