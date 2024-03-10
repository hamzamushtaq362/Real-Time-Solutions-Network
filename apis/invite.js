import { BASE_URL, fetchRefreshToken, reFetchTokenExpire } from './index';
import axios from 'axios';
export const verifyInviteHash = async (hash) => {
  try {
    const f1 = async () => {
      const res = await axios.post(`${BASE_URL}/invitation/verify-invite`, {
        hash,
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

export const sendCollabInvite = async (email, collabId, role, source) => {
  try {
    let obj;
    if (role) {
      obj = {
        email,
        collabId,
        role,
        source,
      };
    } else {
      obj = {
        email,
        collabId,
        source,
      };
    }
    const f1 = async () => {
      const res = await axios.post(
        `${BASE_URL}/api/v1/collabmember/send-email-invite`,
        obj,
      );
      return res;
    };
    const res = await reFetchTokenExpire(f1, fetchRefreshToken);

    if (res?.data?.status === 'success') {
      return res.data.message;
    } else {
      if (res?.data?.status === 'fail' && res?.data?.message) {
        return res.data.message;
      } else {
        return null;
      }
    }
  } catch (err) {
    return null;
  }
};
