import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useLocalStorage, useNotistack } from '~/hooks';
import { BASE_URL, fetchRefreshToken } from '~/apis';
import VaultDetails from 'components/Vault/CreateVault/VaultDetails/VaultDetails';
import axios from 'axios';
import { useRouter } from 'next/router';
import { ActionsWrap } from 'components/CollabCreate/AddProject/elements';
import { OutlinedButton, PrimaryButton } from '~/components';
import { LoadMore, SmallSpinner } from 'components/Loading';
import { useIsMobileView } from '~/utils';
import CreateStepperHeader from 'components/CreateStepper/CreateStepperHeader';
import { useForm } from 'react-hook-form';
import { reFetchTokenExpire } from '~/redux';
import { FlexBox } from 'components/common/elements';
import ExpiryInfo from 'components/Vault/CreateVault/ExpiryInfo/ExpiryInfo';
import PaymentDeposit from 'components/Vault/CreateVault/PaymentDeposit/PaymentDeposit';

export const CreateVault = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const isMobileView = useIsMobileView();
  const [vaultData, setVaultData] = useLocalStorage('vaultData');
  const generateSnackbar = useNotistack();
  const collabIdentifier = router.query.collabId;
  const [collabId, setCollabId] = useState('');
  const [loading, setLoading] = useState(true);

  const [collabTitle, setCollabTitle] = useState('');
  const [savingDraft, setSavingDraft] = useState(false);
  const [publishLoading, setPublishLoading] = useState(false);
  const [, setIsManualTrigger] = useState(false);

  const { control, getValues, trigger } = useForm({
    defaultValues: {
      startDate: vaultData?.startDate ?? '',
    },
  });
  const steps = ['Vault Details', 'Expiry Info', 'Payment Deposit'];

  const [page, setPage] = useState(vaultData?.page ?? 0);

  const fetchCollaborationDetails = async () => {
    try {
      setLoading(true);
      const f1 = async () => {
        return await axios.get(`${BASE_URL}/api/v1/collab/${collabIdentifier}`);
      };
      const res = await reFetchTokenExpire(f1, fetchRefreshToken);
      if (res.data.status === 'success') {
        const { collab } = res.data.data;
        setCollabTitle(collab?.title);
        setCollabId(collab?._id);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollaborationDetails();
  }, []);

  const handleDraftSave = async () => {
    setSavingDraft(true);
    setVaultData({ ...getValues() });
    generateSnackbar('Draft saved successfully', 'success');
    setSavingDraft(false);
  };

  const handlePublish = async () => {
    try {
      setPublishLoading(true);

      const data = {
        collabId,
      };

      const res = await axios.post(
        `${BASE_URL}/api/v1/collab/addNftDetailsInCollab`,
        data,
      );
      if (res.data.status === 'success') {
        setVaultData(null);
        generateSnackbar('Collab published successfully', 'success');
        router.push(`/published-collab/${collabId}`);
      }
      setPublishLoading(false);
    } catch (err) {
      setPublishLoading(false);
    }
  };
  const handleNextClick = async () => {
    if (steps?.length - 1 === page) {
      await handlePublish();
    } else {
      setVaultData({ page: page + 1 });
      setPage(page + 1);
    }
  };

  const disabledDraft = savingDraft || publishLoading;
  const disabledNext = publishLoading || savingDraft;
  const isFinalStep = steps?.length - 1 === page;

  if (loading) {
    return (
      <FlexBox justifyContent="center" width="100%" height="100%">
        <LoadMore inverse />
      </FlexBox>
    );
  }

  return (
    <>
      <Box>
        <Box mt={3}>
          <CreateStepperHeader
            headerTitle={t('Create Vault')}
            steps={steps}
            currentStepIndex={page}
            setCurrentStepIndex={setPage}
            finalStepText="Submit"
            handleDraftSave={handleDraftSave}
            disabledDraft={disabledDraft}
            disabledNext={disabledNext}
            loadingDraft={savingDraft}
            loadingNext={publishLoading}
            handleNextClick={handleNextClick}
            trigger={trigger}
            setIsManualTrigger={setIsManualTrigger}
          />
        </Box>

        {page === 0 && <VaultDetails {...{ control, collabTitle }} />}
        {page === 1 && <ExpiryInfo {...{ control, collabTitle }} />}
        {page === 2 && <PaymentDeposit {...{ control, collabTitle }} />}

        {isMobileView && (
          <Box p={3} mb={2}>
            <ActionsWrap>
              <OutlinedButton
                disabled={disabledDraft}
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
                onClick={handleNextClick}
              >
                {publishLoading ? (
                  <SmallSpinner />
                ) : isFinalStep ? (
                  'Submit'
                ) : (
                  'Next Step'
                )}
              </PrimaryButton>
            </ActionsWrap>
          </Box>
        )}
      </Box>
    </>
  );
};
