import React, { useState, useEffect, useContext } from 'react';

import {
  CollabTileContainer,
  CollabEventCardTitle,
  CollabTitleRow,
  CollabEventCardHeading,
  CollabHeader,
  CollabEventDateText,
  LookingForWrap,
  CollabEventMemberText,
} from './elements';
import { CollabTileSkeleton } from './CollabTileSkeleton';
import { Spacer, CollabEventDetailsDrawer, Tooltip } from '~/components';
import { truncateString } from '~/utils';
import { useTranslation } from 'react-i18next';
import { format, parseISO } from 'date-fns';
import { CollabEventDurationType } from '~/constants';
import { useWindowWidth } from 'hooks/useWindowWidth';
import { useRouter } from 'next/router';
import AppContext from 'context/AppContext';

export const CollabEventTile = ({
  id,
  identifier,
  key,
  index,
  sx,
  title,
  creatorId,
  description,
  creatorName,
  location,
  link,
  isLoading,
  isDashboardCard,
  durationType,
  durationStart,
  durationEnd,
  participants,
  onClick,
  eventHostedCollabs,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useTranslation();
  const windowWidth = useWindowWidth();
  const router = useRouter();
  const { user } = useContext(AppContext);

  const getFormattedDate = (date) => {
    const formattedDate = format(parseISO(date), 'dd MMM');
    return formattedDate;
  };

  const [eventDetailsDrawerOpen, setEventDetailsDrawerOpen] = useState(false);

  const [acceptedParticipants, setAcceptedParticipants] = useState([]);
  const [acceptedParticipantsExist, setAcceptedParticipantsExist] =
    useState(false);
  const [isEventAddedByLoggedInUser, setIsEventAddedByLoggedInUser] =
    useState(false);

  const appendQuery = () => {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set('eventId', id);

    // Update the URL
    const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
    window.history.replaceState(null, '', newUrl);
  };

  const removeQueryParameter = () => {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.delete('eventId');

    // Update the URL
    let newUrl = window.location.pathname;
    // Check if there are any remaining query parameters
    if (queryParams.toString()) {
      newUrl += `?${queryParams.toString()}`;
    }
    window.history.replaceState(null, '', newUrl);
  };

  useEffect(() => {
    if (participants) {
      const acceptedParticipants = participants.filter(
        (participant) => participant.status === 'ACCEPTED',
      );
      setAcceptedParticipants(acceptedParticipants);
      if (acceptedParticipants?.length > 0) {
        setAcceptedParticipantsExist(true);
      }
    }
  }, [participants]);

  useEffect(() => {
    const { eventId } = router.query;
    if (eventId && eventId === id) {
      setEventDetailsDrawerOpen(true);
    } else {
      setEventDetailsDrawerOpen(false);
    }
  }, [router]);

  useEffect(() => {
    if (user) {
      if (user?.userId === creatorId) {
        setIsEventAddedByLoggedInUser(true);
      }
    }
  }, [user]);

  return (
    <>
      {/* Drawer rendering starts */}
      <CollabEventDetailsDrawer
        title={title}
        description={description}
        durationType={durationType}
        durationStart={durationStart}
        durationEnd={durationEnd}
        location={location}
        isEventAddedByLoggedInUser={isEventAddedByLoggedInUser}
        participants={participants}
        link={link}
        drawerOpen={eventDetailsDrawerOpen}
        toggleDrawer={() => {
          removeQueryParameter();
          setEventDetailsDrawerOpen((prevState) => !prevState);
        }}
      />
      {/* Drawer rendering ends */}

      {!isLoading ? (
        <CollabTileContainer
          sx={{
            margin: index === 0 ? '4px 6px 4px 0 !important' : '4px 6px',
            height: 430,
            ...sx,
          }}
          key={id}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => {
            if (onClick) {
              onClick();
            } else {
              if (eventHostedCollabs) {
                router.push(`/events/${identifier}`)
              }else {
                appendQuery();
                setEventDetailsDrawerOpen(true);
              }
            }
          }}
          hovered={isHovered}
          isDashboardCard={isDashboardCard}
          windowWidth={windowWidth}
        >
          {/* <Link href={`/collab/event/${identifier}`} style={{ width: '100%' }}> */}
          <CollabTitleRow isDashboardCard={isDashboardCard} marginBottom={4}>
            <CollabHeader>
              <CollabEventCardHeading hovered={isHovered}>
                {t('event')}
              </CollabEventCardHeading>
            </CollabHeader>
            <CollabEventCardTitle hovered={isHovered}>
              {title && title.length > 35 ? truncateString(title, 32) : title}
            </CollabEventCardTitle>

            {/* <DescriptionText hovered={isHovered}>
              {description && description.length > 200
                ? truncateString(description, 220)
                : description}
            </DescriptionText> */}
          </CollabTitleRow>

          <>
            <CollabEventCardHeading hovered={isHovered}>
              {t(
                durationType === CollabEventDurationType.timeBound
                  ? 'when'
                  : '',
              )}
            </CollabEventCardHeading>
            <LookingForWrap
              isDashboardCard={isDashboardCard}
              height={25}
              sx={{
                display: 'flex',
                columnGap: 1,
                marginTop: -0.4,
              }}
            >
              <>
                {durationType === CollabEventDurationType.timeBound && (
                  <>
                    <CollabEventDateText key={index} hovered={isHovered}>
                      {durationStart ? getFormattedDate(durationStart) : ''}
                    </CollabEventDateText>

                    <CollabEventDateText>-</CollabEventDateText>

                    <CollabEventDateText key={index} hovered={isHovered}>
                      {durationEnd ? getFormattedDate(durationEnd) : ''}
                    </CollabEventDateText>
                  </>
                )}
              </>
            </LookingForWrap>
          </>

          <Spacer value={100} />

          <>
            <CollabEventCardHeading hovered={isHovered}>
              {t(acceptedParticipantsExist ? 'with' : 'by')}
            </CollabEventCardHeading>
            <LookingForWrap
              isDashboardCard={isDashboardCard}
              height={25}
              sx={{
                display: 'flex',
                marginTop: -0.4,
                marginBottom: 0.5,
              }}
            >
              <>
                {acceptedParticipantsExist ? (
                  <>
                    <CollabEventMemberText key={index} hovered={isHovered}>
                      {acceptedParticipants[0]?.user?.fullName}
                    </CollabEventMemberText>
                    <Tooltip
                      title={acceptedParticipants
                        .map(({ user }) => user.fullName)
                        .slice(1, acceptedParticipants.length)
                        .join(', ')}
                    >
                      <>
                        {acceptedParticipants.slice(
                          1,
                          acceptedParticipants.length,
                        ).length > 0 && (
                          <CollabEventMemberText sx={{ fontWeight: 400 }}>
                            , +
                            {
                              acceptedParticipants.slice(
                                1,
                                acceptedParticipants.length,
                              ).length
                            }{' '}
                            more
                          </CollabEventMemberText>
                        )}
                      </>
                    </Tooltip>
                  </>
                ) : (
                  <>
                    <CollabEventMemberText key={index} hovered={isHovered}>
                      {creatorName}
                    </CollabEventMemberText>
                  </>
                )}
              </>
            </LookingForWrap>
          </>
          {/* </Link> */}
        </CollabTileContainer>
      ) : (
        <CollabTileSkeleton key={key} sx={sx} />
      )}
    </>
  );
};
