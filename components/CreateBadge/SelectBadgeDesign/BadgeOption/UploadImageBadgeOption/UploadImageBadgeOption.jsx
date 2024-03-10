import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';

import { DropzoneImage } from '~/components';
import { useState } from 'react';
import { useEffect } from 'react';
import { uploadFile } from '~/apis';
import { InformationDescription } from '../elements';
import { LeftHeaderComp } from 'components/CollabCreate/LeftHeaderComp';

export const UploadImageBadgeOption = ({ setValue, watch, errors }) => {
  const { t } = useTranslation();

  const watchImage = watch('image');

  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const uploadImage = async () => {
      if (selectedImage) {
        const { data } = await uploadFile(selectedImage);
        setValue(data.files);
      } else {
        setValue('');
      }
    };
    uploadImage();
  }, [selectedImage]);

  useEffect(() => {
    if (!imagePreview && watchImage) {
      setSelectedImage('');
    }
  }, [imagePreview]);

  return (
    <Grid container lg={12} xs={12}>
      <Grid item lg={2.5} xs={12}>
        <LeftHeaderComp
          headerText={t('Upload Badge')}
          subheader={t('Upload Your Custom Badge')}
        />
      </Grid>
      <Grid item lg={9} xs={12}>
        <DropzoneImage
          setImageFile={(image) => setSelectedImage(image)}
          imagePreview={imagePreview}
          setImagePreview={setImagePreview}
        />

        {errors && errors.image && (
          <InformationDescription type="error" sx={{ marginTop: '10px' }}>
            {errors?.image?.message}
          </InformationDescription>
        )}
      </Grid>
    </Grid>
  );
};
