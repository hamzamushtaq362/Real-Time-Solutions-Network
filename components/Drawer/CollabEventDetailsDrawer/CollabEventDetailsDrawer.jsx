import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  HeaderContainer,
  DrawerTitle,
  SubHeaderContainer,
  SubHeaderText,
  DescriptionContainer,
  DescriptionText,
  CollaboratorsContainer,
  SubFooterContainer,
  FooterContainer,
  CollaboratorsHeader,
  CollaboratorsAvatarContainer,
  AvatarBox,
  AvatarText,
  SubFooterText,
  IconBox,
  CircleDividier,
  VisitEventPageText,
} from './elements';
import { format, parseISO } from 'date-fns';
import { RoundedBorderedContainer } from 'components/Dropdown/elements';
import CloseIcon from 'components/Icons/CloseIcon';
import {
  Divider,
  Avatar,
  FacebookFilledIcon,
  LinkedInFilledIcon,
  TwitterFilledIcon,
} from '~/components';

import { UilWhatsapp, UilTelegramAlt } from '@iconscout/react-unicons';

import { useTheme } from '@mui/material';
import { RightDrawer } from '../RightDrawer';
import { CollabEventDurationType } from '~/constants';
import { truncateString, openLinkInNewTab, shareLinkHandler } from '~/utils';
import { Box } from '@mui/material';
import { UilMapMarker } from '@iconscout/react-unicons';
import { ArrowRightUpLongIconStyled } from 'components/common/elements';
import DropdownEmailAvatar from 'components/Dropdown/DropdownEmailAvatar';

export const CollabEventDetailsDrawer = ({
  drawerOpen,
  toggleDrawer,
  title,
  description,
  durationType,
  durationStart,
  durationEnd,
  location,
  participants,
  isEventAddedByLoggedInUser,
  link,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const getFormattedDate = (date) => {
    const formattedDate = format(parseISO(date), 'dd MMM, yyyy');
    return formattedDate;
  };
  const [isHovered, setIsHovered] = useState(false);
  const acceptedParticipants = participants?.filter(
    (participant) => participant.status === 'ACCEPTED',
  );
  const unAcceptedParticipants = participants?.filter(
    (participant) => participant.status === 'PENDING',
  );

  return (
    <RightDrawer open={drawerOpen} handleClose={toggleDrawer}>
      <HeaderContainer>
        <DrawerTitle>{title}</DrawerTitle>
        <RoundedBorderedContainer
          onClick={toggleDrawer}
          borderColor={theme.palette.borderLightInverse}
          boxShadow="none"
          background="transparent"
        >
          <CloseIcon
            width={20}
            height={20}
            color={theme.palette.text.inverse}
          />
        </RoundedBorderedContainer>
      </HeaderContainer>

      <Divider color={theme.palette.borderLightInverse} margin="6px 0" />

      <SubHeaderContainer>
        {durationType === CollabEventDurationType.timeBound && (
          <>
            <SubHeaderText>
              {getFormattedDate(durationStart)} -{' '}
              {getFormattedDate(durationEnd)}{' '}
            </SubHeaderText>
            <CircleDividier />
          </>
        )}

        {location && (
          <Box
            sx={{ display: 'flex', alignItems: 'flex-start', columnGap: '1px' }}
          >
            <UilMapMarker color={theme.palette.grey.common} size="20" />
            <SubHeaderText>{location}</SubHeaderText>
          </Box>
        )}
      </SubHeaderContainer>
      {durationType === CollabEventDurationType.timeBound ||
        (location && (
          <Divider color={theme.palette.borderLightInverse} margin="6px 0" />
        ))}

      <DescriptionContainer>
        {description && (
          <DescriptionText>
            {description?.length < 700
              ? description
              : `${truncateString(description, 700)}...`}
          </DescriptionText>
        )}
      </DescriptionContainer>

      {acceptedParticipants?.length > 0 && (
        <>
          <Divider color={theme.palette.borderLightInverse} margin="6px 0" />
          <CollaboratorsContainer>
            <CollaboratorsHeader>Collaborators</CollaboratorsHeader>
            <CollaboratorsAvatarContainer mt={2}>
              {acceptedParticipants?.map((participant) => (
                <AvatarBox key={participant.id}>
                  <Avatar avatar={participant?.user?.imageUrl} size={50} />
                  <AvatarText mt={1}>{participant?.user?.fullName}</AvatarText>
                </AvatarBox>
              ))}
            </CollaboratorsAvatarContainer>
          </CollaboratorsContainer>
        </>
      )}

      {isEventAddedByLoggedInUser && (
        <>
          {unAcceptedParticipants?.length > 0 && (
            <>
              <Divider
                color={theme.palette.borderLightInverse}
                margin="6px 0"
              />
              <CollaboratorsContainer>
                <CollaboratorsHeader>Pending Invites</CollaboratorsHeader>
                <CollaboratorsAvatarContainer mt={2}>
                  {unAcceptedParticipants?.map((participant) =>
                    participant.userType === 'email' ? (
                      <AvatarBox key={participant.id}>
                        <DropdownEmailAvatar size={40} />
                        <AvatarText mt={2}>{participant?.email}</AvatarText>
                      </AvatarBox>
                    ) : (
                      <AvatarBox key={participant.id}>
                        <Avatar
                          avatar={participant?.user?.imageUrl}
                          size={50}
                        />
                        <AvatarText mt={1}>
                          {participant?.user?.fullName}
                        </AvatarText>
                      </AvatarBox>
                    ),
                  )}
                </CollaboratorsAvatarContainer>
              </CollaboratorsContainer>
            </>
          )}
        </>
      )}

      {link && (
        <>
          <Divider color={theme.palette.borderLightInverse} margin="6px 0" />

          <SubFooterContainer>
            <Box
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              sx={{ cursor: 'pointer', display: 'flex', columnGap: '3px' }}
              onClick={() => openLinkInNewTab(link)}
            >
              <VisitEventPageText> {t('Visit Event Page')} </VisitEventPageText>

              <Box display="flex" component="span">
                <ArrowRightUpLongIconStyled
                  width={20}
                  height={20}
                  hovered={isHovered}
                  color={theme.palette.text.inverse}
                />
              </Box>
            </Box>
          </SubFooterContainer>
        </>
      )}

      <Divider color={theme.palette.borderLightInverse} margin="6px 0" />

      <FooterContainer>
        <SubFooterText>{t('Share the event:')}</SubFooterText>

        <Box sx={{ display: 'flex', columnGap: '1rem' }}>
          <IconBox>
            <FacebookFilledIcon
              onClick={() => shareLinkHandler('facebook', link)}
              width={20}
              height={20}
              color={theme.palette.background.default}
            />
          </IconBox>

          <IconBox>
            <TwitterFilledIcon
              onClick={() => shareLinkHandler('twitter', link)}
              width={20}
              height={20}
              color={theme.palette.background.default}
            />
          </IconBox>

          <IconBox>
            <LinkedInFilledIcon
              onClick={() => shareLinkHandler('linkedin', link)}
              width={20}
              height={20}
              color={theme.palette.background.default}
            />
          </IconBox>

          <IconBox>
            <UilWhatsapp
              onClick={() => shareLinkHandler('whatsapp', link, title)}
              width={24}
              height={24}
              color={theme.palette.background.default}
            />
          </IconBox>

          <IconBox>
            <UilTelegramAlt
              onClick={() => shareLinkHandler('telegram', link)}
              width={22}
              height={22}
              color={theme.palette.background.default}
            />
          </IconBox>
        </Box>
      </FooterContainer>
    </RightDrawer>
  );
};
