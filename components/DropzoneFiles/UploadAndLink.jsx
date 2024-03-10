import React, { useState } from 'react';
import {
  IconWrapper, ImagePreviewContainer,
  LinkInputWrap,
  LinkWrap, LoadingText, MultipleImagesContainer,
  OrText,
  OrWrap,
  UploadContentWrap, UploadInputForm,
  UploadMediaContainer,
  UploadWrap,
} from './elements';
import { Box, useTheme } from '@mui/material';
import { TextField } from '~/components';
import axios from 'axios';
import { BASE_URL } from '~/apis';
import { openLinkInNewTab } from '~/utils';
import { FileUploader } from './FileUploader';
import CloseIcon from '../Icons/CloseIcon';

const UploadAndLink = ({maxImages, imageFiles, setImageFiles}) => {
  const theme = useTheme();
  const [link, setLink] = useState(null);
  const [addLink, setAddLink] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageHovered, setImageHovered] = useState(-1);
  const [imagePreviews, setImagePreviews] = useState([]);


  const handleLinkClick = () => {
    setAddLink(true);
  }

  const handleLinkEnter = async (e) => {
    e.stopPropagation();
    if (e.key === 'Enter') {
      e.preventDefault()
      setLoading(true);
      const metaResponse = await axios.get(
        `${BASE_URL}/api/v1/link/${encodeURIComponent(link)}`,
      );
      const { data } = metaResponse;
      setLoading(false);
      setImagePreviews([{imageUrl: data?.image, videoUrl: link}]);
      setImageFiles([{imageUrl: data?.image, videoUrl: link}]);
    }
  }

  const handleRemoveImage = (index, e) => {
    e.stopPropagation();
    const newImageFiles = imageFiles.filter((_, i) => i !== index);
    const newImagePreviews = imagePreviews.filter((_, i) => i !== index);
    setImageFiles(newImageFiles);
    updateImagePreviews(newImagePreviews);
  };
  const updateImagePreviews = (files) => {
    const newImagePreviews = files.map((file) => {
      if (typeof file === 'string') {
        return file;
      } else {
        if (file.imageUrl){
          return file.imageUrl;
        }else {
          return URL.createObjectURL(file);
        }
      }
    });
    setImagePreviews(newImagePreviews);
  };
  const getSrcUrl = (imagePreview) => {
    if (!link){
      return imagePreview;
    }else if (link && !imagePreview){
      return 'https://placehold.co/400';
    } else {
      return (typeof imagePreview === 'string') ? imagePreview : imagePreview.imageUrl;
    }
  }


  return (
    <>
    <MultipleImagesContainer>
      {imagePreviews?.length !== 0 && imagePreviews.map((imagePreview, index) => (
        <Box
          position="relative"
          key={index}
          onMouseEnter={() => setImageHovered(index)}
          onMouseLeave={() => setImageHovered(-1)}
          onClick={() => link && openLinkInNewTab(link)}
          sx={{ cursor: link ? 'pointer' : 'default' }}
        >
          <IconWrapper onClick={(e) => handleRemoveImage(index, e)}>
            {imageHovered === index && (
              <CloseIcon
                width={26}
                height={26}
                color={theme.palette.text.primary}
              />
            )}
          </IconWrapper>
          <ImagePreviewContainer
            width={link ? 400 : 290}
            height={link ? 400 : 240}
            alt="media"
            src={getSrcUrl(imagePreview)}
          />
        </Box>
        ))}
      </MultipleImagesContainer>
      {(!imagePreviews || imagePreviews?.length === 0) && <UploadMediaContainer>
          <UploadInputForm>
            <UploadWrap>
              <UploadContentWrap>
                <FileUploader
                  imageFiles={imageFiles}
                  setImageFiles={(files) => {
                    setImageFiles(files);
                    setLink(null);
                    setAddLink(false)
                  }}
                  maxImages={maxImages}
                  updateImagePreviews={updateImagePreviews}
                />
              </UploadContentWrap>
            </UploadWrap>
            <OrWrap>
              <Box sx={{ width: '100%', height: '1px', bgcolor: '#E0E0E0' }} />
              <OrText>
                OR
              </OrText>
              <Box sx={{ width: '100%', height: '1px', bgcolor: '#E0E0E0' }} />
            </OrWrap>
            <LinkWrap onClick={handleLinkClick}>
              {addLink ?
                <LinkInputWrap value={link}>
                  {loading && <LoadingText>adding</LoadingText>}
                  <TextField
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    border='none'
                    fullWidth
                    placeholder='Type URL'
                    fontSize={18}
                    centeredInput
                    onKeyDown={handleLinkEnter}
                  />
                  {loading && <LoadingText>...</LoadingText>}
                </LinkInputWrap> :
                <UploadContentWrap>
                  Add Link
                </UploadContentWrap>}
            </LinkWrap>
          </UploadInputForm>
      </UploadMediaContainer>
      }
    </>
  );
};

export default UploadAndLink;