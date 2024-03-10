import { useTranslation } from 'react-i18next';
import React from 'react';
import { Box } from '@mui/material';
import LinearProgressWithLabel from 'components/LinearProgressWithLabel/LinearProgressWithLabel';
import { SubHeading } from 'components/CollabCreate/AddProject/elements';

const UploadProgress = ({ progress }) => {
  const { t } = useTranslation();

  return (
    <>
      {typeof progress === 'number' && (
        <Box container mb={4}>
          <SubHeading>{t('Uploading Images')}</SubHeading>
          <Box my={2}>
            <LinearProgressWithLabel value={progress} />
          </Box>
        </Box>
      )}
    </>
  );
};

export default UploadProgress;
