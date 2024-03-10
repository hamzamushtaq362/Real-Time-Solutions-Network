import { useTranslation } from 'react-i18next';
import CreateStepperHeader from 'components/CreateStepper/CreateStepperHeader';

import { SelectBadgeDesign } from './SelectBadgeDesign';
import { useState } from 'react';
import { Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { createUserBadge } from 'apis/badge';
import { uploadFile } from '~/apis';
import { useNotistack } from 'hooks/useNotistack';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export const CreateBadge = ({ badgeCreatedContinuingMission }) => {
  const router = useRouter();
  const CreateBadgeSteps = ['Select Badge Design', 'Badge Details'];
  const [, setIsManualTrigger] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userComingFromMission, setUserComingFromMission] = useState(false);
  const [page, setPage] = useState(0);
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    badgeTitle: Yup.string()
      .required('Title is required')
      .min(5, 'Title is too short!')
      .max(50, 'Too Long!'),

    badgeDescription: Yup.string()
      .required('Description is required')
      .min(30, 'Description is too short!')
      .max(3500, 'Too Long!'),

    selectedChainOption: Yup.string().required('Chain option is required'),

    associatedMissions: Yup.object(),

    image: Yup.string().required('Image is Required'),

    contractAddress: Yup.string().when('selectedChainOption', {
      is: 'on-chain',
      then: Yup.string().required(
        'For On Chain Badge, Contract Deployment is required',
      ),
    }),

    contractPermission: Yup.boolean().when(
      ['selectedChainOption', 'contractAddress'],
      (selectedChainOption, contractAddress, schema) => {
        if (selectedChainOption === 'on-chain') {
          return schema.oneOf([true], 'Contract Permission is required');
        }
      },
    ),
    supply: Yup.number()
      .required('Supply is required')
      .min(1, 'Supply should be greater then 0'),
  });

  const generateSnackbar = useNotistack();

  const {
    watch,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
    trigger,
  } = useForm({
    defaultValues: {
      badgeTitle: '',
      badgeDescription: '',
      selectedChainOption: 'off-chain',
      associatedMissions: {},
      aiGeneratedBadge: false,
      image: '',
      supply: 10,
      contractAddress: '',
      contractPermission: false,
    },
    resolver: yupResolver(validationSchema),
  });

  const formValues = watch();

  useEffect(() => {
    const { query } = router;
    if (query && query.isBadgeCreate === 'true') {
      setUserComingFromMission(true);
    } else {
      setUserComingFromMission(false);
    }
  }, [router]);

  const handleNextClick = async (e) => {
    if (page === 0) {
      e.preventDefault();

      if (formValues.image instanceof File) {
        const image = formValues.image;
        const uploadingBadge = await uploadFile(image);
        setValue('image', uploadingBadge.data.files);
      }

      setPage(page + 1);
    }
    if (page == 1) {
      await handleSubmit(onSubmitFinal)();
    }
  };

  const onSubmitFinal = async () => {
    try {
      setLoading(true);

      const res = await createUserBadge(formValues);
      setLoading(false);
      if (userComingFromMission && res.data.data) {
        badgeCreatedContinuingMission(res.data.data.identifier);
      } else {
        router.push('/dashboard');
      }
      generateSnackbar('Badge Created Successfully', 'success');
    } catch (error) {
      setLoading(false);
      generateSnackbar('Error Creating Badge', 'error');
    }
  };

  return (
    <>
      <Box>
        <form onSubmit={handleSubmit(onSubmitFinal)}>
          <CreateStepperHeader
            headerTitle={t('Create Badge')}
            currentStepIndex={page}
            steps={CreateBadgeSteps}
            loadingNext={loading}
            finalStepText={t('Create Badge')}
            disabledDraft={true}
            hideDraft={true}
            disabledNext={loading ? true : false}
            setCurrentStepIndex={setPage}
            handleNextClick={handleNextClick}
            trigger={trigger}
            setIsManualTrigger={setIsManualTrigger}
          />
          <SelectBadgeDesign
            page={page}
            watch={watch}
            setValue={setValue}
            errors={errors}
            control={control}
            userComingFromMission={userComingFromMission}
            trigger={trigger}
          />
        </form>
      </Box>
    </>
  );
};
