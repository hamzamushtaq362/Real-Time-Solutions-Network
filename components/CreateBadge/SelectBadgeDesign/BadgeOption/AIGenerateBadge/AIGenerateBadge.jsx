import { useTranslation } from 'react-i18next';
import { Box, Grid, useTheme } from '@mui/material';

import { InformationDescription } from './elements';

import { useState } from 'react';
import { NormalInput } from 'components/Input';
import { SelectImage } from 'components/SelectImage';
import { PrimaryButton } from 'components/Button';
import { generateBadgeImages } from 'apis/badge';
import ThreeDots from 'components/Onboard/common/ThreeDots/ThreeDots';
import { BadgePreview } from './BadgePreview';
import { HtmlToPngComponent } from 'utils/HtmlToPngComponent';
import { useEffect } from 'react';
import { LeftHeaderComp } from 'components/CollabCreate/LeftHeaderComp';
export const AIGenerateBadge = ({ setValue, errors }) => {
  const [badgeImageDescription, setBadgeImageDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageArray, setImageArray] = useState([]);
  const [selectImageForBadgePreview, setSelectImageForBadgePreview] =
    useState(null);
  const { t } = useTranslation();

  const theme = useTheme();

  const handleGenerateBadgeImages = async () => {
    setLoading(true);
    if (!badgeImageDescription) {
      alert('Please enter the badge description');
      setLoading(false);
      return;
    } else {
      const generatedImages = await generateBadgeImages(badgeImageDescription);
      setImageArray(generatedImages.responseForPngConversion);
      setLoading(false);
    }
  };

  const getBaseValueOfSelectedImage = (selectedImageURl) => {
    const selectedImage = imageArray.find(
      (image) => image.image === selectedImageURl,
    );

    return selectedImage?.base64;
  };

  useEffect(() => {
    const func = async () => {
      if (selectImageForBadgePreview) {
        try {
          const badgeImageFile = await HtmlToPngComponent();
          setValue(badgeImageFile);
        } catch (error) {
          console.error('Conversion error:', error);
        }
      }
    };

    func();
  }, [selectImageForBadgePreview]);

  return (
    <>
      <Grid container rowSpacing={'1rem'}>
        <Grid item lg={2.5} xs={12}>
          <LeftHeaderComp
            headerText={t('AI Generated Badge')}
            subheader={t('Enter tags for AI generated badges or upload')}
          />
        </Grid>

        <Grid item lg={5} xs={12}>
          <NormalInput
            width="70%"
            borderRadius="19px"
            variant="outlined"
            padding="15px"
            type="string"
            placeholder={t('Enter Badge image Description')}
            name={'badgeImageDescription'}
            value={badgeImageDescription}
            handleChange={(e) => {
              setBadgeImageDescription(e.target.value);
            }}
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                handleGenerateBadgeImages();
              }
            }}
          />
        </Grid>
        <Grid item lg={2.5} xs={12}>
          <PrimaryButton
            width="190px"
            height={50}
            disabled={loading}
            marginLeft={8}
            fontSize={16}
            onClick={handleGenerateBadgeImages}
          >
            {loading ? (
              <ThreeDots color={theme.palette.background.default} />
            ) : (
              'Generate Images '
            )}
          </PrimaryButton>
        </Grid>
      </Grid>
      {imageArray && imageArray.length > 0 && (
        <Grid container mt={1} mb={1} rowSpacing={'100px'}>
          <Grid item lg={2.5} xs={12}>
            <LeftHeaderComp
              headerText={t('Badges')}
              subheader={t('Choose from the generated options')}
            />
          </Grid>
          <Grid item lg={8} xs={12}>
            <SelectImage
              selectImageForBadgePreview={selectImageForBadgePreview}
              setSelectImageForBadgePreview={setSelectImageForBadgePreview}
              images={imageArray}
              setValue={setValue}
            />
          </Grid>

          <Grid item lg={2.5} xs={12}>
            <LeftHeaderComp
              headerText={t('Badge Preview')}
              subheader={t('Choose form the generated options')}
            />
          </Grid>
          <Grid item lg={6} xs={12}>
            {selectImageForBadgePreview && (
              <Box
                id="my-node-htmltopng"
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '20px',
                }}
              >
                <BadgePreview
                  selectedImageBase64Value={getBaseValueOfSelectedImage(
                    selectImageForBadgePreview,
                  )}
                />
              </Box>
            )}
            {errors && errors.image && (
              <InformationDescription type="error" sx={{ marginTop: '10px' }}>
                {errors?.image?.message}
              </InformationDescription>
            )}
          </Grid>
        </Grid>
      )}
    </>
  );
};
