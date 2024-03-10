import React, { useState, useRef, useEffect } from 'react';
import {
  MultipleImagesContainer,
  IconWrapper,
  ImagePreviewContainer,
  DropzoneMain,
} from './elements';
import { useNotistack } from '~/hooks';
import { Box, useTheme } from '@mui/material';
import PlusSlimIcon from '../Icons/PlusSlimIcon';
import CloseIcon from 'components/Icons/CloseIcon';

export const DropzoneImagesMultiple = ({
  imageFiles,
  setImageFiles,
  maxImages,
}) => {
  const theme = useTheme();
  const [imagePreviews, setImagePreviews] = useState([]);
  const [hovered, setHovered] = useState(false);
  const [imageHovered, setImageHovered] = useState(-1);
  const [hideAddImageButton, setHideAddImageButton] = useState(false);
  const fileInputRef = useRef();
  const generateSnackbar = useNotistack();

  const handleFilesChange = (event) => {
    const files = Array.from(event.target.files);
    const newImageFiles = imageFiles ? [...imageFiles, ...files] : [...files];

    if (maxImages) {
      if (newImageFiles.length <= maxImages) {
        setImageFiles(newImageFiles);
        updateImagePreviews(newImageFiles);

        if (newImageFiles.length === maxImages) {
          setHideAddImageButton(true);
        }
      } else {
        generateSnackbar(`Maximum ${maxImages} images allowed`, 'info');
        if (newImageFiles.length === maxImages) {
          setHideAddImageButton(true);
        }
      }
    } else {
      setImageFiles(newImageFiles);
      updateImagePreviews(newImageFiles);
    }
  };

  const updateImagePreviews = (files) => {
    const newImagePreviews = files.map((file) => {
      if (typeof file === 'string') {
        return file;
      } else {
        return URL.createObjectURL(file);
      }
    });
    setImagePreviews(newImagePreviews);
  };

  const handleRemoveImage = (index) => {
    const newImageFiles = imageFiles.filter((_, i) => i !== index);
    setImageFiles(newImageFiles);
    updateImagePreviews(newImageFiles);
  };

  useEffect(() => {
    if (imageFiles && imageFiles.length > 0) {
      updateImagePreviews(imageFiles);
    }

    if (maxImages) {
      if (imageFiles?.length < maxImages) {
        setHideAddImageButton(false);
      }
    }
  }, [imageFiles]);

  return (
    <>
      <MultipleImagesContainer>
        {imagePreviews.map((imagePreview, index) => (
          <Box
            position="relative"
            key={index}
            onMouseEnter={() => setImageHovered(index)}
            onMouseLeave={() => setImageHovered(-1)}
          >
            <IconWrapper onClick={() => handleRemoveImage(index)}>
              {imageHovered === index && (
                <CloseIcon
                  width={26}
                  height={26}
                  color={theme.palette.text.primary}
                />
              )}
            </IconWrapper>
            <ImagePreviewContainer
              width={290}
              height={240}
              alt="media"
              src={imagePreview}
            />
          </Box>
        ))}

        {!hideAddImageButton && (
          <DropzoneMain
            sx={{ width: 290, height: 240 }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFilesChange}
              ref={fileInputRef}
              style={{ display: 'none' }}
            />
            <Box
              onClick={() => fileInputRef.current.click()}
              sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <PlusSlimIcon
                width={120}
                height={120}
                color={
                  hovered
                    ? theme.palette.text.inverse
                    : theme.palette.text.primary
                }
              />
            </Box>
          </DropzoneMain>
        )}
      </MultipleImagesContainer>
    </>
  );
};
