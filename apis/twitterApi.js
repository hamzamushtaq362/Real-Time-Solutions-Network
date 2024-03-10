import axios from 'axios';
import { BASE_URL } from '~/apis';
import { reFetchTokenExpire, fetchRefreshToken } from './index';

export const isUserTwitterConnected = async () => {
  const f1 = async () => {
    const res = await axios.get(`${BASE_URL}/api/v1/twitter/is-user-connected`);
    return res;
  };
  const res = await reFetchTokenExpire(f1, fetchRefreshToken);
  return res;
};
