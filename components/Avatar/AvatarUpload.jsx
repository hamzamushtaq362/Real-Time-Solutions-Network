import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Avatar } from '~/components';
import {
  AvatarWrap,
  CircleWrap,
  EditWrap,
} from 'components/Collective/CollectiveCreate/elements';
import { Box, useTheme } from '@mui/material';
import { UilCamera } from '@iconscout/react-unicons';
import { useDropzone } from 'react-dropzone';
import { useIsMobileView } from '~/utils';
import Compressor from 'compressorjs';
import { useTranslation } from 'react-i18next';

const AvatarUpload = ({ image, handleUpload, size, inverse, disabled }) => {
  const [preview, setPreview] = useState(null);
  const [hovered, setHovered] = useState(false);
  const avatarRef = useRef();
  const theme = useTheme();
  const isMobileView = useIsMobileView();
  const { t } = useTranslation();

  const onDrop = useCallback(
    async (acceptedFiles) => {
      await new Compressor(acceptedFiles[0], {
        quality: 0.5,
        success: (result) => {
          const myFile = new File([result], result.name, {
            type: result.type,
          });
          handleUpload([myFile]);
        },
      });
    },
    [handleUpload],
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  useEffect(() => {
    // To preview the nft collectiveImage file
    if (image && typeof image !== 'string') {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(image);
    }
  }, [image]);

  return (
    <AvatarWrap
      onClick={disabled ? null : () => avatarRef.current.click()}
      onMouseEnter={disabled ? null : () => setHovered(true)}
      onMouseLeave={disabled ? null : () => setHovered(false)}
      size={size}
      inverse={inverse}
      {...(disabled ? {} : getRootProps())}
    >
      <input
        ref={avatarRef}
        style={{ visibility: 'hidden', opacity: 0, width: 0 }}
        type={'file'}
        {...(disabled ? { disabled: true } : getInputProps())}
      />
      {preview ? (
        <>
          <CircleWrap size={size}>
            <Avatar
              size={size ? size : isMobileView ? 130 : 160}
              avatar={preview}
            />
            <EditWrap hovered={hovered}>{t('Edit')}</EditWrap>
          </CircleWrap>
        </>
      ) : (
        <Box display="flex" alignItems="center" justifyContent="center">
          <UilCamera
            color={
              inverse ? theme.palette.text.inverse : theme.palette.text.primary
            }
            size="40"
          />
        </Box>
      )}
    </AvatarWrap>
  );
};

export default AvatarUpload;
