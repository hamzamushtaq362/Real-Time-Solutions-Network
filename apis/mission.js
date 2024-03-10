import axios from 'axios';
import { BASE_URL } from '~/apis';
import { reFetchTokenExpire, fetchRefreshToken } from './index';

export const fetchCollabMissions = async (collabId) => {
  const f1 = async () => {
    const res = await axios.get(`${BASE_URL}/api/v1/mission/${collabId}`);
    return res;
  };
  const res = await reFetchTokenExpire(f1, fetchRefreshToken);
  return res;
};

export const beginMission = async (missionId, metadata = {}) => {
  const f1 = async () => {
    const res = await axios.post(
      `${BASE_URL}/api/v1/mission-instance/${missionId}/begin`,
      { metadata },
    );
    return res;
  };
  const res = await reFetchTokenExpire(f1, fetchRefreshToken);
  return res;
};

export const verifyMission = async (missionInstanceId) => {
  const f1 = async () => {
    const res = await axios.put(
      `${BASE_URL}/api/v1/mission-instance/${missionInstanceId}/verify`,
    );
    return res;
  };
  const res = await reFetchTokenExpire(f1, fetchRefreshToken);
  return res;
};

export const fetchCollabMissionSubmissions = async (missionId) => {
  const f1 = async () => {
    const res = await axios.get(
      `${BASE_URL}/api/v1/mission-instance/${missionId}`,
    );
    return res;
  };
  const res = await reFetchTokenExpire(f1, fetchRefreshToken);
  return res;
};

export const deleteMission = async (collabId, missionId) => {
  const f1 = async () => {
    const res = await axios.delete(
      `${BASE_URL}/api/v1/mission/${collabId}/${missionId}`,
    );
    return res;
  };
  const res = await reFetchTokenExpire(f1, fetchRefreshToken);
  return res;
};

export const searchUserMission = async (missionText) => {
  const f1 = async () => {
    const res = await axios.get(
      `${BASE_URL}/api/v1/mission/search-user-mission`,
      {
        params: {
          searchTags: [missionText],
        },
      },
    );

    if (res) return res;
  };

  const res = await reFetchTokenExpire(f1, fetchRefreshToken);
  if (res) {
    return res.data.missions;
  }
};
