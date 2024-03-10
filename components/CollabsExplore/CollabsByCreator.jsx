import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import {
  CollabsExploreContainer,
  CollabsExploreContainerGrid,
  CollabTilesContainer,
  SectionHeaderText,
} from './elements';
import { CollabTile, Spacer } from '~/components';
import { fetchRefreshToken, reFetchTokenExpire } from '~/redux';
import { BASE_URL } from '~/apis';
import { filterAcceptedCollabMemberDetails } from '~/utils';
import { CardsEmptyState } from '~/components';
import { useRouter } from 'next/router';
import axios from 'axios';
import { GridContainer } from 'components/common/elements';

const CollabsMapping = ({ collaborations, isMyCollabs }) => {
  return (
    <>
      <GridContainer>
        {collaborations && collaborations.length ? (
          collaborations.map(
            (
              {
                _id,
                collabLikes,
                creatorId,
                title,
                description,
                platform,
                roles,
                members,
                membersLimit,
              },
              index,
            ) => (
              <CollabTile
                key={_id}
                id={_id}
                index={index}
                isLiked={!!collabLikes}
                title={title}
                platforms={platform}
                roles={roles.map(({ skill }) => skill)}
                description={description}
                creatorName={creatorId?.fullName}
                creatorId={creatorId?._id}
                members={filterAcceptedCollabMemberDetails(members)}
                membersLimit={membersLimit}
                creatorImage={creatorId?.imageUrl}
                totalCollabs={creatorId?.totalCollabs ?? 0}
                followers={creatorId?.numberOfFollowers}
                sx={{ width: '100% !important', margin: '0 !important' }}
              />
            ),
          )
        ) : (
          <></>
        )}
      </GridContainer>

      {(!collaborations || collaborations.length === 0) && (
        <CardsEmptyState isMyCollabs={isMyCollabs} isInvite={false} />
      )}
    </>
  );
};

export const CollabsByCreator = () => {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(true);
  const [userFullName, setUserFullName] = useState('');
  const [collabs, setCollabs] = useState([]);

  const router = useRouter();

  const getCollabsByCreator = async () => {
    setLoading(true);

    const username = router.query.nickname;

    if (username) {
      try {
        const f1 = async () => {
          return await axios.get(`${BASE_URL}/user/user-details/${username}`);
        };
        const res = await reFetchTokenExpire(f1, fetchRefreshToken);
        if (res?.data?.status === 'success') {
          const user = res?.data?.user;
          setUserFullName(user?.fullName);
          const collabResponse = await axios.get(
            `${BASE_URL}/api/v1/collabmember/getAllMyCollabs?userId=${user?._id}`,
          );
          if (collabResponse?.data?.status === 'success') {
            const collabs = collabResponse?.data?.data?.collabs;
            setCollabs(collabs);
          }
        }
        setLoading(false);
      } catch {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (router) {
      getCollabsByCreator();
    }
  }, [router]);

  return (
    <CollabsExploreContainer>
      {/* Header Start */}
      {/* Main Content Starts */}
      {!loading && (
        <>
          <SectionHeaderText>
            {t('Collabs started by')}
            {userFullName}
          </SectionHeaderText>

          <Spacer value={32} />
          {/* Header End */}
          <>
            <CollabsMapping collaborations={collabs} />
          </>
        </>
      )}
      {/* Main Content Ends */}
      {/* Loading Skeleton Content Starts */}
      <CollabTilesContainer>
        {loading && (
          <>
            <CollabsExploreContainerGrid>
              {[...Array(25)].map((index) => (
                <CollabTile key={index} isLoading={true} />
              ))}
            </CollabsExploreContainerGrid>
          </>
        )}
      </CollabTilesContainer>
      {/* Loading Skeleton Content Starts */}
    </CollabsExploreContainer>
  );
};
