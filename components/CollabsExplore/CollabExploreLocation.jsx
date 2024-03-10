import React, { useState, useEffect } from 'react';
import {
  CollabsExploreContainer as ExploreContainer,
  ExploreLocationHeaderContainer,
  LocationHeaderText,
} from './elements';
import { trackMixPanel } from '~/utils';
import {
  NavButtonGroup,
  StyledTooltip,
  Spacer,
  CollabEventTile,
  CollabEventsLoadingGrid,
} from '~/components';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { Box, useTheme } from '@mui/material';
import { UilMapMarker } from '@iconscout/react-unicons';
import axios from 'axios';
import { BASE_URL } from '~/apis';
import { fetchRefresToken, reFetchTokenExpire } from '~/redux';
import { CollabsMapping } from './CollabsMapping';
import { CollabsLoadingGrid } from './CollabsLoadingGrid';
import { NoResultsFound } from './NoResultsFound';
import { EventsGridContainer } from 'components/common/elements';
import { SecondaryNavbar } from '../SecondaryNavbar';

export const CollabExploreLocation = ({
  place,
  // placeId
}) => {
  const router = useRouter(); // Dynamic routes
  const [placeDescription, setPlaceDescription] = useState('');
  // const [collabs, setCollabs] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState('collabs');
  const theme = useTheme();

  useEffect(() => {
    trackMixPanel('Collabs_Explore_Page');
  }, [router?.query]);

  useEffect(() => {
    if (!router?.query?.view) {
      setActiveTab('collabs');
    }

    const place = router.query.place;
    setPlaceDescription(place);
  }, [router]);

  const buttonsData = [
    {
      text: t('All'),
      value: 'all',
      hide: true,
    },
    {
      text: t('Collabs'),
      value: 'collabs',
      hide: false,
    },
    {
      text: t('Events'),
      value: 'events',
      hide: false,
    },
    {
      text: t('Creators'),
      value: 'creators',
      hide: true,
    },
  ];

  const getSearchTypeValueFromActiveTab = (activeTab) => {
    switch (activeTab) {
      case 'all':
        return 'all';
      case 'collabs':
        return 'collab';
      case 'events':
        return 'collab-event';
      case 'creators':
        return 'creator';
      default:
        return 'all';
    }
  };

  const fetchResultsByPlace = async (place) => {
    try {
      setLoading(true);

      const f1 = async () => {
        const res = await axios.get(
          `${BASE_URL}/api/v1/search/city-location/items?place=${place}&type=${getSearchTypeValueFromActiveTab(
            activeTab,
          )}`,
        );
        return res;
      };

      const response = await reFetchTokenExpire(f1, fetchRefresToken);

      if (response.data.status === 'success') {
        setResults(response.data?.items);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  // Do not delete the following code i.e. fetchResultsByPlaceId

  // const fetchResultsByPlaceId = async (placeId) => {
  //   try {
  //     setLoading(true);
  //     const results = await getPlaceDetailsByPlaceId(placeId);

  //     const currentPlaceId = getSessionData('currentPlaceId');
  //     const currentPlaceDescription = getSessionData('currentPlaceDescription');

  //     if (
  //       currentPlaceId !== placeId ||
  //       !currentPlaceDescription ||
  //       !currentPlaceId
  //     ) {
  //       // fetch the details again
  //       setPlaceDescription(results?.description);
  //     } else {
  //       setPlaceDescription(currentPlaceDescription);
  //     }

  //     if (results?.latitude && results?.longitude) {
  //       // fetch results

  //       const f1 = async () => {
  //         const res = await axios.get(
  //           `${BASE_URL}/api/v1/search/location/collabs?latitude=${results?.latitude}&longitude=${results?.longitude}`,
  //         );
  //         return res;
  //       };
  //       const response = await reFetchTokenExpire(f1, fetchRefresToken);

  //       if (response.data.status === 'success') {
  //         const innerCircleCollabs = response.data?.innerCircleCollabs;
  //         const outerCircleCollabs = response.data?.outerCircleCollabs;

  //         let updatedOuterCircleCollabs = [];

  //         if (outerCircleCollabs?.length > 0) {
  //           updatedOuterCircleCollabs = outerCircleCollabs.map((collab) => {
  //             return {
  //               ...collab,
  //               showNearbyTag: true,
  //             };
  //           });
  //         }

  //         const collabs = [...innerCircleCollabs, ...updatedOuterCircleCollabs];

  //         setCollabs(collabs);
  //       }

  //       setLoading(false);
  //     }
  //   } catch (error) {
  //     setLoading(false);
  //     generateSnackbar('error', 'Something went wrong while fetching results!');
  //   }
  // };

  // useEffect(() => {
  //   if (placeId) {
  //     fetchResultsByPlaceId(placeId);
  //   }
  // }, [placeId]);

  useEffect(() => {
    if (place) {
      // fetch results by the place (i.e the city suggestions)
      fetchResultsByPlace(place);
    }
  }, [place, activeTab]);

  return (
    <>
      <SecondaryNavbar
        title={
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              columnGap: '2px',
            }}
          >
            <UilMapMarker color={theme.palette.grey.common} size={24} />
            <StyledTooltip title={placeDescription}>
              <LocationHeaderText>{placeDescription}</LocationHeaderText>
            </StyledTooltip>
          </Box>
        }
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabsData={buttonsData}

      />

      <ExploreContainer sx={{ padding: '0 30px 50px' }}>
        <>
          {!loading && results?.length > 0 && (
            <>
              {activeTab === 'collabs' && (
                <CollabsMapping
                  collaborations={results}
                  propsForCollabTile={{
                    showLocation: true,
                  }}
                />
              )}

              {activeTab === 'events' && (
                <EventsGridContainer>
                  {results.map((event) => {
                    return (
                      <CollabEventTile
                        key={event._id}
                        id={event._id}
                        creatorId={event.addedBy?._id ?? event?.addedBy}
                        identifier={event._id}
                        title={event.title}
                        description={event.description}
                        location={event.location}
                        link={event?.link}
                        creatorName={event?.addedBy?.fullName}
                        totalCollabs={event?.addedBy?.totalCollabs}
                        durationType={event.durationType}
                        durationStart={event.durationStart}
                        durationEnd={event.durationEnd}
                        participants={event.participants}
                      />
                    );
                  })}
                </EventsGridContainer>
              )}
            </>
          )}

          {!loading && results?.length === 0 && (
            <>
              <Spacer value={200} />
              <NoResultsFound
                text={`No results found for the location: ${placeDescription}, try searching nearby locations!`}
              />
            </>
          )}

          {loading && activeTab === 'collabs' && <CollabsLoadingGrid />}
          {loading && activeTab === 'events' && <CollabEventsLoadingGrid />}
        </>
      </ExploreContainer>
    </>
  );
};
