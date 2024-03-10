import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { Box, Grid, useTheme } from '@mui/material';
import {
  StyledInput,
  RadioGroup,
  PrimaryButton,
  SmallSpinner,
} from '~/components';
import {
  CollabOverviewTitle,
  BackText,
  NavigateBack,
} from 'components/CollabDetails/CollabDetailsLayouts/elements';
import { PlusIconWrap } from 'components/Button/NavButtonGroup/elements';
import { SubHeading, InformationDescription } from './elements';
import { Controller, useForm } from 'react-hook-form';
// import { COLLAB_PAYMENT_MODE } from 'constants/collab';
import * as Yup from 'yup';
import { updateCuratorsTabStatus } from '~/redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNotistack, useCollabEditNavigator } from 'hooks';
import { archiveToggle, deleteCollab, updateCollab } from '~/apis';
import { useDispatch } from 'react-redux';
import { UilEdit } from '@iconscout/react-unicons';
import { COLLAB_SOURCE } from 'constants/collab';
import { useRouter } from 'next/router';

export const CollabAdminSettings = ({
  collabDetails,
  setCollabDetails,
  onBack,
}) => {
  const router = useRouter();
  const { t } = useTranslation();
  const theme = useTheme();
  const [isEditButtonHovered, setIsEditButtonHovered] = useState(false);
  const [isCollabArchived, setIsCollabArchived] = useState(
    collabDetails?.isArchive,
  );
  const { onCollabEdit } = useCollabEditNavigator();

  const [loading, setLoading] = useState(false);
  const [archiveLoading, setArchiveLoading] = useState(false);
  const [backHovered, setBackHovered] = useState(false);
  const dispatch = useDispatch();
  const generateSnackbar = useNotistack();

  // const getAvailablePercentageForCurators = () => {
  //   const roles = collabDetails?.roles;
  //   let availablePercetage = 0;
  //   roles?.forEach((role) => {
  //     if (role.paymentMode === COLLAB_PAYMENT_MODE.RevenueSharing) {
  //       availablePercetage += parseInt(role.amount) || 0;
  //     }
  //   });
  //   return 100 - availablePercetage;
  // };

  const validationSchema = Yup.object().shape({
    acceptingMembers: Yup.boolean().required('Required'),
    membersLimit: Yup.number().required('Required'),
    isPrivate: Yup.boolean().required('Required'),
    // enableCuration: Yup.boolean().required('Required'),
    // totalPercentageForCurators: Yup.number()
    //   .required('Required')
    //   .max(
    //     getAvailablePercentageForCurators(),
    //     `Maximum percentage for curators is ${getAvailablePercentageForCurators()}`,
    //   ),
  });

  const {
    control,
    handleSubmit,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      acceptingMembers: collabDetails?.acceptingMembers,
      membersLimit: collabDetails?.membersLimit || 100,
      isPrivate: collabDetails?.isPrivate,
      enableCuration: collabDetails?.enableCuration,
      totalPercentageForCurators:
        collabDetails?.totalPercentageForCurators || 5,
    },
    resolver: yupResolver(validationSchema),
  });

  const booleanOptions = [
    {
      value: 'yes',
      label: 'Yes',
    },
    {
      value: 'no',
      label: 'No',
    },
  ];

  const collabVisibilityOptions = [
    {
      value: 'public',
      label: 'Public',
    },
    {
      value: 'private',
      label: 'Private',
    },
  ];

  const acceptingMembers = watch('acceptingMembers');
  const isPrivate = watch('isPrivate');
  const enableCuration = watch('enableCuration');

  const updateCollabSettings = async () => {
    try {
      setLoading(true);
      const values = getValues();

      const response = await updateCollab({
        id: collabDetails?._id,
        ...values,
      });

      if (response.data.status === 'success') {
        generateSnackbar('Collab settings updated successfully!', 'success');
        dispatch(updateCuratorsTabStatus(enableCuration));
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);

      if (error.response) {
        const errorMessage = error.response.data.message;
        generateSnackbar(errorMessage);
      } else {
        generateSnackbar('Something went wrong!', 'error');
      }
    }
  };

  const onSave = async () => {
    await handleSubmit(updateCollabSettings)();
  };

  const archiveCollabToggler = async () => {
    setArchiveLoading(true);

    const res = await archiveToggle(collabDetails?.identifier);

    if (res?.data?.status === 'success') {
      setIsCollabArchived(
        res?.data?.archiveStatus === 'archived' ? true : false,
      );

      setCollabDetails({
        ...collabDetails,
        isArchive: res?.data?.archiveStatus === 'archived' ? true : false,
      });

      generateSnackbar(
        res?.data?.archiveStatus === 'archived'
          ? 'Collab archived successfully!'
          : 'Collab unarchived successfully!',
        'success',
      );
    }

    setArchiveLoading(false);
  };
  const deleteCollabHandler = async () => {
    const res = await deleteCollab(collabDetails?.identifier);

    if (res?.data?.status === 'success') {
      router.push('/collab/explore?view=created');
      generateSnackbar('Collab deleted successfully!', 'success');
    } else {
      generateSnackbar('Something went wrong!', 'error');
    }
  };

  useEffect(() => {
    if (!enableCuration) {
      setValue('totalPercentageForCurators', 0);
    }
  }, [enableCuration]);

  return (
    <Box p={4} pt={0}>
      {onBack && (
        <Box width="100%" mt={2}>
          <NavigateBack
            onClick={onBack}
            onMouseEnter={() => setBackHovered(true)}
            onMouseLeave={() => setBackHovered(false)}
          >
            <PlusIconWrap hovered={backHovered}>←</PlusIconWrap>
            <BackText>back</BackText>
          </NavigateBack>
        </Box>
      )}

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <CollabOverviewTitle>{t('Settings')}</CollabOverviewTitle>
        <PrimaryButton width="130px" onClick={onSave} disabled={loading}>
          {loading ? <SmallSpinner /> : 'Save'}
        </PrimaryButton>
      </Box>

      {/* Edit Collab */}

      <Grid container mb={6}>
        <Grid item lg={2.5} xs={12}>
          <SubHeading>{t('Edit Collab')}</SubHeading>
        </Grid>
        <Grid item lg={6} xs={12}>
          <PrimaryButton
            onClick={() => onCollabEdit(collabDetails)}
            width={'160px'}
            onMouseEnter={() => setIsEditButtonHovered(true)}
            onMouseLeave={() => setIsEditButtonHovered(false)}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              columnGap: '4px',
            }}
          >
            <UilEdit
              size={20}
              color={
                isEditButtonHovered
                  ? theme?.palette?.background?.inverse
                  : theme?.palette?.background?.default
              }
            />
            <span>Edit</span>
          </PrimaryButton>
        </Grid>
      </Grid>

      {/* Accepting Members */}

      {collabDetails?.source === COLLAB_SOURCE.internal && (
        <Grid container mb={6}>
          <Grid item lg={2.5} xs={12}>
            <SubHeading>{t('Accepting Members')}</SubHeading>
            <InformationDescription mt={2} width="80%">
              {t('Select acceptance')}
            </InformationDescription>
          </Grid>
          <Grid item lg={6} xs={12}>
            <RadioGroup
              options={booleanOptions}
              currentValue={acceptingMembers ? 'yes' : 'no'}
              updateCurrentValue={(updatedValue) =>
                setValue('acceptingMembers', updatedValue === 'yes')
              }
            />
          </Grid>
        </Grid>
      )}

      {/* Maximum Collaborators */}
      {collabDetails?.source === COLLAB_SOURCE.internal && (
        <Grid container mt={5} mb={6}>
          <Grid item lg={2.5} xs={12}>
            <Box sx={{ maxWidth: '210px' }}>
              <SubHeading>{t('Maximum Collaborators')}</SubHeading>
              <InformationDescription mt={2}>
                {t(
                  'Enter maximum number of collaborators who can join collabs',
                )}
              </InformationDescription>
            </Box>
          </Grid>
          <Grid item lg={6} xs={12}>
            <Grid display="flex" columnGap={1}>
              <InformationDescription mb={2}>
                {t('Number of maximum collaborators')}
              </InformationDescription>
            </Grid>
            <Controller
              name="membersLimit"
              control={control}
              render={({ field }) => (
                <StyledInput
                  {...field}
                  type="number"
                  fullWidth
                  placeholder={t('Enter Number')}
                />
              )}
            />
            {errors && errors.membersLimit && (
              <InformationDescription type="error" my={1}>
                {errors.membersLimit.message}
              </InformationDescription>
            )}
          </Grid>
        </Grid>
      )}

      {/* Collabs Visibility */}
      <Grid container mb={6}>
        <Grid item lg={2.5} xs={12}>
          <SubHeading>{t('Collab Visibility')}</SubHeading>
          <InformationDescription mt={2} width="80%">
            {t('Select vibility')}
          </InformationDescription>
        </Grid>
        <Grid item lg={6} xs={12}>
          <RadioGroup
            options={collabVisibilityOptions}
            currentValue={isPrivate ? 'private' : 'public'}
            updateCurrentValue={(updatedValue) =>
              setValue('isPrivate', updatedValue === 'private')
            }
          />
        </Grid>
      </Grid>

      {/* Archive Collab */}

      <Grid container mb={6}>
        <Grid item lg={2.5} xs={12}>
          <SubHeading>
            {t(`${isCollabArchived ? 'Unarchive' : 'Archive'} Collab`)}
          </SubHeading>
        </Grid>
        <Grid item lg={6} xs={12}>
          <PrimaryButton
            disabled={archiveLoading}
            onClick={() => archiveCollabToggler()}
            width={'160px'}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              columnGap: '4px',
            }}
          >
            {!archiveLoading ? (
              <span>{isCollabArchived ? 'Unarchive' : 'Archive'}</span>
            ) : (
              <SmallSpinner />
            )}
          </PrimaryButton>
        </Grid>
      </Grid>
      {/* Delete Collab */}

      <Grid container mb={6}>
        <Grid item lg={2.5} xs={12}>
          <SubHeading>{t('Delete Collab')}</SubHeading>
        </Grid>
        <Grid item lg={6} xs={12}>
          <PrimaryButton
            onClick={() => deleteCollabHandler()}
            width={'160px'}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              columnGap: '4px',
            }}
          >
            <span>Delete</span>
          </PrimaryButton>
        </Grid>
      </Grid>
      {/* Enable  Curation */}

      {/* <Grid container mb={6}>
        <Grid item lg={2.5} xs={12}>
          <SubHeading>{t('Enable Curation')}</SubHeading>
          <InformationDescription mt={2} width="80%">
            {t('Select curation status')}
          </InformationDescription>
        </Grid>
        <Grid item lg={6} xs={12}>
          <RadioGroup
            options={booleanOptions}
            currentValue={enableCuration ? 'yes' : 'no'}
            updateCurrentValue={(updatedValue) =>
              setValue('enableCuration', updatedValue === 'yes')
            }
          />
        </Grid>
      </Grid> */}

      {/* Maximum Curators Score */}

      {/* {enableCuration && (
        <Grid container mt={5} mb={6}>
          <Grid item lg={2.5} xs={12}>
            <Box sx={{ maxWidth: '210px' }}>
              <SubHeading>{t('Maximum curators share')}</SubHeading>
              <InformationDescription mt={2}>
                {t('Enter maximum % of Curator Share')}
              </InformationDescription>
            </Box>
          </Grid>
          <Grid item lg={6} xs={12}>
            <Grid display="flex" columnGap={1}>
              <InformationDescription mb={2}>
                {`Percentage of maximum curator share (available ${getAvailablePercentageForCurators()}%)`}
              </InformationDescription>
            </Grid>
            <Controller
              name="totalPercentageForCurators"
              control={control}
              render={({ field }) => (
                <StyledInput
                  {...field}
                  type="number"
                  fullWidth
                  placeholder={t('Enter Number')}
                />
              )}
            />
            {errors && errors.totalPercentageForCurators && (
              <InformationDescription type="error" my={1}>
                {errors.totalPercentageForCurators.message}
              </InformationDescription>
            )}
          </Grid>
        </Grid>
      )} */}
    </Box>
  );
};
