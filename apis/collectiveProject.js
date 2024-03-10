import { BASE_URL, fetchRefreshToken, reFetchTokenExpire } from './index';
import axios from 'axios';

export const getAllProjectOfCollective = async (collectiveId) => {
  try {
    const f1 = async () => {
      const res = await axios.post(`${BASE_URL}/api/v1/recommender/collabs`, {
        sources: ['collective'],
        collectiveId,
      });
      return res;
    };
    const res = await reFetchTokenExpire(f1, fetchRefreshToken);

    if (res && res.data.status == 'success') {
      return res.data.data.collabs;
    }
  } catch (err) {
    return null;
  }
};

export const getSingleCollectiveProjectDetails = async (projectId) => {
  try {
    const f1 = async () => {
      return await axios.get(`${BASE_URL}/api/v1/collab/${projectId}`);
    };
    const res = await reFetchTokenExpire(f1, fetchRefreshToken);

    if (res && res?.data?.status === 'success') {
      return res?.data?.data?.collab;
    }
  } catch (err) {
    return null;
  }
};

export const getCollectiveProjectMembers = async (type, projectId) => {
  try {
    const f1 = async () => {
      const res = await axios.get(
        `${BASE_URL}/api/v1/collectiveprojectmember/${type}/${projectId}`,
      );
      return res;
    };
    const res = await reFetchTokenExpire(f1, fetchRefreshToken);

    if (res && res.data.status == 'success') {
      return res.data.data;
    }
  } catch (err) {
    return null;
  }
};
