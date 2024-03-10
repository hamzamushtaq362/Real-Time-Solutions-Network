import { Typography, styled, Box, Avatar } from '@mui/material';

export const DropzoneMainContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    rowGap: theme.spacing(1),
  },
}));

export const DragAndDropText = styled(Typography)(({ theme }) => ({
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '20px',
  color: '#2F62FD',
}));

export const DragAndDropSubText = styled(Typography)(({ theme }) => ({
  fontWeight: 400,
  fontSize: '13px',
  lineHeight: '16px',
  color: '#92929D',
}));

export const DropzoneMain = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  minHeight: '136px',
  border: `1.5px dashed ${theme.palette.borderLight}`,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  overflow: 'hidden',
  transition: 'background 0.15s ease',

  '&:hover': {
    background: theme.palette.background.inverse,
    '& svg': {
      fill: theme.palette.text.inverse,
      path: theme.palette.text.inverse,
    }
  }
}));

export const ImagePreviewContainer = styled(Avatar)(({ width, height }) => ({
  width: width ? width : 350,
  height: height ? height : 300,
  borderRadius: '0 !important',
}));

export const IconWrapper = styled(Box)(({ theme }) => ({
  position: 'absolute',
  right: 10,
  top: 10,
  zIndex: 1,
  cursor: 'pointer',
}));


ImagePreviewContainer.defaultProps = {
  variant: 'rounded',
};

export const MultipleImagesContainer = styled(Box)({
  width: '100%',
  display: 'flex',
  flexWrap: 'wrap',
  columnGap: '10px',
  rowGap: '15px',
});

export const ClearPreviewLink = styled(Typography)(({ theme }) => ({
  ...theme.typography.body5,
  color: theme.palette.blue.main,
  cursor: 'pointer',
  display: 'flex',
}));

export const InformationDescription = styled(Box)(({ theme }) => ({
  ...theme.typography.h9,
  color: theme.palette.text.label,
}));

export const UploadMediaContainer = styled(Box)(({ theme }) => ({
  width: 400,
  height: 400,
}));
export const UploadInputForm = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  border: `1px solid ${theme.palette.borderLight}`,
  width: '100%',
  height: '100%'
}));

export const UploadWrap = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}))

export const UploadContentWrap = styled(Box)(({ theme }) => ({
  cursor: 'pointer',
  opacity: 0.4,
  '&:hover': {
    opacity: 1,
  }
}))

export const LinkWrap = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}))
export const OrWrap = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}))
export const OrText = styled(Box)(({ theme }) => ({
  ...theme.typography.h9,
  color: theme.palette.text.label,
  padding: theme.spacing(0, 1.5),
}))
export const LinkInputWrap = styled(Box)(({ theme, value }) => ({
  ...theme.typography.h9,
  color: theme.palette.blue.main,
  cursor: 'pointer',
  width: value ? '85%': 'unset',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}))
export const LoadingText = styled(Box)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: '16px',
}))