import axios from 'axios';
import { BASE_URL, fetchRefreshToken, reFetchTokenExpire } from './index';

export const checkIfWalletExist = async (
  walletAddress,
  contractAddress,
  tokenId,
) => {
  try {
    const f1 = async () => {
      const res = await axios.post(
        `${BASE_URL}/api/v1/wallets/checkIfUserHasWallet`,
        {
          nftOwnerAddress: walletAddress,
          contractAddress,
          tokenId,
        },
      );
      return res;
    };

    const res = await reFetchTokenExpire(f1, fetchRefreshToken);

    if (res && res.data) {
      return res.data;
    }
  } catch (err) {}
};
