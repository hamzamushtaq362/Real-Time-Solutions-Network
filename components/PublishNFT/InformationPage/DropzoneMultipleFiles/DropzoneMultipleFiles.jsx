import React, { useCallback, useRef } from 'react';
import { DropzoneMain } from './elements';
import { useDropzone } from 'react-dropzone';
import { Box, useTheme } from '@mui/material';
import PlusSlimIcon from 'components/Icons/PlusSlimIcon';
import { useIsMobileView } from '~/utils';
import { useNotistack } from '~/hooks';
import Compressor from 'compressorjs';

export const DropzoneMultipleFiles = ({ setImageFiles }) => {
  const isMobileView = useIsMobileView();
  const theme = useTheme();
  const generateSnackbar = useNotistack();
  const fileInputRef = useRef();

  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles) {
      try {
        const files = await Promise.all(acceptedFiles.map(file =>
          new Promise((resolve, reject) =>
            new Compressor(file, {
              width: 200,
              height: 200,
              success: (result) => {
                const file = new File([result], result.name, {
                  type: result.type,
                })
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                  resolve(reader.result);
                };
                reader.onerror = () => {
                };
              },
              error: reject,
            })
          )
        ));
        setImageFiles(acceptedFiles, files);
      }catch (e) {
        generateSnackbar('error', 'Error', 'Error while compressing images');
      }
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <>
      <Box display='flex'>
        <Box
          onClick={() => {
            fileInputRef.current.click();
          }}
          {...getRootProps()}
          sx={{width: isMobileView ? '100%': 350, height: 300}}
        >
          <Box
            onClick={() => {
              fileInputRef.current.click();
            }}
            width='100%'
            height='100%'
          >
            <input
              {...getInputProps()}
              ref={fileInputRef}
              accept="image/*"
            />
            <DropzoneMain onDrop={() => onDrop()}>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <PlusSlimIcon width={120} height={120} color={theme.palette.text.primary} />
              </Box>
            </DropzoneMain>
          </Box>
        </Box>
      </Box>
    </>
  );
};
