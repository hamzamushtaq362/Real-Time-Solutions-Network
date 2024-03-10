import axios from 'axios';
import config from '../config';
import { fetchRefreshToken, reFetchTokenExpire } from './index';

export const BASE_URL = config.BASE_URL;

export const updateCollab = async (values) => {
  const f1 = async () => {
    return await axios.patch(`${BASE_URL}/api/v1/collab`, values);
  };
  return await reFetchTokenExpire(f1, fetchRefreshToken);
};

export const getPublicCollabDetails = async (collabId) => {
  try {
    const nonInterceptedAxios = axios.create();
    const response = await nonInterceptedAxios.get(
      `${BASE_URL}/api/v1/collab/public/${collabId}`,
    );

    const { data } = response;
    return data;
  } catch (err) {
    return {
      status: 'error',
      data: {
        message: 'Something went wrong or collab not found!',
      },
    };
  }
};

export const getCollabDetails = async (collabId) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/collab/${collabId}`);

    const { data } = response;

    return data;
  } catch (err) {
    return {
      status: 'error',
      data: {
        message: 'Something went wrong or collab not found!',
      },
    };
  }
};

export const fetchCollabApplicantsStats = async (collabId) => {
  const f1 = async () => {
    const res = await axios.get(
      `${BASE_URL}/api/v1/collabmember/applicants-stats?collabId=${collabId}`,
    );
    return res;
  };
  const res = await reFetchTokenExpire(f1, fetchRefreshToken);
  return res;
};

export const getCollabsByUserId = async (userId) => {
  const f1 = async () => {
    return await axios.post(`${BASE_URL}/api/v1/recommender/collabs`, {
      userId,
      type: 'user-collabs',
      sources: ['internal', 'external', 'collective'],
      liked: true,
      curated: true,
      contributed: true,
    });
  };
  return await reFetchTokenExpire(f1, fetchRefreshToken);
};

export const getAiSuggestions = async (aiCollabBrief) => {
  try {
    const f1 = async () => {
      const res = await axios.post(
        `${BASE_URL}/ai/collabCreationIdeas`,
        {
          collabInput: aiCollabBrief,
        },
        {
          timeout: 100000,
        },
      );
      if (res) {
        if (res.data.status === 'success') {
          return { status: 'success', collab: res.data.collab };
        } else {
          if (res.data.code === 'DailylimitReached') {
            return res.data;
          }
          return false;
        }
      } else {
        return false;
      }
    };
    const res = await reFetchTokenExpire(f1, fetchRefreshToken);
    return res;
  } catch (err) {
    return false;
  }
};

export const getCollabWorks = async (collabId) => {
  const f1 = async () => {
    const res = await axios.get(`${BASE_URL}/api/v1/sub-collab/${collabId}`);
    return res;
  };
  const res = await reFetchTokenExpire(f1, fetchRefreshToken);
  return res;
};
export const getCollabBTS = async (collabId) => {
  const f1 = async () => {
    const res = await axios.get(`${BASE_URL}/api/v1/collab-bts/${collabId}`);
    return res;
  };
  const res = await reFetchTokenExpire(f1, fetchRefreshToken);
  return res;
};

export const searchCollab = async (searchString) => {
  try {
    const f1 = async () => {
      return await axios.get(
        `${BASE_URL}/api/v1/search/collab?searchString=${searchString}`,
      );
    };
    const response = await reFetchTokenExpire(f1, fetchRefreshToken);
    if (response) {
      const {
        data: { status, collabs },
      } = response;

      if (status === 'success') {
        return collabs;
      } else {
        return [];
      }
    }
  } catch (error) {
    return [];
  }
};

export const getCollabIdByTitleIdentifier = async (titleIdentifier) => {
  const f1 = async () => {
    const res = await axios.get(
      `${BASE_URL}/api/v1/collab/get-collab-id/${titleIdentifier}`,
    );
    return res;
  };
  const res = await reFetchTokenExpire(f1, fetchRefreshToken);
  if (res.data.status === 'success') {
    return res.data.collabId;
  }
};

export const getCollabIdentifierById = async (collabId) => {
  const f1 = async () => {
    const res = await axios.get(
      `${BASE_URL}/api/v1/collab/get-collab-identifier/${collabId}`,
    );
    return res;
  };
  const res = await reFetchTokenExpire(f1, fetchRefreshToken);
  if (res.data.status === 'success') {
    return res.data.identifier;
  }
};

export const fetchCollabImages = async (creatorId) => {
  const f1 = async () => {
    const res = await axios.get(
      `${BASE_URL}/api/v1/collabmember/getAllMyCollabs?userId=${creatorId}&page=1&limit=10`,
    );
    return res;
  };
  const response = await reFetchTokenExpire(f1, fetchRefreshToken);
  return response;
};

export const collabConversation = async () => {
  const f1 = async () => {
    const res = await axios.get(
      `${BASE_URL}/api/v1/chats/collab-conversations?searchString=`,
    );
    return res;
  };
  const res = await reFetchTokenExpire(f1, fetchRefreshToken);
  return res;
};
export const createSingleCollab = async (collab) => {
  const f1 = async () => {
    return await axios.post(`${BASE_URL}/api/v1/collab`, collab);
  };
  return await reFetchTokenExpire(f1, fetchRefreshToken);
};
export const createMultipleCollabs = async (collabs) => {
  const createCollabPromises = collabs.map((collab) => {
    return async () => {
      return axios.post(`${BASE_URL}/api/v1/collab`, collab);
    };
  });

  return await Promise.all(
    createCollabPromises.map((promiseFunction) => {
      return reFetchTokenExpire(promiseFunction, fetchRefreshToken);
    }),
  );
};

export const archiveToggle = async (identifier) => {
  const f1 = async () => {
    const res = await axios.patch(
      `${BASE_URL}/api/v1/collab/archive/${identifier}`,
    );
    return res;
  };
  const res = await reFetchTokenExpire(f1, fetchRefreshToken);
  return res;
};

export const deleteCollab = async (identifier) => {
  const f1 = async () => {
    const res = await axios.delete(
      `${BASE_URL}/api/v1/collab/delete/${identifier}`,
    );
    return res;
  };
  const res = await reFetchTokenExpire(f1, fetchRefreshToken);
  return res;
};
