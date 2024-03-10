import axios from 'axios';
import { nftsFetchStart, nftsFetchSuccess, nftsFetchError } from './nftsSlice';
import {
  nftsPerFetchStart,
  nftsPerFetchSuccess,
  nftsPerFetchError,
} from './performanceSlice';
import { nftsDataStart, nftsDataSuccess, nftsDataError } from './nftsDataSlice';
import {
  collectionsFetchStart,
  collectionsFetchSuccess,
  collectionsFetchError,
} from './groupCollectionsSlice';
import { userFetchStart, userFetchSuccess, userFetchError } from './userSlice';
import {
  walletAddStart,
  walletAddSuccess,
  walletAddError,
  walletRemoveStart,
  walletRemoveError,
  walletRemoveSuccess,
} from './walletSlice';
import { ethers } from 'ethers';
import config from '../config';
import {
  singleCollectionFetchError,
  singleCollectionFetchStart,
  singleCollectionFetchSuccess,
} from './singleCollectionSlice';

const BASE_URL = config.BASE_URL;

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
    //
  }
};

// 3.] custom funk for fetching refresh token for every api
export const reFetchTokenExpire = async (f1, f2) => {
  const res = await f1();
  if (res.data === 'Token has expired') {
    const token = await f2();
    if (token && token.status === 200) {
      const res = f1();
      return res;
    }
  } else {
    return res;
  }
};

export const getPerformanceNfts = async (
  dispatch,
  offset = 0,
  showmore = false,
  nfts,
) => {
  dispatch(nftsPerFetchStart());
  try {
    const f1 = async () => {
      const res = await axios.get(
        `${BASE_URL}/nft/user/paginated?limit=${6}&offset=${offset}`,
      );
      return res;
    };
    const res = await reFetchTokenExpire(f1, fetchRefreshToken);
    if (res.data) {
      if (showmore) {
        dispatch(nftsPerFetchSuccess([...nfts, ...res.data]));
      } else {
        dispatch(nftsPerFetchSuccess(res.data));
      }
    }
  } catch (err) {
    dispatch(nftsPerFetchError());
  }
};
export const getNfts = async (dispatch, offset = 0, showmore = false, nfts) => {
  dispatch(nftsFetchStart());
  try {
    const f1 = async () => {
      const res = await axios.get(
        `${BASE_URL}/nft/user/paginated?limit=${12}&offset=${offset}`,
      );
      return res;
    };
    const res = await reFetchTokenExpire(f1, fetchRefreshToken);
    if (res.data) {
      if (showmore) {
        dispatch(nftsFetchSuccess([...nfts, ...res.data]));
      } else {
        dispatch(nftsFetchSuccess(res.data));
      }
    }
  } catch (err) {
    dispatch(nftsFetchError());
  }
};

//  5.] fetch dashboard data
export const getDashboradData = async (dispatch) => {
  dispatch(nftsDataStart());
  try {
    const f1 = async () => {
      const res = await axios({
        url: `${BASE_URL}/nft/user/trade/aggregate`,
        method: 'GET',
      });
      return res;
    };
    const res = await reFetchTokenExpire(f1, fetchRefreshToken);
    if (res.data) {
      dispatch(nftsDataSuccess(res.data));
    }

    return res;
  } catch (err) {
    dispatch(nftsDataError());
  }
};

//  6.] authenticate user
export const authenticateUser = async (dispatch, navigate) => {
  dispatch(userFetchStart());

  try {
    await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    let nonce = await axios.get(
      `${BASE_URL}/auth?address=${await signer.getAddress()}`,
    );
    const message = `I'm signing my one time nonce:${nonce.data}`;
    const signature = await signer.signMessage(message);
    if (signature) {
      const res = await axios.post(`${BASE_URL}/auth/verify`, {
        message,
        signature,
        address: await signer.getAddress(),
      });
      localStorage.setItem('auth', JSON.stringify(res.data));
      localStorage.setItem('addresss', JSON.stringify(res.data.addresses));
      dispatch(userFetchSuccess(res.data));
      navigate('/dashboard');

      return res;
    }
  } catch (err) {
    dispatch(userFetchError);
  }
};

//  7.] add wallet address
export const addWalletAddress = async (dispatch, address) => {
  dispatch(walletAddStart());
  try {
    const f1 = async () => {
      const res = await axios.get(
        `${BASE_URL}/user/address/add/test?address=${address}`,
      );
      return res;
    };

    const res = await reFetchTokenExpire(f1, fetchRefreshToken);
    localStorage.setItem('addresss', JSON.stringify(res.data.addresses));
    await getNfts(dispatch);
    await getPerformanceNfts(dispatch);
    await getDashboradData(dispatch);
    dispatch(walletAddSuccess(res.data.addresses));

    return res;
  } catch (err) {
    dispatch(walletAddError());
  }
};

//  8.] remove wallet address
export const removeWalletAddress = async (dispatch, address) => {
  dispatch(walletRemoveStart());
  try {
    const f1 = async () => {
      const res = await axios.post(`${BASE_URL}/user/address/remove`, {
        address,
      });
      return res;
    };
    const res = await reFetchTokenExpire(f1, fetchRefreshToken);
    localStorage.setItem('addresss', JSON.stringify(res.data.addresses));
    await getNfts(dispatch);
    await getPerformanceNfts(dispatch);
    await getDashboradData(dispatch);
    dispatch(walletRemoveSuccess(res.data.addresses));

    return res;
  } catch (err) {
    dispatch(walletRemoveError());
  }
};

// fetch groupCollections
export const fetchGroupCollection = async (
  dispatch,
  offset = 0,
  collections,
  showmore = false,
) => {
  dispatch(collectionsFetchStart());
  try {
    const f1 = async () => {
      const res = await axios.get(
        `${BASE_URL}/nft/groupCollectionInsights?limit=10&offset=${offset}`,
      );
      return res;
    };
    const res = await reFetchTokenExpire(f1, fetchRefreshToken);

    if (res.data) {
      if (showmore) {
        dispatch(collectionsFetchSuccess([...collections, ...res.data]));
      } else {
        dispatch(collectionsFetchSuccess(res.data));
      }
    }

    return res;
  } catch (err) {
    dispatch(collectionsFetchError());
  }
};

// fetch groupCollections
export const fetchSingleCollection = async (dispatch, id, offset = 0) => {
  dispatch(singleCollectionFetchStart());
  try {
    const f1 = async () => {
      const res = await axios.get(
        `${BASE_URL}/nft/singleCollectionData/${id}?limit=10&offset=${offset}`,
      );
      return res;
    };
    const res = await reFetchTokenExpire(f1, fetchRefreshToken);

    dispatch(singleCollectionFetchSuccess(res.data));

    return res;
  } catch (err) {
    dispatch(singleCollectionFetchError());
  }
};
