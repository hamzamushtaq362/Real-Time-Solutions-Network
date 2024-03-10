import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { Box } from '@mui/material';
import { useNotistack } from 'hooks/useNotistack';
import CreateStepperHeader from '../../CreateStepper/CreateStepperHeader';
import BasicInformation from './BasicInformation/BasicInformation';
import { useLocalStorage } from '~/hooks';
import { FormProvider, useForm } from 'react-hook-form';
import {
  BASE_URL,
  fetchRefreshToken,
  reFetchTokenExpire,
} from '~/apis';
import { CreateCollabCollective } from 'components/Collective/CollectiveCreate/CreateCollabCollective/CreateCollabCollective';
import InviteCoCreators from 'components/Collective/CollectiveCreate/InviteCoCreators/InviteCoCreators';
import { useRouter } from 'next/router';
import axios from 'axios';
import { ActionsWrap } from 'components/CollabCreate/AddProject/elements';
import { PrimaryButton, SmallSpinner } from '~/components';
import { useIsMobileView } from '~/utils';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import useStepsValidation from 'hooks/useStepsValidation';

// React hook form related code
const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required('Title is required')
    .min(5, 'Title is too short!')
    .max(50, 'Too Long!'),
  // selectedImage: Yup.string(),
  introduction: Yup.string()
    .required('Introduction is required')
    .min(30, 'Introduction is too short!')
    .max(160, 'Too Long!'),
  biography: Yup.string()
    .required('Biography is required')
    .min(30, 'Biography is too short!')
    .max(700, 'Too Long!'),
});

export const CollectiveCreate = () => {
  const { t } = useTranslation();

  const generateSnackbar = useNotistack();
  const router = useRouter();
  const [newCollective, setNewCollective] = useLocalStorage('newCollective');
  const steps = ['Basic Information', 'Add Collabs', 'Invite Co-Creators'];
  const isMobileView = useIsMobileView();

  const savingDraft = false;
  const uploadProgress = null;
  const [createTeamLoading, setCreateTeamLoading] = useState(false);
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const [isManualTrigger, setIsManualTrigger] = useState(false);
  const [optionalStepVisited, setOptionalStepVisited] = useState(false);

  const methods = useForm({
    defaultValues: {
      collectiveImage: newCollective?.collectiveImage ?? '',
      title: newCollective?.title ?? '',
      introduction: newCollective?.introduction ?? '',
      coverImage: newCollective?.coverImage ?? '',
      biography: newCollective?.biography ?? '',
      showReel: newCollective?.showReel ?? '',
      achievements: [],
      socials: [],
      marketplaces: [],
      featuredIn: [],
      selectedProjects: newCollective?.selectedProjects ?? [],
      selectedCoCreators: newCollective?.selectedCoCreators ?? [],
      currentStep: newCollective?.currentStep ?? 1,
    },
    resolver: yupResolver(validationSchema),
  });
  const { handleSubmit, watch, getValues, setValue, trigger, formState: { errors }, } = methods;

  const step1 = ['title', 'introduction', 'biography'];

  const allStepsMandatoryFields = [step1];
  const { currentStep, title, introduction, biography } = watch();

  const { errorSteps, completedSteps } = useStepsValidation({
    errors,
    watch,
    allStepsMandatoryFields,
    currentStep,
    dependencies: [currentStep, errors, title, introduction, biography],
    optionalStep: 1,
    optionalStepVisited,
  });

  const handleNextClick = async (e) => {
    if (steps?.length === currentStep) {
      await handleSubmit(onSubmit)();
    } else {
      e.preventDefault();
      if (currentStep === 1) {
        setCreateTeamLoading(true);
        setNewCollective({
          ...newCollective,
          ...getValues(),
          currentStep: currentStep + 1,
        });
      } else if (currentStep === 2) {
        setOptionalStepVisited(true);
      }
      setCreateTeamLoading(false);
      setValue('currentStep', currentStep + 1, { shouldDirty: true });
    }
  };

  const onSubmit = async () => {
    setCreateTeamLoading(true);
    try {
      const f1 = async () => {
        const { selectedCoCreators } = watch();
        const coCreators = selectedCoCreators.map((user) => {
          return typeof user === 'string'
            ? { type: 'externalUser', label: user }
            : user;
        });

        setValue('selectedCoCreators', coCreators);

        const response = await axios.post(`${BASE_URL}/api/v1/collective`, {
          ...getValues(),
          featuredIn: getValues().featuredIn?.map((item) => ({
            title: item.title,
            url: item.url,
            metaTitle: item.metaTitle,
          })),
        });

        return response.data;
      };

      const res = await reFetchTokenExpire(f1, fetchRefreshToken);

      if (res.status === 'success') {
        setCreateTeamLoading(false);
        setIsNextDisabled(true);
        setNewCollective(null);
        generateSnackbar('Team created successfully', 'success');
        router.push(`/team/${res.data.collectiveLink}`);
      }
    } catch (error) {
      setCreateTeamLoading(false);

      if (error.response) {
        const errorMessage = error.response.data.message;
        generateSnackbar(
          `An error occurred while creating collective: ${errorMessage}`,
          'error',
        );
      } else {
        generateSnackbar(
          'An error occurred while creating collective',
          'error',
        );
      }
    }
  };

  // const disabledDraft = savingDraft || createTeamLoading;
  const disabledNext = createTeamLoading || savingDraft || isNextDisabled;
  const isFinalStep = steps?.length === currentStep;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <CreateStepperHeader
            headerTitle={t('Create Team')}
            steps={steps}
            currentStepIndex={currentStep - 1}
            setCurrentStepIndex={(page) => {
              if (page === 1) {
                // if projects step, which is optional
                setOptionalStepVisited(true);
              }
              setValue('currentStep', page + 1, { shouldDirty: true });
            }}
            finalStepText={t('Create Team')}
            // hiding draft for now
            hideDraft
            // handleDraftSave={handleDraftSave}
            // disabledDraft={disabledDraft}
            disabledNext={disabledNext}
            loadingDraft={savingDraft}
            loadingNext={createTeamLoading}
            errorSteps={errorSteps}
            handleNextClick={handleNextClick}
            completedSteps={completedSteps}
            setIsManualTrigger={setIsManualTrigger}
            trigger={trigger}
          />

          {currentStep === 1 && (
            <BasicInformation {...{ uploadProgress, isManualTrigger }} />
          )}
          {currentStep === 2 && <CreateCollabCollective />}
          {currentStep === 3 && <InviteCoCreators />}

          {isMobileView && (
            <Box p={3} mb={2}>
              <ActionsWrap>
                <PrimaryButton
                  width="190px"
                  height={50}
                  disabled={disabledNext}
                  marginLeft={8}
                  fontSize={16}
                  onClick={handleNextClick}
                >
                  {createTeamLoading ? (
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
        </Box>
      </form>
    </FormProvider>
  );
};
