import React, { useState, useEffect, useContext } from 'react';
import { Box, Menu, IconButton, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import {
  DropdownHeaderText,
  DropdownActionButton,
  MessagesScrollContainer,
  NotificationDropdownHeader,
  NotificationDropdownFilter,
  DropdownFilterText,
  DropdownFilterTextSmall,
  MessagesListScrollContainer,
} from './elements';
import {
  collabConversation,
  fetchCollabImages,
  generalConversation,
  markMessageRead,
} from '~/apis';
import { Spacer, Tooltip } from '~/components';
import {
  formatGeneralConversations,
  captilalizeString,
  mapCollabsToConversations,
  formatCollabConversations,
} from '~/utils';
import { useNotistack } from '~/hooks';
import {
  NoConversationsExists,
  MessageMenuItem,
  MessageMenuItemSkeleton,
} from './DropdownComponents';
import { messagesDropdownPaperProps } from './DropdownPaperProps';
import MessageIcon from 'components/Icons/MessageIcon';
import { useTranslation } from 'react-i18next';
import AppContext from '../../context/AppContext';

export const MessagesDropdown = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [conversationLoading, setConversationsLoading] = useState(false);
  const [generalConversations, setGeneralConversations] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const theme = useTheme();
  const { t } = useTranslation();
  const { user } = useContext(AppContext);

  const generateSnackbar = useNotistack();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 200);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleMouseDown = () => {
    setIsClicked(true);
  };

  const handleMouseUp = () => {
    setIsClicked(false);
  };

  const buttonStyles = {
    transform: isClicked ? 'translateY(2px)' : 'translateY(0)',
    transition: 'transform 0.1s ease',
  };

  const router = useRouter();

  const fetchGeneralConversations = async () => {
    try {
      setConversationsLoading(true);
      const response = await generalConversation();
      if (response) {
        const {
          data: { status, conversations },
        } = response;

        if (status === 'success') {
          const formattedConversations = formatGeneralConversations(
            conversations,
            user?.userId,
          );

          const response = await collabConversation();

          const {
            data: { collabConversations },
          } = response;

          if (response?.data && response?.data?.collabs?.length > 0) {
            const {
              data: { status, collabs },
            } = response;
            // fetch images for collabs
            const images = await fetchCollabImages(collabs[0]?.creatorId?._id);

            if (images) {
              const {
                data: {
                  data: { collabs: imageCollab },
                },
              } = images;

              //filter out collabs that have any conversation
              if (status === 'success') {
                mapCollabsToConversations(imageCollab);
                // Iterate through the objectsToUpdate
                for (let i = 0; i < collabConversations.length; i++) {
                  const objectToUpdate = collabConversations[i];
                  // Find the corresponding object with image based on id
                  const matchingObjectWithImage = imageCollab.find(
                    (obj) => obj.collabConversation === objectToUpdate?._id,
                  );
                  // If a matching object with image is found, update the imageUrl
                  if (matchingObjectWithImage) {
                    objectToUpdate.collab.image =
                      matchingObjectWithImage.images[0];
                  }
                }

                const formattedCollabConversations =
                  formatCollabConversations(collabConversations);

                formattedConversations.push(...formattedCollabConversations);
                if (formattedConversations.length > 0) {
                  setGeneralConversations(formattedConversations);
                } else {
                  setGeneralConversations([]);
                }
              }
            } else {
              generateSnackbar(
                'Something went wrong while fetching collab conversation images',
              );
            }
          } else {
            const {
              data: { collabConversations, collabs },
            } = response;

            mapCollabsToConversations(collabs);
            const formattedCollabConversations =
              formatCollabConversations(collabConversations);

            formattedConversations.push(...formattedCollabConversations);

            if (formattedConversations.length > 0) {
              setGeneralConversations(formattedConversations);
            } else {
              setGeneralConversations([]);
            }
          }
        }
      }
      setConversationsLoading(false);
    } catch (e) {
      setConversationsLoading(false);
      generateSnackbar('Something went wrong while fetching messages', 'error');
    }
  };

  const ReadConversations = async (_id) => {
    try {
      await markMessageRead(_id);
    } catch {
      generateSnackbar('Something went wrong while mark message read', 'error');
    }
  };

  useEffect(() => {
    if (open && user) {
      fetchGeneralConversations();
    }
  }, [open, user]);

  const [activeFilterId, setActiveFilterId] = useState([
    'active',
    'inactive',
    'inactive',
  ]);

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title={t('Messages')}>
          <IconButton
            onClick={handleClick}
            size="medium"
            sx={{ marginLeft: 1.5 }}
            data-tour="messages"
            disableRipple
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            style={buttonStyles}
          >
            <MessageIcon
              width={19}
              height={19}
              color={
                isHovered
                  ? theme.palette.background.inverse
                  : theme.palette.grey.common
              }
              stroke={
                isHovered
                  ? theme.palette.background.inverse
                  : theme.palette.grey.common
              }
            />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        disableScrollLock={false}
        onClose={handleClose}
        PaperProps={messagesDropdownPaperProps}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <NotificationDropdownHeader>
          <DropdownHeaderText>{t('Messages')}</DropdownHeaderText>
        </NotificationDropdownHeader>
        <NotificationDropdownFilter>
          <DropdownFilterText
            id={activeFilterId[0]}
            onClick={() =>
              setActiveFilterId(['active', 'inactive', 'inactive'])
            }
          >
            {t('All')}{' '}
            <DropdownFilterTextSmall>
              {generalConversations.length}
            </DropdownFilterTextSmall>
          </DropdownFilterText>

          <DropdownFilterText
            id={activeFilterId[1]}
            onClick={() =>
              setActiveFilterId(['inactive', 'active', 'inactive'])
            }
          >
            {t('Generals')}{' '}
            <DropdownFilterTextSmall>
              {
                generalConversations.filter(
                  (conversation) => conversation?.members === undefined,
                ).length
              }
            </DropdownFilterTextSmall>
          </DropdownFilterText>

          {generalConversations.filter((conversation) => conversation?.members)
            .length > 0 ? (
            <DropdownFilterText
              id={activeFilterId[2]}
              onClick={() =>
                setActiveFilterId(['inactive', 'inactive', 'active'])
              }
            >
              {t('Collabs')}{' '}
              <DropdownFilterTextSmall>
                {
                  generalConversations.filter(
                    (conversation) => conversation?.members,
                  ).length
                }
              </DropdownFilterTextSmall>
            </DropdownFilterText>
          ) : (
            <></>
          )}
        </NotificationDropdownFilter>

        <MessagesListScrollContainer
          sx={{
            maxHeight: '400px',
            height: generalConversations?.length < 5 ? '400px' : undefined,
          }}
        >
          {!conversationLoading ? (
            <>
              {generalConversations?.length > 0 ? (
                <>
                  {activeFilterId[0] === 'active' && (
                    <>
                      {generalConversations.map(
                        ({
                          _id,
                          updatedAt,
                          messageType,
                          messageContent,
                          image,
                          messageHeader,
                          members,
                          sender,
                          isRead,
                        }) => (
                          <>
                            <MessageMenuItem
                              key={_id}
                              active={false}
                              timeStamp={updatedAt}
                              messageType={messageType}
                              messageHeader={captilalizeString(messageHeader)}
                              image={image}
                              messageText={messageContent}
                              sender={sender}
                              user={user}
                              isRead={isRead}
                              width="95%"
                              onClick={() => {
                                members
                                  ? router.push(`/inbox?collab=${_id}`)
                                  : router.push(`/inbox?conversation=${_id}`);
                                ReadConversations(_id);
                                handleClose();
                              }}
                            />
                            <Spacer value={4} />
                          </>
                        ),
                      )}
                    </>
                  )}

                  {activeFilterId[1] === 'active' && (
                    <>
                      {generalConversations
                        .filter(
                          (conversation) => conversation?.members === undefined,
                        )
                        .map(
                          ({
                            _id,
                            updatedAt,
                            messageType,
                            messageContent,
                            image,
                            messageHeader,
                            sender,
                            isRead,
                          }) => (
                            <>
                              <MessageMenuItem
                                key={_id}
                                active={false}
                                timeStamp={updatedAt}
                                messageType={messageType}
                                messageHeader={captilalizeString(messageHeader)}
                                image={image}
                                messageText={messageContent}
                                sender={sender}
                                user={user}
                                isRead={isRead}
                                width="95%"
                                onClick={() => {
                                  router.push(`/inbox?conversation=${_id}`);
                                  ReadConversations(_id);
                                  handleClose();
                                }}
                              />
                              <Spacer value={4} />
                            </>
                          ),
                        )}
                    </>
                  )}

                  {activeFilterId[2] === 'active' && (
                    <>
                      {generalConversations
                        .filter((conversation) => conversation?.members)
                        .map(
                          ({
                            _id,
                            messageType,
                            messageContent,
                            image,
                            messageHeader,
                            timeStamp,
                            isRead,
                            sender,
                          }) => (
                            <>
                              <MessageMenuItem
                                key={_id}
                                active={false}
                                timeStamp={timeStamp}
                                messageType={messageType}
                                messageHeader={captilalizeString(messageHeader)}
                                image={image}
                                messageText={messageContent}
                                sender={sender}
                                user={user}
                                isRead={isRead}
                                width="95%"
                                onClick={() => {
                                  router.push(`/inbox?collab=${_id}`);
                                  handleClose();
                                }}
                              />
                              <Spacer value={4} />
                            </>
                          ),
                        )}
                    </>
                  )}
                </>
              ) : (
                <NoConversationsExists />
              )}
            </>
          ) : (
            <MessagesScrollContainer sx={{ marginLeft: '15px' }}>
              {[...Array(5)].map((_, index) => (
                <MessageMenuItemSkeleton key={index} avatarSize={56} />
              ))}
            </MessagesScrollContainer>
          )}
        </MessagesListScrollContainer>

        <Spacer value={32} />

        <Box
          sx={{
            // backgroundColor: theme.palette.background.inverse,
            backgroundColor: theme.palette.background.paper,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            borderRadius: '0 0 14px 14px',
          }}
        >
          <DropdownActionButton
            style={{ margin: '0 0 1.2vh 0' }}
            disabled={conversationLoading}
            variant="contained"
            onClick={() => {
              router.push('/inbox'), handleClose();
            }}
          >
            {conversationLoading
              ? '...'
              : generalConversations?.length > 0
              ? t('See all messages')
              : t('Start a conversation')}
          </DropdownActionButton>
        </Box>
      </Menu>
    </>
  );
};
