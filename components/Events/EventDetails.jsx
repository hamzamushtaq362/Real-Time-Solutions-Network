import React, { useContext, useEffect, useState } from 'react';
import {
  APP_URL,
  fetchHostedEventDetails,
  followEventCollaborators,
  updateEventMemberStatus,
} from '~/apis';
import { useRouter } from 'next/router';
import { Box, Tooltip, useTheme } from '@mui/material';
import { PlusIconWrap } from '../Landing/FaqSection/elements';
import PlusIcon from '../Icons/PlusIcon';
import {
  EventDescription,
  EventTitle,
  AccordionSummary,
  AccordionDetails,
  Accordion,
  EventDate,
  EventLocation,
} from './elements';
import {
  FollowIcon,
  NavButtonGroup,
  ShareUploadIcon,
  SmallSpinner,
  Spinner,
} from '~/components';
import { useTranslation } from 'react-i18next';
import { CreatorProfileAllCollabsSection } from '../CreatorProfile/CreatorProfileAllCollabsSection';
import { convertTimestampToFullDate, getCountryFromAddress } from '~/utils';
import { FlexBox } from '../common/elements';
import { CalendarIcon, MapPinIcon } from '~/assets';
import Image from 'next/image';
import AppContext from '../../context/AppContext';
import NewButton from '../Button/NewButton';
import SecondaryButton from '../Button/SecondaryButton';
import { useNotistack } from '~/hooks';
import { RoundedIcon } from '../common/ProfileCommon/element';
import { EventCollaborators } from './EventCollaborators';
import { ShareHorizontalMenu } from '../ShareHorizontalMenu';

export const EventDetails = ({ eventResponse }) => {
  const { t } = useTranslation();
  const [eventDetails, setEventDetails] = useState(eventResponse);
  const [eventExpanded, setEventExpanded] = useState(true);
  const [activeButton, setActiveButton] = useState('collabs');
  const [loadingAccept, setLoadingAccept] = useState(false);
  const [loadingReject, setLoadingReject] = useState(false);
  const [collaborators, setCollaborators] = useState([]);
  const [isInvited, setIsInvited] = useState(false);
  const [shareAnchorEl, setShareAnchorEl] = useState(null);
  const [collaboratorsFollowingLoading, setCollaboratorsFollowingLoading] =
    useState(false);
  const generateSnackbar = useNotistack();
  const router = useRouter();
  const theme = useTheme();
  const { user: admin } = useContext(AppContext);

  useEffect(() => {
    const handleRouteChange = async () => {
      const eventRes = await fetchHostedEventDetails(router.query.eventId);
      setEventDetails(eventRes.collabEvent);
      const { participants, addedBy } = eventRes?.collabEvent || {};
      const acceptedParticipants = participants?.filter(
        (participant) => participant.status === 'ACCEPTED',
      );
      setCollaborators([
        addedBy,
        ...acceptedParticipants?.map((participant) => participant?.user),
      ]);
      setIsInvited(
        eventRes?.collabEvent?.participants?.find(
          (participant) => participant?.user?._id === admin?.userId,
        )?.status === 'PENDING',
      );
    };

    window.addEventListener('popstate', handleRouteChange);
    handleRouteChange();

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [router]);

  const {
    title,
    description,
    eventHostedCollabs,
    addedBy,
    durationType,
    durationStart,
    durationEnd,
    mode,
    location,
  } = eventDetails || {};
  const collabsCount = eventHostedCollabs?.length;
  const collaboratorsCount = collaborators?.length;

  const buttonsData = [
    {
      text: t('Collabs'),
      value: 'collabs',
      count: collabsCount,
      hide: !collabsCount || collabsCount === 0,
    },
    {
      text: t('Collaborators'),
      value: 'collaborators',
      count: collaboratorsCount,
      hide: collaboratorsCount === 0,
    },
  ];
  const handleAcceptInvitation = async () => {
    setLoadingAccept(true);
    const res = await updateEventMemberStatus({
      type: 'accept',
      eventId: eventDetails?._id,
      newMemberId: admin.userId,
    });
    if (res?.data?.status === 'success') {
      generateSnackbar('Invitation accepted successfully', 'success');
      setCollaborators([...collaborators, admin]);
      setIsInvited(false);
    }
    setLoadingAccept(false);
  };
  const handleRejectInvitation = async () => {
    setLoadingReject(true);
    const res = await updateEventMemberStatus({
      type: 'reject',
      eventId: eventDetails?._id,
      newMemberId: admin.userId,
    });
    if (res?.data?.status === 'success') {
      generateSnackbar('Invitation rejected', 'success');
      setIsInvited(false);
    }
    setLoadingReject(false);
  };
  const handleShareEvent = (event) => {
    setShareAnchorEl(event.currentTarget);
    event.stopPropagation();
  };
  const handleFollowEvent = async (e) => {
    e.stopPropagation();
    try {
      setCollaboratorsFollowingLoading(true);
      const data = await followEventCollaborators(eventDetails?._id);

      if (data.status === 'success') {
        generateSnackbar(data.message, 'success');
      }
      setCollaboratorsFollowingLoading(false);
    } catch {
      setCollaboratorsFollowingLoading(false);
    }
  };

  return (
    <>
      <Accordion
        key="event"
        expanded={eventExpanded}
        onChange={() => setEventExpanded(!eventExpanded)}
      >
        <AccordionSummary expanded={eventExpanded}>
          <Box flex={1}>
            <EventTitle>{title}</EventTitle>
            <FlexBox mt={1} sx={{ opacity: eventExpanded ? 1 : 0 }}>
              {(mode === 'hybrid' || mode === 'physical') && (
                <Tooltip title={location}>
                  <FlexBox mr={4}>
                    <Image
                      width="16"
                      height="16"
                      alt="Draft Icon"
                      src={MapPinIcon.src}
                      style={{ marginRight: '4px' }}
                    />
                    <EventLocation
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(
                          `/collab/explore/location?place=${getCountryFromAddress(
                            location,
                          )}`,
                        );
                      }}
                    >
                      {getCountryFromAddress(location)}
                    </EventLocation>
                  </FlexBox>
                </Tooltip>
              )}
              {durationType === 'timeBound' && (
                <FlexBox>
                  <Image
                    width="16"
                    height="16"
                    alt="Draft Icon"
                    src={CalendarIcon.src}
                    style={{ marginRight: '4px' }}
                  />
                  <EventDate>
                    {convertTimestampToFullDate(durationStart)} -{' '}
                    {convertTimestampToFullDate(durationEnd)}
                  </EventDate>
                </FlexBox>
              )}
            </FlexBox>
          </Box>
          <FlexBox>
            {eventExpanded && (
              <>
                {admin.userId !== addedBy?._id && (
                  <Box mr={1} onClick={handleFollowEvent}>
                    <FollowIcon
                      width={16}
                      height={16}
                      color={theme.palette.text.primary}
                    />
                  </Box>
                )}
                <RoundedIcon onClick={handleShareEvent} width={28} height={28}>
                  <ShareUploadIcon
                    width={16}
                    height={16}
                    color={theme.palette.text.primary}
                  />
                </RoundedIcon>
              </>
            )}
            <PlusIconWrap mr={2} ml={1} isRotated={eventExpanded}>
              <PlusIcon
                width={20}
                height={20}
                color={theme.palette.text.primary}
              />
            </PlusIconWrap>
          </FlexBox>
        </AccordionSummary>
        <AccordionDetails>
          <EventDescription>{description}</EventDescription>

          {isInvited && (
            <FlexBox mt={3} justifyContent="flex-end">
              <NewButton
                width={200}
                onClick={handleAcceptInvitation}
                disabled={loadingAccept || loadingReject}
                marginRight={10}
              >
                {loadingAccept ? (
                  <SmallSpinner inverse={true} />
                ) : (
                  'Accept event invitation'
                )}
              </NewButton>
              <SecondaryButton
                disabled={loadingAccept || loadingReject}
                width={100}
                onClick={handleRejectInvitation}
              >
                {loadingReject ? <Spinner size="20px" /> : 'Decline'}
              </SecondaryButton>
            </FlexBox>
          )}
        </AccordionDetails>
      </Accordion>
      <Box mt={2}>
        <NavButtonGroup
          buttonsData={buttonsData}
          activeButton={activeButton}
          setActiveButton={setActiveButton}
          sx={{ padding: '12px 30px', flex: 'unset !important' }}
          showBorderTop={true}
          showBorderBottom={true}
          align="center"
        />
      </Box>
      <Box>
        {activeButton === 'collabs' && (
          <CreatorProfileAllCollabsSection
            collabs={eventHostedCollabs}
            // loading={loading}
            profileBelongsToLoggedInUser={false}
          />
        )}

        {activeButton === 'collaborators' && (
          <EventCollaborators
            members={collaborators}
            addedBy={addedBy}
            adminCollaboratorRole="Event Host"
            regularRole="Co-host"
          />
        )}
      </Box>
      <ShareHorizontalMenu
        shareAnchorEl={shareAnchorEl}
        setShareAnchorEl={setShareAnchorEl}
        url={APP_URL + router.asPath}
        subject="Event"
      />
    </>
  );
};
