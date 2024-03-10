import { BASE_URL, fetchRefreshToken, reFetchTokenExpire } from './index';
import axios from 'axios';

export const createCollectiveAPI = async (
  title,
  description,
  collectiveBanner,
  image,
  collectiveLink,
  selectedCoCreators,
) => {
  try {
    const f1 = async () => {
      const res = await axios.post(`${BASE_URL}/api/v1/collective`, {
        title,
        description,
        collectiveBanner,
        image,
        collectiveLink,
        inviteArr: selectedCoCreators,
      });
      return res;
    };
    const res = await reFetchTokenExpire(f1, fetchRefreshToken);
    if (res && res.data) {
      return res.data;
    }
  } catch (err) {
    return null;
  }
};

export const getCollectivesByType = async (userId, type) => {
  try {
    const f1 = async () => {
      const res = await axios.get(
        `${BASE_URL}/api/v1/collective/${type}/${userId}`,
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

export const sendCollectiveInvite = async (inviteArray, collectiveId) => {
  try {
    const f1 = async () => {
      const res = await axios.post(
        `${BASE_URL}/api/v1/collectivemember/inviteMembersToCollective`,
        {
          inviteArray,
          collectiveId,
        },
      );
      return res;
    };
    const res = await reFetchTokenExpire(f1, fetchRefreshToken);
    if (res && res.data.status === 'success') {
      return res.data;
    }
  } catch (err) {
    return null;
  }
};

export const acceptOrRejectCollectiveInvite = async (collectiveId, status) => {
  try {
    const f1 = async () => {
      const res = await axios.patch(
        `${BASE_URL}/api/v1/collectivemember/${collectiveId}/accept-invite`,
        {
          status,
        },
      );
      return res;
    };
    const res = await reFetchTokenExpire(f1, fetchRefreshToken);
    if (res && res.data.status === 'success') {
      return res.data.data;
    }
  } catch (err) {
    return null;
  }
};

export const getCollectiveDetails = async (collectiveId) => {
  try {
    const f1 = async () => {
      const res = await axios.get(
        `${BASE_URL}/api/v1/collective/${collectiveId}`,
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
export const getCollectiveDetailsByLink = async (collectiveLink) => {
  try {
    const f1 = async () => {
      return await axios.get(
        `${BASE_URL}/api/v1/collective/getByLink/${collectiveLink}`,
      );
    };

    const res = await reFetchTokenExpire(f1, fetchRefreshToken);
    if (res && res.data.status == 'success') {
      return res.data.data;
    }
  } catch (err) {
    return null;
  }
};

export const getPublicCollabDetailsByLink = async (collectiveLink) => {
  try {
    const f1 = async () => {
      const res = await axios.get(
        `${BASE_URL}/api/v1/public/collective/${collectiveLink}`,
      );
      return res;
    };

    const res = await reFetchTokenExpire(f1, fetchRefreshToken);
    if (res && res.data.status == 'success') {
      return res.data.collective;
    }
  } catch (err) {
    return null;
  }
};

export const getProjectsForCollective = async (userId) => {
  try {
    const f1 = async () => {
      return await axios.get(
        `${BASE_URL}/api/v1/collective/get-projects/user/${userId}`,
      );
    };
    const res = await reFetchTokenExpire(f1, fetchRefreshToken);
    if (res) {
      return res.data.data;
    }
  } catch (err) {
    return [];
  }
};

export const followCollective = async (collectiveId) => {
  const f1 = async () => {
    const res = await axios.post(
      `${BASE_URL}/api/v1/follow/follow-collective`,
      {
        collectiveId,
      },
    );
    return res;
  };
  const res = await reFetchTokenExpire(f1, fetchRefreshToken);
  return res;
};

export const unfollowCollective = async (collectiveId) => {
  const f1 = async () => {
    const res = await axios.post(
      `${BASE_URL}/api/v1/follow/unfollow-collective`,
      {
        collectiveId,
      },
    );
    return res;
  };
  const res = await reFetchTokenExpire(f1, fetchRefreshToken);
  return res;
};

export const isUserFollowingCollective = async (collectiveId) => {
  const f1 = async () => {
    const res = await axios.get(
      `${BASE_URL}/api/v1/follow/is-collective-followed/${collectiveId}`,
    );
    return res;
  };
  const res = await reFetchTokenExpire(f1, fetchRefreshToken);
  return res;
};

export const getCollectiveFollowers = async (collectiveId) => {
  const f1 = async () => {
    const res = await axios.get(
      `${BASE_URL}/api/v1/follow/get-collective-followers/${collectiveId}`,
    );
    return res;
  };
  const res = await reFetchTokenExpire(f1, fetchRefreshToken);
  return res;
};
