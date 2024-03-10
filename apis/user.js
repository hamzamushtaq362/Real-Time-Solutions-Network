import axios from 'axios';
import config from '~/config';
import { fetchRefreshToken, reFetchTokenExpire } from './index';
import { filterNullValuesFromArray } from '~/utils';

export const BASE_URL = config.BASE_URL;

export const getPublicUserDetails = async (username) => {
  try {
    const nonInterceptedAxios = axios.create();
    const response = await nonInterceptedAxios(
      `${BASE_URL}/api/v1/public/user-details/${username}`,
    );

    if (response?.data?.status === 'success') {
      const { user } = response?.data;
      return user;
    }
  } catch (err) {
    return err;
  }
};

export const getUserPlatformsByUserId = async (userId) => {
  try {
    const f1 = async () => {
      return await axios.get(`${BASE_URL}/user/platforms/${userId}`);
    };
    const res = await reFetchTokenExpire(f1, fetchRefreshToken);
    const { data } = res;
    if (data?.status === 'success') {
      return data?.platforms;
    } else {
      return [];
    }
  } catch (err) {
    return err;
  }
};

export const getPublicUserPlatformsByUserId = async (userId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/public/user-platforms/${userId}`,
    );
    const { data } = response;
    if (data?.status === 'success') {
      return data?.platforms;
    } else {
      return [];
    }
  } catch (err) {
    return err;
  }
};

export const getUserNetworkPublic = async (userId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/public/user-network/${userId}`,
    );
    const { data } = response;

    if (data?.status === 'success') {
      return data?.userJoinedCollabMembers;
    } else {
      return [];
    }
  } catch (err) {
    return err;
  }
};

export const getUserRecommendationsPublic = async (userId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/public/user-recommendations/${userId}`,
    );

    const { data } = response;

    if (data?.status === 'success') {
      return data?.recommendations;
    }
  } catch (err) {
    return err;
  }
};

export const getUserFollowingsPublic = async (userId) => {
  try {
    const nonInterceptedAxios = axios.create();
    const response = await nonInterceptedAxios.get(
      `${BASE_URL}/api/v1/public/get-user-followings/${userId}`,
    );

    const { data } = response;
    if (data?.status === 'success') {
      return filterNullValuesFromArray(data?.followings);
    } else {
      return [];
    }
  } catch (err) {
    return err;
  }
};

export const getUserFollowersPublic = async (userId) => {
  try {
    const nonInterceptedAxios = axios.create();
    const response = await nonInterceptedAxios.get(
      `${BASE_URL}/api/v1/public/get-user-followers/${userId}`,
    );

    const { data } = response;
    if (data?.status === 'success') {
      return filterNullValuesFromArray(data?.followers);
    } else {
      return [];
    }
  } catch (err) {
    return err;
  }
};

export const getUserWalletAddresses = async () => {
  try {
    const f1 = async () => {
      const res = await axios.get(`${BASE_URL}/api/v1/wallets`);
      return res;
    };

    const res = await reFetchTokenExpire(f1, fetchRefreshToken);

    if (res.data.status === 'success') {
      return res?.data?.data?.wallets || [];
    }
  } catch (err) {
    //
  }
};

export const updateUserSelectedWalletAddress = async (address) => {
  if (address) {
    const f1 = async () => {
      const res = await axios.post(`${BASE_URL}/user/wallet-update`, {
        address,
      });
      return res;
    };

    const res = await reFetchTokenExpire(f1, fetchRefreshToken);

    if (res) {
      return res;
    }
  } else {
    return false;
  }
};

export const updateClaimDetails = async (contractAddress) => {
  const f1 = async () => {
    const res = await axios.post(`${BASE_URL}/user/claim-update`, {
      contractAddress,
    });
    return res;
  };

  const res = await reFetchTokenExpire(f1, fetchRefreshToken);

  if (res) {
    return res;
  }
};
export const claimedByWho = async (contractAddress) => {
  const f1 = async () => {
    const res = await axios.post(`${BASE_URL}/user/claimed-by-who`, {
      contractAddress,
    });
    if (res) {
      if (res.data.status === 'success' && res.data.user) {
        return res.data.user;
      } else {
        return false;
      }
    }
  };

  const res = await reFetchTokenExpire(f1, fetchRefreshToken);

  if (res) {
    return res;
  }
};

export const isUserVerfiedThroughTwitter = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/twitter/verified`);
    const { data } = response;

    if (data?.status === 'success') {
      return data?.isVerified;
    }
  } catch (err) {
    return false;
  }
};

export const getUserContributedProfiles = async () => {
  try {
    const response = await axios.post(
      `${BASE_URL}/creator/get-contribute-profiles`,
    );
    const { data } = response;

    return data;
  } catch (err) {
    return false;
  }
};

export const getRefferedUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/user/getRefferedUsers`);
    const { data } = response;
    return data.users;
  } catch (err) {
    return false;
  }
};
