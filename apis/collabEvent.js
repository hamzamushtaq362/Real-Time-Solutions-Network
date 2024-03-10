import config from '../config';
import { fetchRefreshToken, reFetchTokenExpire } from './index';
import axios from 'axios';

export const BASE_URL = config.BASE_URL;

export const fetchCollabEvents = async (collabId) => {
  const f1 = async () => {
    const res = await axios.get(`${BASE_URL}/api/v1/collab-event/${collabId}`);
    return res;
  };
  const res = await reFetchTokenExpire(f1, fetchRefreshToken);
  return res;
};

export const acceptRejectCollabEventInvitation = async (
  collabEventId,
  status,
) => {
  const f1 = async () => {
    const res = await axios.patch(
      `${BASE_URL}/api/v1/collab-event-participant/accept-reject-invite`,
      {
        collabEventId: collabEventId,
        userActionStatus: status,
      },
    );
    return res;
  };
  const res = await reFetchTokenExpire(f1, fetchRefreshToken);
  return res;
};

export const fetchUserAssociatedEvents = async (userId) => {
  try {
    const f1 = async () => {
      const res = await axios.get(
        `${BASE_URL}/api/v1/collab-event/user-events/${userId}`,
      );
      return res;
    };
    const res = await reFetchTokenExpire(f1, fetchRefreshToken);
    return res;
  } catch (error) {
    return null;
  }
};
export const fetchHostedEventDetails = async (eventId) => {
  try {
    const f1 = async () => {
      return await axios.get(
        `${BASE_URL}/api/v1/collab-event/events/${eventId}`,
      );
    };
    const res = await reFetchTokenExpire(f1, fetchRefreshToken);
    const { data } = res;
    return data;
  } catch (e) {
    return {};
  }
};

export const updateEventMemberStatus = async (data) => {
  try {
    const f1 = async () => {
      return await axios.post(
        `${BASE_URL}/api/v1/collab-event/update-member-status`,
        data,
      );
    };
    return await reFetchTokenExpire(f1, fetchRefreshToken);
  } catch (error) {
    return null;
  }
};
