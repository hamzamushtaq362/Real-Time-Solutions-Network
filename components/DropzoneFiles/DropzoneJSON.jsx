import { useTranslation } from 'react-i18next';
import React, { useCallback, useRef } from 'react';
import {
  DropzoneMainContainer,
  DropzoneMain,
  InformationDescription,
} from './elements';
import { useDropzone } from 'react-dropzone';
import { Box, useTheme } from '@mui/material';
import PlusSlimIcon from '../Icons/PlusSlimIcon';
import Papa from 'papaparse';
import { useNotistack } from '~/hooks';

export const DropzoneJSON = ({setValue}) => {
  const { t } = useTranslation();

  const generateSnackbar = useNotistack();
  const theme = useTheme();

  const checkJSONData = (json) => {
    if (!json || !Array.isArray(json) || !json.length) {
      return false;
    }

    const validKeys = ['name', 'description', 'image', 'attributes'];
    for (let i = 0; i < json.length; i++) {
      const element = json[i];
      const keys = Object.keys(element);
      if (
        !keys.includes(validKeys[0]) ||
        !keys.includes(validKeys[1]) ||
        !keys.includes(validKeys[2])
      ) {
        return false;
      }
    }
    return true;
  };

  const onDrop = useCallback((acceptedFiles) => {
    if (!acceptedFiles) return;
    const file = acceptedFiles[0];
    const fileType = file.type;
    const reader = new FileReader();

    reader.onload = function (e) {
      if (fileType === 'application/json') {
        const text = e.target.result;
        const json = JSON.parse(text);

        const isValid = checkJSONData(json);

        if (isValid) {
          setValue(json);
        } else {
          generateSnackbar('error', 'Invalid JSON format');
        }
      }

      if (fileType === 'text/csv') {
        let json = [];

        Papa.parse(file, {
          header: true,
          complete: function (results) {
            json = results.data.filter((item) => item.name);
            const isValid = checkJSONData(json);
            if (isValid) {
              setValue(json);
            } else {
              generateSnackbar('error', 'Invalid CSV format');
            }
          },
        });
      }
    };
    reader.readAsText(file); // Move this line outside the if conditions
  }, []);


  const fileInputRef = useRef();
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    (<DropzoneMainContainer>
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
          <input
            {...getInputProps()}
            ref={fileInputRef}
            accept="application/json,text/csv"
          />
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
      <InformationDescription ml={2}>{t("Accepted File Formats:")}<br />{t(".JSON or .CSV")}</InformationDescription>
    </DropzoneMainContainer>)
  );
};
