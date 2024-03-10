import { useTranslation } from 'react-i18next';
import React, { useContext, useEffect, useState } from 'react';
import { Box, useTheme } from '@mui/material';
import { SmallSpinner } from '~/components';
import { useNotistack } from '~/hooks';
import {
  getCollectiveDetailsByLink,
  uploadMultipleFiles,
  getCollabDetails,
  BASE_URL,
  reFetchTokenExpire,
  fetchRefreshToken,
} from '~/apis';
import { SpinnerContainer } from './elements';
import InformationPage from './InformationPage/InformationPage';
import { useRouter } from 'next/router';
import {
  ActionsContainer,
  ActionsWrap,
  AddProjectMainHeader,
} from 'components/CollabCreate/AddProject/elements';
import { OutlinedButton, PrimaryButton, Spinner } from '~/components';
import { useIsMobileView } from '~/utils';
import { FlexBox } from 'components/common/elements';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import AppContext from 'context/AppContext';
import { COLLAB_SOURCE } from 'constants/collab';
import axios from 'axios';

// React hook form related code
const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required('Title is required')
    .min(5, 'Title is too short!')
    .max(50, 'Too Long!'),
  description: Yup.string()
    .required('Introduction is required')
    .min(30, 'Introduction is too short!')
    .max(700, 'Too Long!'),
  link: Yup.string(),
  selectedThemes: Yup.array()
    .of(Yup.string())
    .min(1, 'At least 1 theme is required')
    .required('At least 1 theme is required'),
  selectedSuggestions: Yup.array()
    .of(Yup.string())
    .min(1, 'At least 1 category is required')
    .max(5, 'Max 5 categories allowed'),
  selectedPlatforms: Yup.array()
    .of(Yup.string())
    .max(5, 'Max 5 platforms allowed')
    .when('selectedSuggestions', {
      is: (selectedSuggestions) =>
        selectedSuggestions && selectedSuggestions.includes('Physical'),
      then: Yup.array().max(5, 'Max 5 platforms allowed'), // If platformType (selected suggestion) includes 'Physical', don't enforce at least 1 platform required
      otherwise: Yup.array()
        .min(1, 'At least 1 platform is required')
        .required('At least 1 platform is required'),
    }),
  collabLocation: Yup.string(),
  locationCoordinates: Yup.object().when('collabLocation', {
    is: (location) => !!location, // Apply validation when collabLocation is present
    then: Yup.object().shape({
      latitude: Yup.number().required('Latitude is required'),
      longitude: Yup.number().required('Longitude is required'),
    }),
  }),
  locationPlaceId: Yup.string().when('location', {
    is: (location) => !!location, // Apply validation when collabLocation is present
    then: Yup.string().required('Place ID is required'),
  }),
});

const CreateCollectiveProject = ({
  collectiveLink,
  isEdit,
  editCollabIdentifier,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const router = useRouter();
  const isMobileView = useIsMobileView();
  const generateSnackbar = useNotistack();
  const { user } = useContext(AppContext);

  const [savingDraft, setSavingDraft] = useState(false);
  const [publishLoading, setPublishLoading] = useState(false);
  const [collectiveData, setCollectiveData] = useState(null);
  const [fetchingEditCollabDetails, setFetchingEditCollabDetails] = useState(
    !!isEdit,
  );
  const [currentEditCollabId, setCurrentEditCollabId] = useState(null);
  const [uploadedCollabImages, setUploadedCollabImages] = useState([]);
  const [uploadedCompressedCollabImages, setUploadedCompressedCollabImages] =
    useState([]);
  const [editCollabDetails, setEditedCollabDetails] = useState(null);

  const methods = useForm({
    defaultValues: {
      title: '',
      description: '',
      selectedImages: [],
      link: '',
      selectedPlatforms: [],
      selectedSuggestions: [],
      selectedThemes: [],
      selectedCoCreators: [],
      featuredIn: [],
      achievements: [],
      currentStep: 1,
      collabLocation: '',
    },
    resolver: yupResolver(validationSchema),
  });
  const { control, handleSubmit, watch, getValues, setValue, trigger, formState: { errors }, } = methods;

  const steps = ['Information'];

  const { currentStep } = watch();

  useEffect(() => {
    const getData = async () => {
      try {
        const collectiveResponse = await getCollectiveDetailsByLink(
          collectiveLink,
        );
        if (collectiveResponse?.admin?._id !== user?.userId) {
          router.push(`/team/${collectiveLink}`);
        }
        setCollectiveData(collectiveResponse);
      } catch (e) {
        generateSnackbar(
          'An error occurred while fetching collective details',
          'error',
        );
      }
    };
    if (collectiveLink) {
      getData();
    }
  }, [collectiveLink]);

  const handleDraftSave = async () => {
    try {
      setSavingDraft(true);

      if (!isEdit) {
        await createCollab('draft');
      } else {
        await handleCollabEdit('draft');
      }

      setSavingDraft(false);
    } catch (err) {
      generateSnackbar('Error saving draft', 'error');
      setSavingDraft(false);
    }
  };

  const createCollab = async (status = 'live') => {
    let statusValue;
    if (status === 'draft') {
      statusValue = 'draft';
    } else {
      statusValue = 'live';
      setPublishLoading(true);
    }
    const {
      title,
      description,
      link,
      selectedCoCreators,
      selectedSuggestions,
      selectedThemes,
      featuredIn,
      achievements,
      selectedPlatforms,
      collabLocation,
      locationCoordinates,
      locationPlaceId,
    } = getValues();
    try {
      const coCreators = selectedCoCreators.map((user) => {
        return typeof user === 'string'
          ? { type: 'externalUser', label: user }
          : user;
      });

      const payload = {
        collective: collectiveData?._id,
        title,
        description,
        projectLink: link,
        members: coCreators,
        platform: selectedPlatforms,
        platformType: selectedSuggestions,
        tags: selectedThemes,
        source: COLLAB_SOURCE.collective,
        isPrivate: false,
        achievements,
        collabLocation,
        locationCoordinates,
        locationPlaceId,
        status: statusValue,
      };

      if (featuredIn && featuredIn.length > 0) {
        if (featuredIn[0].title !== '' && featuredIn[0].url !== '') {
          payload.featuredIn = featuredIn;
        }
      }

      if (uploadedCollabImages.length > 0) {
        payload.images = uploadedCollabImages;
      }

      if (uploadedCompressedCollabImages.length > 0) {
        payload.compressedImages = uploadedCompressedCollabImages;
      }

      const f1 = async () => {
        return await axios.post(`${BASE_URL}/api/v1/collab`, payload);
      };
      const res = await reFetchTokenExpire(f1, fetchRefreshToken);

      if (res.data.status === 'success') {
        if (status === 'live') {
          generateSnackbar('Collab created successfully', 'success');
          router.push(`/collab/${res.data.data.identifier}`);
        } else {
          generateSnackbar('Draft saved successfully', 'success');

          router.push(
            `/collab/${res.data.data.identifier}/edit?source=collective`,
          );
        }
      }
      setPublishLoading(false);
    } catch (err) {
      setPublishLoading(false);
    }
  };

  const disabledNext = publishLoading || savingDraft;
  const isFinalStep = steps?.length === currentStep;

  const fetchCollabDetails = async () => {
    try {
      const res = await getCollabDetails(editCollabIdentifier);
      if (res.status === 'success') {
        const collab = res.data.collab;
        return collab;
      }
    } catch (error) {
      generateSnackbar('Error fetching collab title', 'error');
    }
  };

  // For the case of edit collab
  const setExistingCollabValues = async () => {
    setFetchingEditCollabDetails(true);
    const collab = await fetchCollabDetails();

    if (collab) {
      setEditedCollabDetails(collab);
      // TODO: Refactor the DRY approach
      setCurrentEditCollabId(collab?._id);
      setValue('title', collab?.title);
      setValue('description', collab?.description);
      setValue('selectedImages', collab?.images);
      setUploadedCollabImages(collab?.images);
      setUploadedCompressedCollabImages(collab?.compressedImages);
      setValue('link', collab?.projectLink);
      setValue('selectedThemes', collab?.tags);
      setValue('selectedSuggestions', collab?.platformType);
      setValue('selectedPlatforms', collab?.platform);
      setValue('featuredIn', collab?.featuredIn);
      setValue('achievements', collab?.achievements);
      setValue('collabLocation', collab?.collabLocation);
      // Set the roles related array:
      const roles = collab?.roles.map((role) => {
        return { ...role, alreadyAdded: true };
      });

      setValue('roles', roles);

      if (collab?.collabLocation) {
        setValue('locationCoordinates', {
          latitude: collab?.locationCoordinates?.coordinates[0],
          longitude: collab?.locationCoordinates?.coordinates[1],
        });

        setValue('locationPlaceId', collab?.locationPlaceId);
      }

      setValue('finalRolesArray', collab?.roles);
      setCollectiveData({
        title: collab?.associatedTeam?.title,
        image: collab?.associatedTeam?.image,
      });
      setFetchingEditCollabDetails(false);
    }
  };

  useEffect(() => {
    if (isEdit) {
      setExistingCollabValues();
    }
  }, [isEdit]);

  const handleCollabEdit = async (status = 'live') => {
    try {
      let statusValue;
      if (status === 'draft') {
        statusValue = 'draft';
      } else {
        statusValue = 'live';
        setPublishLoading(true);
      }

      setPublishLoading(true);
      const {
        title,
        description,
        link,
        selectedCoCreators,
        selectedSuggestions,
        selectedPlatforms,
        selectedImages,
        themes,
        collabLocation,
        locationCoordinates,
        locationPlaceId,
        achievements,
        featuredIn,
      } = getValues();

      const members = selectedCoCreators.map((user) => {
        return typeof user === 'string'
          ? { type: 'externalUser', label: user }
          : user;
      });

      const payload = {
        collective: collectiveData?._id,
        id: currentEditCollabId,
        title,
        description,
        projectLink: link,
        members,
        tags: themes,
        platform: selectedPlatforms,
        platformType: selectedSuggestions,
        source: COLLAB_SOURCE.collective,
        collabLocation,
        locationCoordinates,
        locationPlaceId,
        achievements,
        status: statusValue,
      };

      const fileImages = selectedImages.filter(
        (image) => typeof image !== 'string',
      ); // Filter out URL strings
      const urlImages = selectedImages.filter(
        (image) => typeof image === 'string',
      ); // Filter only URL strings

      const result = await uploadMultipleFiles(fileImages); // Upload file images

      if (result?.files && result?.files?.length > 0) {
        const uploadedUrls = result.files.map((file) => file.url);
        payload.images = uploadedUrls.concat(urlImages);
        payload.compressedImages = [
          ...editCollabDetails?.compressedImages,
          ...result?.compressedFiles,
        ];
      } else if (urlImages.length > 0) {
        payload.images = urlImages;
        payload.compressedImages = urlImages;
      } else {
        payload.images = [];
        payload.compressedImages = [];
      }

      if (featuredIn && featuredIn.length > 0) {
        if (featuredIn[0].title !== '' && featuredIn[0].url !== '') {
          payload.featuredIn = featuredIn;
        }
      }

      const res = await axios.patch(`${BASE_URL}/api/v1/collab`, payload);

      if (res.data.status === 'success') {
        generateSnackbar('Collab updated successfully', 'success');
        router.push(`/collab/${res.data.collab.identifier}`);
      } else {
        generateSnackbar('Draft saved successfully', 'success');
        router.push(
          `/collab/${res.data.collab.identifier}/edit?source=collective`,
        );
      }

      setPublishLoading(false);
    } catch (err) {
      setPublishLoading(false);
    }
  };

  const selectedImages = watch('selectedImages');

  const uploadCollabImagesOnSelect = async () => {
    const fileImages = selectedImages.filter(
      (image) => typeof image !== 'string',
    ); // Filter out URL strings
    const urlImages = selectedImages.filter(
      (image) => typeof image === 'string',
    ); // Filter only URL strings

    const result = await uploadMultipleFiles(fileImages); // Upload file images

    if (result?.files && result?.files?.length > 0) {
      const uploadedUrls = result.files.map((file) => file.url);
      setUploadedCollabImages(uploadedUrls.concat(urlImages));
      setUploadedCompressedCollabImages(result?.compressedFiles);
    } else if (urlImages.length > 0) {
      setUploadedCollabImages(urlImages);
    } else {
      setUploadedCollabImages([]);
    }
  };

  const handleCollabUpdate = async () => {
    await handleSubmit(() => (isEdit ? handleCollabEdit() : createCollab()))();
  };

  useEffect(() => {
    if (selectedImages.length > 0) {
      uploadCollabImagesOnSelect();
    } else {
      setUploadedCollabImages([]);
    }
  }, [selectedImages]);

  return (
    <FormProvider {...methods}>
      <FlexBox
        justifyContent="space-between"
        px={4}
        pb={3.5}
        pt={3.5}
        borderBottom={`1px solid ${theme.palette.borderLight}`}
      >
        <AddProjectMainHeader>
          {t(isEdit ? 'Update Teams Collab' : 'Create Teams Collab')}
        </AddProjectMainHeader>
        <ActionsContainer>
          <Box />
          {!isMobileView && (
            <ActionsWrap>
              {editCollabDetails?.status !== 'live' && (
                <OutlinedButton
                  disabled={savingDraft}
                  width="190px"
                  height={50}
                  fontSize={16}
                  onClick={handleDraftSave}
                >
                  {savingDraft ? <SmallSpinner inverse={true} /> : 'Save Draft'}
                </OutlinedButton>
              )}
              <PrimaryButton
                width="190px"
                height={50}
                disabled={publishLoading || savingDraft}
                marginLeft={8}
                fontSize={16}
                onClick={handleCollabUpdate}
                type="submit"
              >
                {publishLoading ? (
                  <SmallSpinner />
                ) : isEdit ? (
                  'Save'
                ) : (
                  'Publish'
                )}
              </PrimaryButton>
            </ActionsWrap>
          )}
        </ActionsContainer>
      </FlexBox>

      {!fetchingEditCollabDetails ? (
        <>
          {currentStep === 1 && (
            <InformationPage
              isEdit={isEdit}
              collectiveData={collectiveData}
              {...{
                setValue,
                control,
                watch,
                trigger,
                errors,
              }}
            />
          )}
        </>
      ) : (
        <SpinnerContainer>
          <Spinner size={20} />
        </SpinnerContainer>
      )}

      {isMobileView && (
        <Box p={3} mb={2}>
          <ActionsWrap>
            <OutlinedButton
              disabled={savingDraft && publishLoading}
              width="190px"
              height={50}
              fontSize={16}
              onClick={handleDraftSave}
            >
              {savingDraft ? <SmallSpinner inverse={true} /> : 'Save Draft'}
            </OutlinedButton>
            <PrimaryButton
              width="190px"
              height={50}
              disabled={disabledNext}
              marginLeft={8}
              fontSize={16}
              onClick={handleCollabUpdate}
            >
              {publishLoading ? (
                <SmallSpinner />
              ) : isFinalStep ? (
                'Publish'
              ) : (
                'Next Step'
              )}
            </PrimaryButton>
          </ActionsWrap>
        </Box>
      )}
    </FormProvider>
  );
};

export default CreateCollectiveProject;
