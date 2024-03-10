import { ethers } from 'ethers';
import axios from 'axios';
import config from '../config';

export const BASE_URL = config.BASE_URL;
export const APP_URL = config.APP_URL;
export * from './user';
export * from './collab';
export * from './NFTApi';
export * from './nftPublishApiCalls';
export * from './error';
export * from './Insights';
export * from './curation';
export * from './collector';
export * from './community';
export * from './collective';
export * from './inbox';
export * from './launchpad';
export * from './mission';
export * from './discordApi';
export * from './twitterApi';
export * from './badge';
export * from './collabEvent';
export * from './follow';
export * from './collabTemplate';

if (typeof window !== 'undefined') {
  axios.interceptors.request.use(
    function (config) {
      const authToken = JSON.parse(localStorage.getItem('auth'));
      if (authToken) {
        config.headers['x-auth-token'] = `Bearer ${authToken.accessToken}`;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    },
  );
}

export const getNounce = async (address) => {
  try {
    const res = await axios.get(`${BASE_URL}/auth?address=${address}`);
    return res;
  } catch (err) {}
};

export const authenticate = async (navigate, referralCode) => {
  window.ethereum.request({ method: 'eth_requestAccounts' }).then(async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const numen = await signer.getAddress();
    const lopa = await provider.lookupAddress(numen);
    localStorage.setItem('name', JSON.stringify(lopa));

    let res = '';
    try {
      res = await axios.get(`${BASE_URL}/auth?address=${numen}`);
    } catch (err) {}

    const nonce = res.data;
    const message = `I'm signing my one time nonce:${nonce}`;
    const signature = await signer.signMessage(message);
    localStorage.setItem('sig', JSON.stringify(signature));
    if (signature) {
      axios
        .post(`${BASE_URL}/auth/verify`, {
          message,
          signature,
          address: await signer.getAddress(),
          referralCode,
        })
        .then((res) => {
          localStorage.setItem('auth', JSON.stringify(res.data));
          localStorage.setItem('addresss', JSON.stringify(res.data.addresses));
          navigate('/dashboard');

          return res;
        })
        .catch(() => {});
    }
  });
};

export const getWallets = async () => {
  const res = await axios.get(`${BASE_URL}/user/address`);
  return res.data;
};

// export const removeWallet = async (address) => {
//   try {
//     const res = await axios.post(`${BASE_URL}/user/address/remove`, {
//       address,
//     });
//     localStorage.setItem("addresss", res.data);

//
//   } catch (err) {
//
//   }
// };

export const addWallet = async (setWallets, setDropOpen) => {
  window.ethereum
    .request({ method: 'eth_requestAccounts' })
    .then(async (result) => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const message = `Add wallet address to user account`;
      const signature = await signer.signMessage(message);
      let address = JSON.parse(localStorage.getItem('addresss'));
      if (!address) {
        address = [];
      }
      if (address.includes(result[0])) {
        alert('Wallet already added');
        return;
      }
      address.push(result[0]);
      setWallets(address);
      setDropOpen(false);
      localStorage.setItem('addresss', JSON.stringify(address));
      if (signature) {
        axios
          .post(`${BASE_URL}/user/address/add`, {
            message,
            signature,
          })
          .then(() => {})
          .catch(() => {});
      }
    });
};

export const addNewWallet = async (setWallets, OpenSuccessModal) => {
  try {
    const res = await window.ethereum.request({
      method: 'wallet_requestPermissions',
      params: [{ eth_accounts: {} }],
    });

    if (res[0].caveats[0].value.length >= 2) {
      alert('Please select only one wallet');
      return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const message = 'Add wallet address to user account';
    const signature = await signer.signMessage(message);

    const signedAddress = ethers.utils.verifyMessage(message, signature);

    const wallets = await axios.post(`${BASE_URL}/api/v1/wallets`, {
      walletAddress: signedAddress,
      type: 'metamask',
    });

    if (wallets.data.status === 'success') {
      const walletArray = wallets.data.data.wallets;

      if (setWallets) {
        setWallets(walletArray);
      }

      if (OpenSuccessModal) {
        OpenSuccessModal();
      }
      // return last value of walletArray
      return walletArray[walletArray.length - 1];
    }
  } catch (err) {}
};

export const getNFTData = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/nft/user`);
    return res;
  } catch (err) {}
};

export const getNFTs = async () => {
  const res = await axios.get(`${BASE_URL}/nft/user`);
  return res.data;
};

export const fetchRefreshToken = async () => {
  try {
    const auth = JSON.parse(localStorage.getItem('auth'));
    const res = await axios({
      url: `${BASE_URL}/auth/refresh`,
      method: 'POST',
      data: {
        refreshToken: `${auth.refreshToken}`,
      },
    });

    localStorage.setItem('auth', JSON.stringify(res.data));
    return res;
  } catch (err) {
    localStorage.clear();
    window.location.replace('/?signup=true');
  }
};
export const getAggregateValues = async () => {
  try {
    const res = await axios({
      url: `${BASE_URL}/nft/user/trade/aggregate`,
      method: 'GET',
    });

    if (res.data === 'Token has expired') {
      const token = await fetchRefreshToken();
      if (token && token.status === 200) {
        const res = await axios({
          url: `${BASE_URL}/nft/user/trade/aggregate`,
          method: 'GET',
        });
        return res;
      }
    }
    return res;
  } catch (err) {}
};

// 3.] custom funk for fetching refresh token for every api
export const reFetchTokenExpire = async (f1, f2) => {
  const res = await f1();
  if (res.data === 'Token has expired') {
    const token = await f2();
    if (token && token.status === 200) {
      return f1();
    }
  }
  return res;
};

export const userLogout = async () => {
  try {
    const token = JSON.parse(localStorage.getItem('auth'));
    const f1 = () => {
      const res = axios.post(`${BASE_URL}/auth/logout`, {
        refreshToken: token.refreshToken,
      });
      return res;
    };
    const res = await reFetchTokenExpire(f1, fetchRefreshToken);
    if (res) {
      return res;
    }
  } catch (err) {}
};

export const addWalletWithoutSigning = async (address) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/user/address/add/test?address=${address}`,
    );
    if (res.data === 'Token has expired') {
      const token = await fetchRefreshToken();
      if (token && token.status === 200) {
        const res = await axios.get(
          `${BASE_URL}/user/address/add/test?address=${address}`,
        );
        if (res.data) {
          localStorage.setItem('addresss', JSON.stringify(res.data.addresses));
          alert('wallet added');
        }
        return res;
      }
    }
    localStorage.setItem('addresss', JSON.stringify(res.data.addresses));

    return res;
  } catch (err) {}
};

export const removeWallet = async (removeWalletAddress) => {
  const res = await axios.post(`${BASE_URL}/user/address/remove`, {
    address: removeWalletAddress,
  });

  if (res.data === 'Token has expired') {
    const token = await fetchRefreshToken();
    if (token && token.status === 200) {
      const res = await axios.post(`${BASE_URL}/user/address/remove`, {
        address: removeWalletAddress,
      });
      localStorage.setItem('addresss', JSON.stringify(res.data.addresses));

      // alert("wallet address removed");
      return res;
    }
  }
  localStorage.setItem('addresss', JSON.stringify(res.data.addresses));
  // alert("wallet address removed");
  return res;
};

export const loginWithMagicWallet = async (
  Authorisation,
  referralCode,
  email,
) => {
  try {
    let requestUrl = `${BASE_URL}/auth/login/magic-link`;
    if (referralCode) {
      requestUrl += `?referralCode=${referralCode}`;
    }
    const res = await axios.post(
      requestUrl,
      {
        email,
      },
      {
        headers: {
          Authorisation: `Bearer ${Authorisation}`,
        },
      },
    );
    return res.data;
  } catch (err) {
    return err;
  }
};
export const loginWithMagicWalletSocial = async (
  Authorisation,
  referralCode,
  email,
) => {
  try {
    let requestUrl = `${BASE_URL}/auth/login/magic-link/social`;
    if (referralCode) {
      requestUrl += `?referralCode=${referralCode}`;
    }
    const res = await axios.post(
      requestUrl,
      {
        email,
      },
      {
        headers: {
          Authorisation: `Bearer ${Authorisation}`,
        },
      },
    );
    return res.data;
  } catch (err) {
    return err;
  }
};
export const checkIsEmailValid = async (Authorisation, email) => {
  try {
    let requestUrl = `${BASE_URL}/auth/valid-email`;

    const res = await axios.post(
      requestUrl,
      {
        email,
      },
      {
        headers: {
          Authorisation: `Bearer ${Authorisation}`,
        },
      },
    );
    return res?.data?.status === 'success';
  } catch (err) {
    return err;
  }
};

export const getAllCreators = async () => {
  try {
    const f1 = async () => {
      return await axios.get(`${BASE_URL}/creator`, {});
    };
    const res = await reFetchTokenExpire(f1, fetchRefreshToken);
    if (res.status === 200) {
      return res.data;
    }
  } catch (err) {}
};

export const getUserDetails = async () => {
  try {
    const f1 = async () => {
      const res = await axios.get(`${BASE_URL}/user`);
      return res;
    };

    const res = await reFetchTokenExpire(f1, fetchRefreshToken);

    if (res.data.status === 'success') {
      return res.data;
    }
  } catch (err) {}
};

export const getUserDetailsByNickname = async (username) => {
  try {
    const f1 = async () => {
      return await axios.get(
        `${config.BASE_URL}/user/creatorDetails/${username}`,
      );
    };
    const res = await reFetchTokenExpire(f1, fetchRefreshToken);
    if (res.data.status === 'success') {
      return res.data.data;
    }
  } catch (err) {}
};

export const finalizeCollaboration = async (id) => {
  try {
    const f1 = async () => {
      const res = await axios.post(`${BASE_URL}/api/v1/collab/finalize`, {
        id,
      });
      return res;
    };

    const res = await reFetchTokenExpire(f1, fetchRefreshToken);

    if (res.data.status === 'success') {
      return res.data;
    }
  } catch (err) {}
};

export const getCreatorVerifyDetails = async (id) => {
  if (!id) {
    return;
  }
  try {
    const f1 = async () => {
      const res = await axios.post(`${BASE_URL}/verification/get`, {
        id,
      });
      return res;
    };

    const res = await reFetchTokenExpire(f1, fetchRefreshToken);
    if (res.data.status) {
      return res.data.data;
    } else {
      return [];
    }
  } catch (err) {}
};

export const updateVerificationDetails = async (
  id,
  skills,
  creatorVerified,
) => {
  if (!id) {
    return;
  }
  try {
    const f1 = async () => {
      const res = await axios.post(`${BASE_URL}/verification/skills/update`, {
        id,
        skills,
        creatorVerified,
      });
      return res;
    };

    const res = await reFetchTokenExpire(f1, fetchRefreshToken);
    if (res.data.status) {
      return res.data.data;
    } else {
      return [];
    }
  } catch (err) {}
};

export const uploadFile = async (file, onUploadProgress) => {
  if (!file) {
    return;
  }
  try {
    const f1 = async () => {
      let formData = new FormData();
      formData.append('image', file);
      const res = await axios.post(
        `${BASE_URL}/api/v1/collab/uploadImage`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress,
        },
      );
      return res;
    };
    const res = await reFetchTokenExpire(f1, fetchRefreshToken);

    if (res) {
      return res;
    } else {
      return [];
    }
  } catch (err) {
    //
  }
};
export const uploadMultipleFiles = async (files, onUploadProgress) => {
  if (!files || !files.length) {
    return;
  }
  try {
    const f1 = async () => {
      let formData = new FormData();
      files.forEach((file) => {
        formData.append('media', file);
      });
      const res = await axios.post(
        `${BASE_URL}/api/v1/collab/uploadFiles`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress,
        },
      );
      return res.data;
    };
    const res = await reFetchTokenExpire(f1, fetchRefreshToken);
    if (res) {
      return res;
    } else {
      return [];
    }
  } catch (err) {}
};
export const onboardPersonalize = async (data) => {
  try {
    const f1 = async () => {
      const res = await axios.post(
        `${BASE_URL}/user/onboard/personalize`,
        data,
      );
      return res;
    };
    return await reFetchTokenExpire(f1, fetchRefreshToken);
  } catch (err) {}
};

export const onboardDiscover = async (skills) => {
  try {
    const f1 = async () => {
      const res = await axios.post(`${BASE_URL}/user/onboard/discover`, {
        skills,
      });
      return res;
    };
    const res = await reFetchTokenExpire(f1, fetchRefreshToken);
    return res;
  } catch (err) {}
};

export const onboardInterestedNFTs = async (interested) => {
  try {
    const f1 = async () => {
      const res = await axios.post(`${BASE_URL}/user/onboard/interested`, {
        interested,
      });
      return res;
    };
    const res = await reFetchTokenExpire(f1, fetchRefreshToken);
    return res;
  } catch (err) {}
};

export const onboardMetaverseWorlds = async (metaverseWorlds) => {
  try {
    const f1 = async () => {
      const res = await axios.post(`${BASE_URL}/user/onboard/metaverseworlds`, {
        metaverseWorlds,
      });
      return res;
    };
    const res = await reFetchTokenExpire(f1, fetchRefreshToken);
    return res;
  } catch (err) {}
};

export const onboardMarketplace = async (marketPlaceIds) => {
  try {
    const f1 = async () => {
      const res = await axios.post(`${BASE_URL}/user/onboard/marketplace`, {
        marketPlaceIds,
      });
      return res;
    };
    const res = await reFetchTokenExpire(f1, fetchRefreshToken);
    return res;
  } catch (err) {}
};

export const onBoardSkipStep = async () => {
  try {
    const f1 = async () => {
      const res = await axios.patch(`${BASE_URL}/user/onboard/skip`, {});
      return res;
    };
    const res = await reFetchTokenExpire(f1, fetchRefreshToken);
    return res;
  } catch (err) {}
};

export const checkUniquenessUserName = async (usernameKeyWord) => {
  try {
    const f1 = async () => {
      const res = await axios.post(`${BASE_URL}/user/unique-username`, {
        userInputNickName: usernameKeyWord,
      });
      if (res) return res;
    };
    const res = await reFetchTokenExpire(f1, fetchRefreshToken);
    return res;
  } catch (err) {}
};

export const getSuggestedNFTs = async (limit) => {
  try {
    const f1 = async () => {
      const res = await axios.post(`${BASE_URL}/nft/suggested`, {
        limit,
      });
      return res;
    };
    const res = await reFetchTokenExpire(f1, fetchRefreshToken);
    return res;
  } catch (err) {}
};

export const getNFTCollectionData = async (collectionName) => {
  try {
    const f1 = async () => {
      const res = await axios.get(
        `${BASE_URL}/nft/collection/details/${collectionName}`,
      );
      return res;
    };
    const res = await reFetchTokenExpire(f1, fetchRefreshToken);
    return res;
  } catch (err) {}
};
export const getMarketPlaces = async () => {
  try {
    const res = await axios({
      url: `${BASE_URL}/api/v1/marketplaces`,
      method: 'GET',
    });

    if (res.data === 'Token has expired') {
      const token = await fetchRefreshToken();
      if (token && token.status === 200) {
        const res = await axios({
          url: `${BASE_URL}/api/v1/marketplaces`,
          method: 'GET',
        });
        return res;
      }
    }
    return res;
  } catch (err) {}
};

export const getOwnerOfNft = async (contractAddress) => {
  try {
    // const provider = new ethers.providers.Web3Provider(window.ethereum);

    const provider = new ethers.providers.JsonRpcProvider(
      'https://mainnet.infura.io/v3/3cd774e14cf34ff78167908f8377051c',
    );

    const contractABI = [
      {
        inputs: [],
        name: 'owner',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
        name: 'ownerOf',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        stateMutability: 'view',
        type: 'function',
      },
      { stateMutability: 'payable', type: 'receive' },
    ];

    const contract = new ethers.Contract(
      contractAddress,
      contractABI,
      provider,
    );

    const owner = await contract.owner();
    return owner;
  } catch (error) {
    console.error(error);
  }
};
