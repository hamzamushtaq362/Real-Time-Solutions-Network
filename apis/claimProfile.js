import axios from 'axios';
import config from '../config';
import { reFetchTokenExpire, fetchRefreshToken } from './index';
export const BASE_URL = config.BASE_URL;

export const claimProfileApiCall = async (
  contributeProfileId,
  selectedTwitterUsername,
) => {
  const f1 = async () => {

    const res = await axios.post(`${BASE_URL}/api/v1/claim/profile`, {
      contributeProfileId,
      selectedTwitterUsername,
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
