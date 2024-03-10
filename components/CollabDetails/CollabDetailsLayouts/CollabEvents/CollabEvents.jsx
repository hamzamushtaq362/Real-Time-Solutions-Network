import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { collabEventsResponsiveRules } from './elements';
import {
  ImagePanelCardSkeleton,
  SectionHeader,
  Spacer,
  CollabEventTile,
  Divider,
} from 'components';
import { fetchCollabEvents } from '~/apis';
import { useEffect } from 'react';
import Carousel from 'components/Carousel/Carousel';
import { useTheme, Box } from '@mui/material';

export const CollabEvents = ({ collabId }) => {
  const [collabEvents, setCollabEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  const { t } = useTranslation();

  const getCollabEvents = async () => {
    try {
      setLoading(true);
      const response = await fetchCollabEvents(collabId);

      if (response.data.status === 'success') {
        setCollabEvents(response.data.collabEvents);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCollabEvents();
  }, [collabId]);

  return (
    <>
      {!loading ? (
        collabEvents?.length !== 0 && (
          <>
            <Spacer value={32} />
            <Box p={theme.spacing(2, 4)}>
              <SectionHeader text={t('Collab Events')} />

              <Carousel settings={collabEventsResponsiveRules}>
                {collabEvents?.length > 0 &&
                  collabEvents?.map((event) => {
                    return (
                      <CollabEventTile
                        key={event._id}
                        id={event._id}
                        identifier={event.identifier}
                        creatorId={event.addedBy?._id ?? event?.addedBy}
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
                        eventHostedCollabs={event.eventHostedCollabs}
                      />
                    );
                  })}
              </Carousel>
            </Box>

            <Divider color={theme.palette.text.primary} margin={0} />
          </>
        )
      ) : (
        <>
          <Box p={theme.spacing(2, 4)}>
            <Spacer />
            <SectionHeader text={t('Collab Events')} />
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                columnGap: '10px',
                rowGap: '10px',
              }}
            >
              {[...Array(3)].map((index) => (
                <ImagePanelCardSkeleton key={index} />
              ))}
            </Box>
          </Box>
          <Divider color={theme.palette.text.primary} margin={0} />
        </>
      )}
    </>
  );
};
