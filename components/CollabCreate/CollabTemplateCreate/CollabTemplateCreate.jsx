import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { Box, useTheme, Grid } from '@mui/material';
import { useNotistack } from '~/hooks';
import { BASE_URL, uploadMultipleFiles } from '~/apis';
import {
  MainContainer,
  CreateCollabMainHeader,
  InformationDescription,
  SubHeading,
} from '../elements';
import {
  StyledInput,
  SearchSelectAutocomplete,
  DropzoneImagesMultiple,
} from '~/components';
import { Controller } from 'react-hook-form';
import themes from 'constants/themesDefault';
import axios from 'axios';
import { useRouter } from 'next/router';
import {
  ActionsContainer,
  ActionsWrap,
  AddProjectMainHeader,
} from './elements';
import { PrimaryButton, SmallSpinner } from '~/components';
import { useIsMobileView } from '~/utils';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { COLLAB_SOURCE } from '~/constants';
import { FlexBox } from 'components/common/elements';
import { CollabCategories as suggestions } from '~/constants';
import StyledTextarea from 'components/Input/StyledTextarea';

// React hook form related code
const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required('Title is required')
    .min(5, 'Title is too short!')
    .max(50, 'Too Long!'),
  description: Yup.string()
    .required('Description is required')
    .min(30, 'Description is too short!')
    .max(3500, 'Too Long!'),
  selectedThemes: Yup.array()
    .of(Yup.string())
    .min(1, 'At least 1 theme is required')
    .max(5, 'Max 5 themes allow'),
  selectedSuggestions: Yup.array()
    .of(Yup.string())
    .min(1, 'At least 1 category is required')
    .max(5, 'Max 5 category allow'),
});

export const CollabTemplateCreate = () => {
  const { t } = useTranslation();

  const router = useRouter();
  const isMobileView = useIsMobileView();
  const generateSnackbar = useNotistack();
  const [publishLoading, setPublishLoading] = useState(false);

  const theme = useTheme();

  const {
    control,
    handleSubmit,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      selectedImages: null,
      selectedThemes: [],
      selectedSuggestions: [],
    },
    resolver: yupResolver(validationSchema),
  });

  const handlePublish = async () => {
    try {
      setPublishLoading(true);
      const {
        title,
        description,
        selectedSuggestions,
        selectedThemes,
        selectedImages,
      } = getValues();

      const result = await uploadMultipleFiles(selectedImages);
      const images = result?.files.map((file) => file.url);

      const res = await axios.post(`${BASE_URL}/api/v1/collab-template`, {
        title,
        description,
        images,
        platformType: selectedSuggestions,
        tags: selectedThemes,
        source: COLLAB_SOURCE.internal,
      });

      if (res.data.status === 'success') {
        generateSnackbar('Collab template created successfully', 'success');

        router.push(`/collab/template/${res.data.collabTemplate.identifier}`);
      }
      setPublishLoading(false);
    } catch (err) {
      generateSnackbar(
        err?.response?.data?.message || 'Something went wrong',
        'error',
      );
      setPublishLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handlePublish)}>
      <Box>
        <FlexBox
          justifyContent="space-between"
          px={4}
          pb={4}
          pt={5}
          borderBottom={`1px solid ${theme.palette.borderLight}`}
        >
          <AddProjectMainHeader>{t('Collab Template')}</AddProjectMainHeader>
          <ActionsContainer>
            <Box />
            {!isMobileView && (
              <ActionsWrap>
                <PrimaryButton
                  width="190px"
                  height={50}
                  disabled={publishLoading}
                  marginLeft={8}
                  fontSize={16}
                  onClick={async () => {
                    await handleSubmit(handlePublish)();
                  }}
                  type="submit"
                >
                  {publishLoading ? <SmallSpinner /> : 'Publish'}
                </PrimaryButton>
              </ActionsWrap>
            )}
          </ActionsContainer>
        </FlexBox>

        <MainContainer>
          <CreateCollabMainHeader>{t('Collab Details')}</CreateCollabMainHeader>
          <Grid container my={6}>
            <Grid item lg={2.5}>
              <SubHeading>{t('Collab cover')}</SubHeading>
              <InformationDescription mt={2}>
                {t('Collab Media (Recommended Size 600x500')}
                <br />
                {t('pixel .PNG or .JPG)')}
              </InformationDescription>
            </Grid>
            <Grid item lg={6}>
              <DropzoneImagesMultiple
                imageFiles={watch('selectedImages')}
                setImageFiles={(images) => setValue('selectedImages', images)}
              />
            </Grid>
          </Grid>
          <Grid container mb={6}>
            <Grid item lg={2.5} xs={12}>
              <SubHeading>{t('Title')}</SubHeading>
              <InformationDescription mt={2}>
                {t('Write the name of the collab.')}
              </InformationDescription>
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
              <SubHeading>{t('Description')}</SubHeading>
              <InformationDescription mt={2} width="80%">
                {t(
                  'Write a description of the collab, explaining what it’s about or\n            it’s objectives.',
                )}
              </InformationDescription>
            </Grid>
            <Grid item lg={6} xs={12}>
              <Controller
                name="description"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <StyledTextarea
                    value={value}
                    onChange={(e) => onChange(e)}
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
              <SubHeading>{t('Themes')}</SubHeading>
              <InformationDescription mt={2} width="80%">
                {t('Select themes that are related to the collab.')}
              </InformationDescription>
            </Grid>
            <Grid item lg={6} xs={12}>
              <Box mt={2}>
                <Controller
                  name="selectedThemes"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <SearchSelectAutocomplete
                      freeSolo
                      options={themes}
                      getOptionLabel={(option) =>
                        option.input ? option.label : option
                      }
                      onChange={async (e, newValue) => {
                        onChange(
                          newValue.map((option) =>
                            option.input
                              ? option.label
                                  .replace('Enter to add "', '')
                                  .replace('"', '')
                              : option,
                          ),
                        );
                      }}
                      noOptionsText={t('No Results')}
                      value={value}
                      placeholder="Themes (max 5)"
                    />
                  )}
                />
              </Box>
              {errors && errors.selectedThemes && (
                <InformationDescription type="error" my={1}>
                  {errors.selectedThemes.message}
                </InformationDescription>
              )}
            </Grid>
            <Grid container my={6}>
              <Grid item lg={2.5} xs={12}>
                <SubHeading>{t('Categories')}</SubHeading>
                <InformationDescription
                  mt={2}
                  width={isMobileView ? '100%' : '80%'}
                >
                  {t(
                    'Select categories which represent the collab, these will\n            be used to help people search for specific things on the platform.',
                  )}
                </InformationDescription>
              </Grid>
              <Grid item lg={6} xs={12}>
                <Box mb={5}>
                  <Controller
                    name="selectedSuggestions"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <SearchSelectAutocomplete
                        freeSolo
                        value={value}
                        options={suggestions}
                        getOptionLabel={(option) =>
                          option.input ? option.label : option
                        }
                        onChange={async (e, newValue) => {
                          onChange(
                            newValue.map((option) =>
                              option.input
                                ? option.label
                                    .replace('Enter to add "', '')
                                    .replace('"', '')
                                : option,
                            ),
                          );
                        }}
                        noOptionsText={t('No Results')}
                        placeholder="Categories (max 5)"
                      />
                    )}
                  />
                </Box>
                {errors && errors.selectedSuggestions && (
                  <InformationDescription type="error" my={2} ml={1}>
                    {errors?.selectedSuggestions?.message}
                  </InformationDescription>
                )}
              </Grid>
            </Grid>
          </Grid>
        </MainContainer>

        {isMobileView && (
          <Box p={3} mb={2}>
            <ActionsWrap>
              <PrimaryButton
                width="190px"
                height={50}
                disabled={publishLoading}
                marginLeft={8}
                fontSize={16}
                onClick={() => {
                  handlePublish();
                }}
              >
                {publishLoading ? <SmallSpinner /> : 'Publish'}
              </PrimaryButton>
            </ActionsWrap>
          </Box>
        )}
      </Box>
    </form>
  );
};
