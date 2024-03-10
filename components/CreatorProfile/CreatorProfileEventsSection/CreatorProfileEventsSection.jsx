import { useTranslation } from 'react-i18next';
import { CollabEventTile, CollabTile } from '~/components';
import { NoResultsFound } from '../NoResultsFound';
import { Box } from '@mui/material';
import { GridContainer } from 'components/common/elements';
import { useRouter } from 'next/router';

export const CreatorProfileEventsSection = ({ events, loading }) => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <Box m={4}>
      {!loading ? (
        <>
          {events?.length > 0 ? (
            <GridContainer>
              {events.map((event) => (
                <CollabEventTile
                  key={event._id}
                  id={event._id}
                  identifier={event._id}
                  creatorId={event.addedBy?._id ?? event?.addedBy}
                  title={event.title}
                  description={event.description}
                  location={event.location}
                  link={event?.link}
                  creatorName={event.addedBy.fullName}
                  creatorImage={event.addedBy.imageUrl}
                  totalCollabs={event.addedBy.totalCollabs}
                  durationType={event.durationType}
                  durationStart={event.durationStart}
                  durationEnd={event.durationEnd}
                  participants={event.participants}
                  sx={{ width: '100% !important', margin: '0 !important' }}
                  onClick={() => router.push(`/events/${event.identifier}`)}
                />
              ))}
            </GridContainer>
          ) : (
            <NoResultsFound
              text={t("This creator hasn't created any events yet")}
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
