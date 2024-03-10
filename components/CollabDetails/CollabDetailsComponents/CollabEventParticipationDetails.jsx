import { useState } from 'react';
import { Box, useTheme } from '@mui/material';
import {
  RightPaneLabel,
  CollabEventDetailsText,
  CollabOfferDetailsHeader,
  CollabOfferDetailsHeaderTitle,
  CollabOfferDetailsContainer,
} from './elements';
import {
  Spacer,
  PrimaryButton,
  OutlinedButton,
  TwitterVerificationDialog,
  Spinner,
  CollabEventDetailsDrawer,
  SmallSpinner,
} from '~/components';
import { useTranslation } from 'react-i18next';
import { ArrowRightUpLongIconStyled } from 'components/common/elements';

const EventDetailsLink = ({ collabEvent }) => {
  const [eventDetailsDrawerOpen, setEventDetailsDrawerOpen] = useState(false);

  const { t } = useTranslation();
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      {/* Drawer rendering starts */}
      <CollabEventDetailsDrawer
        title={collabEvent.title}
        description={collabEvent.description}
        durationType={collabEvent.durationType}
        durationStart={collabEvent.durationStart}
        durationEnd={collabEvent.durationEnd}
        location={collabEvent.location}
        participants={collabEvent?.participants.filter(
          ({ status }) => status === 'ACCEPTED',
        )}
        link={collabEvent?.link}
        drawerOpen={eventDetailsDrawerOpen}
        toggleDrawer={() =>
          setEventDetailsDrawerOpen((prevState) => !prevState)
        }
      />
      {/* Drawer rendering ends */}

      <Box
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setEventDetailsDrawerOpen(true)}
        sx={{
          cursor: 'pointer',
          display: 'flex',
          columnGap: '3px',
        }}
      >
        <CollabEventDetailsText>
          {' '}
          {t('View Event Details')}{' '}
        </CollabEventDetailsText>

        <Box display="flex" component="span">
          <ArrowRightUpLongIconStyled
            width={20}
            height={20}
            hovered={isHovered}
            color={theme.palette.text.primary}
          />
        </Box>
      </Box>
    </>
  );
};

export const CollabEventParticipationDetails = ({
  collabDetails,
  collabEventParticipationDetails,
  loadingEventAcceptRejectIndex,
  acceptRejectCollabEventInvitationHandler,
}) => {
  const { t } = useTranslation();

  return (
    <>
      {/* Dialog rendering starts */}
      <>
        <TwitterVerificationDialog collabDetails={collabDetails} />
      </>
      {/* Dialog rendering ends */}

      <>
        {collabEventParticipationDetails?.filter(
          ({ status }) => status === 'PENDING',
        ).length > 0 ? (
          <>
            {' '}
            <Spacer value={50} />
            <CollabOfferDetailsHeader>
              <CollabOfferDetailsHeaderTitle>
                {t(`Invite to be part of the event`)}
              </CollabOfferDetailsHeaderTitle>
            </CollabOfferDetailsHeader>{' '}
          </>
        ) : (
          <></>
        )}

        {collabEventParticipationDetails?.length > 0 &&
          collabEventParticipationDetails?.map((invitationDetails, index) => {
            return (
              <>
                <CollabOfferDetailsContainer>
                  {invitationDetails?.status === 'PENDING' ? (
                    <Box
                      sx={{
                        width: '100%',
                        marginBottom: '20px',
                      }}
                    >
                      {/* Offer Details Start  */}

                      <RightPaneLabel>
                        {`Do you want to accept participation request for collab event: ${invitationDetails?.collabEvent?.title} ?`}
                      </RightPaneLabel>

                      <EventDetailsLink
                        collabEvent={invitationDetails.collabEvent}
                      />

                      <Spacer value={30} />

                      {/* Offer Details End */}

                      <Box
                        sx={{
                          display: 'flex',
                          columnGap: '4px',
                          width: '100%',
                          rowGap: '8px',
                        }}
                      >
                        <PrimaryButton
                          width={'160px'}
                          onClick={() => {
                            acceptRejectCollabEventInvitationHandler(
                              invitationDetails?._id,
                              'ACCEPTED',
                              index,
                            );
                          }}
                          disabled={loadingEventAcceptRejectIndex === index}
                        >
                          {loadingEventAcceptRejectIndex === index ? (
                            <SmallSpinner inverse={true} />
                          ) : (
                            `Accept`
                          )}
                        </PrimaryButton>

                        <OutlinedButton
                          disabled={loadingEventAcceptRejectIndex === index}
                          width={'160px'}
                          onClick={() => {
                            acceptRejectCollabEventInvitationHandler(
                              invitationDetails?._id,
                              'REJECTED',
                              index,
                            );
                          }}
                        >
                          {loadingEventAcceptRejectIndex === index ? (
                            <Spinner size="20px" />
                          ) : (
                            `Decline`
                          )}
                        </OutlinedButton>
                      </Box>
                    </Box>
                  ) : (
                    <></>
                  )}
                </CollabOfferDetailsContainer>
              </>
            );
          })}
      </>
    </>
  );
};
