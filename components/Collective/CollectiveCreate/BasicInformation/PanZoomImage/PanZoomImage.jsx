import { useTranslation } from 'react-i18next';
import React, { useEffect, useCallback, useState, useRef } from 'react';
import { Box, useTheme } from '@mui/material';
import PlusSlimIcon from '../../../../Icons/PlusSlimIcon';
import { CoverButtonsWrap, CoverImageWrap } from 'components/UserSettings/elements';
import { CoverImageEmpty, ImageIconElement, PrimaryButton } from '~/components';
import { CircularProgressWithLabel } from 'components/Loading/CircularProgressWithLabel';
import { useDropzone } from 'react-dropzone';
import { CropperDialog } from './CropperDialog';
import { RepositionWrap } from '../../../../common/ProfileCommon/element';

export const PanZoomImage = ({
  imageFile,
  setImageFile,
  width = '100%',
  height = '170px',
  objectFit,
  uploadProgress,
  coverRepositioning,
  setCoverRepositioning,
  setValue,
  coverImageUrlCropped,
  creatorPage,
  isAdmin
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
      setCoverRepositioning(true);
    }
  }

  useEffect(() => {
    if (localFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = reader.result;
        img.onload = () => {
          setPreview(img.src);
          setCoverRepositioning(true);
        };
      };
      reader.readAsDataURL(localFile);
    } else {
      setPreview(localFile);
    }
  }, [localFile]);
  const handleReposition = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    setCoverRepositioning(true);
  }

  const isLoading = typeof uploadProgress === 'number'

  return (
    <>
      <CoverImageWrap
        onMouseEnter={() => {
          if (isAdmin) {
            setCoverHovered(true)
          }}}
        onMouseLeave={() => setCoverHovered(false)}
        width={width}
        height={height}
        {...getRootProps({})}
      >
        {!coverRepositioning &&
          <>
            <input
              ref={fileInputRef}
              style={{ display: 'none' }}
              type="file"
              {...getInputProps()}
            />
            {(coverImageUrlCropped) &&
              <CoverButtonsWrap
                loading={isLoading}
                hovered={coverHovered}
                onClick={(e) => {
                  if (e.target.tagName.toLowerCase() !== 'button') {
                    e.stopPropagation()
                  }}}
              >
                {isLoading &&
                  <CircularProgressWithLabel
                    sx={{ color: '#020202' }}
                    value={uploadProgress}
                    size='60px'
                  />
                }
                {!isLoading && coverHovered && isAdmin &&
                  <>
                    {creatorPage ?
                      <RepositionWrap hovered={coverHovered} component='span'>
                        <PrimaryButton
                          marginRight={8}
                          onClick={openFilePicker}
                          restrictHoverStyles
                          onDrop={() => onDrop()}
                          width={120}
                        >
                          {t('Replace')}
                        </PrimaryButton>
                        <PrimaryButton
                          onClick={handleReposition}
                          restrictHoverStyles
                          width={120}
                        >
                          <Box>{t('Reposition')}</Box>
                        </PrimaryButton>
                      </RepositionWrap>
                     :
                      <>
                        <PrimaryButton
                          marginRight={8}
                          onClick={openFilePicker}
                          restrictHoverStyles
                          onDrop={() => onDrop()}
                          width={120}
                        >
                          {t('Replace')}
                        </PrimaryButton>
                        <PrimaryButton
                          marginRight={8}
                          onClick={handleReposition}
                          restrictHoverStyles
                          width={120}
                        >
                          <Box>{t('Reposition')}</Box>
                        </PrimaryButton>
                      </>
                    }
                  </>}
              </CoverButtonsWrap>}
          </>
        }
        {(coverImageUrlCropped) ?
          !coverRepositioning &&
            <ImageIconElement
              src={coverImageUrlCropped}
              sx={{
                borderRadius: '6px',
                maxWidth: '100%',
                cursor: 'pointer',
              }}
              width={width}
              height={height}
              objectFit={objectFit ?? 'cover'}
              position='absolute'
            />
          :
          <CoverImageEmpty
            onDrop={() => onDrop()}
            onClick={openFilePicker}
          >
            <PlusSlimIcon width={120} height={120} color={theme.palette.text.primary} />
          </CoverImageEmpty>
        }
        {/*{coverHovered && */}
        {/*    <Overlay />*/}
        {/*}*/}
      </CoverImageWrap>
      <CropperDialog
        open={coverRepositioning}
        toggleDialog={() => setCoverRepositioning(!coverRepositioning)}
        {...{preview, setPreview, imageFile, setImageFile, setValue, setCoverHovered}}
      />
    </>
  );
};

