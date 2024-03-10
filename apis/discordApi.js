import axios from 'axios';
import { BASE_URL } from '~/apis';
import { reFetchTokenExpire, fetchRefreshToken } from './index';

export const addDiscordBot = async (
  code,
  //   collabId = '643cfbcdbd52a3ff67fba11a',
  collabId = '644f48d7298dbd8ae67395fa',
) => {
  try {
    const f1 = async () => {
      const res = await axios.get(
        `${BASE_URL}/discord/add-discord-bot/?code=${code}&collabId=${collabId}`,
      );
      return res;
    };
    const res = await reFetchTokenExpire(f1, fetchRefreshToken);
    return res;
  } catch (error) {}
};
export const getDiscordChannels = async (collabId) => {
  try {
    const f1 = async () => {
      const res = await axios.get(
        `${BASE_URL}/discord/get-discord-channel/${collabId}`,
      );
      return res;
    };
    const res = await reFetchTokenExpire(f1, fetchRefreshToken);
    return res;
  } catch (error) {}
};
export const addDiscordChannel = async (collabId, channelId) => {
  try {
    const body = {
      collabId: collabId,
      channelName: channelId,
    };
    const f1 = async () => {
      const res = await axios.post(
        `${BASE_URL}/discord/add-discord-channel`,
        body,
      );
      return res;
    };
    const res = await reFetchTokenExpire(f1, fetchRefreshToken);
    return res;
  } catch (error) {}
};

export const isUserDiscordConnected = async () => {
  const f1 = async () => {
    const res = await axios.get(`${BASE_URL}/discord/is-user-connected`);
    return res;
  };
  const res = await reFetchTokenExpire(f1, fetchRefreshToken);
  return res;
};
