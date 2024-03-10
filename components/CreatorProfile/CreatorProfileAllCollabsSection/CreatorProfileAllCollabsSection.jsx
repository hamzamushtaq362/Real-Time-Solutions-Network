import { useTranslation } from 'react-i18next';
import { CollabTile, TileAddPlaceholder } from '~/components';
import { NoResultsFound } from '../NoResultsFound';
import { Box } from '@mui/material';
import { GridContainer } from 'components/common/elements';
import { useRouter } from 'next/router';


export const CreatorProfileAllCollabsSection = ({
  collabs,
  loading,
  profileBelongsToLoggedInUser,
}) => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <Box m={4}>
      {!loading ? (
        <>
          {collabs?.length > 0 ? (
            <GridContainer>
              {profileBelongsToLoggedInUser && (
                <TileAddPlaceholder
                  onClick={() => router.push(`collab/create`)}
                  cardTitle={t('Add New Collab')}
                  sx={{ width: '100% !important', margin: '0 !important' }}
                />
              )}
              {collabs.map(
                ({
                  _id,
                  identifier,
                  collabLikes,
                  creatorId,
                  title,
                  description,
                  roles,
                }) => (
                  <CollabTile
                    key={_id}
                    id={_id}
                    identifier={identifier}
                    isLiked={!!collabLikes}
                    title={title}
                    roles={roles?.map(({ skill }) => skill)}
                    description={description}
                    creatorName={creatorId?.fullName || creatorId?.username}
                    creatorImage={creatorId?.imageUrl}
                    totalCollabs={creatorId?.totalCollabs ?? 0}
                    connections={creatorId?.connections}
                    sx={{ width: '100% !important', margin: '0 !important' }}
                  />
                ),
              )}
            </GridContainer>
          ) : (
            <NoResultsFound
              text={t("This creator doesn't have any collabs yet")}
            />
          )}
        </>
      ) : (
        <GridContainer>
          {[...Array(15)].map((index) => (
            <CollabTile key={index} isLoading={true} />
          ))}
        </GridContainer>
      )}
    </Box>
  );
};
