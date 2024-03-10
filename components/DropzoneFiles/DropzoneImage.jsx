import { useTranslation } from 'react-i18next';
import React, { useEffect, useCallback, useState, useRef } from 'react';
import {
  DropzoneMainContainer,
  DropzoneMain,
  ImagePreviewContainer,
  ClearPreviewLink,
} from './elements';
import { useDropzone } from 'react-dropzone';
import { Box, useTheme } from '@mui/material';
import PlusSlimIcon from '../Icons/PlusSlimIcon';

export const DropzoneImage = ({
  setImageFile,
  imagePreview,
  setImagePreview,
  onClearImage,
}) => {
  const [image, setImage] = useState(null);
  const theme = useTheme();
  const { t } = useTranslation();

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles) {
      setImageFile(acceptedFiles[0]);
      setImage(acceptedFiles[0])
    }
  }, []);

  const fileInputRef = useRef();
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  //   image preview
  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setImagePreview(null);
    }
  }, [image]);

  const clearImageHandler = () => {
    setImage(null);
    setImagePreview(null);
    setImageFile(null);
    if (onClearImage) onClearImage();
  };

  return (<>
    {!imagePreview && (
      <DropzoneMainContainer>
        <Box
          onClick={() => {
            fileInputRef.current.click();
          }}
          {...getRootProps()}
          sx={{ width: 350, height: 300 }}
        >
          <Box
            onClick={() => {
              fileInputRef.current.click();
            }}
            width="100%"
            height="100%"
          >
            <input {...getInputProps()} ref={fileInputRef} accept="image/*" />
            <DropzoneMain onDrop={() => onDrop()}>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <PlusSlimIcon
                  width={120}
                  height={120}
                  color={theme.palette.text.primary}
                />
              </Box>
            </DropzoneMain>
          </Box>
        </Box>
      </DropzoneMainContainer>
    )}
    {imagePreview && (
      <>
        <ImagePreviewContainer alt="media" src={imagePreview} />
        <ClearPreviewLink onClick={clearImageHandler}>{t("Clear Image")}</ClearPreviewLink>
      </>
    )}
  </>);
};
