import React, { useContext, useEffect, useState } from 'react';
import { CollabTile, SectionHeader } from '~/components';
import Carousel from '../Carousel/Carousel';
import {
  collabCarouselResponsiveRules,
  DashboardSectionContainer,
} from './elements';
import {
  getSessionData,
  getTodayDate,
  removeDraftCollabs,
  setSessionData,
} from '~/utils';
import { useRouter } from 'next/router';
import axios from 'axios';
import { BASE_URL, fetchRefreshToken } from '~/apis';
import { reFetchTokenExpire } from '~/redux';
import { useTranslation } from 'react-i18next';
import AppContext from 'context/AppContext';

const TrendingCollabs = () => {
  const [collabsLoading, setCollabsLoading] = useState(true);
  const [collabs, setCollabs] = useState([]);
  const router = useRouter();
  const { t } = useTranslation();
  const { user } = useContext(AppContext);

  useEffect(() => {
    setCollabsLoading(true);
    const recommendedCollabs = getSessionData('dashboard-collabs');
    setCollabsLoading(false);
    if (recommendedCollabs) {
      setCollabs(recommendedCollabs);
    } else {
      getRecommendedCollaborations();
    }
  }, []);

  const getRecommendedCollaborations = async () => {
    try {
      setCollabsLoading(true);
      const fetchCollabs = async () => {
        return await axios.post(
          `${BASE_URL}/api/v1/recommender/collabs?page=1&limit=12`,
          {
            sources: ['internal'],
          },
        );
      };
      const res = await reFetchTokenExpire(fetchCollabs, fetchRefreshToken);
      if (res.data.status === 'success') {
        const collabs = removeDraftCollabs(
          res?.data?.data?.collabs,
          user?.userId,
        );

        setCollabs(collabs);
        setSessionData('dashboard-collabs', res?.data?.data?.collabs);
        setCollabsLoading(false);
      }
    } catch (err) {
      setCollabs([]);
      setCollabsLoading(false);
    }
  };

  const collabHeartButtonClickSideEffect = (collabId) => {
    const clickedHeartButtonCollab = collabs.find(
      (collab) => collab._id === collabId,
    );
    if (clickedHeartButtonCollab) {
      const updatedCollabs = collabs.map((collab) => {
        if (collab._id === collabId) {
          return {
            ...collab,
            collabLikes: clickedHeartButtonCollab.collabLikes
              ? undefined
              : true,
          };
        }
        return collab;
      });
      setCollabs(updatedCollabs);
      setSessionData('dashboard-collabs', updatedCollabs);
    }
  };

  return (
    <DashboardSectionContainer px={4}>
      <SectionHeader
        text={t('Trending Collabs')}
        infoText={getTodayDate()}
        buttonText={t('Explore All')}
        buttonOnClickHandler={() => router.push('/collab/explore')}
      />
      <>
        {!collabsLoading ? (
          <>
            {collabs && collabs?.length > 0 ? (
              <Carousel settings={collabCarouselResponsiveRules}>
                {collabs.map(
                  (
                    {
                      _id,
                      collabLikes,
                      creatorId,
                      title,
                      description,
                      roles,
                      identifier,
                    },
                    index,
                  ) => (
                    <CollabTile
                      key={_id}
                      index={index}
                      id={_id}
                      identifier={identifier}
                      isLiked={!!collabLikes}
                      title={title}
                      roles={roles.map(({ skill }) => skill)}
                      description={description}
                      creatorName={creatorId?.fullName || creatorId?.username}
                      creatorImage={creatorId?.imageUrl}
                      totalCollabs={creatorId?.totalCollabs ?? 0}
                      collabHeartButtonClickSideEffect={
                        collabHeartButtonClickSideEffect
                      }
                      connections={creatorId?.connections}
                    />
                  ),
                )}
              </Carousel>
            ) : (
              <></>
            )}
          </>
        ) : (
          <Carousel settings={collabCarouselResponsiveRules}>
            {[...Array(9)].map((index) => (
              <CollabTile key={index} isLoading />
            ))}
          </Carousel>
        )}
      </>
    </DashboardSectionContainer>
  );
};

export default TrendingCollabs;
