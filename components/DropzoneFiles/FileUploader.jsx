import React, { useRef, useEffect } from 'react';
import { MultipleImagesContainer } from './elements';
import { useNotistack } from '~/hooks';
import { Box } from '@mui/material';

export const FileUploader = ({
   imageFiles,
   setImageFiles,
   maxImages,
   updateImagePreviews
 }) => {
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
        }
      } else {
        generateSnackbar(`Maximum ${maxImages} images allowed`, 'info');
      }
    } else {
      setImageFiles(newImageFiles);
      updateImagePreviews(newImageFiles);
    }
  };


  useEffect(() => {
    if (imageFiles && imageFiles.length > 0) {
      updateImagePreviews(imageFiles);
    }

  }, [imageFiles]);

  return (
    <>
      <MultipleImagesContainer>
        <Box>
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
          >
            Upload Media
          </Box>
        </Box>
      </MultipleImagesContainer>
    </>
  );
};
