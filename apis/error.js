import axios from 'axios';
import { BASE_URL, fetchRefreshToken, reFetchTokenExpire } from './index';

export const passErrorCrashToDiscordErrorAPI = async (appCrashErrorInfo) => {
  try {
    const f1 = async () => {
      const response = await axios.post(`${BASE_URL}/discord/ui-error-log`, {
        errorInfo: appCrashErrorInfo,
      });
      return response;
    };
    await reFetchTokenExpire(f1, fetchRefreshToken);
  } catch (err) {
    return err;
  }
};
