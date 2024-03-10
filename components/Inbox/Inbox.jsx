import { useState, useEffect } from 'react';
import { InboxContentContainer } from './elements';
import { InboxNavigation } from './InboxNavigation';
import { ChatBox } from './Chatbox';
import axios from 'axios';
import { BASE_URL } from '~/apis';
import { useNotistack } from '~/hooks';
import {
  formatGeneralConversations,
  mapCollabsToConversations,
  formatCollabConversations,
  formatGeneralConversationChat,
  formatCollabConversationChat,
  captilalizeString,
  filterAcceptedMembers,
  sortByUpdateOrCreatedAt,
} from '~/utils';
import { fetchRefresToken, reFetchTokenExpire } from '~/redux';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

export const Inbox = () => {
  // Filter related states
  const [selectedOptions, setSelectedOptions] = useState([
    'connections',
    'collabs',
    'requests',
  ]);
  const [selected, setSelected] = useState('general');

  // Loading related states
  const [conversationsLoading, setConversationsLoading] = useState(false);
  const [chatLoading, setChatLoading] = useState(true);

  // Conversation related states
  const [generalConversations, setGeneralConversations] = useState([]);
  const [collabConversations, setCollabConversations] = useState([]);
  const [collabs, setCollabs] = useState([]);
  const [allConversations, setAllConversations] = useState([]);
  const [selectedConversations, setSelectedConversations] = useState([]);

  // Chat items related states
  const [generalChat, setGeneralChat] = useState([]);
  const [collabChat, setCollabChat] = useState([]);

  const [
    currentActiveGeneralConversationId,
    setCurrentActiveGeneralConversationId,
  ] = useState('');
  const [activeConversationUser, setActiveConversationUser] = useState(null);
  const [
    currentActiveCollabConversationId,
    setCurrentActiveCollabConversationId,
  ] = useState('');
  const [activeCollabDetails, setActiveCollabDetails] = useState(null);
  const [searchString] = useState('');
  const [isConversationsExists, setIsConversationsExists] = useState(true);
  const [
    isSelectedCollabConversationExist,
    setIsSelectedCollabConversationExist,
  ] = useState(false);
  const generateSnackbar = useNotistack();
  // const user = JSON.parse(localStorage.getItem('auth'));
  const [user, setUser] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('auth'));
    setUser(user);
  }, []);

  // Function to fetch general conversations
  const fetchGeneralConversations = async () => {
    try {
      const f1 = async () => {
        const res = await axios.get(
          `${BASE_URL}/api/v1/chats/conversations?searchString=${searchString}`,
        );
        return res;
      };
      const response = await reFetchTokenExpire(f1, fetchRefresToken);
      if (response) {
        const {
          data: { status, conversations },
        } = response;

        if (conversations.length === 0) {
          setIsConversationsExists(false);
        }

        if (status === 'success') {
          const formattedConversations = formatGeneralConversations(
            conversations,
            user.userId,
          );

          if (formattedConversations.length > 0) {
            setGeneralConversations(formattedConversations);
          } else {
            setGeneralConversations([]);
          }
        }
      }
    } catch (err) {
      generateSnackbar(
        'Something went wrong while fetching general conversations',
      );
    }
  };

  const fetchCollabConversations = async () => {
    try {
      const f1 = async () => {
        const res = await axios.get(
          `${BASE_URL}/api/v1/chats/collab-conversations?searchString=${searchString}`,
        );
        return res;
      };
      const response = await reFetchTokenExpire(f1, fetchRefresToken);

      if (response?.data?.status === 'success') {
        const {
          data: { collabConversations, collabs },
        } = response;

        const formattedCollabConversations =
          formatCollabConversations(collabConversations);

        setCollabConversations(formattedCollabConversations);

        // Now formatting the collabs
        const formattedCollabs = mapCollabsToConversations(collabs);

        setCollabs(formattedCollabs);

        const combinedConversations =
          formattedCollabConversations.concat(formattedCollabs);

        if (combinedConversations.length > 0) {
          if (router.query.collab) {
            const matchingConversation = combinedConversations.find(
              (conversation) => {
                return (
                  conversation.collabConversationId === router.query.collab
                );
              },
            );

            if (matchingConversation?.type === 'collab') {
              groupCollabItemClickHandler(matchingConversation);
            } else if (matchingConversation?.type === 'collab-conversation') {
              groupConversationItemClickHanlder(matchingConversation);
            }
          }
        }
      }
    } catch {
      generateSnackbar(
        'Something went wrong while fetching collab conversations',
      );
    }
  };

  const fetchConversations = async () => {
    setConversationsLoading(true);
    await fetchGeneralConversations();
    await fetchCollabConversations();
    setConversationsLoading(false);
  };

  const fetchConversationChat = async () => {
    try {
      setChatLoading(true);
      const f1 = async () => {
        const res = await axios.get(
          `${BASE_URL}/api/v1/chats/conversation/${currentActiveGeneralConversationId}`,
        );
        return res;
      };
      const response = await reFetchTokenExpire(f1, fetchRefresToken);
      if (response) {
        const {
          data: { status, chat },
        } = response;

        if (status === 'success') {
          const formattedGeneralChat = formatGeneralConversationChat(
            chat,
            user.userId,
          );
          if (formattedGeneralChat.length > 0) {
            setGeneralChat(formattedGeneralChat);
          }
        }
      }
      setChatLoading(false);
    } catch {
      setChatLoading(false);
      generateSnackbar('Something went wrong while fetching conversation chat');
    }
  };

  const fetchCollabConversationChat = async () => {
    try {
      setChatLoading(true);
      const f1 = async () => {
        const res = await axios.get(
          `${BASE_URL}/api/v1/chats/collab-conversation/${currentActiveCollabConversationId}`,
        );
        return res;
      };
      const response = await reFetchTokenExpire(f1, fetchRefresToken);
      if (response) {
        const {
          data: { status, chat },
        } = response;

        if (status === 'success') {
          const formattedCollabChat = formatCollabConversationChat(
            chat,
            user.userId,
          );
          if (formattedCollabChat.length > 0) {
            setCollabChat(formattedCollabChat);
          }
        }
      }
      setChatLoading(false);
    } catch {
      setChatLoading(false);
      setCollabChat([]);
      generateSnackbar(
        'Something went wrong while fetching collab conversation chat',
      );
    }
  };

  const sendGeneralMessage = async (chatItem) => {
    try {
      // Find the index of the item with the matching conversationID
      const updatedGeneralConversations = JSON.parse(
        JSON.stringify(generalConversations),
      );
      const index = updatedGeneralConversations.findIndex(
        (item) => item._id === currentActiveGeneralConversationId,
      );

      // If a matching item is found, update its messageContent and move it to the top
      if (index !== -1) {
        const matchedItem = generalConversations[index];
        matchedItem.messageContent = chatItem.message;
        matchedItem.updatedAt = chatItem.timeStamp;

        // Remove the matched item from its current position and add it to the top
        updatedGeneralConversations.splice(index, 1);
        updatedGeneralConversations.unshift(matchedItem);
        setGeneralConversations(updatedGeneralConversations);
      }

      setGeneralChat((prevState) => {
        const updatedState = [...prevState];
        updatedState.unshift(chatItem);
        return updatedState;
      });

      const f1 = async () => {
        const res = await axios.post(`${BASE_URL}/api/v1/chats/send-message`, {
          receiverId: chatItem.receiverId,
          messageType: chatItem.itemType,
          messageContent: chatItem.message,
        });
        return res;
      };
      const response = await reFetchTokenExpire(f1, fetchRefresToken);

      if (response) {
        const {
          data: { status, ...other },
        } = response;

        if (status === 'success') {
          const { chatItem } = other;

          // Review the following code
          if (chatItem?.conversation) {
            setCurrentActiveGeneralConversationId(chatItem?.conversation);
          }
        }
      }
    } catch {
      // TODO: Pop the message from the queue on failure
      generateSnackbar('Something went wrong while sending the message');
    }
  };

  const sendCollabGroupMessage = async (chatItem) => {
    try {
      // move message to top of chat queue
      handleCollabSendMessageAfterEffects(
        isSelectedCollabConversationExist,
        currentActiveCollabConversationId,
        chatItem,
      );

      setCollabChat((prevState) => {
        const updatedState = [...prevState];
        updatedState.unshift(chatItem);
        return updatedState;
      });

      const f1 = async () => {
        const res = await axios.post(
          `${BASE_URL}/api/v1/chats/send-collab-message`,
          {
            collabId: currentActiveCollabConversationId,
            messageType: chatItem.itemType,
            messageContent: chatItem.message,
          },
        );
        return res;
      };
      await reFetchTokenExpire(f1, fetchRefresToken);
    } catch {
      // TODO: Pop the message from the queue on failure
      generateSnackbar('Something went wrong while sending the message');
    }
  };

  const handleCollabSendMessageAfterEffects = (
    isSelectedCollabConversationExist,
    collabId,
    chatItem,
  ) => {
    if (isSelectedCollabConversationExist) {
      let desiredCollabConversation = collabConversations.find(
        ({ _id }) => _id === collabId,
      );

      const filteredCollabConversations = collabConversations.filter(
        ({ _id }) => _id !== collabId,
      );

      if (desiredCollabConversation) {
        let desiredCollabConversationCopy = JSON.parse(
          JSON.stringify(desiredCollabConversation),
        );

        const updatedCollabConversation = {
          ...desiredCollabConversationCopy,
          messageType: chatItem?.itemType,
          messageContent: chatItem?.message,
          timeStamp: chatItem?.timeStamp,
          updatedAt: chatItem?.timeStamp,
        };

        const updatedConversations = [
          updatedCollabConversation,
          ...filteredCollabConversations,
        ];
        setCollabConversations(updatedConversations);
      }
    } else {
      // Remove the conversation from the collabs
      // Update the conversation with the latest chat item
      // Push that item in the conversation array

      if (collabs?.length > 0) {
        const desiredCollab = collabs.find(({ _id }) => _id === collabId);

        const filteredCollabs = collabs.filter(({ _id }) => _id !== collabId);

        if (desiredCollab) {
          const desiredCollabCopy = JSON.parse(JSON.stringify(desiredCollab));

          const updatedCollab = {
            ...desiredCollabCopy,
            messageType: chatItem?.itemType,
            messageContent: chatItem?.message,
            timeStamp: chatItem?.timeStamp,
          };

          setCollabs(filteredCollabs);
          setCollabConversations([updatedCollab, ...collabConversations]);
        }
      }
    }
  };

  const conversationItemClickHandler = (conversationId) => {
    setChatLoading(true);
    setCurrentActiveGeneralConversationId(conversationId);
    setSelected('general');
    setCurrentActiveCollabConversationId('');

    setChatLoading(false);
  };

  const groupConversationItemClickHanlder = (collabConversation) => {
    setChatLoading(true);

    setCurrentActiveGeneralConversationId('');
    setGeneralChat([]);
    setSelected('collab');
    setCurrentActiveCollabConversationId(collabConversation._id);

    if (collabConversation) {
      setActiveCollabDetails(collabConversation);
    }
    setIsConversationsExists(true);
    setIsSelectedCollabConversationExist(true);
  };

  const groupCollabItemClickHandler = (collab) => {
    setCurrentActiveGeneralConversationId('');
    setGeneralChat([]);
    setSelected('collab');
    setCurrentActiveCollabConversationId(collab._id);
    let filteredMembers = filterAcceptedMembers(collab?.members);

    if (filteredMembers.length > 0) {
      filteredMembers = filteredMembers.map(({ user }) => user);
    }
    filteredMembers.unshift(collab?.creator);

    const modifiedCollab = {
      _id: collab?._id,
      messageHeader: collab?.messageHeader,
      image: collab?.image,
      members: filteredMembers,
    };
    setIsSelectedCollabConversationExist(false);
    setActiveCollabDetails(modifiedCollab);
    setCollabChat([]);
  };

  useEffect(() => {
    if (user) {
      fetchConversations();
    }
  }, [searchString, user]);

  // Effect when general conversations id are changed
  useEffect(() => {
    if (currentActiveGeneralConversationId) {
      fetchConversationChat();
    } else {
      setChatLoading(false);
    }
  }, [currentActiveGeneralConversationId]);

  useEffect(() => {
    if (currentActiveGeneralConversationId) {
      const activeConversationItem = generalConversations.find(
        ({ _id }) => _id === currentActiveGeneralConversationId,
      );

      if (activeConversationItem) {
        const { image, messageHeader, introduction, bio } =
          activeConversationItem;

        setActiveConversationUser({
          name: captilalizeString(messageHeader),
          userName: activeConversationItem?.userName,
          image,
          fullName: activeConversationItem?.fullName,
          introduction,
          bio,
          collabRequest: activeConversationItem?.collabRequest,
          isCommunicationAllowed:
            activeConversationItem?.isCommunicationAllowed,
          collabRequestInitiator:
            activeConversationItem?.collabRequestInitiator,
          conversationId: activeConversationItem?._id,
          _id: activeConversationItem?._id,
        });
      }
    }
  }, [currentActiveGeneralConversationId, router, generalConversations]);

  // Effect when collab conversations ids are changed
  useEffect(() => {
    if (!isConversationsExists) {
      setCollabChat([]);
    } else {
      if (currentActiveCollabConversationId !== '') {
        fetchCollabConversationChat();
      }
    }
  }, [currentActiveCollabConversationId]);

  const sortedConversations = useMemo(() => {
    const generalConversationsArray = generalConversations.map((i) => ({
      ...i,
      type: 'general',
    }));
    const collabConversationsArray = collabConversations.map((i) => ({
      ...i,
      type: 'collab',
    }));
    return [...generalConversationsArray, ...collabConversationsArray].sort(
      sortByUpdateOrCreatedAt,
    );
  }, [generalConversations, collabConversations]);

  useEffect(() => {
    if (!conversationsLoading) {
      setAllConversations(sortedConversations);
    }
  }, [sortedConversations, conversationsLoading]);

  // useEffect responsible for filtering and sorting the conversations based on the selected options
  useEffect(() => {
    if (allConversations?.length > 0) {
      const selectedConversations = [];

      if (selectedOptions.includes('connections')) {
        allConversations.forEach((conversation) => {
          if (
            conversation.type === 'general' &&
            conversation.collabRequest === 'ACCEPTED'
          ) {
            selectedConversations.push(conversation);
          }
        });
      }

      if (selectedOptions.includes('requests')) {
        allConversations.forEach((conversation) => {
          if (
            conversation.type === 'general' &&
            conversation.collabRequest === 'PENDING'
          ) {
            selectedConversations.push(conversation);
          }
        });
      }

      if (selectedOptions.includes('collabs')) {
        allConversations.forEach((conversation) => {
          if (conversation.type === 'collab') {
            selectedConversations.push(conversation);
          }
        });

        selectedConversations.push(...collabs);
      }

      setSelectedConversations(
        selectedConversations.sort(sortByUpdateOrCreatedAt),
      );
    }
  }, [selectedOptions, allConversations]);

  return (
    <>
      {user && (
        <InboxContentContainer>
          <InboxNavigation
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
            allConversations={allConversations}
            conversations={selectedConversations}
            conversationsLoading={conversationsLoading}
            currentActiveGeneralConversationId={
              currentActiveGeneralConversationId
            }
            currentActiveCollabConversationId={
              currentActiveCollabConversationId
            }
            conversationItemClickHandler={conversationItemClickHandler}
            groupConversationItemClickHanlder={
              groupConversationItemClickHanlder
            }
            groupCollabItemClickHandler={groupCollabItemClickHandler}
          />

          <ChatBox
            currentActiveCollabConversationId={
              currentActiveCollabConversationId
            }
            currentActiveGeneralConversationId={
              currentActiveGeneralConversationId
            }
            conversationsLoading={conversationsLoading}
            chatLoading={chatLoading}
            generalChat={generalChat}
            selected={selected}
            collabChat={collabChat}
            activeConversationUser={activeConversationUser}
            setActiveConversationUser={setActiveConversationUser}
            setGeneralConversations={setGeneralConversations}
            activeCollabDetails={activeCollabDetails}
            isConversationsExists={isConversationsExists}
            loggedInUser={user}
            sendGeneralMessage={sendGeneralMessage}
            sendCollabGroupMessage={sendCollabGroupMessage}
          />
        </InboxContentContainer>
      )}
    </>
  );
};
