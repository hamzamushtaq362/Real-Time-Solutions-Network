import { Typography, styled, Box, Avatar } from '@mui/material';

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
}));

export const ImagePreviewContainer = styled(Avatar)({
  width: '100%',
  height: 200,
  borderRadius: '0 !important',
});

ImagePreviewContainer.defaultProps = {
  variant: 'rounded',
};

export const ClearPreviewLink = styled(Typography)(({ theme }) => ({
  ...theme.typography.body5,
  color: theme.palette.blue.main,
  cursor: 'pointer',
}));
