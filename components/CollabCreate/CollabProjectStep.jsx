import { useTranslation } from 'react-i18next';
import React from 'react';
import {
  MainContainer,
  CreateCollabMainHeader,
  InformationDescription,
} from './elements';
import {
  StyledInput,
  SearchSelectAutocomplete,
  DropzoneImagesMultiple,
} from '~/components';
import { Box, Grid } from '@mui/material';
import { Controller } from 'react-hook-form';
import themes from 'constants/themesDefault';
import StyledTextarea from 'components/Input/StyledTextarea';

import { useState } from 'react';
import { LeftHeaderComp } from './LeftHeaderComp';
export const CollabProjectStep = ({
  control,
  errors,
  trigger,
  isManualTrigger,
  watch,
  setValue,
}) => {
  const { t } = useTranslation();

  const [inputLength, setInputLength] = useState(0);

  return (
    <MainContainer>
      <CreateCollabMainHeader>{t('Brief')}</CreateCollabMainHeader>
      <Grid container my={6}>
        <Grid item lg={2.5}>
          <LeftHeaderComp
            headerText={t('Collab cover')}
            subheader={t('Collab Media (Recommended Size 600x500 )')}
            subHeaderBreakText={t('pixel .PNG or .JPG)')}
          />
        </Grid>
        <Grid item lg={9}>
          <DropzoneImagesMultiple
            maxImages={5}
            imageFiles={watch('images')}
            setImageFiles={(images) => setValue('images', images)}
          />
        </Grid>
      </Grid>
      <Grid container mb={6}>
        <Grid item lg={2.5} xs={12}>
          <LeftHeaderComp
            headerText={t('Title')}
            subheader={t('Write the name of the collab.')}
          />
        </Grid>
        <Grid item lg={6} xs={12}>
          <Controller
            name="title"
            control={control}
            render={({ field: { value, onChange } }) => (
              <StyledInput
                value={value}
                onChange={async (e) => {
                  onChange(e);
                  if (isManualTrigger) {
                    await trigger('title');
                  }
                }}
                fullWidth
                placeholder="Title"
              />
            )}
          />
          {errors && errors.title && (
            <InformationDescription type="error" my={1}>
              {errors.title.message}
            </InformationDescription>
          )}
        </Grid>
      </Grid>
      <Grid container mb={6}>
        <Grid item lg={2.5} xs={12}>
          <LeftHeaderComp
            headerText={t('Description')}
            subheader={t(
              'Write a description of the collab, explaining what it’s about or\n            it’s objectives.',
            )}
          />
        </Grid>
        <Grid item lg={6} xs={12}>
          <Controller
            name="description"
            control={control}
            render={({ field: { value, onChange } }) => (
              <StyledTextarea
                value={value}
                onChange={async (e) => {
                  onChange(e);
                  if (isManualTrigger) {
                    await trigger('description');
                  }
                }}
                fullWidth
                placeholder={t('Description')}
                rows={4}
                maxLength={3500}
              />
            )}
          />
          {errors && errors.description && (
            <InformationDescription type="error" my={1}>
              {errors.description.message}
            </InformationDescription>
          )}
        </Grid>
      </Grid>
      <Grid container my={6}>
        <Grid item lg={2.5} xs={12}>
          <LeftHeaderComp
            headerText={t('Themes')}
            subheader={t('Select themes that are related to the collab.')}
          />
        </Grid>
        <Grid item lg={6} xs={12}>
          <Box mt={2}>
            <Controller
              name="themes"
              control={control}
              render={({ field: { value, onChange } }) => (
                <SearchSelectAutocomplete
                  freeSolo
                  options={themes}
                  getOptionLabel={(option) =>
                    option.input ? option.label : option
                  }
                  onInputChange={(event, newInputValue) => {
                    setInputLength(newInputValue.length);
                  }}
                  onChange={async (e, newValue) => {
                    const validTags = newValue.filter((option) => {
                      const tag = option.input
                        ? option.label
                            .replace('Enter to add "', '')
                            .replace('"', '')
                        : option;

                      return tag.length <= 50;
                    });

                    onChange(validTags);

                    if (isManualTrigger) {
                      await trigger('themes');
                    }
                  }}
                  noOptionsText={t('No Results')}
                  value={value}
                  placeholder="Themes (max 5)"
                />
              )}
            />
          </Box>
          {errors && errors.themes && (
            <InformationDescription type="error" my={1}>
              {errors.themes.message}
            </InformationDescription>
          )}
          {inputLength > 50 && (
            <InformationDescription type="error" my={1}>
              Maximum length of 50 characters exceeded for each tags
            </InformationDescription>
          )}
        </Grid>
      </Grid>
    </MainContainer>
  );
};
