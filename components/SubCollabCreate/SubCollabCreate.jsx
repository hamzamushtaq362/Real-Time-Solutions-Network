import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';
import { CreateSubCollabContainer } from './elements';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNotistack } from 'hooks';

import {
  BASE_URL,
  reFetchTokenExpire,
  fetchRefreshToken,
  getCollabIdByTitleIdentifier,
} from 'apis';
import axios from 'axios';
import { useRouter } from 'next/router';

import {
  MainContainer,
  CreateMissionMainHeader,
  InformationDescription,
} from './elements';
import {
  StyledInput,
  DropzoneImagesMultiple,
  PrimaryButton,
  SmallSpinner,
} from '~/components';
import { Grid } from '@mui/material';
import { Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';
import StyledTextarea from 'components/Input/StyledTextarea';
import { LeftHeaderComp } from 'components/CollabCreate/LeftHeaderComp';
import { SecondarybarHeader } from 'components/SecondaryNavbar/elements';

export const SubCollabCreate = () => {
  const { t } = useTranslation();

  // Root Level State
  const router = useRouter();
  const [collabIdentifier, setCollabIdentifier] = useState('');
  const [collabId, setCollabId] = useState('');
  const { collabTitleForSubCollab } = useSelector((state) => state.collab);

  const fetchCollabDetails = async () => {
    try {
      setCollabIdentifier(router.query.collabId);
      const gettingCollabId = await getCollabIdByTitleIdentifier(
        router.query.collabId,
      );
      setCollabId(gettingCollabId);
    } catch (error) {
      generateSnackbar('Error fetching collab title', 'error');
    }
  };

  useEffect(() => {
    fetchCollabDetails();
  }, [collabTitleForSubCollab]);

  useEffect(() => {
    fetchCollabDetails();
  }, []);

  // Loading states

  const [postingSubCollab, setPostingSubCollab] = useState(false);
  const generateSnackbar = useNotistack();

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
  });

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
    },
    resolver: yupResolver(validationSchema),
  });

  const createSubCollab = async () => {
    try {
      setPostingSubCollab(true);
      const { title, description } = getValues();

      const f1 = async () => {
        const formData = new FormData();

        for (let i = 0; i < imageFiles.length; i++) {
          formData.append('media', imageFiles[i]);
        }
        formData.append('title', title);
        formData.append('description', description);

        const res = await axios.post(
          `${BASE_URL}/api/v1/sub-collab/${collabId}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );
        return res;
      };
      const res = await reFetchTokenExpire(f1, fetchRefreshToken);

      if (res.data.status === 'success') {
        generateSnackbar('Work Added successfully', 'success');
        router.push(`/collab/${collabIdentifier}`);
        setPostingSubCollab(false);
      }
    } catch (err) {
      generateSnackbar('Error posting work', 'error');
      setPostingSubCollab(false);
    }
  };

  const onCreateSubCollab = () => {
    handleSubmit(createSubCollab)();
  };

  const [imageFiles, setImageFiles] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  return (
    <CreateSubCollabContainer>
      <SecondarybarHeader>
        <CreateMissionMainHeader>{t('Add New Work')}</CreateMissionMainHeader>

        <PrimaryButton
          restrictHoverStyles
          disabled={postingSubCollab}
          width="120px"
          onClick={onCreateSubCollab}
        >
          {postingSubCollab ? <SmallSpinner /> : 'Submit'}
        </PrimaryButton>
      </SecondarybarHeader>
      <MainContainer>
        <Grid container mt={5} mb={6}>
          <Grid item lg={2.5} xs={12}>
            <LeftHeaderComp
              headerText={'Title'}
              subheader={'Give a title to your Individual Work '}
              subHeaderBreakText={'Contribution to the Collab'}
            />
          </Grid>
          <Grid item lg={6} xs={12}>
            <Grid display="flex" columnGap={1}></Grid>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <StyledInput {...field} fullWidth placeholder="Title" />
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
              headerText={'Details'}
              subheader={t(
                'Add additional details about the Work. How was it created? What is it about?',
              )}
            />
          </Grid>
          <Grid item lg={6} xs={12}>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <StyledTextarea
                  {...field}
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
          <Grid item lg={2.5}>
            <LeftHeaderComp
              headerText={'Media'}
              subheader={'Add Images or Videos showcasing the work.'}
              subHeaderBreakText={
                'Recommended Size for image 600x500 pixel .PNG or .JPG'
              }
            />
          </Grid>
          <Grid item lg={6}>
            <DropzoneImagesMultiple
              imageFiles={imageFiles}
              setImageFiles={setImageFiles}
              imagePreview={imagePreview}
              setImagePreview={setImagePreview}
            />
          </Grid>
        </Grid>
      </MainContainer>
    </CreateSubCollabContainer>
  );
};
