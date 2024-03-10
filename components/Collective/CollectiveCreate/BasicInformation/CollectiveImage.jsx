import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import AvatarUpload from 'components/Avatar/AvatarUpload';
import { useTranslation } from 'react-i18next';
import { LeftHeaderComp } from 'components/CollabCreate/LeftHeaderComp';
import { uploadFile } from '~/apis';

const CollectiveImage = () => {
  const {control, setValue} = useFormContext();
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const uploadImage = async () => {
      if (selectedImage) {
        const { data } = await uploadFile(selectedImage);
        setValue('collectiveImage', data.files);
      } else {
        setValue('collectiveImage', '');
      }
    };
    if (typeof selectedImage !== 'string') {
      uploadImage();
    }
  }, [selectedImage]);
  return (
    <Grid container my={6}>
      <Grid item lg={2.5} xs={12}>
        <LeftHeaderComp
          headerText={t('Logo')}
          subheader={t("Showcase your unique identity with your Team's logo")}
        />
      </Grid>
      <Grid item lg={6} xs={12}>
        <Box display="flex" alignItems="center">
          <Controller
            name="collectiveImage"
            control={control}
            render={({ field: { value, onChange } }) => (
              <AvatarUpload
                image={value}
                handleUpload={(files) => {
                  const file = files[0];
                  if (file) onChange(file);
                  setSelectedImage(file);
                }}
              />
            )}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default CollectiveImage;
