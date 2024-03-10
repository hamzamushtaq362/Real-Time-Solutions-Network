import { CompletedCollabCard } from '~/components';
import { NoResultsFound } from '../NoResultsFound';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { GridContainer } from '../../Card/CompletedCollabCard/elements';

export const CreatorProfileCompletedCollabsSection = ({ collabs, loading }) => {
  const { t } = useTranslation();
  return (
    <Box m={4}>
      {!loading ? (
        <>
          {collabs?.length > 0 ? (
            <GridContainer>
              {collabs.map((collab) => (
                <CompletedCollabCard
                  key={collab._id}
                  title={collab?.title}
                  description={collab?.description}
                  image={collab?.images?.[0]}
                  user={collab?.creatorId}
                  members={collab?.members}
                  sx={{ width: '100% !important', margin: '0 !important' }}
                  cardClickHref={`/collab/${collab?.identifier}`}
                />
              ))}
            </GridContainer>
          ) : (
            <NoResultsFound />
          )}
        </>
      ) : (
        <>{t('loading')}</>
      )}
    </Box>
  );
};
