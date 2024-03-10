import { useTranslation } from 'react-i18next';
import React, { useEffect, useCallback, useState, useRef } from 'react';
import { Box, useTheme } from '@mui/material';
import PlusSlimIcon from '../../../../Icons/PlusSlimIcon';
import { CoverButtonsWrap, CoverImageWrap } from 'components/UserSettings/elements';
import { CoverImageEmpty, ImageIconElement, PrimaryButton } from '~/components';
import { ActionText } from 'components/DashboardHome/elements';
import { CircularProgressWithLabel } from 'components/Loading/CircularProgressWithLabel';
import { useDropzone } from 'react-dropzone';

export const DropzoneImages = ({
 imageFile,
 setImageFile,
 width = '100%',
 height = '170px',
 uploadProgress
}) => {
  const { t } = useTranslation();
  const [localFile, setLocalFile] = useState();
  const [preview, setPreview] = useState(null);
  const theme = useTheme();
  const [coverHovered, setCoverHovered] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles) {
      setLocalFile(acceptedFiles[0])
      setImageFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  const fileInputRef = useRef();

  const openFilePicker = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  //   image preview
  useEffect(() => {
    if (localFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(localFile);
    } else {
      setPreview(localFile);
    }
  }, [localFile]);

  const handleResetCover = (e) => {
    e.stopPropagation()
    setLocalFile(null);
    setImageFile(null);
    setPreview(null)
  }

  const isLoading = typeof uploadProgress === 'number'
  return (<>
    <CoverImageWrap
      onMouseEnter={() => setCoverHovered(true)}
      onMouseLeave={() => setCoverHovered(false)}
      width={width}
      height={height}
      {...getRootProps({})}
    >
      <input
        ref={fileInputRef}
        style={{ display: 'none' }}
        type="file"
        {...getInputProps()}
      />
      {(preview || imageFile) &&
      <CoverButtonsWrap loading={isLoading}>
        {isLoading &&
          <CircularProgressWithLabel
            sx={{ color: '#020202' }}
            value={uploadProgress}
            size='60px'
          />
        }
        {!isLoading && coverHovered &&
        <>
          <PrimaryButton
            width='fit-content'
            marginRight={8}
            onClick={openFilePicker}
          >
            <Box onDrop={() => onDrop()}>{t("Replace Image")}</Box>
          </PrimaryButton>
          <ActionText
            onClick={handleResetCover}
            underlineHeight={2} ml={1}>{t("Delete")}</ActionText>
        </>}
      </CoverButtonsWrap>}
      {(preview || imageFile) ?
        <ImageIconElement
          src={preview ? preview : imageFile}
          sx={{
            borderRadius: '6px',
            maxWidth: '100%',
            cursor: 'pointer',
          }}
          width={width}
          height={height}
          objectFit="cover"
          position="absolute"
        />
        :
        <CoverImageEmpty
          onDrop={() => onDrop()}
          onClick={openFilePicker}
        >
          <PlusSlimIcon width={120} height={120} color={theme.palette.text.primary} />
        </CoverImageEmpty>
      }
    </CoverImageWrap>
  </>);
};

