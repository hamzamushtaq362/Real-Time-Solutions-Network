/* eslint-disable react/no-unescaped-entities */
import { useState, useRef, useEffect, useContext } from 'react';
import {
  MessageMenuItemContainer,
  MessageHeaderContainer,
  UserText,
  MessageText,
  ChatBoxInputContainer,
  InputBoxContainer,
  ChatboxHeaderContainer,
  ChatboxDetailsHeaderText,
  ChatBoxConversationStarterContainer,
  ConversationText,
  ChatboxDetailsHeaderStatusText,
  ChatboxDetailsSubText,
} from './elements';

import {
  Spacer,
  Avatar,
  SideBySideAvatars,
  Iconify,
  PrimaryButton,
  Tooltip,
  NormalInput,
  ArrowUpIcon,
} from '~/components';

import { Box, useTheme } from '@mui/material';
import { IconButton } from '@mui/material';
import { useOutsideAlerter } from '~/hooks';
import { truncateString } from '~/utils';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import AppContext from '../../context/AppContext';
import {
  RightButtonText,
  RightButtonWrap,
} from 'components/Button/NavButtonGroup/elements';
import { useSelector } from 'react-redux';

export const MessageMenuItem = ({
  active,
  width,
  image,
  messageText,
  messageHeader,
  onClick,
  type,
}) => {
  const { pageWidth } = useSelector((state) => state.rtsnWidth);

  return (
    <MessageMenuItemContainer
      width={width}
      onClick={onClick}
      active={active}
      padding={pageWidth}
    >
      <Avatar
        size="56px"
        avatar={image}
        borderRadius={type === 'collab' ? '4px' : '50%'}
      />
      <Box
        sx={{
          width: '100%',
          marginLeft: '10px',
          display: 'flex',
          height: '56px',
          flexDirection: 'column',
          // justifyContent: "space-between"
        }}
      >
        <MessageHeaderContainer>
          <UserText>{messageHeader}</UserText>
        </MessageHeaderContainer>
        <MessageText>
          {messageText?.length > 33
            ? truncateString(messageText, 30)
            : messageText}
        </MessageText>
      </Box>
    </MessageMenuItemContainer>
  );
};

export const InputBox = ({
  disableSend,
  messageText,
  setMessageText,
  pushMessageToStack,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useTranslation();
  const theme = useTheme();

  const keyPressHandler = (event) => {
    if (event.which === 13) {
      pushMessageToStack();
      event.preventDefault();
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const iconColor = isHovered
    ? theme.palette.background.inverse
    : theme.palette.background.default;

  return (
    <InputBoxContainer
      onFocusCapture={() => setIsFocused(true)}
      onBlurCapture={() => setIsFocused(false)}
      isFocused={isFocused}
      onKeyPress={keyPressHandler}
    >
      <NormalInput
        value={messageText}
        handleChange={(event) => setMessageText(event.target.value)}
        multiline
        maxRows={2}
        padding="10px 16px"
        placeholder={t('Type your Message')}
        // onKeyPress={handleTyping}
        disabled={disableSend}
      />
      {(isFocused || messageText.length > 0) && (
        <PrimaryButton
          disabled={disableSend}
          width="20px"
          height="20px"
          sx={{ borderRadius: '50%', minWidth: '32px', marginRight: '5px' }}
          onClick={pushMessageToStack}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <ArrowUpIcon color={iconColor} />
        </PrimaryButton>
      )}
    </InputBoxContainer>
  );
};

export const ChatBoxInputRow = ({
  messageText,
  setMessageText,
  pushMessageToStack,
  disableSend,
  receiverId,
  collabRequest,
  isLoggedUserCollabRequestInitiator,
}) => {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, () => {});

  const generateInputMessageText = () => {
    if (collabRequest && isLoggedUserCollabRequestInitiator) {
      return "You can't send a message unless the other user accepts the collab request.";
    } else if (collabRequest && !isLoggedUserCollabRequestInitiator) {
      return "You can't send a message unless you accept the collab request..";
    } else {
      return 'You cant send message to this user, as they dont follow you';
    }

    // To do : if there is none collab Req, then you cant message each other unless the other person follows you. [for next sprint]
  };

  return (
    <ChatBoxInputContainer>
      <Box sx={{ position: 'relative' }} ref={wrapperRef}></Box>
      <InputBox
        disableSend={disableSend}
        messageText={disableSend ? generateInputMessageText() : messageText}
        setMessageText={setMessageText}
        pushMessageToStack={pushMessageToStack}
        receiverId={receiverId}
      />
    </ChatBoxInputContainer>
  );
};

export const ChatBoxDetailsHeader = ({
  selected,
  conversationsLoading,
  activeConversationUser,
  activeCollabDetails,
}) => {
  const HEADER_TRUNCATE_LENGTH = 40;
  const { t } = useTranslation();
  const theme = useTheme();

  const { socket } = useContext(AppContext);
  const [isTyping, setIsTyping] = useState(false);
  const [hovered, setHovered] = useState(false);
  const router = useRouter();

  useEffect(() => {
    socket?.on('typing', () => {
      setIsTyping(true);
    });
    socket?.on('stopped_typing', () => {
      setIsTyping(false);
    });
  }, []);

  const getFormattedArrayForSideBySideUser = (members) => {
    if (members.length > 0) {
      return members.map(({ imageUrl, username }) => {
        return { image: imageUrl, name: username };
      });
    } else {
      return [];
    }
  };

  const getChatTrimmedHeader = (header) => {
    if (header?.length > HEADER_TRUNCATE_LENGTH) {
      return truncateString(header, HEADER_TRUNCATE_LENGTH - 3);
    } else {
      return header;
    }
  };

  const avatarNavigationHandler = (identifier) => {
    if (selected === 'general') {
      router.push(`/@${identifier}`);
    } else if (selected === 'collab') {
      router.push(`/collab/${identifier}`);
    }
  };

  const getButtonIcon = () => {
    return (
      <span
        style={{
          opacity: hovered ? 1 : 0,
          marginLeft: '4px',
          transition: 'all 100ms ease-out',
          color: `${theme.palette.text.primary}`,
        }}
      >
        →
      </span>
    );
  };

  return (
    <ChatboxHeaderContainer>
      {!conversationsLoading ? (
        <>
          {selected === 'general' && (
            <>
              {activeConversationUser ? (
                <>
                  {' '}
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ marginLeft: '10px' }}>
                      <Tooltip
                        title={activeConversationUser?.name}
                        disabled={
                          activeConversationUser?.name?.length <
                          HEADER_TRUNCATE_LENGTH
                        }
                      >
                        <ChatboxDetailsHeaderText>
                          <Box>
                            {getChatTrimmedHeader(
                              activeConversationUser?.fullName
                                ? activeConversationUser?.fullName
                                : activeConversationUser?.name,
                            )}{' '}
                          </Box>
                        </ChatboxDetailsHeaderText>

                        <ChatboxDetailsSubText>
                          {getChatTrimmedHeader(
                            activeConversationUser?.introduction ||
                              activeConversationUser?.bio,
                          ) || ''}
                        </ChatboxDetailsSubText>
                      </Tooltip>

                      <ChatboxDetailsHeaderStatusText>
                        {isTyping ? 'Typing ...' : ''}
                      </ChatboxDetailsHeaderStatusText>
                    </Box>
                  </Box>
                  <RightButtonWrap
                    style={{ cursor: 'pointer' }}
                    onClick={() =>
                      avatarNavigationHandler(activeConversationUser?.userName)
                    }
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                  >
                    <RightButtonText>{t('View Profile')}</RightButtonText>
                    {getButtonIcon()}
                  </RightButtonWrap>
                </>
              ) : (
                <></>
              )}
            </>
          )}

          {selected === 'collab' && (
            <>
              {activeCollabDetails ? (
                <>
                  {' '}
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box>
                      <Avatar
                        avatar={activeCollabDetails?.image}
                        size="56px"
                        borderRadius="4px"
                      />
                    </Box>
                    <Box sx={{ marginLeft: '10px' }}>
                      <Tooltip
                        title={activeCollabDetails?.title}
                        disabled={
                          activeCollabDetails?.messageHeader?.length <
                          HEADER_TRUNCATE_LENGTH
                        }
                      >
                        <ChatboxDetailsHeaderText>
                          {getChatTrimmedHeader(
                            activeCollabDetails?.messageHeader,
                          )}
                        </ChatboxDetailsHeaderText>
                      </Tooltip>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row-reverse',
                      alignItems: 'center',
                      columnGap: '10px',
                    }}
                  >
                    <Tooltip title={t('View Collab')}>
                      <IconButton
                        onClick={() =>
                          avatarNavigationHandler(activeCollabDetails?._id)
                        }
                      >
                        <Iconify
                          icon="akar-icons:eye"
                          color="#808191"
                          width="21px"
                          height="21px"
                        />
                      </IconButton>
                    </Tooltip>

                    {selected === 'collab' && (
                      <SideBySideAvatars
                        avatars={
                          activeCollabDetails
                            ? getFormattedArrayForSideBySideUser(
                                activeCollabDetails?.members,
                              )
                            : []
                        }
                        limit={3}
                        size="34px"
                      />
                    )}
                  </Box>{' '}
                </>
              ) : (
                <></>
              )}
            </>
          )}
        </>
      ) : (
        <></>
      )}
    </ChatboxHeaderContainer>
  );
};

export const NewUserConversation = ({
  activeConversationUser,
  activeCollabDetails,
  isConversationsExists,
  activeTab,
}) => {
  const { t } = useTranslation();
  return (
    <>
      {activeTab === 'general' && activeConversationUser && (
        <>
          <ChatBoxConversationStarterContainer>
            <Avatar avatar={activeConversationUser?.image || ''} size={100} />
            <Spacer value={8} />
            <ChatboxDetailsHeaderText>
              {activeConversationUser?.fullName
                ? activeConversationUser?.fullName
                : activeConversationUser?.name || 'No name found'}
            </ChatboxDetailsHeaderText>
            <Spacer value={8} />
            <ConversationText>
              Looks like there aren't any messages in this collaboration yet.
              Kick off the conversation by typing your message below!
            </ConversationText>
          </ChatBoxConversationStarterContainer>

          <>
            {!isConversationsExists && !activeConversationUser && (
              <ChatBoxConversationStarterContainer>
                <Iconify
                  icon="jam:messages"
                  color="#808191"
                  width="100px"
                  height="100px"
                />
                <ConversationText>
                  {t('Please select a user to start a conversation')}
                </ConversationText>
              </ChatBoxConversationStarterContainer>
            )}
          </>
        </>
      )}
      {activeTab === 'collabs' && activeCollabDetails && (
        <>
          <ChatBoxConversationStarterContainer>
            <Avatar avatar={activeCollabDetails?.image || ''} size={100} />
            <Spacer value={8} />
            <ChatboxDetailsHeaderText>
              {activeCollabDetails?.messageHeader || 'No name found'}
            </ChatboxDetailsHeaderText>
            <Spacer value={8} />
            <ConversationText>
              {t('You')}
              {"don't"}
              {t('have any messages in')} {activeCollabDetails?.messageHeader}
              {t(
                ', start conversation by typing\n              a message',
              )}{' '}
            </ConversationText>
          </ChatBoxConversationStarterContainer>
        </>
      )}
    </>
  );
};
