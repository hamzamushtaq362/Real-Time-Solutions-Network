import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { TileAddPlaceholder, CollabEventTile } from 'components/CollabCommon';
import { EventsGridContainer } from './elements';
import { useRouter } from 'next/router';
import { fetchCollabEvents } from 'apis';
import { SectionHeader } from 'components';

export const EventsSection = ({
  collabId,
  collabIdentifier,
  isLoginUserCoCreatorOfCollab,
  showHeader,
  hideAddPlaceholder,
  loadingEventsCount,
}) => {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);
  const [collabEvents, setCollabEvents] = useState([]);
  const [noEventsFound, setNoEventsFound] = useState(true);
  const router = useRouter();

  const getCollabEvents = async () => {
    try {
      setLoading(true);
      const response = await fetchCollabEvents(collabId);

      if (response.data.status === 'success') {
        setCollabEvents(response.data.collabEvents);
        if (response.data.collabEvents.length > 0) {
          setNoEventsFound(false);
        }
      }

      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCollabEvents();
  }, [collabId]);

  return (
    <>
      <>
        {showHeader && !noEventsFound && <SectionHeader text={t('Events')} />}
      </>

      <EventsGridContainer>
        {!loading ? (
          <>
            {!hideAddPlaceholder && (
              <>
                {!isLoginUserCoCreatorOfCollab && (
                  <TileAddPlaceholder
                    sx={{ height: 20 }}
                    cardTitle={t('Create new event')}
                    minHeight={430}
                    onClick={() =>
                      router.push(`/collab/${collabIdentifier}/event/create`)
                    }
                  />
                )}
              </>
            )}

            {collabEvents.length > 0 &&
              collabEvents.map((event) => (
                <CollabEventTile
                  key={event._id}
                  id={event._id}
                  creatorId={event.addedBy?._id ?? event?.addedBy}
                  identifier={event._id}
                  title={event.title}
                  description={event.description}
                  location={event.location}
                  link={event?.link}
                  creatorName={event.addedBy.fullName}
                  totalCollabs={event.addedBy.totalCollabs}
                  durationType={event.durationType}
                  durationStart={event.durationStart}
                  durationEnd={event.durationEnd}
                  participants={event.participants}
                />
              ))}
          </>
        ) : (
          <>
            {[...Array(loadingEventsCount ?? 12)].map((_, index) => (
              <CollabEventTile key={index} isLoading />
            ))}
          </>
        )}
      </EventsGridContainer>
    </>
  );
};
