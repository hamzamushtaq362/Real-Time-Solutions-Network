import config from '../config';
import { fetchRefreshToken, reFetchTokenExpire } from './index';
import axios from 'axios';
export const BASE_URL = config.BASE_URL;

export const isCollabCollaboratorsFollowed = async (collabId) => {
  const f1 = async () => {
    const res = await axios.get(
      `${BASE_URL}/api/v1/follow/is-collab-collaborators-followed/${collabId}`,
    );
    return res;
  };
  const res = await reFetchTokenExpire(f1, fetchRefreshToken);
  if (res.data.status === 'success') {
    return res.data.hasAnyUserNotFollowed;
  }
};

export const followCollabCollaborators = async (collabId) => {
  const f1 = async () => {
    const res = await axios.get(
      `${BASE_URL}/api/v1/follow/follow-collab-collaborators/${collabId}`,
    );
    return res;
  };
  const res = await reFetchTokenExpire(f1, fetchRefreshToken);

  if (res.data.status === 'success') {
    return res.data;
  }
};

export const followEventCollaborators = async (eventId) => {
  const f1 = async () => {
    const res = await axios.get(
      `${BASE_URL}/api/v1/follow/follow-event-collaborators/${eventId}`,
    );
    return res;
  };
  const res = await reFetchTokenExpire(f1, fetchRefreshToken);

  if (res.data.status === 'success') {
    return res.data;
  }
};
