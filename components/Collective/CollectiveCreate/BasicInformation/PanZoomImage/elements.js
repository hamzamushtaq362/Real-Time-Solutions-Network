import { styled, Box, Avatar } from '@mui/material';

export const ImagePreviewContainer = styled(Avatar)({
  width: '100%',
  height: 200,
  borderRadius: '0 !important',
});

ImagePreviewContainer.defaultProps = {
  variant: 'rounded',
};

export const SaveWrap = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: `1px solid ${theme.palette.borderLight}`,
  padding: 16
}));

export const HeaderText = styled(Box)(({ theme }) => ({
  fontSize: 20,
  marginLeft: 64,
  fontWeight: 600
}));

export const DialogContentWrap = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '100%',
}));

export const CropperRectangle = styled(Box)(({ theme, cropperWidth }) => ({
  border: '4px solid rgb(29, 155, 240)',
  width: cropperWidth,
  height: 190,
  position: 'absolute',
  top: '30%',
  pointerEvents: 'none'
}))