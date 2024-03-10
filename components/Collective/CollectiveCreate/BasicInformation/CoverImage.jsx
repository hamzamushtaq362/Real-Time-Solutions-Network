import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { DropzoneImages } from './DropzoneFiles';
import { useTranslation } from 'react-i18next';
import { LeftHeaderComp } from 'components/CollabCreate/LeftHeaderComp';
import { uploadFile } from '~/apis';

const CoverImage = () => {
  const {control, setValue} = useFormContext();
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const uploadImage = async () => {
      if (selectedImage) {
        const { data } = await uploadFile(selectedImage);
        setValue('coverImage', data.files);
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
          headerText={t('Cover')}
          subheader={t('Bring your profile to life with a cover image.')}
        />
      </Grid>
      <Grid item lg={6} xs={12}>
        <Controller
          name="coverImage"
          control={control}
          render={({ field: { value, onChange } }) => (
            <DropzoneImages
              imageFile={value}
              setImageFile={(file) => {
                onChange(file);
                setSelectedImage(file);
              }}
            />
          )}
        />
      </Grid>
    </Grid>
  );
};

export default CoverImage;
