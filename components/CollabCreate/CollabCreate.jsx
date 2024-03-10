import React, { useEffect, useState } from 'react';
import CreateStepperHeader from 'components/CreateStepper/CreateStepperHeader';
import { CreateCollabContainer, SpinnerContainer } from './elements';
import { CollabProjectStep } from './CollabProjectStep';
import { CollabInformationStep } from './CollabInformationStep';
import { CollabCollaboratorsStep } from './CollabCollaboratorsStep';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { pushToSessionData, trackMixPanel } from 'utils';
import { useLocalStorage, useNotistack } from 'hooks';
import { Spinner } from 'components';
import {
  BASE_URL,
  fetchRefreshToken,
  getAiSuggestions,
  getCollabDetails,
  reFetchTokenExpire,
  uploadMultipleFiles,
} from 'apis';
import axios from 'axios';
import { useRouter } from 'next/router';
import useStepsValidation from 'hooks/useStepsValidation';
import { COLLAB_PAYMENT_MODE, COLLAB_SOURCE } from 'constants/collab';
import { getSessionData, removeSessionData } from '~/utils';

import { AICollabSuggestionDialog } from 'components/Dialog/AiCollabSuggestionDialog';
import { useTranslation } from 'react-i18next';
// [x] - Test out the validation errors
// [x] - Test out creating collabs with different users
// [x] - Fix the commented code in the autocomplete component
// [x] - Total percentage validation
// [x] - Create the dialogs for the fixed payment type
// [x] - Create the dialogs for the percentage payment type
// [] - Deal with the invite emails section
// [] - Deal with the invite collective email section
// [x] - Save the draft functionality
// [x] - Replace the collab create route
// [x] - Mobile responsiveness
// [x] - Minor refactoring

export const CollabCreate = ({ isEdit, editCollabIdentifier }) => {
  // Create Collab Step# mappings
  // 1 - Collab
  // 2 - Information
  // 3 - Collaborators

  // Root Level State
  const [isManualTrigger, setIsManualTrigger] = useState(false);

  // Loading states
  const [savingDraft, setSavingDraft] = useState(false);
  const [fetchingEditCollabDetails, setFetchingEditCollabDetails] = useState(
    !!isEdit,
  );
  const [postingCollab, setPostingCollab] = useState(false);
  const [gettingAiSuggestions, setGettingAiSuggestions] = useState(false);
  const [aiDialogPage, setAiDialogPage] = useState(0);
  const [auth] = useLocalStorage('auth');
  const [reimaginedCollabDetails, setReimagedCollabDetails] = useState(null);
  const [isCollabBased, setIsCollabBased] = useState('no');
  const generateSnackbar = useNotistack();
  const router = useRouter();
  const { t } = useTranslation();

  const [currentEditCollabId, setCurrentEditCollabId] = useState(null);
  const [uploadedCollabImages, setUploadedCollabImages] = useState([]);
  const [uploadedCompressedCollabImages, setUploadedCompressedCollabImages] =
    useState([]);
  const [editCollabDetails, setEditedCollabDetails] = useState(null);

  const createCollabSteps = [
    t('Brief'),
    t('Information'),
    t('Collaborators'),
    // t('Curation'),
  ];
  Yup.addMethod(Yup.array, 'totalRolesPercentage', function (message) {
    return this.test('totalRolesPercentage', message, function (roles) {
      const totalPercentage = roles
        .filter(
          (role) => role.paymentMode === COLLAB_PAYMENT_MODE.RevenueSharing,
        )
        .reduce((acc, obj) => {
          return acc + parseInt(obj.amount);
        }, 0);
      return totalPercentage <= 95;
    });
  });

  // React hook form related code
  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required('Title is required')
      .min(5, 'Title is too short!')
      .max(50, 'Too Long!'),
    images: Yup.array().of(Yup.string()).notRequired(),
    description: Yup.string()
      .required('Description is required')
      .min(30, 'Description is too short!')
      .max(3500, 'Too Long!'),
    platformType: Yup.array()
      .of(Yup.string())
      .min(1, 'At least 1 category is required')
      .max(5, 'Max 5 categories allowed')
      .required('At least 1 category is required'),
    themes: Yup.array()
      .of(Yup.string())
      .min(1, 'At least 1 theme is required')
      .max(5, 'Max 5 themes allowed'),
    platform: Yup.array()
      .of(Yup.string())
      .max(5, 'Max 5 platforms allowed')
      .when('platformType', {
        is: (platformType) => platformType && platformType.includes('Physical'),
        then: Yup.array().max(5, 'Max 5 platforms allowed'), // If platformType includes 'physical', don't enforce at least 1 platform required
        otherwise: Yup.array()
          .min(1, 'At least 1 platform is required')
          .required('At least 1 platform is required'),
      }),
    roles: Yup.array()
      .of(Yup.object())
      // .min(1, 'At least 1 role is required')
      .totalRolesPercentage(
        'Total percentage should be less than 100%, adding default 5% to curators',
      ),

    collabLocation: Yup.string(),
    locationCoordinates: Yup.object().when('collabLocation', {
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
    emailInvites: Yup.array()
      .of(Yup.string())
      .test('emailInvites', 'Email invites are not valid', (value) => {
        if (!value) return true;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return value.every((email) => emailRegex.test(email));
      }),
    enableCuration: Yup.boolean(),
    privateCollab: Yup.boolean(),
  });

  const {
    control,
    handleSubmit,
    watch,
    getValues,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      aiCollabBrief: '',
      platformType: [],
      images: [],
      themes: [],
      roles: [],
      roleAbout: '',
      platform: [],
      enableCuration: false,
      privateCollab: false,
      totalPercentageForCurators: 0,
      emailInvites: [],
      currentStep: 1,
      basedOn: '',
      collabLocation: '',
    },
    resolver: yupResolver(validationSchema),
  });

  const {
    currentStep,
    title,
    description,
    platformType,
    themes,
    roles,
    platform,
  } = watch();

  const step1 = ['title', 'description', 'themes'];
  const step2 = ['platformType', 'platform'];
  const step3 = ['roles'];
  const allStepsMandatoryFields = [step1, step2, step3];

  const { errorSteps, completedSteps } = useStepsValidation({
    errors,
    watch,
    allStepsMandatoryFields,
    currentStep,
    dependencies: [
      currentStep,
      title,
      description,
      platformType,
      themes,
      roles,
      platform,
    ],
  });

  // Helpers
  const nextStep = async () => {
    setIsManualTrigger(true);
    if (currentStep === 1) {
      const noError = await trigger(['title', 'description', 'themes']);
      if (!noError) return;
      setValue('currentStep', currentStep + 1, { shouldDirty: true });
    } else if (currentStep === 2) {
      const noError = await trigger(['platformType', 'platform']);
      if (!noError) return;
      setValue('currentStep', currentStep + 1, { shouldDirty: true });
    } else if (currentStep === 3) {
      const noError = await trigger(['roles']);
      if (!noError) return;
      setValue('currentStep', currentStep + 1, { shouldDirty: true });
    }
  };

  const fetchCollabDetails = async () => {
    try {
      const res = await getCollabDetails(editCollabIdentifier);
      if (res.status === 'success') {
        return res.data.collab;
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
      setValue('images', collab?.images);
      setUploadedCollabImages(collab?.images);
      setUploadedCompressedCollabImages(collab?.compressedImages);

      setValue('themes', collab?.tags);
      setValue('platformType', collab?.platformType);
      setValue('platform', collab?.platform);
      if (collab?.basedOn) {
        setReimagedCollabDetails(collab?.basedOn);
        setValue('basedOn', collab?.basedOn?._id);
        setIsCollabBased('yes');
      }
      setValue('privateCollab', collab?.isPrivate);

      setValue('collabLocation', collab?.collabLocation);
      // Set the roles related array:
      const roles = collab?.roles.map((role) => {
        return { ...role, alreadyAdded: true };
      });

      if (collab?.collabLocation) {
        setValue('locationCoordinates', {
          latitude: collab?.locationCoordinates?.coordinates[0],
          longitude: collab?.locationCoordinates?.coordinates[1],
        });
        setValue('locationPlaceId', collab?.locationPlaceId);
      }

      setValue('roles', roles);
      setValue('roles', collab?.roles);
      setFetchingEditCollabDetails(false);
    }
  };

  useEffect(() => {
    if (isEdit) {
      setExistingCollabValues();
    }
  }, [isEdit]);

  const getCollabSuggestion = async () => {
    try {
      setAiDialogPage(1);
      setGettingAiSuggestions(true);
      const response = await getAiSuggestions(watch('aiCollabBrief'));

      if (!response) {
        generateSnackbar('Something went wrong', 'error');
        setGettingAiSuggestions(false);
        setOpenAiDialog(false);
        return;
      }

      if (response?.status === 'success') {
        const collab = response.collab;

        [
          'title',
          'description',
          'platformType',
          'themes',
          'roles',
          'platform',
          'images',
        ].forEach((field) => setValue(field, collab[field]));
        generateSnackbar('AI suggestions fetched successfully', 'success');
        setAiDialogPage(0);
        setOpenAiDialog(false);
      } else if (response?.code === 'DailylimitReached') {
        generateSnackbar(`${response.error}`, 'error');
      } else {
        generateSnackbar('Something went wrong', 'error');
      }
      setGettingAiSuggestions(false);
    } catch (error) {
    } finally {
      setGettingAiSuggestions(false);
    }
  };

  const showCollabSuggestionDialog = () => {
    setOpenAiDialog(true);
  };

  const createCollab = async (formData, status = 'live') => {
    try {
      let statusValue;
      if (status === 'draft') {
        statusValue = 'draft';
      } else {
        statusValue = 'live';
        setPostingCollab(true);
      }

      const {
        title,
        description,
        platformType,
        platform,
        roles,
        privateCollab,
        themes,
        enableCuration,
        totalPercentageForCurators,
        basedOn,
        collabLocation,
        locationCoordinates,
        locationPlaceId,
      } = formData;

      const obj = {
        title,
        description,
        platformType,
        platform,
        roles,
        privateCollab,
        themes,
        enableCuration,
        totalPercentageForCurators,
        collabLocation,
        locationCoordinates,
        locationPlaceId,
        status: statusValue,
      };

      if (basedOn) {
        obj.basedOn = basedOn;
      }

      if (uploadedCollabImages.length > 0) {
        obj.images = uploadedCollabImages;
      }

      if (uploadedCompressedCollabImages.length > 0) {
        obj.compressedImages = uploadedCompressedCollabImages;
      }

      const f1 = async () => {
        return await axios.post(`${BASE_URL}/api/v1/collab`, {
          ...obj,
          isPrivate: privateCollab,
          tags: themes,
          selectedWalletForCollab: auth?.selectedWalletAddress,
          source: COLLAB_SOURCE.internal,
        });
      };
      const res = await reFetchTokenExpire(f1, fetchRefreshToken);

      if (res.data.status === 'success') {
        if (status === 'live') {
          trackMixPanel('New_Collab_Created', {
            collabName: res.data && res.data.data ? res.data.data.title : '',
            creatorName: '',
          });

          generateSnackbar('Collab posted successfully', 'success');
          router.push(`/collab/${res.data.data.identifier}?view=overview`);
          pushToSessionData('dashboard-collabs', res?.data?.data);
          removeSessionData('collab-template-details');
        } else {
          generateSnackbar('Draft saved successfully', 'success');
          router.push(
            `/collab/${res.data.data.identifier}/edit?source=internal`,
          );
        }
      }
      setPostingCollab(false);
    } catch (err) {
      removeSessionData('collab-template-details');
      generateSnackbar('Something went wrong', 'error');
      setPostingCollab(false);
    }
  };

  const updateCollab = async (status = 'live') => {
    try {
      let statusValue;
      if (status === 'draft') {
        statusValue = 'draft';
      } else {
        statusValue = 'live';
        setPostingCollab(true);
      }

      setPostingCollab(true);

      const {
        title,
        description,
        platformType,
        platform,
        roles,
        privateCollab,
        images,
        themes,
        enableCuration,
        totalPercentageForCurators,
        basedOn,
        collabLocation,
        locationCoordinates,
        locationPlaceId,
      } = getValues();

      const obj = {
        title,
        description,
        platformType,
        platform,
        roles,
        privateCollab,
        themes,
        enableCuration,
        totalPercentageForCurators,
        collabLocation,
        locationCoordinates,
        locationPlaceId,
        images,
        status: statusValue,
      };

      if (basedOn) {
        obj.basedOn = basedOn;
      }

      const fileImages = images.filter((image) => typeof image !== 'string'); // Filter out URL strings
      const urlImages = images.filter((image) => typeof image === 'string'); // Filter only URL strings

      const result = await uploadMultipleFiles(fileImages); // Upload file images

      if (result?.files && result?.files?.length > 0) {
        const uploadedUrls = result.files.map((file) => file.url);
        obj.images = uploadedUrls.concat(urlImages);
        obj.compressedImages = [
          ...editCollabDetails?.compressedImages,
          ...result?.compressedFiles,
        ];
      } else if (urlImages.length > 0) {
        obj.images = urlImages;
        obj.compressedImages = urlImages;
      } else {
        obj.images = [];
        obj.compressedImages = [];
      }

      const f1 = async () => {
        const res = await axios.patch(`${BASE_URL}/api/v1/collab`, {
          id: currentEditCollabId,
          ...obj,
          isPrivate: privateCollab,
          tags: themes,
          selectedWalletForCollab: auth?.selectedWalletAddress,
          source: COLLAB_SOURCE.internal,
        });
        return res;
      };
      const res = await reFetchTokenExpire(f1, fetchRefreshToken);

      if (res.data.status === 'success') {
        if (status === 'live') {
          generateSnackbar('Collab updated successfully', 'success');
          router.push(`/collab/${res.data.collab.identifier}`);
        } else {
          generateSnackbar('Draft saved successfully', 'success');

          router.push(
            `/collab/${res.data.collab.identifier}/edit?source=internal`,
          );
        }
      }

      setPostingCollab(false);
    } catch (err) {
      removeSessionData('collab-template-details');
      generateSnackbar('Something went wrong', 'error');
      setPostingCollab(false);
    }
  };

  const handleDraftSave = async () => {
    try {
      setSavingDraft(true);

      if (!isEdit) {
        await createCollab(getValues(), 'draft');
      } else {
        await updateCollab('draft');
      }

      setSavingDraft(false);
    } catch (err) {
      generateSnackbar('Error saving draft', 'error');
      setSavingDraft(false);
    }
  };

  const handleNextClick = async (e) => {
    if (currentStep < createCollabSteps?.length) {
      e.preventDefault();
      await nextStep();
    } else {
      await handleSubmit((data) =>
        !isEdit ? createCollab(data) : updateCollab(),
      )();
    }
  };

  const [openAiDialog, setOpenAiDialog] = useState(false);

  useEffect(() => {
    const isClone = router.query.isClone === 'true';
    if (isClone) {
      const collabTemplateDetails = getSessionData('collab-template-details');

      if (collabTemplateDetails) {
        const { title, description, images, tags, platformType } =
          collabTemplateDetails;

        setValue('title', title);
        setValue('description', description);
        setValue('themes', tags);
        setValue('platformType', platformType);
        setValue('images', images);
      }
    }
  }, [router.query.isClone]);

  const updateSelectedReimageCollabDetails = async (
    reimaginedCollabIdentifier,
  ) => {
    try {
      const response = await getCollabDetails(reimaginedCollabIdentifier);

      if (response.status === 'success') {
        setReimagedCollabDetails(response.data.collab);
        setValue('basedOn', response.data.collab._id);
        setIsCollabBased('yes');
      }
    } catch {}
  };

  useEffect(() => {
    if (router.query.reimagine) {
      const reimaginedCollabIdentifier = router.query.reimagine;

      // fetch collab details from identifier

      updateSelectedReimageCollabDetails(reimaginedCollabIdentifier);

      // set a state which tells that based on is selected
    }
  }, [router.query.reimagine]);

  useEffect(() => {
    // The following is only need currently for the edit collab flow so making sure that only edit collab flow is using this
    if (router.query.step && isEdit) {
      setValue('currentStep', parseInt(router.query.step), {
        shouldDirty: true,
      });
    }
  }, [router.query.step]);

  const images = watch('images');

  const uploadCollabImagesOnSelect = async () => {
    const fileImages = images.filter((image) => typeof image !== 'string'); // Filter out URL strings
    const urlImages = images.filter((image) => typeof image === 'string'); // Filter only URL strings

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

  useEffect(() => {
    if (images.length > 0) {
      uploadCollabImagesOnSelect();
    } else {
      setUploadedCollabImages([]);
    }
  }, [images]);

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <CreateCollabContainer>
        <CreateStepperHeader
          headerTitle={t(isEdit ? 'Update Collab' : 'Start Collab')}
          steps={createCollabSteps}
          currentStepIndex={currentStep - 1}
          setCurrentStepIndex={(step) =>
            setValue('currentStep', step + 1, { shouldDirty: true })
          }
          finalStepText={t(!isEdit ? 'Post Collab' : 'Submit')}
          hideDraft={editCollabDetails?.status === 'live'}
          handleDraftSave={handleDraftSave}
          disabledDraft={savingDraft}
          disabledNext={savingDraft || postingCollab}
          loadingDraft={savingDraft}
          loadingNext={postingCollab}
          loadingAiSuggestions={gettingAiSuggestions}
          handleNextClick={handleNextClick}
          handleAiSuggestions={showCollabSuggestionDialog}
          errorSteps={errorSteps}
          trigger={trigger}
          setIsManualTrigger={setIsManualTrigger}
          completedSteps={completedSteps}
          isEdit={isEdit}
        />
        {!fetchingEditCollabDetails ? (
          <>
            {currentStep === 1 && (
              <CollabProjectStep
                {...{
                  control,
                  errors,
                  watch,
                  setValue,
                  trigger,
                  isManualTrigger,
                }}
              />
            )}

            {currentStep === 2 && (
              <CollabInformationStep
                control={control}
                setValue={setValue}
                getValues={getValues}
                watch={watch}
                errors={errors}
                trigger={trigger}
                isManualTrigger={isManualTrigger}
                isCollabBased={isCollabBased}
                setIsCollabBased={setIsCollabBased}
                reimaginedCollabDetails={reimaginedCollabDetails}
                isEdit={isEdit}
              />
            )}

            {currentStep === 3 && (
              <CollabCollaboratorsStep
                control={control}
                setValue={setValue}
                watch={watch}
                errors={errors}
                trigger={trigger}
                isManualTrigger={isManualTrigger}
                isEdit={isEdit}
              />
            )}

            {/* {currentStep === 4 && (
              <CollabCurationStep
                control={control}
                setValue={setValue}
                watch={watch}
                errors={errors}
              />
            )} */}
          </>
        ) : (
          <SpinnerContainer>
            <Spinner size={20} />
          </SpinnerContainer>
        )}
      </CreateCollabContainer>
      <AICollabSuggestionDialog
        open={openAiDialog}
        handleClose={() => setOpenAiDialog(false)}
        handleSubmit={getCollabSuggestion}
        control={control}
        setValue={setValue}
        watch={watch}
        errors={errors}
        page={aiDialogPage}
        setPage={setAiDialogPage}
        loadingSuggestions={gettingAiSuggestions}
      />
    </form>
  );
};
