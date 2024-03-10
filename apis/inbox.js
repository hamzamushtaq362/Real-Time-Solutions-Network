import axios from 'axios';
import { BASE_URL } from '~/apis';
import { reFetchTokenExpire, fetchRefreshToken } from './index';

export const isConverversationExistsWithUser = async (userId) => {
  // 1. Check if conversation between logged-in user and loaded user exist
  // 2. If conversation exists the redirect to /inbox?conversation={conversationId}
  // 3. Else redirect to /inbox?user={userId}

  const f1 = async () => {
    const res = await axios.get(
      `${BASE_URL}/api/v1/chats/is-conversation-exist/${userId}`,
    );
    return res;
  };
  const res = await reFetchTokenExpire(f1, fetchRefreshToken);
  return res;
};

export const generalConversation = async () => {
  const f1 = async () => {
    const res = await axios.get(
      `${BASE_URL}/api/v1/chats/conversations?searchString=`,
    );
    return res;
  };
  const res = await reFetchTokenExpire(f1, fetchRefreshToken);
  return res;
};

export const markNotificationRead = async (id) => {
  const f1 = async () => {
    const res = await axios.patch(`${BASE_URL}/notification/mark-as-read`, {
      notificationId: id,
    });
    return res;
  };
  const res = await reFetchTokenExpire(f1, fetchRefreshToken);
  return res;
};

export const getUnreadMessages = async () => {
  const f1 = async () => {
    const res = await axios.get(`${BASE_URL}/api/v1/chats/unread-message`);
    return res;
  };
  const res = await reFetchTokenExpire(f1, fetchRefreshToken);
  return res;
};

export const markMessageRead = async (_id) => {
  const f1 = async () => {
    const res = await axios.get(`${BASE_URL}/api/v1/chats/read-message/${_id}`);
    return res;
  };
  const res = await reFetchTokenExpire(f1, fetchRefreshToken);
  return res;
};

export const sendMessage = async (receiverId, message, isCollabRequest) => {
  const f1 = async () => {
    const res = await axios.post(`${BASE_URL}/api/v1/chats/send-message`, {
      receiverId: receiverId,
      messageType: 'collab-request',
      messageContent: message,
      isCollabRequest: isCollabRequest,
    });
    return res;
  };

  const res = await reFetchTokenExpire(f1, fetchRefreshToken);

  return res;
};

export const acceptRejectCollabRequest = async (conversationId, status) => {
  const f1 = async () => {
    const res = await axios.post(`${BASE_URL}/api/v1/chats/collab-req-res`, {
      conversationId,
      status,
    });
    return res;
  };
  const res = await reFetchTokenExpire(f1, fetchRefreshToken);
  return res;
};

export const getCollabReqConversation = async (status, profileId) => {
  const f1 = async () => {
    const res = await axios.post(`${BASE_URL}/api/v1/chats/get-collab-req`, {
      status,
      profileId,
    });
    return res;
  };

  const res = await reFetchTokenExpire(f1, fetchRefreshToken);
  return res;
};
