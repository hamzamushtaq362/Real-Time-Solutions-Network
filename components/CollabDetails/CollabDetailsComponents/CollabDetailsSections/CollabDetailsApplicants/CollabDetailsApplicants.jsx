import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { CollabDetailsApplicantsStatsSection } from './CollabDetailsApplicantsStatsSection';
import {
  BASE_URL,
  fetchCollabApplicantsStats,
  fetchRefreshToken,
} from '~/apis';
import { Box } from '@mui/material';
import { CollabDetailsApplicantsTable } from 'components/CollabDetails/CollabDetailsComponents/CollabDetailsSections/CollabDetailsApplicants/CollabDetailsApplicantsTable';
import {
  CollabOverviewTitle,
  BackText,
  NavigateBack,
} from 'components/CollabDetails/CollabDetailsLayouts/elements';
import { PlusIconWrap } from 'components/Button/NavButtonGroup/elements';
import axios from 'axios';
import { reFetchTokenExpire } from '~/redux';
import { useNotistack } from '~/hooks';

export const CollabDetailsApplicants = ({
  applicantsLoading,
  setApplicantsLoading,
  applicants,
  setApplicants,
  collabId,
  loadingAccept,
  loadingReject,
  setLoadingAccept,
  setLoadingReject,
  onBack,
}) => {
  const { t } = useTranslation();

  const generateSnackbar = useNotistack();
  const [applicantsStatsLoading, setApplicantsStatsLoading] = useState(false);
  const [totalApplicants, setTotalApplicants] = useState(0);
  const [acceptedApplicants, setAcceptedApplicants] = useState(0);
  const [pendingApplicants, setPendingApplicants] = useState(0);
  const [deniedApplicants, setDeniedApplicants] = useState(0);

  const [backHovered, setBackHovered] = useState(false);

  const getApplicants = async () => {
    setApplicantsLoading(true);
    try {
      let obj = {
        isInvite: false,
        collabId,
      };
      const f1 = async () => {
        return await axios.post(`${BASE_URL}/api/v1/collabmember/all`, obj);
      };
      const res = await reFetchTokenExpire(f1, fetchRefreshToken);
      if (res) {
        setApplicants(res.data.data.members);
      }
      setApplicantsLoading(false);
    } catch (err) {
      setApplicantsLoading(false);
      generateSnackbar('Something went wrong!', 'error');
    }
  };

  const getApplicantsDetails = async () => {
    try {
      setApplicantsStatsLoading(true);

      const response = await fetchCollabApplicantsStats(collabId);
      if (response?.data?.status === 'success') {
        const { totalCount, acceptedCount, pendingCount, rejectedCount } =
          response?.data;

        setTotalApplicants(totalCount);
        setAcceptedApplicants(acceptedCount);
        setPendingApplicants(pendingCount);
        setDeniedApplicants(rejectedCount);
      }

      setApplicantsStatsLoading(false);
    } catch (error) {
      setApplicantsStatsLoading(false);
    }
  };

  useEffect(() => {
    getApplicantsDetails();
    getApplicants();
  }, []);

  const acceptOrRejectApplicant = async (id, type, senderId) => {
    if (type === 'accept') {
      setLoadingAccept(true);
    }
    if (type === 'reject') {
      setLoadingReject(true);
    }
    try {
      const f1 = async () => {
        let obj = {
          acceptType: 'invite',
        };
        if (type === 'accept') {
          obj['acceptedBy'] = 'admin';
          obj['status'] = 'ACCEPTED';
          obj['senderId'] = senderId || '';
        } else {
          obj['rejectedBy'] = 'admin';
          obj['status'] = 'REJECTED';
        }
        const res = await axios.patch(`${BASE_URL}/api/v1/collabmember`, {
          id,
          ...obj,
        });
        if (res) return res;
      };
      const res = await reFetchTokenExpire(f1, fetchRefreshToken);
      if (res.data.status === 'success') {
        if (type === 'accept') {
          setLoadingAccept(false);
        } else {
          setLoadingReject(false);
        }
        if (res.data.data.member.status === 'ACCEPTED') {
          generateSnackbar('Successfully accepted invite!', 'success');
        }
        if (res.data?.data?.member?.status === 'REJECTED') {
          generateSnackbar('Successfully rejected invite!', 'success');
        }

        getApplicantsDetails();
        getApplicants();
      }
    } catch (error) {
      if (type === 'accept') {
        setLoadingAccept(false);
      } else {
        setLoadingReject(false);
      }
      generateSnackbar('Something went wrong!', 'error');
    }
  };

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

      <CollabOverviewTitle>{t('Applicants')}</CollabOverviewTitle>
      {totalApplicants > 0 && (
        <CollabDetailsApplicantsStatsSection
          totalApplicants={totalApplicants}
          acceptedApplicants={acceptedApplicants}
          pendingApplicants={pendingApplicants}
          deniedApplicants={deniedApplicants}
          applicantsLoading={applicantsLoading}
          applicantsStatsLoading={applicantsStatsLoading}
        />
      )}
      <CollabDetailsApplicantsTable
        showTable={totalApplicants > 0}
        applicantsLoading={applicantsLoading}
        applicants={applicants}
        acceptOrRejectApplicant={acceptOrRejectApplicant}
        loadingAccept={loadingAccept}
        loadingReject={loadingReject}
      />
    </Box>
  );
};
