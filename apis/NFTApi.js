import axios from 'axios';
import { getPercentage } from 'utils/math';
import { BASE_URL, fetchRefreshToken, reFetchTokenExpire } from './index';

const errorCode = 404;

// Trending NFTs API ----------

const nonInterceptedAxios = axios.create();

export const fetchTrendingNFTs = async () => {
  try {
    const f1 = async () => {
      const res = await axios.get(`${BASE_URL}/api/v1/trendingNft`);
      return res;
    };
    const res = await reFetchTokenExpire(f1, fetchRefreshToken);
    if (res && res.data && res.data.data) {
      return res.data.data;
    } else {
      return [];
    }
  } catch (err) {
    return [];
  }
};

// Collections API -----------

export const fetchContractDetails = async (contractAddress) => {
  try {
    const URL = `${BASE_URL}/api/v1/collection/get_contract_details/${contractAddress}`;
    const { data } = await nonInterceptedAxios.get(URL);
    return data?.data || null;
  } catch (err) {
    return null;
  }
};
export const fetchContractDetailsByBackend = async (contractAddress) => {
  try {
    const URL = `${BASE_URL}/api/v1/community/contract-details/${contractAddress}`;
    const { data } = await nonInterceptedAxios.get(URL);
    return data.data;
  } catch (err) {
    return null;
  }
};

export const fetchContractAddressByName = async (name) => {
  try {
    const URL = `https://api.opensea.io/api/v1/collection/${name}`;
    const { data } = await axios.get(URL, {
      transformRequest: (data, headers) => {
        delete headers['x-auth-token'];
      },
      headers: {
        'X-API-KEY': process.env.REACT_APP_OPENSEA_API_KEY,
      },
    });

    if (data) {
      // if(!data.success){
      //   return errorCode;
      // }
      let contractAsset = data.collection.primary_asset_contracts[0];
      return {
        contractAddress: contractAsset.address ? contractAsset.address : '',
        name: contractAsset.name ? contractAsset.name : '',
        type: contractAsset.asset_contract_type
          ? contractAsset.asset_contract_type
          : '',
      };
    } else {
      return errorCode;
    }
  } catch (err) {}
};

export const fetchContractStatsByOpenSea = async (contractAddress) => {
  if (!contractAddress) return {};
  const contractDetails = await fetchContractDetailsByBackend(contractAddress);
  const contractMetadata = {
    name: contractDetails?.collection?.name || contractDetails?.name,
    description:
      contractDetails?.collection?.description || contractDetails?.description,
    image:
      contractDetails?.collection?.featured_image_url ||
      contractDetails?.image_url,
  };
  const collectionSlug = contractDetails?.collection?.slug;
  if (!collectionSlug) return {};
  try {
    const URL = `${BASE_URL}/api/v1/community/contract-stats/${collectionSlug}`;
    const { data } = await axios.get(URL);
    return { stats: data?.data || {}, contractMetadata };
  } catch {
    return {};
  }
};

export const getContractOwnerByOpensea = async (slug) => {
  try {
    if (!slug) return {};
    // const contractDetails = await fetchContractDetailsByBackend(
    //   contractAddress,
    // );
    // const collectionSlug = contractDetails?.collection?.slug;

    const URL = `${BASE_URL}/api/v1/community/collection-details/${slug}`;
    const { data } = await axios.get(URL);
    return data.data.collection.editors;
  } catch (error) {
    return '';
  }
};

export const fetchContractStatsByOpenseaBackend = async (slug) => {
  try {
    const URL = `${BASE_URL}/api/v1/collection/get_contract_stats/${slug}`;
    const { data } = await nonInterceptedAxios.get(URL);

    return data?.data || null;
  } catch (err) {
    return null;
  }
};

export const fetchContractStats = async (contractAddress) => {
  if (!contractAddress) return {};
  const contractDetails = await fetchContractDetails(contractAddress);
  const collectionSlug = contractDetails?.collection?.slug;
  if (!collectionSlug) return {};
  const URL = `https://api.opensea.io/api/v1/collection/${collectionSlug}/stats`;
  try {
    const { data } = await nonInterceptedAxios.get(URL, {
      headers: {
        Authorization: process.env.REACT_APP_OPENSEA_API_KEY,
      },
    });
    let stats = data.stats;

    let FinalData = stats;

    let Volume = parseInt(stats.one_day_volume).toFixed(2);
    let VolumeDifference = parseInt(stats.one_day_change).toFixed(2);
    let percentage = getPercentage(VolumeDifference, Volume);
    let SevenDaysDifference = parseInt(stats.seven_day_change).toFixed(2);
    let isVolumeUp = false;
    if (SevenDaysDifference - percentage > 0) {
      isVolumeUp = true;
    }

    function getSales(todaySales, thirtyDaySales) {
      let isSalesUp = false;
      let everdayAverageSales = parseInt(thirtyDaySales) / 30;

      let difference = everdayAverageSales - todaySales;

      if (difference > 0) {
        isSalesUp = true;
      }

      const percentage = getPercentage(Math.abs(difference), thirtyDaySales);
      return {
        isSalesUp,
        todaySales,
        percentage: percentage.toFixed(2),
        everdayAverageSales: everdayAverageSales.toFixed(2),
        difference: difference.toFixed(2),
        thirtyDaySales: parseInt(thirtyDaySales).toFixed(2),
      };
    }

    const sales = getSales(stats.one_day_sales, stats.thirty_day_sales);

    FinalData['Volume'] = {
      volume: parseInt(Volume),
      percentage: parseInt(VolumeDifference).toFixed(2),
      isVolumeUp,
      SevenDaysDifference: parseInt(SevenDaysDifference).toFixed(2),
      percentageUp: parseInt(percentage).toFixed(2),
    };

    FinalData['Collector'] = {
      collectors: parseInt(stats.num_owners),
    };

    FinalData['Sale'] = {
      sale: parseInt(sales.todaySales),
      percentage: parseInt(sales.percentage),
      isSalesUp: sales.isSalesUp,
      everdayAverageSales: parseInt(sales.everdayAverageSales),
      difference: parseInt(sales.difference),
      thirtyDaySales: parseInt(sales.thirtyDaySales),
    };

    FinalData['fetched'] = true;

    return FinalData;
  } catch (error) {
    return {};
  }
};

// export const fetchAllContractNFTs = async (
//   contractAddress,
//   limit = 20,
//   offset = 0,
// ) => {
//   let finalData = [];
//   const URL = `https://ethereum.rest.mnemonichq.com/tokens/v1beta1/by_contract/${contractAddress}?sortDirection=SORT_DIRECTION_DESC&limit=${limit}&offset=${offset}`;
//   try {
//     const { data } = await nonInterceptedAxios.get(URL, {
//       headers: {
//         'X-API-Key': process.env.REACT_APP_MNEMONIC_API_KEY,
//       },
//     });
//     if (data) {
//       finalData = data.tokens;
//     }
//   } catch (error) {
//   } finally {
//     return finalData;
//   }
// };
export const fetchAllContractNFTs = async (
  contractAddress,
  offset = 0,
  limit = 20,
) => {
  try {
    const URL = `${BASE_URL}/api/v1/collection/get_contract_nfts/${contractAddress}?offset=${offset}&limit=${limit}`;
    const { data } = await nonInterceptedAxios.get(URL);

    return data?.data || null;
  } catch (err) {
    return null;
  }
};

export const fetchAllContractNFTsUsingNFTPORT = async (
  contractAddress,
  page = 1,
  pageSize = 50,
  chain = 'ethereum',
) => {
  if (!contractAddress) return {};
  const URL = `https://api.nftport.xyz/v0/nfts/${contractAddress}?chain=${chain}&page_number=${page}&page_size=${pageSize}&include=metadata`;
  try {
    const { data } = await nonInterceptedAxios.get(URL, {
      headers: {
        Authorization: process.env.REACT_APP_NFTPORT_API_KEY,
      },
    });
    if (data.response !== 'OK') {
      return errorCode;
    }
    return { total: data.total, nfts: data.nfts };
  } catch (error) {}
};

export const durations = {
  1: 'DURATION_1_DAY',
  7: 'DURATION_7_DAYS',
  30: 'DURATION_30_DAYS',
  365: 'DURATION_365_DAYS',
};

export const fetchContractPriceHistory = async (
  contractAddress,
  duration = 30,
  chain = 'ethereum',
) => {
  let URL = '';

  if (duration === 1) {
    if (chain == 'polygon') {
      URL = `https://polygon.rest.mnemonichq.com/polygon/pricing/v1beta1/prices/by_contract/${contractAddress}?duration=${durations[duration]}&groupByPeriod=GROUP_BY_PERIOD_1_HOUR`;
    } else {
      URL = `https://ethereum.rest.mnemonichq.com/pricing/v1beta1/prices/by_contract/${contractAddress}?duration=${durations[duration]}&groupByPeriod=GROUP_BY_PERIOD_1_HOUR`;
    }
  } else {
    if (chain == 'polygon') {
      URL = `https://polygon.rest.mnemonichq.com/polygon/pricing/v1beta1/prices/by_contract/${contractAddress}?duration=${durations[duration]}&groupByPeriod=GROUP_BY_PERIOD_1_DAY`;
    } else {
      URL = `https://ethereum.rest.mnemonichq.com/pricing/v1beta1/prices/by_contract/${contractAddress}?duration=${durations[duration]}&groupByPeriod=GROUP_BY_PERIOD_1_DAY`;
    }
  }
  try {
    const { data } = await nonInterceptedAxios.get(URL, {
      headers: {
        'X-API-Key': process.env.REACT_APP_MNEMONIC_API_KEY,
      },
    });
    if (!data) {
      return errorCode;
    }
    return data.dataPoints;
  } catch (error) {}
};

export const fetchContractVolumeHistory = async (
  contractAddress,
  duration = 30,
  chain = 'ethereum',
) => {
  let URL = '';

  if (duration === 1) {
    if (chain == 'polygon') {
      URL = `https://polygon.rest.mnemonichq.com/polygon/pricing/v1beta1/volumes/by_contract/${contractAddress}?duration=${durations[duration]}&groupByPeriod=GROUP_BY_PERIOD_1_HOUR`;
    } else {
      URL = `https://ethereum.rest.mnemonichq.com/pricing/v1beta1/volumes/by_contract/${contractAddress}?duration=${durations[duration]}&groupByPeriod=GROUP_BY_PERIOD_1_HOUR`;
    }
  } else {
    if (chain == 'polygon') {
      URL = `https://polygon.rest.mnemonichq.com/polygon/pricing/v1beta1/volumes/by_contract/${contractAddress}?duration=${durations[duration]}&groupByPeriod=GROUP_BY_PERIOD_1_DAY`;
    } else {
      URL = `https://ethereum.rest.mnemonichq.com/pricing/v1beta1/volumes/by_contract/${contractAddress}?duration=${durations[duration]}&groupByPeriod=GROUP_BY_PERIOD_1_DAY`;
    }
  }
  try {
    const { data } = await nonInterceptedAxios.get(URL, {
      headers: {
        'X-API-Key': process.env.REACT_APP_MNEMONIC_API_KEY,
      },
    });
    if (!data) {
      return errorCode;
    }
    return data.dataPoints;
  } catch (error) {}
};

// NFT Details APIs

export const fetchPerticularNFTDetails = async (contractAddress, tokenId) => {
  try {
    const URL = `${BASE_URL}/api/v1/collection/get_nfts_tx/${contractAddress}/${tokenId}`;
    const { data } = await nonInterceptedAxios.get(URL);
    return data?.data || null;
  } catch (err) {
    return null;
  }
};

export const fetchNFTSalesData = async (
  contractAddress,
  tokenId,
  chain = 'ethereum',
  returnAllData = false,
) => {
  try {
    const URL = `${BASE_URL}/api/v1/collection/get_nft_sales/${contractAddress}/${tokenId}?chain=${chain}&returnAllData=${returnAllData}`;
    const { data } = await nonInterceptedAxios.get(URL);

    return data?.data || null;
  } catch (err) {
    return null;
  }
};

export const fetchPerticularNFTTransactions = async (
  contractAddress,
  tokenId,
  chain = 'ethereum',
  type = 'all',
) => {
  const URL = `https://api.nftport.xyz/v0/transactions/nfts/${contractAddress}/${tokenId}`;
  try {
    const { data } = await nonInterceptedAxios.get(URL, {
      params: {
        chain: chain,
        type: type,
      },

      headers: {
        Authorization: process.env.REACT_APP_NFTPORT_API_KEY,
      },
    });
    if (data.response !== 'OK') {
      return errorCode;
    }

    return data.transactions;
  } catch (error) {
    //
  }
};

export const getNftOwnersByMnemonic = async (
  contractAddress,
  tokenId,
  chain = 'ethereum',
) => {
  try {
    const URL = `${BASE_URL}/api/v1/collection/get_nft_owners/${contractAddress}/${tokenId}?chain=${chain}`;
    const { data } = await nonInterceptedAxios.get(URL);

    return data?.data || null;
  } catch (err) {
    return null;
  }
};

const fetchAssetEvents = async (eventType, contractAddress, tokenId) => {
  try {
    const URL = `${BASE_URL}/api/v1/collection/get_nft_events/${contractAddress}/${tokenId}?event=${eventType}`;
    const { data } = await nonInterceptedAxios.get(URL);

    return data?.data || null;
  } catch (err) {
    return null;
  }
};

export const getNftEvents = async (contractAddress, tokenId) => {
  const finalData = {
    all: [],
    created: [],
    successful: [],
    transfer: [],
    cancelled: [],
  };
  try {
    const eventTypes = ['created', 'successful', 'transfer', 'cancelled'];
    const allEvents = await Promise.all([
      fetchAssetEvents(eventTypes[0], contractAddress, tokenId),
      fetchAssetEvents(eventTypes[1], contractAddress, tokenId),
      fetchAssetEvents(eventTypes[2], contractAddress, tokenId),
      fetchAssetEvents(eventTypes[3], contractAddress, tokenId),
    ]);
    const combinedEvents = allEvents.flat();

    const sortedEvents = combinedEvents.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB - dateA;
    });
    const sortedSalesEvents = allEvents[1].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA - dateB;
    });

    finalData.all = sortedEvents || [];
    finalData.created = allEvents[0] || [];
    finalData.successful = sortedSalesEvents || [];
    finalData.transfer = allEvents[2] || [];
    finalData.cancelled = allEvents[3] || [];
  } catch (error) {}
  return finalData;
};

export const getNftTraitsRarity = async (contractAddress, tokenId) => {
  try {
    const URL = `${BASE_URL}/api/v1/collection/get_nft_traits_rarity/${contractAddress}/${tokenId}`;
    const { data } = await nonInterceptedAxios.get(URL);
    return data?.data || null;
  } catch (err) {
    return null;
  }
};

export const getCollectorGrowth = async (contractAddress, duration) => {
  try {
    const URL = `${BASE_URL}/api/v1/collection/get_collector_growth/${contractAddress}?duration=${duration}`;
    const { data } = await nonInterceptedAxios.get(URL);
    return data?.data || null;
  } catch (err) {
    return null;
  }
};
