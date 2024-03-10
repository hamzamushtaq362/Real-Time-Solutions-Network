import { useTranslation } from 'react-i18next';
import { useEffect, useState, useRef } from 'react';

import {
  ChatBoxContainer,
  ChatBoxMessageContainer,
  StarterBubble,
} from './elements';
import { ChatItem } from './ChatItem';
import { ChatBoxRandomizedSkeleton } from './InboxSkeletons';
import { PrimaryButton } from '~/components';
import { NoChatSelected } from './NoChatSelected';
import {
  ChatBoxInputRow,
  ChatBoxDetailsHeader,
  LandingChatbox,
} from './InboxComponents';
import { captilalizeString, shouldShowTimestamp } from '~/utils';
import { Box, useTheme } from '@mui/material';
import { FlexBox } from 'components/common/elements';
import { SubText } from 'components/Landing/elements';
import { acceptRejectCollabRequest } from 'apis/inbox';

const CollabRequestComponent = ({
  username,
  conversationId,
  setActiveConversationUser,
  setGeneralConversations,
  setDisableInput,
}) => {
  const handleCollabResponse = async (status) => {
    setActiveConversationUser((prev) => ({
      ...prev,
      collabRequest: status,
      isCommunicationAllowed: status === 'ACCEPTED' ? true : false,
    }));

    setGeneralConversations((prev) => {
      const updatedConversations = prev.map((conversation) => {
        if (conversation._id === conversationId) {
          return {
            ...conversation,
            collabRequest: status,
            isCommunicationAllowed: status === 'ACCEPTED' ? true : false,
          };
        } else {
          return conversation;
        }
      });

      return updatedConversations;
    });

    await acceptRejectCollabRequest(conversationId, status);
    setDisableInput(status === 'ACCEPTED' ? false : true);
  };

  return (
    <FlexBox
      sx={{
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        rowGap: '1rem',
      }}
    >
      <SubText fontSize="14">Collab Request from {username}</SubText>
      <FlexBox sx={{ gap: '1rem' }}>
        <PrimaryButton
          width="100px"
          variant="contained"
          onClick={() => {
            handleCollabResponse('ACCEPTED');
          }}
        >
          Accept
        </PrimaryButton>
        <PrimaryButton
          width="100px"
          variant="contained"
          onClick={() => {
            handleCollabResponse('REJECTED');
          }}
        >
          Reject
        </PrimaryButton>
      </FlexBox>
    </FlexBox>
  );
};

const ConversationBubble = ({
  sendStarterMessage,
  handleHideConversationBubble,
}) => {
  const initialMessages = [
    "Hey team, let's dive in!",
    'Super excited to work with you all! Anyone has any ideas to begin with?',
    'Who’s got some out-of-the-box ideas to get us rolling?',
    'Curious to hear everyone’s dream vision for our project. What’s yours?',
    "How about we all share a bit about what we're awesome at?",
    'Shall we have a quick virtual hangout to get things rolling?',
    " Let's dream big! What’s everyone’s vision for our final masterpiece?",
    " Who's up for a brainstorm session? First round of ideas – no filters, just raw ideas!",
  ];

  const pickRandomMessages = (messages, count) => {
    let shuffled = [...messages].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };
  let messages = pickRandomMessages(initialMessages, 3);
  const theme = useTheme();
  const handleMessageClick = async (message) => {
    await sendStarterMessage(message);
    handleHideConversationBubble();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
      }}
    >
      {messages.map((message, index) => (
        <StarterBubble
          key={index}
          onClick={() => handleMessageClick(message)}
          theme={theme}
        >
          {message}
        </StarterBubble>
      ))}
    </Box>
  );
};

export const ChatBox = ({
  currentActiveCollabConversationId,
  currentActiveGeneralConversationId,
  conversationsLoading,
  chatLoading,
  generalChat,
  selected,
  collabChat,
  chatBoxRefreshHandler,
  activeConversationUser,
  setActiveConversationUser,
  setGeneralConversations,
  activeCollabDetails,
  sendGeneralMessage,
  sendCollabGroupMessage,
  loggedInUser,
  isConversationsExists,
}) => {
  const { t } = useTranslation();

  const { username, imageUrl, fullName } = loggedInUser;

  const [messageText, setMessageText] = useState('');
  const [receiverId, setReceiverId] = useState('');
  const [noChatSelected, setNoChatSelected] = useState(true);

  const chatContainerRef = useRef();

  useEffect(() => {
    setNoChatSelected(
      !currentActiveCollabConversationId && !currentActiveGeneralConversationId,
    );
  }, [currentActiveCollabConversationId, currentActiveGeneralConversationId]);

  const pushMessageToStack = () => {
    //TODO: Refactor push message stack
    if (!chatLoading) {
      if (messageText && selected === 'general') {
        const chatItem = {
          userName: captilalizeString(username || 'No name found'),
          fullName: captilalizeString(fullName || 'No name found'),
          timeStamp: new Date(),
          itemType: 'text',
          message: messageText,
          userType: 'sender',
          userImage: imageUrl || '',
          receiverId,
        };

        sendGeneralMessage(chatItem);
        setMessageText('');
      } else if (messageText && selected === 'collab') {
        const chatItem = {
          userName: captilalizeString(username || 'No name found'),
          fullName: captilalizeString(fullName || 'No name found'),
          timeStamp: new Date(),
          itemType: 'text',
          message: messageText,
          userType: 'sender',
          userImage: imageUrl || '',
          collabId: currentActiveCollabConversationId,
        };
        sendCollabGroupMessage(chatItem);
        setMessageText('');
      }
    }
  };

  // Scroll to the bottom of the container after rendering and after sending a message
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [generalChat, collabChat]);

  useEffect(() => {
    let receiverId = '';
    if (generalChat?.length > 0) {
      generalChat.some((chatItem) => {
        if (chatItem?.receiverId) {
          receiverId = chatItem?.receiverId;
          return true;
        } else {
          return false;
        }
      });
    }

    setReceiverId(receiverId);
  }, [generalChat]);

  const [collabRequestInitiator, setCollabRequestInitiator] = useState('');
  const [disableInput, setDisableInput] = useState(false);
  const [
    isLoggedUserCollabRequestInitiator,
    setIsLoggedUserCollabRequestInitiator,
  ] = useState(false);

  useEffect(() => {
    setDisableInput(!activeConversationUser?.isCommunicationAllowed);

    if (activeConversationUser?.collabRequest === 'PENDING') {
      const { collabRequestInitiator } = activeConversationUser;

      setCollabRequestInitiator(
        collabRequestInitiator.fullName || collabRequestInitiator.username,
      );

      if (loggedInUser && collabRequestInitiator._id === loggedInUser.userId) {
        setIsLoggedUserCollabRequestInitiator(true);
      } else {
        setIsLoggedUserCollabRequestInitiator(false);
      }
    } else {
      setCollabRequestInitiator('');
    }
  }, [activeConversationUser]);

  const shouldShowAvatarAndName = (userName, index, array) => {
    let nextUserName = index < array.length - 1 ? array[index + 1].userName : null;
    const shouldShowAvatarAndName = userName !== nextUserName || array[index + 1].itemType === 'notifier';
    nextUserName = userName;
    return shouldShowAvatarAndName;
  };

  const [showConversationBubble, setShowConversationBubble] = useState(false);

  const handleHideConversationBubble = () => {
    setShowConversationBubble(false);
  };

  const sendStarterMessage = async (messageText) => {
    const chatItem = {
      userName: captilalizeString(username || 'No name found'),
      fullName: captilalizeString(fullName || 'No name found'),
      timeStamp: new Date(),
      itemType: 'text',
      message: messageText,
      userType: 'sender',
      userImage: imageUrl || '',
      collabId: currentActiveCollabConversationId,
    };

    await sendCollabGroupMessage(chatItem);
    setMessageText('');
  };

  useEffect(() => {
    if (collabChat.length === 0) {
      setShowConversationBubble(true);
    } else {
      setShowConversationBubble(false);
    }
  }, [collabChat]);

  return (
    <ChatBoxContainer>
      {!noChatSelected ? (
        <>
          <ChatBoxDetailsHeader
            selected={selected}
            activeConversationUser={activeConversationUser}
            activeCollabDetails={activeCollabDetails}
            chatLoading={chatLoading}
            conversationsLoading={conversationsLoading}
            chatBoxRefreshHandler={chatBoxRefreshHandler}
          />
          {selected === 'general' && (
            <>
              {!(chatLoading || conversationsLoading) ? (
                <>
                  {generalChat.length > 0 ? (
                    <ChatBoxMessageContainer ref={chatContainerRef}>
                      {isConversationsExists || activeConversationUser ? (
                        <>
                          {!isLoggedUserCollabRequestInitiator &&
                            activeConversationUser?.collabRequest ===
                              'PENDING' &&
                            collabRequestInitiator && (
                              <CollabRequestComponent
                                username={collabRequestInitiator}
                                conversationId={
                                  activeConversationUser?.conversationId
                                }
                                setActiveConversationUser={
                                  setActiveConversationUser
                                }
                                setGeneralConversations={
                                  setGeneralConversations
                                }
                                setDisableInput={setDisableInput}
                              />
                            )}
                        </>
                      ) : (
                        <></>
                      )}

                      {generalChat.map((messageData, index, array) => {
                        const {
                          fullName,
                          userName,
                          timeStamp,
                          itemType,
                          message,
                          userImage,
                          userType,
                        } = messageData;

                        const isNewUser = shouldShowAvatarAndName(
                          userName,
                          index,
                          array,
                        );
                        const prevMessageData =
                          index < array.length - 1 ? array[index + 1] : null;
                        const isNewDay = shouldShowTimestamp(
                          messageData,
                          prevMessageData,
                        );

                        return (
                          <ChatItem
                            key={timeStamp}
                            userName={userName}
                            fullName={fullName}
                            timeStamp={timeStamp}
                            itemType={itemType}
                            message={message}
                            userImage={userImage}
                            userType={userType}
                            isSender={userType === 'sender'}
                            type="text"
                            shouldShowUserDetails={isNewUser}
                            shouldShowTimeStamp={isNewDay}
                          />
                        );
                      })}
                    </ChatBoxMessageContainer>
                  ) : (
                    <>
                      {/* <NewUserConversation
                        activeTab="general"
                        isConversationsExists={isConversationsExists}
                        activeConversationUser={activeConversationUser}
                      /> */}
                    </>
                  )}
                  <Box>
                    {isConversationsExists || activeConversationUser ? (
                      <Box position="relative">
                        <ChatBoxInputRow
                          disableSend={disableInput}
                          messageText={messageText}
                          setMessageText={setMessageText}
                          pushMessageToStack={pushMessageToStack}
                          receiverId={receiverId}
                          collabRequest={activeConversationUser?.collabRequest}
                          isLoggedUserCollabRequestInitiator={
                            isLoggedUserCollabRequestInitiator
                          }
                        />
                      </Box>
                    ) : (
                      <>
                        <LandingChatbox
                          text={t('Select a creator to start conversation')}
                        />
                      </>
                    )}
                  </Box>
                </>
              ) : (
                <ChatBoxRandomizedSkeleton />
              )}
            </>
          )}

          {selected === 'collab' && (
            <>
              {!(chatLoading || conversationsLoading) ? (
                <>
                  <ChatBoxMessageContainer ref={chatContainerRef}>
                    {showConversationBubble && (
                      <ConversationBubble
                        sendStarterMessage={sendStarterMessage}
                        handleHideConversationBubble={
                          handleHideConversationBubble
                        }
                      />
                    )}
                    {collabChat.map((messageData, index, array) => {
                      const {
                        fullName,
                        userName,
                        timeStamp,
                        itemType,
                        message,
                        userImage,
                        userType,
                      } = messageData;

                      const isNewUser = shouldShowAvatarAndName(
                        userName,
                        index,
                        array,
                      );
                      const prevMessageData =
                        index < array.length - 1 ? array[index + 1] : null;
                      const isNewDay = shouldShowTimestamp(
                        messageData,
                        prevMessageData,
                      );

                      return (
                        <ChatItem
                          key={timeStamp}
                          userName={fullName || userName}
                          fullName={fullName}
                          timeStamp={timeStamp}
                          itemType={itemType}
                          message={message}
                          userImage={userImage}
                          userType={userType}
                          index={index}
                          isSender={userType === 'sender'}
                          type="text"
                          shouldShowUserDetails={isNewUser}
                          shouldShowTimeStamp={isNewDay}
                        />
                      );
                    })}
                  </ChatBoxMessageContainer>

                  {activeCollabDetails ? (
                    <ChatBoxInputRow
                      disableSend={chatLoading}
                      messageText={messageText}
                      setMessageText={setMessageText}
                      pushMessageToStack={pushMessageToStack}
                    />
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <ChatBoxRandomizedSkeleton />
              )}
            </>
          )}
        </>
      ) : (
        <NoChatSelected />
      )}
    </ChatBoxContainer>
  );
};
