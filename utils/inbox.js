import { AvatarSampleImage2, CollabChatIcon } from '../assets';
import axios from 'axios';
import { BASE_URL, fetchRefreshToken, reFetchTokenExpire } from '~/apis';

export const formatGeneralConversations = (conversations, loggedInUserId) => {
  const formattedConversations = conversations
    .filter((conversation) => !!conversation.latestChatItem)
    .map(
      ({
        latestChatItem,
        participants,
        updatedAt,
        _id,
        collabRequest,
        collabRequestInitiator,
        isCommunicationAllowed,
      }) => {
        let conversation = {
          _id,
          updatedAt,
          collabRequest,
          collabRequestInitiator,
          isCommunicationAllowed,
        };
        const { messageType, messageContent, sender, isRead } = latestChatItem;
        if (messageType === 'text') {
          conversation.messageType = 'text';
          conversation.messageContent = messageContent;
        } else if (messageType === 'image') {
          // Image Handling
        }

        const conversationParticipant = participants.find(
          ({ _id }) => _id !== loggedInUserId,
        );

        if (conversationParticipant) {
          const { imageUrl, fullName, username, bio, introduction } =
            conversationParticipant;

          conversation.image = imageUrl;
          conversation.messageHeader = fullName || username;
          conversation.userName = username;
          conversation.sender = latestChatItem?.sender;
          conversation.isRead = latestChatItem?.isRead;
          conversation.bio = bio;
          conversation.introduction = introduction;
        } else {
          conversation.image = AvatarSampleImage2;
          conversation.messageHeader = 'No name found';
        }

        const isLatestChatItemBelongsToLoggedInUser = loggedInUserId === sender;
        if (isLatestChatItemBelongsToLoggedInUser) {
          conversation.conversationOpened = true;
        } else {
          if (isRead) {
            conversation.conversationOpened = true;
          } else {
            conversation.conversationOpened = false;
          }
        }
        return conversation;
      },
    );
  return formattedConversations;
};

export const formatCollabConversations = (conversations) => {
  if (conversations.length > 0) {
    const formattedCoversations = conversations.map((conversation) => {
      const { collab, participants, updatedAt, latestChatItem, _id, image } =
        conversation;

      const fomattedConversation = {
        _id: collab?._id,
        messageHeader: collab?.title,
        image: collab?.image || image || CollabChatIcon,
        members: participants,
        collabConversationId: _id,
        conversationOpened: true,
        timeStamp: updatedAt,
        messageType: latestChatItem?.messageType,
        messageContent: latestChatItem?.messageContent,
        updatedAt: updatedAt,
        sender: latestChatItem?.sender,
        creator: collab.creatorId,
        type: 'collab-conversation',
      };

      return fomattedConversation;
    });
    return formattedCoversations;
  }
  return [];
};

export const mapCollabsToConversations = (collabs) => {
  const formattedCoversations = collabs.map((collab) => {
    const { _id, title, images, members, creatorId } = collab;

    const fomattedConversation = {
      _id,
      messageHeader: title,
      image: images[0] || CollabChatIcon,
      members,
      collabConversationId: _id,
      conversationOpened: true,
      timeStamp: '',
      messageType: 'text',
      messageContent: '',
      creator: creatorId,
      type: 'collab',
    };

    return fomattedConversation;
  });
  return formattedCoversations;
};

export const formatGeneralConversationChat = (chat, loggedInUserId) => {
  return chat.map(
    ({
      sender,
      messageType,
      messageContent,
      isRead,
      //  updatedAt,
      createdAt,
      participants,
    }) => {
      let chatItem = {};

      if (loggedInUserId === sender._id) {
        chatItem.userType = 'sender';
        chatItem.isRead = true;
      } else {
        chatItem.isRead = isRead;
      }

      const { username, fullName, imageUrl } = sender;

      const otherParticipant = participants.find((id) => id !== loggedInUserId);

      chatItem.userName = username;
      chatItem.fullName = fullName;
      // Formatting of time stamp goes here
      chatItem.timeStamp = createdAt;
      chatItem.itemType = messageType;
      chatItem.message = messageContent;
      chatItem.userImage = imageUrl;
      chatItem.receiverId = otherParticipant;

      return chatItem;
    },
  );
};
export const sortWithTimeStamp = (arr) =>
  arr.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

export const formatCollabConversationChat = (chat, loggedInUserId) => {
  const formattedChat = chat.map(
    ({
      sender,
      messageType,
      messageContent,
      isRead,
      updatedAt,
      participants,
    }) => {
      let chatItem = {};

      if (messageType === 'text') {
        if (loggedInUserId === sender?._id) {
          chatItem.userType = 'sender';
          chatItem.isRead = true;
        } else {
          chatItem.isRead = isRead;
        }

        const { username, imageUrl, fullName } = sender;

        chatItem.userName = username;
        chatItem.fullName = fullName;
        // Formatting of time stamp goes here
        chatItem.timeStamp = updatedAt;
        chatItem.itemType = messageType;
        chatItem.message = messageContent;
        chatItem.userImage = imageUrl;
        chatItem.participants = participants;
      } else if (messageType === 'notifier') {
        chatItem.timeStamp = updatedAt;
        chatItem.itemType = messageType;
        chatItem.message = messageContent;
        chatItem.participants = participants;
      }

      return chatItem;
    },
  );
  return formattedChat;
};

export const mapUsersToConversations = (users) => {
  const formattedUsers = [];

  if (users && users[0] !== null && users.length > 0) {
    users.forEach(({ _id, imageUrl, username }) => {
      const conversationItem = {
        _id,
        image: imageUrl,
        messageHeader: username,
        conversationOpened: true,
        updatedAt: '',
        messageType: 'text',
        messageContent: '',
      };

      formattedUsers.push(conversationItem);
    });
  }
  return formattedUsers;
};

/*
Checks If All the members are present in server or not.
Creates Discord Private Channel
Add Collab Members in that Private Channel
Generate Required chat notifiers Interaction for Collab-Chat Conversation.
*/
export const recieveCollabMemberDiscordStatus = async (
  collabConversationId,
) => {
  try {
    const f1 = async () => {
      const res = await axios.post(`${BASE_URL}/discord/member/isPresent`, {
        collabConversationId,
      });
      return res;
    };
    await reFetchTokenExpire(f1, fetchRefreshToken);
  } catch (err) {
    //
  }
};
