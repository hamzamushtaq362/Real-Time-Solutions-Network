import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import CreateStepperHeader from 'components/CreateStepper/CreateStepperHeader';
import { CreateMissionContainer } from './elements';

// Steps imports
import { MissionDetailsStep } from './MissionDetailsStep';
import { MissionActionStep } from './MissionActionStep';
import { MissionScheduleStep } from './MissionScheduleStep';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNotistack } from 'hooks';

import {
  BASE_URL,
  fetchRefreshToken,
  getCollabIdByTitleIdentifier,
  reFetchTokenExpire,
} from 'apis';
import axios from 'axios';
import { useRouter } from 'next/router';

import { CreateBadge } from '~/components';
import useStepsValidation from 'hooks/useStepsValidation';

export const MissionCreate = () => {
  const { t } = useTranslation();

  // Mission Create Step# mappings
  // 1 - Mission Details
  // 2 - Action

  // Root Level State

  const [isCreateANewBadge, setIsCreateANewBadge] = useState(false);
  const [isManualTrigger, setIsManualTrigger] = useState(false);

  // Loading states

  const [postingMission, setPostingMission] = useState(false);
  const generateSnackbar = useNotistack();
  const router = useRouter();

  const createMissionSteps = ['Action', 'Details', 'Schedule'];

  // Helpers
  const nextStep = async () => {
    setIsManualTrigger(true);
    if (currentStep === 2) {
      const noError = await trigger(['title', 'description']);
      if (!noError) return;
      setValue('currentStep', currentStep + 1, { shouldDirty: true });
    } else if (currentStep === 1) {
      const noError = await trigger(['platform', 'missionType']);
      if (!noError) return;
      setValue('currentStep', currentStep + 1, { shouldDirty: true });
    }
  };

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
    platform: Yup.string().required('Platform Type is required'),
    limitedParticipants: Yup.boolean(), // Limited Participants refers to the maximum eligibility field
    maxParticipants: Yup.number().when('limitedParticipants', {
      is: true,
      then: Yup.number().required('Max participants is required'),
    }),
    missionType: Yup.string().required('Template is required'), // Mission Type refers to the template
    duration: Yup.array().of(
      Yup.object().shape({
        startDate: Yup.date().when('scheduleType', {
          is: 'start-end-date',
          then: Yup.date().required('Start date is required'),
          otherwise: Yup.date().nullable()
        }),
        endDate: Yup.date()
        .nullable()
        .when('scheduleType', {
          is: 'start-end-date',
          then: Yup.date()
          .required('End date is required')
          .when('startDate', (startDate, schema) => {
            return startDate ? schema.min(startDate, 'End date must be after start date') : schema;
          }),
          otherwise: Yup.date().nullable()
        })
      })
    )
    .required('Duration is required')
    .min(1, 'Duration is required')
    .max(1, 'Only one duration object is allowed'),
    numberOfDays: Yup.number().when('missionType', {
      is: 'number-of-days',
      then: Yup.number().required('Number of days is required'),
    }),
    missionHasReward: Yup.boolean(),
    rewardableBadges: Yup.array().when('missionHasReward', {
      is: true,
      then: Yup.array().required('At least one badge is required'),
    }),
    metadata: Yup.object().when(
      ['platform', 'missionType'],
      (platform, missionType, schema) => {
        if (platform === 'discord' && missionType === 'join-discord-server') {
          return schema.shape({
            discordServerLink: Yup.string()
              .url('Must be a valid URL')
              .required('Discord server link is required'),
            discordServerName: Yup.string().required(
              'Discord server name is required',
            ),
          });
        } else if (platform === 'twitter' && missionType === 'post-tweet') {
          return schema.shape({
            tweetText: Yup.string()
              .required('Tweet is required')
              .max(280, 'Tweet is too long, max 280 characters allowed'),
          });
        } else if (platform === 'twitter' && missionType === 'retweet-tweet') {
          return schema.shape({
            retweetTweetLink: Yup.string().required('Tweet link is required'),
          });
        } else if (platform === 'twitter' && missionType === 'like-tweet') {
          return schema.shape({
            likeTweetLink: Yup.string().required('Tweet link is required'),
          });
        } else if (
          platform === 'twitter' &&
          missionType === 'add-twitter-bio'
        ) {
          return schema.shape({
            twitterBio: Yup.string().required('Twitter bio is required'),
          });
        }

        return schema.shape({
          discordServerLink: Yup.string().url(),
          discordServerName: Yup.string(),
          tweetText: Yup.string().max(280, 'Tweet is too long'),
          retweetTweetLink: Yup.string().url('Please enter a valid URL'),
          likeTweetLink: Yup.string().url('Please enter a valid URL'),
          twitterBio: Yup.string().max(160, 'Twitter bio is too long'),
        });
      },
    ),
  });

  const {
    control,
    handleSubmit,
    watch,
    getValues,
    setValue,
    formState: { errors },
    trigger,
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      platform: '',
      missionType: '',
      rewardableBadges: [],
      duration: [
        {
          startDate: null,
          endDate: null,
          key: 'selection'
        }
      ],
      scheduleType: 'start-end-date',
      currentStep: 1,
    },
    resolver: yupResolver(validationSchema),
  });

  const { currentStep, title, description, platform, missionType } = watch();

  const rewardableBadges = watch('rewardableBadges');
  const badgeCreatedContinuingMission = (badgeIdentifier) => {
    setIsCreateANewBadge(false);
    setValue('currentStep', 1);
    setValue('rewardableBadges', [...rewardableBadges, badgeIdentifier]);
  };

  const createMission = async () => {
    try {
      setPostingMission(true);
      const {
        title,
        description,
        platform,
        missionType,
        limitedParticipants,
        maxParticipants,
        duration,
        numberOfDays,
        rewardableBadges,
        metadata,
      } = getValues();

      const collabId = await getCollabIdByTitleIdentifier(
        router.query.collabId,
      );

      const f1 = async () => {
        return await axios.post(`${BASE_URL}/api/v1/mission/${collabId}`, {
          title,
          description,
          platform,
          missionType,
          limitedParticipants,
          maxParticipants,
          startDate: duration[0]?.startDate,
          endDate: duration[0]?.endDate,
          rewardableBadges,
          numberOfDays,
          metadata,
        });
      };
      const res = await reFetchTokenExpire(f1, fetchRefreshToken);
      if (res.data.status === 'success') {
        generateSnackbar('Mission posted successfully', 'success');
        router.push(
          `/collab/${router.query.collabId}?view=launchpad&subview=mission`,
        );
      }
    } catch (err) {
      generateSnackbar('Error posting mission', 'error');
      setPostingMission(false);
    }
  };

  const handleNextClick = () => {
    if (currentStep < 3) {
      nextStep();
    } else {
      handleSubmit(createMission)();
    }
  };

  const addQueryParam = () => {
    const { pathname, query } = router;

    const newQueryParam = { isBadgeCreate: 'true' };

    const updatedQuery = { ...query, ...newQueryParam };

    const updatedUrl = {
      pathname,
      query: updatedQuery,
    };

    router.push(updatedUrl);

    setIsCreateANewBadge(true);
  };

  const step1 = ['platform', 'missionType'];
  const step2 = ['title', 'description'];
  const allStepsMandatoryFields = [step1, step2];

  const { errorSteps, completedSteps } = useStepsValidation({
    errors,
    watch,
    allStepsMandatoryFields,
    currentStep,
    dependencies: [currentStep, title, description, platform, missionType],
  });

  return isCreateANewBadge ? (
    <CreateBadge
      badgeCreatedContinuingMission={badgeCreatedContinuingMission}
    />
  ) : (
    <CreateMissionContainer>
      <CreateStepperHeader
        showNavigateBack
        headerTitle={t('Create Mission')}
        steps={createMissionSteps}
        hideDraft
        currentStepIndex={currentStep - 1}
        setCurrentStepIndex={(step) =>
          setValue('currentStep', step + 1, { shouldDirty: true })
        }
        finalStepText="Submit"
        disabledNext={postingMission}
        loadingNext={postingMission}
        handleNextClick={handleNextClick}
        trigger={trigger}
        setIsManualTrigger={setIsManualTrigger}
        errorSteps={errorSteps}
        completedSteps={completedSteps}
        errors={errors}
      />

      <>
        {currentStep === 1 && (
          <MissionActionStep
            {...{
              control,
              errors,
              setValue,
              platform,
              watch,
              trigger,
              isManualTrigger,
              setIsCreateANewBadge,
              addQueryParam,
            }}
          />
        )}

        {currentStep === 2 && (
          <MissionDetailsStep
            {...{ control, errors, setValue, watch, trigger, isManualTrigger }}
          />
        )}

        {currentStep === 3 && (
          <MissionScheduleStep
            {...{ control, errors, setValue, watch, trigger, isManualTrigger }}
          />
        )}
      </>
    </CreateMissionContainer>
  );
};
