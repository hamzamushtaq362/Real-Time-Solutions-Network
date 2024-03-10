import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';
import { Box, useTheme } from '@mui/material';
import { useNotistack } from '~/hooks';
import {
  BASE_URL,
  createMultipleCollabs,
  createSingleCollab,
  fetchRefreshToken,
  reFetchTokenExpire,
  uploadMultipleFiles,
} from '~/apis';
import InformationPage from './InformationPage/InformationPage';
import axios from 'axios';
import { useRouter } from 'next/router';
import {
  ActionsContainer,
  ActionsWrap,
  AddProjectMainHeader,
} from 'components/CollabCreate/AddProject/elements';
import {
  OutlinedButton,
  PrimaryButton,
  Spinner,
  SmallSpinner,
  ButtonText,
} from '~/components';
import {
  useIsMobileView,
  contructExistingContributedProfilesArray,
} from '~/utils';
import { useForm, FormProvider } from 'react-hook-form';
import * as Yup from 'yup';
import { getCollabDetails } from 'apis';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  COLLAB_SOURCE,
  CollabEventDurationType,
  CollabEventType,
} from '~/constants';
import { FlexBox } from 'components/common/elements';
import { SpinnerContainer } from './elements';

const collabSchemaShape = {
  collabTitle: Yup.string()
    .required('Collab Title is required')
    .min(5, 'Collab Title is too short!')
    .max(50, 'Collab Title is too long!'),
  collabDescription: Yup.string()
    .required('Description is required')
    .min(30, 'Description is too short!')
    .max(3500, 'Description is too long!'),
  link: Yup.string().url('Invalid URL'),
  themes: Yup.array()
    .of(Yup.string())
    .min(1, 'At least 1 theme is required')
    .max(5, 'Max 5 themes allowed'),
  selectedSuggestions: Yup.array()
    .of(Yup.string())
    .min(1, 'At least 1 suggestion is required')
    .max(5, 'Max 5 suggestions allowed'),
  selectedPlatforms: Yup.array()
    .of(Yup.string())
    .max(5, 'Max 5 platforms allowed')
    .when('selectedSuggestions', {
      is: (selectedSuggestions) =>
        selectedSuggestions && selectedSuggestions.includes('Physical'),
      then: Yup.array().max(5, 'Max 5 platforms allowed'),
      otherwise: Yup.array()
        .min(1, 'At least 1 platform is required')
        .required('At least 1 platform is required'),
    }),
  collabLocationCoordinates: Yup.object().when('collabLocation', {
    is: (location) => !!location, // Apply validation when collabLocation is present
    then: Yup.object().shape({
      latitude: Yup.number().required('Latitude is required'),
      longitude: Yup.number().required('Longitude is required'),
    }),
  }),
  locationPlaceId: Yup.string().when('collabLocation', {
    is: (location) => !!location, // Apply validation when collabLocation is present
    then: Yup.string().required('Place ID is required'),
  }),
  releases: Yup.array().of(
    Yup.object().shape({
      title: Yup.string().required('Title is required'),
      link: Yup.string().url('Invalid URL').required('Link is required'),
      instructions: Yup.string().required('Instructions are required'),
    }),
  ),
};

const collabItemSchema = Yup.object().shape(collabSchemaShape);
const eventSchemaShape = {
  title: Yup.string()
    .required('Title is required')
    .min(5, 'Title is too short!')
    .max(50, 'Too Long!'),
  // selectedImages: Yup.string(),
  description: Yup.string()
    .required('Description is required')
    .min(30, 'Description is too short!')
    .max(3500, 'Too Long!'),
  mode: Yup.string().required('Mode is required'),
  location: Yup.string().when('mode', {
    is: (modeValue) => ['physical', 'hybrid'].includes(modeValue),
    then: Yup.string().required('Location is required'),
    otherwise: Yup.string().nullable(),
  }),
  locationCoordinates: Yup.object().when('location', {
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
  durationType: Yup.string().required('Duration type is required'),
  duration: Yup.array()
    .when('durationType', {
      is: 'timeBound',
      then: Yup.array().of(
        Yup.object().shape({
          startDate: Yup.date()
            .required('Duration date is required')
            .nullable(),
          endDate: Yup.date().required('Duration date is required'),
        }),
      ),
      otherwise: Yup.array().of(
        Yup.object().shape({
          startDate: Yup.date().nullable(),
          endDate: Yup.date().nullable(),
        }),
      ),
    })
    .required('Duration is required')
    .min(1, 'Duration is required')
    .max(1, 'Only one duration object is allowed'),
  // currentParticipantDetails: Yup.object().shape({
  //   type: Yup.string(),
  //   email: Yup.string(),
  //   role: Yup.string().when('email', {
  //     is: (emailValue) => !!emailValue && emailValue.trim().length > 0,
  //     then: Yup.string().required('Role is required'),
  //     otherwise: Yup.string().notRequired(),
  //   }),
  //   user: Yup.mixed().nullable(),
  // }),
};

const createValidationSchema = (role) => {
  let schema = {};
  switch (role) {
    case 'Collaborator':
      schema = {
        ...schema,
        ...collabSchemaShape,
      };
      break;
    case 'Event Host':
      schema = {
        ...schema,
        ...eventSchemaShape,
        collabList: Yup.array().of(collabItemSchema),
      };
      break;
    default:
      schema = {
        ...schema,
        ...collabSchemaShape,
      };
      break;
  }

  return Yup.object().shape(schema);
};

export const CreateCollabExternal = ({ isEdit, editCollabIdentifier }) => {
  const { t } = useTranslation();

  const router = useRouter();
  const isMobileView = useIsMobileView();
  const generateSnackbar = useNotistack();
  const [publishLoading, setPublishLoading] = useState(false);
  const [savingDraft, setSavingDraft] = useState(false);
  const [contributedProfiles, setContributedProfiles] = useState([]);
  const [fetchingEditCollabDetails, setFetchingEditCollabDetails] = useState(
    !!isEdit,
  );
  const [currentEditCollabId, setCurrentEditCollabId] = useState(null);
  const [invitedMembers, setInvitedMembers] = useState([]); // TODO: Remove this state once we have invited members in the backend
  const [editCollabDetails, setEditedCollabDetails] = useState(null);
  const [isContributedCollabEditCase, setIsContributedCollabEditCase] =
    useState(false);
  const [validationSchema, setValidationSchema] = useState(
    createValidationSchema('Collaborator'),
  );

  const theme = useTheme();

  const methods = useForm({
    defaultValues: {
      role: 'Collaborator',
      collabTitle: '',
      collabDescription: '',
      link: '',
      themes: [],
      selectedImages: [],
      selectedPlatforms: [],
      selectedCoCreators: [],
      selectedSuggestions: [],
      achievements: [],
      featuredIn: [],
      releases: [],
      collabLocation: '',

      title: '',
      description: '',
      mode: CollabEventType.physical,
      location: '',
      durationType: CollabEventDurationType.timeBound,
      duration: [
        {
          startDate: null,
          endDate: null,
          key: 'selection',
        },
      ],
      participants: [],
      currentParticipantDetails: {
        type: 'email',
        email: '',
        role: '',
        user: null,
      },
      collabList: [
        {
          collabTitle: '',
          collabDescription: '',
          link: '',
          themes: [],
          selectedImages: [],
          selectedPlatforms: [],
          selectedCoCreators: [],
          selectedSuggestions: [],
          achievements: [],
          featuredIn: [],
          releases: [],
          collabLocation: '',
        },
      ],
    },
    resolver: yupResolver(validationSchema),
  });
  const { watch, getValues, setValue, handleSubmit } = methods;

  const role = watch('role');

  useEffect(() => {
    setValidationSchema(createValidationSchema(role));
  }, [role]);

  const handleContributeProfiles = (profiles) => {
    setContributedProfiles(profiles);
  };

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
  const getCreatorRole = () => {
    switch (role) {
      case 'Collaborator':
        return 'collaborator';
      case 'Contributor':
        return 'contributor';
      case 'Event Host':
        return 'event-host';

      default:
        return 'collaborator';
    }
  };
  const createCollab = async (status = 'live') => {
    try {
      let statusValue;
      if (status === 'draft') {
        statusValue = 'draft';
      } else {
        statusValue = 'live';
        setPublishLoading(true);
      }

      if (role === 'Event Host') {
        const collabList = getValues('collabList');
        const collabs = collabList.map((collab) => ({
          title: collab.collabTitle,
          description: collab.collabDescription,
          projectLink: collab.link,
          members: collab?.selectedCoCreators?.map((user) => {
            return typeof user === 'string'
              ? { type: 'externalUser', label: user }
              : user;
          }),
          tags: collab.themes,
          platform: collab.selectedPlatforms,
          platformType: collab.selectedSuggestions,
          source: COLLAB_SOURCE.external,
          isContributedCollab: true,
          contributedProfiles: contributedProfiles,
          collabLocation: collab.collabLocation,
          collabLocationCoordinates: collab.collabLocationCoordinates,
          locationPlaceId: collab.locationPlaceId,
          achievements: collab.achievements,
          releases: collab.releases,
          featuredIn: collab.featuredIn,
          creatorRole: getCreatorRole(role),
          images: collab.selectedImages,
          status: statusValue,
        }));
        const results = await createMultipleCollabs(collabs);

        const {
          title,
          description,
          link,
          mode,
          location,
          locationCoordinates,
          locationPlaceId,
          durationType,
          duration,
          participants,
        } = getValues();

        const eventPayload = {
          title,
          description,
          link,
          mode,
          durationType,
          durationStart: duration[0]?.startDate,
          durationEnd: duration[0]?.endDate,
          eventHostedCollabs: results?.map((res) => res?.data?.data?._id),
          participants,
        };

        if (mode !== CollabEventType.virtual) {
          if (location) {
            eventPayload.location = location;
            eventPayload.locationCoordinates = locationCoordinates;
            eventPayload.locationPlaceId = locationPlaceId;
          }
        }

        const createEvent = async () => {
          return await axios.post(
            `${BASE_URL}/api/v1/collab-event`,
            eventPayload,
          );
        };
        const eventRes = await reFetchTokenExpire(
          createEvent,
          fetchRefreshToken,
        );

        if (eventRes?.data?.status === 'success') {
          if (status === 'live') {
            generateSnackbar('Event created successfully', 'success');
            router.push(`/events/${eventRes.data.collabEvent.identifier}`);
          } else {
            generateSnackbar('Draft saved successfully', 'success');
          }
        }
        setPublishLoading(false);
      } else {
        // Single Collab Creation
        const {
          collabTitle,
          collabDescription,
          link,
          themes,
          selectedImages,
          selectedPlatforms,
          selectedCoCreators,
          selectedSuggestions,
          achievements,
          featuredIn,
          releases,
          collabLocation,
          collabLocationCoordinates,
          locationPlaceId,
        } = getValues();
        const members = selectedCoCreators.map((user) => {
          return typeof user === 'string'
            ? { type: 'externalUser', label: user }
            : user;
        });
        const collab = {
          title: collabTitle,
          description: collabDescription,
          projectLink: link,
          members,
          tags: themes,
          platform: selectedPlatforms,
          platformType: selectedSuggestions,
          source: COLLAB_SOURCE.external,
          isContributedCollab: role === 'Contributor',
          contributedProfiles: contributedProfiles,
          collabLocation,
          locationCoordinates: collabLocationCoordinates,
          locationPlaceId,
          achievements,
          releases,
          featuredIn,
          creatorRole: getCreatorRole(role),
          images: selectedImages,
          status: statusValue,
        };

        const res = await createSingleCollab(collab);

        if (res.data.status === 'success') {
          if (status === 'live') {
            generateSnackbar('Collab created successfully', 'success');
            router.push(`/collab/${res.data.data.identifier}`);
          } else {
            generateSnackbar('Draft saved successfully', 'success');
          }
        }
        setPublishLoading(false);
      }
    } catch (err) {
      setPublishLoading(false);
    }
  };

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
        collabLocationCoordinates,
        locationPlaceId,
        achievements,
        featuredIn,
        releases,
      } = getValues();

      const members = selectedCoCreators.map((user) => {
        return typeof user === 'string'
          ? { type: 'externalUser', label: user }
          : user;
      });

      const payload = {
        id: currentEditCollabId,
        title,
        description,
        projectLink: link,
        members,
        tags: themes,
        platform: selectedPlatforms,
        platformType: selectedSuggestions,
        source: COLLAB_SOURCE.external,
        isContributedCollab:
          contributedProfiles.length > 0 || isContributedCollabEditCase,
        contributedProfiles: contributedProfiles,
        collabLocation,
        collabLocationCoordinates,
        locationPlaceId,
        achievements,
        status: statusValue,
        releases,
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
      } else if (urlImages.length > 0) {
        payload.images = urlImages;
      } else {
        payload.images = [];
      }

      if (featuredIn && featuredIn.length > 0) {
        if (featuredIn[0].title !== '' && featuredIn[0].url !== '') {
          payload.featuredIn = featuredIn;
        }
      }

      const res = await axios.patch(`${BASE_URL}/api/v1/collab`, payload);

      if (res.data.status === 'success') {
        if (status === 'live') {
          generateSnackbar('Collab updated successfully', 'success');
          router.push(`/collab/${res.data.collab.identifier}`);
        } else {
          generateSnackbar('Draft saved successfully', 'success');
          router.push(
            `/collab/${res.data.collab.identifier}/edit?source=external`,
          );
        }
      }

      setPublishLoading(false);
    } catch (err) {
      setPublishLoading(false);
    }
  };

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

      if (collab?.isContributedCollab) {
        const existingProfiles =
          contructExistingContributedProfilesArray(collab);
        setContributedProfiles(existingProfiles);
      }

      // TODO: Refactor the DRY approach
      setCurrentEditCollabId(collab?._id);
      setValue('collabTitle', collab?.title);
      setValue('collabDescription', collab?.description);
      setValue('selectedImages', collab?.images);
      setValue('link', collab?.projectLink);
      setValue('themes', collab?.tags);
      setValue('selectedSuggestions', collab?.platformType);
      setValue('selectedPlatforms', collab?.platform);
      setValue('achievements', collab?.achievements);
      setValue('featuredIn', collab?.featuredIn);
      setValue('collabLocation', collab?.collabLocation);

      const transformedReleases = collab?.releases?.map((release) => {
        return {
          ...release,
          isSaved: true,
        };
      });

      if (collab?.collabLocation) {
        setValue('collabLocationCoordinates', {
          latitude: collab?.collabLocationCoordinates?.coordinates[0],
          longitude: collab?.collabLocationCoordinates?.coordinates[1],
        });
        setValue('locationPlaceId', collab?.locationPlaceId);
      }

      setValue('releases', transformedReleases);

      if (collab?.members?.length > 0) {
        setInvitedMembers(collab?.members);
      }
    }
    setIsContributedCollabEditCase(collab?.isContributedCollab);
    setFetchingEditCollabDetails(false);
  };

  useEffect(() => {
    if (isEdit) {
      setExistingCollabValues();
    }
  }, [isEdit]);

  const handleCollabUpdate = async () => {
    await handleSubmit(() => (isEdit ? handleCollabEdit() : createCollab()))();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={(e) => e.preventDefault()}>
        <Box>
          <FlexBox
            justifyContent="space-between"
            px={4}
            pb={3.5}
            pt={3.5}
            borderBottom={`1px solid ${theme.palette.borderLight}`}
          >
            <AddProjectMainHeader>
              {t(isEdit ? 'Update Existing Collab' : 'Add Existing Collab')}
            </AddProjectMainHeader>
            <ActionsContainer>
              <Box />
              {!isMobileView && (
                <ActionsWrap>
                  <ButtonText
                    disabled={savingDraft}
                    onClick={handleDraftSave}
                    sx={{ width: 100, marginRight: 3 }}
                  >
                    {savingDraft ? (
                      <SmallSpinner inverse={true} />
                    ) : (
                      'Save Draft'
                    )}
                  </ButtonText>
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
            <InformationPage
              contributedProfiles={contributedProfiles}
              invitedMembersUserIds={
                invitedMembers?.length > 0
                  ? invitedMembers.map((member) => member.user._id)
                  : []
              }
              {...{ handleContributeProfiles, isEdit }}
            />
          ) : (
            <SpinnerContainer>
              <Spinner size={20} />
            </SpinnerContainer>
          )}

          {isMobileView && (
            <Box p={3} mb={2}>
              <ActionsWrap>
                {editCollabDetails?.status !== 'live' && (
                  <OutlinedButton
                    disabled={savingDraft}
                    width="190px"
                    height={50}
                    fontSize={16}
                    onClick={handleDraftSave}
                  >
                    {savingDraft ? (
                      <SmallSpinner inverse={true} />
                    ) : (
                      'Save Draft'
                    )}
                  </OutlinedButton>
                )}
                <PrimaryButton
                  width="190px"
                  height={50}
                  disabled={publishLoading}
                  marginLeft={8}
                  fontSize={16}
                  onClick={handleCollabUpdate}
                >
                  {publishLoading ? <SmallSpinner /> : 'Publish'}
                </PrimaryButton>
              </ActionsWrap>
            </Box>
          )}
        </Box>
      </form>
    </FormProvider>
  );
};
