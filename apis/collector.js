import { BASE_URL } from './index';
import axios from 'axios';

export const getEnsName = async (walletAddress) => {
  try {
    const URL = `${BASE_URL}/api/v1/collector/get-ens-name/${walletAddress}`;
    const { data } = await axios.get(URL);
    return data?.name || '';
  } catch (error) {
    return '';
  }
};

export const getCollectionsByWallet = async (walletAddress) => {
  try {
    const URL = `${BASE_URL}/api/v1/collector/get-collections/${walletAddress}`;
    const { data } = await axios.get(URL);
    return data?.data || [];
  } catch (error) {
    return [];
  }
};

export const getCollectorNFTs = async (walletAddress) => {
  const defaultData = { ethereumNfts: [], polygonNfts: [] };
  try {
    const URL = `${BASE_URL}/api/v1/collector/get-nfts/${walletAddress}`;
    const { data } = await axios.get(URL);
    return data?.data || defaultData;
  } catch (error) {
    return defaultData;
  }
};

export const getCollectorCreatedNFTs = async (walletAddress) => {
  const defaultData = { collections: [], nfts: [] };
  try {
    const URL = `${BASE_URL}/api/v1/collector/get-created-nfts/${walletAddress}`;
    const { data } = await axios.get(URL);
    return data?.data || defaultData;
  } catch (error) {
    return defaultData;
  }
};
export const getCollectorNftsCount = async (walletAddress) => {
  const defaultData = 0;
  try {
    const URL = `${BASE_URL}/api/v1/collector/get-nfts-count/${walletAddress}`;
    const { data } = await axios.get(URL);
    return data?.data || defaultData;
  } catch (error) {
    return defaultData;
  }
};
export const getCollectorNftsMnemonic = async (walletAddress,offset=0) => {
  const defaultData = [];
  try {
    const URL = `${BASE_URL}/api/v1/collector/get_collector_nfts/${walletAddress}?offset=${offset}`;
    const { data } = await axios.get(URL);
    return data?.data || defaultData;
  } catch (error) {
    return defaultData;
  }
};
export const getCollectorOwnedCollections = async (walletAddress,offset=0) => {
  const defaultData = [];
  try {
    const URL = `${BASE_URL}/api/v1/collector/get_collector_collections/${walletAddress}?offset=${offset}`;
    const { data } = await axios.get(URL);
    return data?.data || defaultData;
  } catch (error) {
    return defaultData;
  }
};
