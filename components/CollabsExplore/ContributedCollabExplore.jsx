import { useContext, useEffect, useState } from 'react';
import { CollabsExploreContainer } from './elements';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { BASE_URL, fetchRefreshToken } from '~/apis';
import { reFetchTokenExpire } from '~/redux';
import { useRouter } from 'next/router';
import { CollabsMapping } from './CollabsMapping';
import { CollabsLoadingGrid } from './CollabsLoadingGrid';
import AppContext from 'context/AppContext';
import { SecondaryNavbar } from 'components/SecondaryNavbar';

export const ContributedCollabExplore = () => {
  const { user } = useContext(AppContext);
  const isProfileComplete = user?.isProfileComplete;
  const [collabsLoading, setCollabsLoading] = useState(true);
  const [collabs, setCollabs] = useState([]);

  const { t } = useTranslation();
  const router = useRouter();

  const getRecommendedCollaborations = async () => {
    try {
      setCollabsLoading(true);
      const fetchCollabs = async () => {
        return await axios.post(`${BASE_URL}/api/v1/recommender/collabs`, {
          contributed: true,
          sources: ['internal', 'external', 'collective'],
        });
      };
      const res = await reFetchTokenExpire(fetchCollabs, fetchRefreshToken);
      if (res.data.status === 'success') {
        const collabs = res?.data?.data?.collabs;

        setCollabs(collabs);
        setCollabsLoading(false);
      }
    } catch (err) {
      setCollabs([]);
      setCollabsLoading(false);
    }
  };

  useEffect(() => {
    getRecommendedCollaborations();
  }, [router]);

  return (
    <>
      <SecondaryNavbar title={t('Contributed Collabs')} />
      <CollabsExploreContainer
        sx={{ padding: isProfileComplete ? '0 30px' : '0 30px 50px' }}
      >
        {!collabsLoading ? (
          <CollabsMapping collaborations={collabs} />
        ) : (
          <CollabsLoadingGrid />
        )}
      </CollabsExploreContainer>
    </>
  );
};
