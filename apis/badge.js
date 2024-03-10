import axios from 'axios';
import config from '../config';
import { reFetchTokenExpire, fetchRefreshToken } from './index';
export const BASE_URL = config.BASE_URL;

export const createUserBadge = async (userBadgeDetails) => {
  const f1 = async () => {
    const {
      badgeDescription,
      badgeTitle,
      selectedChainOption,
      associatedMissions,
      aiGeneratedBadge,
      image,
      contractAddress,
      contractPermission,
      supply,
    } = userBadgeDetails;

    const res = await axios.post(`${BASE_URL}/badge/create-user-badge`, {
      name: badgeTitle,
      description: badgeDescription,
      image,
      chainType: selectedChainOption,
      aiGeneratedBadge,
      associatedMissions,
      contractAddress,
      contractPermission,
      supply,
    });
    if (res) {
      return res;
    } else {
      return false;
    }
  };
  const res = await reFetchTokenExpire(f1, fetchRefreshToken);
  return res;
};

export const generateBadgeImages = async (badgeTextPrompt) => {
  const f1 = async () => {
    const res = await axios.post(`${BASE_URL}/ai/generate-badge-images`, {
      badgeTextPrompt,
    });
    if (res) {
      return res.data;
    } else {
      return false;
    }
  };
  const res = await reFetchTokenExpire(f1, fetchRefreshToken);
  return res;
};

export const getUserBadges = async (searchString) => {
  const f1 = async () => {
    const res = await axios.get(`${BASE_URL}/badge/my-badges`, {
      params: { searchString },
    });
    if (res) {
      return res.data;
    } else {
      return false;
    }
  };
  const res = await reFetchTokenExpire(f1, fetchRefreshToken);
  return res;
};
