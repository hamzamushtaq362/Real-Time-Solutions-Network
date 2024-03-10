import { BASE_URL } from './index';
import axios from 'axios';

export const isPolygonAddress1 = async (contractAddress) => {
  try {
    const URL = `${BASE_URL}/api/v1/community/is-polygon/${contractAddress}`;
    const { data } = await axios.get(URL);

    return data?.data || 'ethereum';
  } catch (error) {
    return 'ethereum';
  }
};
export const fetchContractPriceHistory1 = async (
  contractAddress,
  duration = 30,
  chain = 'ethereum',
) => {
  try {
    const URL = `${BASE_URL}/api/v1/community/pricing-history/${contractAddress}/${duration}/${chain}`;
    const { data } = await axios.get(URL);

    return data?.data || [];
  } catch (error) {
    return [];
  }
};
export const fetchOwnersCountByContract1 = async (
  contractAddress,
  duration = 30,
  chain = 'ethereum',
) => {
  try {
    const URL = `${BASE_URL}/api/v1/community/owners-count/${contractAddress}/${duration}/${chain}`;
    const { data } = await axios.get(URL);

    return data?.data || [];
  } catch (error) {
    return [];
  }
};
export const fetchContractVolumeHistory1 = async (
  contractAddress,
  duration = 30,
  chain = 'ethereum',
) => {
  try {
    const URL = `${BASE_URL}/api/v1/community/volume-history/${contractAddress}/${duration}/${chain}`;
    const { data } = await axios.get(URL);

    return data?.data || [];
  } catch (error) {
    return [];
  }
};

export const fetchAllContracts1 = async (wallet, chain = 'ethereum') => {
  try {
    const URL = `${BASE_URL}/api/v1/community/all-contracts/${wallet}/${chain}`;
    const { data } = await axios.get(URL);

    return data?.data || [];
  } catch (error) {
    return [];
  }
};
export const fetchContractStats1 = async (contract, chain = 'ethereum') => {
  try {
    const URL = `${BASE_URL}/api/v1/community/contract-stats/${contract}/${chain}`;
    const { data } = await axios.get(URL);

    return data?.data || {};
  } catch (error) {
    return {};
  }
};
export const fetchTopTenCollectors1 = async (
  contract,
  limit = 500,
  chain = 'ethereum',
) => {
  try {
    const URL = `${BASE_URL}/api/v1/community/contract-top-10/${contract}/${limit}/${chain}`;
    const { data } = await axios.get(URL);

    return data?.data || {};
  } catch (error) {
    return {};
  }
};
export const fetchAllContractNFTsUsingNFTPORT1 = async (
  contract,
  page = 1,
  pageSize = 50,
  chain = 'ethereum',
) => {
  try {
    if(!contract){
      return {};
    }
    const URL = `${BASE_URL}/api/v1/community/contract-nfts-np/${contract}/${page}/${pageSize}/${chain}`;
    const { data } = await axios.get(URL);

    return data?.data || {};
  } catch (error) {
    return {};
  }
};
export const fetchCollectorDistributionByNFTs1 = async (
  contract,
  tokenId,
  chain = 'ethereum',
) => {
  try {
    const URL = `${BASE_URL}/api/v1/community/collector-distribution/${contract}/${tokenId}/${chain}`;
    const { data } = await axios.get(URL);

    return data?.data || {};
  } catch (error) {
    return {};
  }
};
export const fetchNFTHoldings1 = async (
  contract,
  tokenId,
  chain = 'ethereum',
) => {
  try {
    const URL = `${BASE_URL}/api/v1/community/nft-holdings/${contract}/${tokenId}/${chain}`;
    const { data } = await axios.get(URL);
    return data?.data || [];
  } catch (error) {
    return [];
  }
};
