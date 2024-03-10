import { useTranslation } from 'react-i18next';
import React, { useCallback } from 'react';
import {
  AddProjectMainHeader, CloseWrap,
  ImagePreview,
  ImagesContainer,
  ImagesWrap, ImageWrap,
  UploadContentWrap, UploaderNoContentWrap,
  UploadHeaderWrap,
} from '../elements';
import { Box, Grid, useTheme } from '@mui/material';
import LinearProgressWithLabel from '../../../LinearProgressWithLabel/LinearProgressWithLabel';
import CloseIcon from '../../../Icons/CloseIcon';
import Uploaders from './Uploaders';

const UploadPage = ({files, setFiles, handleRemoveFile, uploadProgress}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles) {
      setFiles([...files, ...acceptedFiles]);
    }
  }, [files]);

  return (<>
    <UploadHeaderWrap>
      <AddProjectMainHeader>{t("Media")}</AddProjectMainHeader>
    </UploadHeaderWrap>
    <UploadContentWrap>
      {files && files.length !== 0 ?
        <Grid container sx={{borderTop: `1px solid ${theme.palette.borderLight}`}}>
          <Grid item lg={8} xs={12}>
            <ImagesWrap>
              {typeof uploadProgress === 'number' &&
              <Box mb={2}>
                <LinearProgressWithLabel value={uploadProgress} />
              </Box>
              }
              <ImagesContainer>
                {files.map((selectedFile, index) => {
                  const src = selectedFile.url ? selectedFile.url : selectedFile.path ? URL.createObjectURL(selectedFile): ''
                  if (src){
                    return (
                      <ImageWrap key={index}>
                        {selectedFile.type?.includes('image') ?
                          <ImagePreview alt="media" src={src} />:

                          <video width="100%" controls>
                            <source src={src}/>
                          </video>
                        }
                        <CloseWrap
                          onClick={() => handleRemoveFile(src)}
                          size='large'
                        >
                          <CloseIcon width={26} height={26} color={theme.palette.text.inverse} />
                        </CloseWrap>
                      </ImageWrap>
                    )
                  }
                })}
              </ImagesContainer>
            </ImagesWrap>
          </Grid>
          <Grid item lg={4} xs={12}>
            <Box py={4} width='fit-content' m='auto' display='flex' justifyContent='center'>
              <Uploaders onDrop={onDrop} />
            </Box>
          </Grid>
        </Grid> :
        <UploaderNoContentWrap>
          <Uploaders onDrop={onDrop} />
        </UploaderNoContentWrap>
      }
    </UploadContentWrap>
  </>);
};

export default UploadPage;