import React, { useState, useRef } from 'react';
import { ArrowLeftIcon, Dialog, PrimaryButton, Spinner } from '~/components';
import { CropperRectangle, DialogContentWrap, HeaderText, SaveWrap } from './elements';
import { useTheme, Slider, Box, Stack } from '@mui/material';
import { ZoomIn, ZoomOut } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { BASE_URL, uploadFile } from '~/apis';
import axios from 'axios';
import { useNotistack, useWindowSize } from '~/hooks';
import AvatarEditor from 'react-avatar-editor'
import { FlexBox } from 'components/common/elements';

export const CropperDialog = ({ open, toggleDialog, preview, setPreview, imageFile, setImageFile, setValue, setCoverHovered }) => {
  const { t } = useTranslation();
  const editorRef = useRef();
  const theme = useTheme();
  const [zoom, setZoom] = useState(1);
  const [saving, setSaving] = useState(false);
  const generateSnackbar = useNotistack();
  const windowSize = useWindowSize();
  const cropperWidth = windowSize.width - 200;

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editorRef.current) {
        let coverImageUrl = imageFile;
        const croppingRect = editorRef.current.getCroppingRect();
        if (typeof imageFile !== 'string') {
          const response = await uploadFile(imageFile);
          coverImageUrl = response.data.files;
          setImageFile(coverImageUrl)
        }
        const cropData = {
          cropX: croppingRect.x,
          cropY: croppingRect.y,
          cropWidth: croppingRect.width,
          cropHeight: croppingRect.height,
          zoom
        };
        const res = await axios.patch(`${BASE_URL}/user`, {
          coverImageUrl,
          coverImageCropData: cropData,
        });
        generateSnackbar('Profile updated successfully!', 'success');
        setValue('coverImageUrlCropped', res?.data?.data?.coverImageUrlCropped);

        if (typeof coverImageUrl !== 'string') {
          const reader = new FileReader();
          reader.onloadend = () => {
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.src = reader.result;
            img.onload = () => {
              setPreview(img.src);
              setSaving(false);
              toggleDialog();
            };
          };
          reader.readAsDataURL(coverImageUrl);
        }else {
          setSaving(false);
          toggleDialog();
        }
      }
      setCoverHovered(false);
    } catch (error) {
      console.error('Failed to crop image:', error);
      setSaving(false);
    }
  };
  const handleZoomOut = () => {
    if (zoom > 1) {
      setZoom(zoom - .1)
    }
  }
  const handleZoomIn = () => {
    if (zoom < 2) {
      setZoom(zoom + .1)
    }
  }

  return (
    <Dialog
      open={open}
      onClose={toggleDialog}
      width={cropperWidth + 50}
      height='620px'
      borderRadius={0}
    >
      <DialogContentWrap
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <SaveWrap>
          <FlexBox>
            <Box onClick={toggleDialog}>
              <ArrowLeftIcon
                width={20}
                height={20}
                color={theme.palette.text.primary}
              />
            </Box>
            <HeaderText>Edit Media</HeaderText>
          </FlexBox>
          <PrimaryButton
            disabled={saving}
            type='submit'
            height='40px'
            width='160px'
            onClick={() => handleSave()}
          >
            {!saving ? (
              t('Save')
            ) : (
              <Spinner size={12} color={theme.palette.background.default} />
            )}
          </PrimaryButton>
        </SaveWrap>
        <Box position='relative' px={2}>
          <AvatarEditor
            ref={editorRef}
            image={preview ? preview : imageFile}
            width={cropperWidth}
            height={250}
            border={[0, 200]}
            scale={zoom}
            style={{height: 480, width: cropperWidth}}
          />
          <CropperRectangle cropperWidth={cropperWidth} />
        </Box>
        <Box p={2} width='50%' margin='auto'>
          <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
            <Box onClick={handleZoomOut} sx={{cursor: 'pointer'}}>
              <ZoomOut fontSize='large' />
            </Box>
            <Slider
              size="small"
              defaultValue={1}
              min={1}
              max={2}
              step={0.1}
              value={zoom}
              onChange={(_, z) => setZoom(z)}
            />
            <Box onClick={handleZoomIn} sx={{cursor: 'pointer'}}>
              <ZoomIn fontSize='large' />
            </Box>
          </Stack>
        </Box>
      </DialogContentWrap>
    </Dialog>
  );
};
