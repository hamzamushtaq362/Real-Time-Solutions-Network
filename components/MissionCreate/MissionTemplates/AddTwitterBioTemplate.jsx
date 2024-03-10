import { useTranslation } from 'react-i18next';
import { InformationDescription, SubHeading } from '../elements';
import { Grid } from '@mui/material';
import { Controller } from 'react-hook-form';
import StyledTextarea from 'components/Input/StyledTextarea';
import React from 'react';

export const AddTwitterBioTemplate = ({ control, errors }) => {
  const { t } = useTranslation();

  return (
    <>
      <Grid container mt={5} mb={6}>
        <Grid item lg={2.5} xs={12}>
          <SubHeading>{t('Add Twitter Bio')}</SubHeading>
          <InformationDescription mt={2}>
            {t('Please enter the twitter bio text')}
          </InformationDescription>
        </Grid>
        <Grid item lg={6} xs={12}>
          <Controller
            name="metadata.twitterBio"
            control={control}
            render={({ field }) => (
              <StyledTextarea
                {...field}
                fullWidth
                placeholder={t('Tweet to be posted')}
                rows={4}
                maxLength={3500}
              />
            )}
          />
          {errors?.metadata?.twitterBio && (
            <InformationDescription type="error" my={1}>
              {errors.metadata.twitterBio.message}
            </InformationDescription>
          )}
        </Grid>
      </Grid>
    </>
  );
};
