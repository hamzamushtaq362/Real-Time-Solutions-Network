import { useTranslation } from 'react-i18next';
import { CollabTile } from '~/components';
import { NoResultsFound } from '../NoResultsFound';
import { Box } from '@mui/material';
import { GridContainer } from 'components/common/elements';

export const CreatorProfileFavouriteCollabsSection = ({ collabs, loading }) => {
  const { t } = useTranslation();

  return (
    (<Box m={4}>
      {!loading ? (
        <>
          {collabs?.length > 0 ? (
            <GridContainer>
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
                    roles={roles.map(({ skill }) => skill)}
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
            <NoResultsFound text={t("You have not favorited any Collabs yet. Explore Collabs to favorite to show up here.")} />
          )}
        </>
      ) : (
        <GridContainer>
          {[...Array(15)].map((index) => (
            <CollabTile key={index} isLoading={true} />
          ))}
        </GridContainer>
      )}
    </Box>)
  );
};
