import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { Controller } from 'react-hook-form';
import { DropzoneImage } from '~/components';
import ControllerInput from 'components/PublishNFT/InformationPage/ControllerInput';
import ControllerTextArea from 'components/PublishNFT/InformationPage/ControllerTextArea';
import UploadProgress from 'components/Progress/UploadProgress';
import {
  AddProjectMainHeader,
  SubHeading,
} from 'components/CollabCreate/AddProject/elements';

const SingleNft = ({ control, watch, uploadProgress }) => {
  const singleImage = watch('singleImage');
  const [imagePreview, setImagePreview] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    // To preview the nft selectedImage file
    if (singleImage && !singleImage.url) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(singleImage);
    } else {
      setImagePreview(singleImage?.url);
    }
  }, [singleImage]);

  return (
    <>
      <AddProjectMainHeader mb={5}>{t('NFT Information')}</AddProjectMainHeader>
      <ControllerInput
        control={control}
        name="nftName"
        heading={t('NFT Name')}
        placeholder={t('Name')}
      />
      <ControllerTextArea
        control={control}
        name="nftDescription"
        heading={t('NFT Description')}
        placeholder="Description"
      />
      <Grid container my={6}>
        <Grid item lg={2.5} xs={12}>
          <SubHeading>{t('Single Image')}</SubHeading>
        </Grid>
        <Grid item lg={6} xs={12}>
          <UploadProgress progress={uploadProgress} />
          {!uploadProgress && (
            <Controller
              name="singleImage"
              control={control}
              render={({ field: { onChange } }) => (
                <DropzoneImage
                  setImageFile={(file) => onChange(file)}
                  imagePreview={imagePreview}
                  setImagePreview={setImagePreview}
                />
              )}
            />
          )}
        </Grid>
      </Grid>
      <ControllerInput
        control={control}
        name="price"
        heading="Price"
        placeholder="Price"
      />
      <ControllerInput
        control={control}
        name="quantity"
        heading="Quantity"
        placeholder="Quantity"
        type="number"
      />
      <ControllerInput
        control={control}
        name="royalty"
        heading="Royalty"
        placeholder="Royalty"
      />
    </>
  );
};

export default SingleNft;
