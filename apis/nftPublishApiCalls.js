import axios from 'axios';
import { BASE_URL, fetchRefreshToken, reFetchTokenExpire } from '~/apis';

/*
Add nft drop contract address
*/
export const addNftContractAddress = async (
  collabId,
  nftDropContractAddress,
) => {
  try {
    const f1 = async () => {
      const res = await axios.post(
        `${BASE_URL}/api/v1/collab/addNftContractAddress`,
        {
          collabId,
          nftDropContractAddress,
        },
      );
      return res;
    };
    const res = await reFetchTokenExpire(f1, fetchRefreshToken);

    if (res.data.status === 'success') {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};

/*
Add nft drop contract permission bool in collab data.
*/
export const addNftContractPermission = async (collabId) => {
  try {
    const f1 = async () => {
      const res = await axios.post(
        `${BASE_URL}/api/v1/collab/addNftContractPermission`,
        {
          collabId,
        },
      );
      return res;
    };
    const res = await reFetchTokenExpire(f1, fetchRefreshToken);

    if (res.data.status === 'success') {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};

/*
Update the selectedWalletForCollab in collab data.
*/

export const selectedWalletForCollabOfAdmin = async (collabId, address) => {
  try {
    const f1 = async () => {
      const res = await axios.patch(`${BASE_URL}/api/v1/collab`, {
        id: collabId,
        selectedWalletForCollab: address,
      });
      return res;
    };
    const res = await reFetchTokenExpire(f1, fetchRefreshToken);
    if (res.data.status === 'success') {
      return true;
    }
  } catch (err) {
    //TODO: Also add snackbar here
    return false;
  }
};

/*
Start NFT Publish Process For Users Deploying Contract
*/

export const startpublishingCollab_ForUserDeploysContract = async (
  collabId,
) => {
  try {
    const f1 = async () => {
      const res = await axios.post(
        `${BASE_URL}/api/v1/collab/nftpublishForUserDeploysContract`,
        {
          collabId,
        },
      );
      return res;
    };

    const res = await reFetchTokenExpire(f1, fetchRefreshToken);
    if (res.data.status === 'success') {
      return true;
    }
  } catch (err) {
    //TODO: Also add snackbar here
    return false;
  }
};

/*
sendReminder notification To Members For NFTApproval
*/
export const sendReminderToMembersForNFTApproval = async (
  collabId,
  collabMemberId,
) => {
  try {
    const f1 = async () => {
      const res = await axios.post(
        `${BASE_URL}/notification/sendReminderToMembersForNFTApproval`,
        {
          collabId,
          collabMemberId,
        },
      );
      return res;
    };

    const res = await reFetchTokenExpire(f1, fetchRefreshToken);
    if (res.data.status === 'success') {
      return true;
    }
  } catch (err) {
    //TODO: Also add snackbar here
    return false;
  }
};
