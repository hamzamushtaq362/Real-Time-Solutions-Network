import { useTranslation } from 'react-i18next';
import React, { useState, useEffect, useContext } from 'react';
import { BASE_URL } from '~/apis';
import { CollabTile, SectionHeader } from '~/components';
import { fetchRefreshToken, reFetchTokenExpire } from '~/redux';
import {
  filterAcceptedCollabMemberDetails,
  filterMongoObjectsFromId,
} from '~/utils';
import { useTheme, Box } from '@mui/material';
import { collabCarouselResponsiveRules } from 'components/DashboardHome/elements';
import axios from 'axios';
import { useRouter } from 'next/router';
import Carousel from '../../Carousel/Carousel';
import AppContext from 'context/AppContext';

const SimilarCollabs = ({ title, type, collabDetails, collabLoading }) => {
  const [loading, setLoading] = useState(false);
  const [collabs, setCollabs] = useState([]);
  const [noCollabsExist, setNoCollabsExist] = useState(false);
  const { t } = useTranslation();
  const theme = useTheme();

  const router = useRouter();
  const { user } = useContext(AppContext);

  const getSimilarCollabs = async () => {
    try {
      setLoading(true);
      const f1 = async () => {
        const res = await axios.post(
          `${BASE_URL}/api/v1/collab/similar?page=1&limit=10&userId=${user?.userId}`,
          {
            platform:
              collabDetails && collabDetails.platform && collabDetails.platform,
          },
        );

        return res;
      };
      const res = await reFetchTokenExpire(f1, fetchRefreshToken);

      if (res) {
        // Filtering collabs from the current loaded collab
        const filteredCollabs = filterMongoObjectsFromId(
          res?.data?.data?.collabs,
          collabDetails?._id,
        );
        setCollabs(filteredCollabs);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
    }
  };

  const getCollabsByCreator = async () => {
    try {
      const creatorId = collabDetails?.creatorId?._id;
      setLoading(true);

      const f1 = async () => {
        const res = await axios.get(
          `${BASE_URL}/api/v1/collabmember/getAllMyCollabs?userId=${creatorId}&page=1&limit=10`,
        );
        return res;
      };
      const res = await reFetchTokenExpire(f1, fetchRefreshToken);

      if (res) {
        if (collabDetails) {
          // Filtering collabs from the current loaded collab
          const filteredCollabs = filterMongoObjectsFromId(
            res?.data?.data?.collabs,
            collabDetails?._id,
          );
          if (filteredCollabs.length === 0) {
            setNoCollabsExist(true);
          }
          setCollabs(filteredCollabs);
          setLoading(false);
        }
      }
    } catch (err) {
      setLoading(false);
    }
  };

  const creatorSeeAllButtonClickHandler = () => {
    // const creatorId = collabDetails?.creatorId?._id;
    const username = collabDetails?.creatorId?.username;
    if (type === 'similar') {
      router.push('/collab/explore?view=all');
    } else {
      router.push(`/collab/explore/${username}`);
    }
  };

  useEffect(() => {
    if (!collabLoading && collabDetails?.identifier === router.query.collabId) {
      if (type && type === 'similar') {
        getSimilarCollabs();
      }
      if (type && type === 'creator') {
        getCollabsByCreator();
      }
    }
  }, [router.query.collabId, collabLoading]);

  return (
    <>
      {!noCollabsExist && (
        <Box p={theme.spacing(2, 4)}>
          {/* <HorizontalPadder> */}
          <SectionHeader
            text={title}
            buttonText={t('See All')}
            withoutButton={type !== 'creator'}
            buttonOnClickHandler={creatorSeeAllButtonClickHandler}
            collabCount={collabs.length}
          />
          <Carousel settings={collabCarouselResponsiveRules}>
            {!loading && collabs?.length > 0
              ? collabs.map(
                  ({
                    _id,
                    identifier,
                    collabLikes,
                    creatorId,
                    title,
                    description,
                    platform,
                    roles,
                    members,
                    membersLimit,
                  }) => (
                    <CollabTile
                      key={_id}
                      identifier={identifier}
                      index={_id}
                      trackEvent
                      id={_id}
                      isLiked={!!collabLikes}
                      title={title}
                      platforms={platform}
                      roles={roles.map(({ skill }) => skill)}
                      description={description}
                      creatorName={creatorId?.fullName && creatorId.fullName}
                      members={filterAcceptedCollabMemberDetails(members)}
                      membersLimit={membersLimit}
                      creatorImage={creatorId?.imageUrl && creatorId.imageUrl}
                      totalCollabs={creatorId?.totalCollabs ?? 0}
                      creatorId={creatorId?._id}
                      followers={
                        creatorId?.numberOfFollowers &&
                        creatorId.numberOfFollowers
                      }
                      connections={creatorId?.connections}
                      hideCurationOption
                    />
                  ),
                )
              : [...Array(9)].map((index) => (
                  <CollabTile
                    key={index}
                    isLoading
                    sx={{ margin: '4px 6px' }}
                  />
                ))}
          </Carousel>
        </Box>
      )}
    </>
  );
};

export default SimilarCollabs;
