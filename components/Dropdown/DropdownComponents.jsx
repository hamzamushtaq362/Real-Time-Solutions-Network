import React, { useState } from 'react';
import {
  MessageMenuItemContainer,
  MessageText,
  NotificationMenuItemContainer,
  NotificationAvatarContainer,
  TimeStampText,
  NotificationTextContainer,
  UserText,
  NotificationLightText,
  NoNewNotificationsContainer,
  NotificationItemSkeletonContainer,
  NoConversationsExistsContainer,
  NoConversationText,
  SearchItemContainer,
  SearchUserItemText,
  SearchUserItemSubText,
  ProfileInfoIconContainer,
  ProfileNameText,
  ProfileSubText,
  SingleNotificationContainer,
  SingleMessageContainer,
} from './elements';
import { Spacer, Avatar, Iconify } from '~/components';
import { Box } from '@mui/material';
import { CongratsPartyImage } from '~/assets';
import { Avatar as MuiAvatar, Skeleton, useTheme } from '@mui/material';
import { truncateString, getDateDistance } from '~/utils';
import { useTranslation } from 'react-i18next';
import { LocationText } from 'components/CollabCreate/AddProject/elements';
import { RenderItemContainer } from 'components/Collective/CollectiveCreate/elements';
import { UilMapMarker } from '@iconscout/react-unicons';
import ArrowRightLongIcon from 'components/Icons/ArrowRightLongIcon';
import { FlexBox } from 'components/common/elements';

export const MessageMenuItem = ({
  active,
  width,
  image,
  messageText,
  timeStamp,
  messageHeader,
  onClick,
  sender,
  user,
  isRead,
}) => {
  return (
    <MessageMenuItemContainer width={width} onClick={onClick} active={active}>
      <Avatar
        size="56px"
        avatar={image}
        sx={{
          opacity:
            isRead && user?.userId !== sender
              ? '0.7'
              : user?.userId == sender
              ? '0.7'
              : '',
        }}
      />
      <SingleMessageContainer>
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            marginLeft: '10px',
            opacity:
              isRead && user?.userId !== sender
                ? '0.7'
                : user?.userId == sender
                ? '0.7'
                : '',
          }}
        >
          <UserText>{messageHeader}</UserText>
          <MessageText>
            {messageText?.length > 33
              ? truncateString(messageText, 30)
              : messageText}
          </MessageText>
          <TimeStampText sx={{}}>{getDateDistance(timeStamp)}</TimeStampText>
        </Box>
      </SingleMessageContainer>
    </MessageMenuItemContainer>
  );
};

export const MessageMenuItemSkeleton = ({ avatarSize }) => {
  const theme = useTheme();
  return (
    <MessageMenuItemContainer width="100%" sx={{ marginLeft: '-10px' }}>
      <Box>
        <Skeleton
          variant="circular"
          width={avatarSize || 60}
          height={avatarSize || 60}
          sx={{ backgroundColor: theme.palette.grey.common }}
        />
      </Box>

      <Box sx={{ width: '400px', marginLeft: '10px' }}>
        <Skeleton
          variant="rounded"
          width="100%"
          height={30}
          sx={{ backgroundColor: theme.palette.grey.common }}
        />
      </Box>
    </MessageMenuItemContainer>
  );
};

export const NotificationMenuItem = ({
  fullname,
  username,
  message,
  title,
  boldMessage,
  notificationImage,
  timeStamp,
  onClick,
  statusIcon,
  showInitialName,
  isRead,
  typeOfCollabNotification,
}) => {
  const name = fullname ? fullname : username?.replace('@', '') || '';

  return (
    <NotificationMenuItemContainer onClick={onClick}>
      <NotificationAvatarContainer>
        <Box
          position="relative"
          height="100%"
          style={{ opacity: isRead ? '0.7' : '' }}
        >
          <Avatar
            statusIcon={statusIcon || 'verified'}
            size="48px"
            avatar={`${notificationImage}`}
            borderRadius="6px"
            variant="rounded"
          />
        </Box>
        <NotificationTextContainer>
          <SingleNotificationContainer>
            <Box ml={0.5} position="relative" width="100%">
              <Box sx={{ display: 'flex' }}>
                <UserText
                  style={{
                    opacity: isRead ? '0.7' : '',
                    fontWeight: !isRead ? 'bold' : '400',
                  }}
                >
                  {title}
                </UserText>
              </Box>
              <NotificationLightText style={{ opacity: isRead ? '0.7' : '' }}>
                {typeOfCollabNotification !== 'user-started-following' ? (
                  <>{`${
                    showInitialName ? name + ' ' : ''
                  }${message} ${boldMessage}`}</>
                ) : (
                  <>{`${name + ' '}${message.replace(
                    'user',
                    '',
                  )} ${boldMessage}`}</>
                )}
              </NotificationLightText>
              <TimeStampText ml="4px">{timeStamp}</TimeStampText>
            </Box>
          </SingleNotificationContainer>
        </NotificationTextContainer>
      </NotificationAvatarContainer>
    </NotificationMenuItemContainer>
  );
};

export const NotificationMenuItemSkeleton = () => (
  <Box sx={{ width: '100%', padding: '2px 25px', marginBottom: '25px' }}>
    <NotificationItemSkeletonContainer>
      <Box sx={{ width: '80px', height: '50px' }}>
        <Skeleton variant="circular" width={56} height={56} />
      </Box>
      <Box sx={{ width: '100%' }}>
        <Skeleton variant="rounded" width="50%" height={24} />
        <Spacer value={8} />
        <Skeleton variant="rounded" width="100%" height={24} />
      </Box>
    </NotificationItemSkeletonContainer>
  </Box>
);

export const NoNewNotifications = () => {
  const { t } = useTranslation();
  return (
    <NoNewNotificationsContainer>
      <Spacer value={80} />
      <MuiAvatar
        src={CongratsPartyImage.src}
        variant="square"
        sx={{ width: '200px', height: '200px' }}
      />

      <UserText>{t('You are all caught up!')}</UserText>
      <NotificationLightText>
        {t('No new notifications currently')}
      </NotificationLightText>
    </NoNewNotificationsContainer>
  );
};

export const NoConversationsExists = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  return (
    <NoConversationsExistsContainer>
      <Iconify
        icon="tabler:messages-off"
        color={theme.palette.grey.common}
        width="60px"
        height="60px"
      />
      <Spacer value={8} />
      <NoConversationText>{t('No Conversations found')}</NoConversationText>
    </NoConversationsExistsContainer>
  );
};

export const SearchUserItem = ({ fullName, username, image, onClick }) => {
  return (
    <SearchItemContainer onClick={onClick}>
      <Avatar avatar={image} size={36} />
      <Box sx={{ marginLeft: '10px', width: '85%' }}>
        <SearchUserItemText>{fullName}</SearchUserItemText>
        {username && (
          <SearchUserItemSubText>{`@${username}`}</SearchUserItemSubText>
        )}
      </Box>
    </SearchItemContainer>
  );
};

export const CollabItemUser = ({ name, image, onClick }) => {
  return (
    <SearchItemContainer onClick={onClick}>
      <Avatar variant="rounded" avatar={image} size={36} />
      <Box sx={{ marginLeft: '10px', width: '85%' }}>
        <SearchUserItemText>{name}</SearchUserItemText>
      </Box>
    </SearchItemContainer>
  );
};

export const ProfileInfoItem = ({ name, subText, avatar, ...rest }) => {
  const theme = useTheme();
  const [hovered, setHovered] = useState(false);
  return (
    <ProfileInfoIconContainer
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      {...rest}
    >
      <Avatar size={54} avatar={avatar} />
      <Box>
        <FlexBox>
          <ProfileNameText hovered={hovered}>{name}</ProfileNameText>
          <ArrowRightLongIcon
            width={18}
            height={18}
            color={theme.palette.text.primary}
            style={{
              opacity: hovered ? 1 : 0,
              marginLeft: '4px',
              transition: 'all 100ms ease-out',
            }}
          />
        </FlexBox>
        <ProfileSubText>{subText}</ProfileSubText>
      </Box>
    </ProfileInfoIconContainer>
  );
};

export const PlacesAutocompleteDropdownOption = ({ props, option }) => {
  const theme = useTheme();
  return (
    <RenderItemContainer {...props}>
      <UilMapMarker size={20} color={theme.palette.background.inverse} />
      <Box display="flex" flexDirection="column">
        <LocationText>{option.location}</LocationText>
      </Box>
    </RenderItemContainer>
  );
};
