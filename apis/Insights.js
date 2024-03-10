import axios from 'axios';
import { durations, fetchNFTSalesData } from '~/apis';
import moment from 'moment';
import { getSmallAddress } from '~/utils';
import { BASE_URL, fetchRefreshToken, reFetchTokenExpire } from './index';
import { ethers } from 'ethers';

const errorCode = 404;

const nonInterceptedAxios = axios.create();

// Internal APIs ------------------------

export const addAddresses = async (walletAddress, contractAddress) => {
  try {
    const walletAddres = walletAddress;
    const contractAddres = contractAddress;
    const f1 = async () => {
      const res = await axios.post(`${BASE_URL}/api/v1/insight/addAddresses`, {
        walletAddress: walletAddres,
        contractAddress: contractAddres,
      });
      return res;
    };
    const res = await reFetchTokenExpire(f1, fetchRefreshToken);
    if (res && res.data) {
      return res.data;
    }
  } catch (err) {}
};

export const getAddedAddresses = async () => {
  try {
    const f1 = async () => {
      const res = await axios.get(`${BASE_URL}/api/v1/insight/getAddresses`);
      return res;
    };
    const res = await reFetchTokenExpire(f1, fetchRefreshToken);
    if (res && res.data.status === 'success') {
      return res.data;
    }else {
      return res.data;
    }
  } catch (err) {}
};

export const deleteContractAddress = async (address) => {
  try {
    const contractAddress = address;
    const f1 = async () => {
      const res = await axios.patch(
        `${BASE_URL}/api/v1/insight/deleteContract/${contractAddress}`,
      );
      return res;
    };
    const res = await reFetchTokenExpire(f1, fetchRefreshToken);
    if (res && res.data.status === 'success') {
      return res.data.status;
    }
  } catch (err) {
    return 'fail';
  }
};

export const deleteWalletAddress = async (address) => {
  try {
    const walletAddress = address;
    const f1 = async () => {
      const res = await axios.patch(
        `${BASE_URL}/api/v1/insight/deleteWallet/${walletAddress}`,
      );
      return res;
    };
    const res = await reFetchTokenExpire(f1, fetchRefreshToken);
    if (res && res.data.status === 'success') {
      return res.data.status;
    }
  } catch (err) {
    return 'fail';
  }
};

// External APIs ---------------------

let isAllContractsAlreadyAvailable = {};
export const fetchAllContracts = async (walletAddress) => {
  try {
    if (!walletAddress) {
      return [];
    }
    if (isAllContractsAlreadyAvailable[walletAddress]) {
      return isAllContractsAlreadyAvailable[walletAddress];
    }
    let chains = ['ethereum', 'polygon'];

    for (let i = 0; i < chains.length; i++) {
      const chain = chains[i];

      const URL = `https://api.nftport.xyz/v0/accounts/contracts/${walletAddress}?chain=${chain}&type=owns_contracts`;

      const { data } = await nonInterceptedAxios.get(URL, {
        headers: {
          Authorization: process.env.REACT_APP_NFTPORT_API_KEY,
        },
      });
      if (data.response !== 'OK') {
        return [];
      }

      isAllContractsAlreadyAvailable[walletAddress] = data.contracts;
      if (data.contracts && data.contracts.length) {
        return data.contracts;
      }
    }

    return [];
  } catch (error) {
    return [];
  }
};

export const isPolygonAddress = async (contractAddress) => {
  let chains = { ethereum: 'ethereum', polygon: 'polygon' };
  let isDataAvailable = false;
  let isPolygon = chains.ethereum;
  try {
    let URL = `https://ethereum.rest.mnemonichq.com/contracts/v1beta1/by_address/${contractAddress}`;

    const { data } = await nonInterceptedAxios.get(URL, {
      headers: {
        'X-API-KEY': process.env.REACT_APP_MNEMONIC_API_KEY,
      },
    });

    if (data) {
      isDataAvailable = true;
      isPolygon = chains.ethereum;
    }
  } catch (err) {}

  if (!isDataAvailable) {
    try {
      let URL = `https://polygon.rest.mnemonichq.com/polygon/contracts/v1beta1/by_address/${contractAddress}`;
      const { data } = await nonInterceptedAxios.get(URL, {
        headers: {
          'X-API-KEY': process.env.REACT_APP_MNEMONIC_API_KEY,
        },
      });
      if (data) {
        isPolygon = chains.polygon;
      }
    } catch (error) {}
  }

  return isPolygon;
};


export const fetchOwnersCountByContract = async (
  contractAddress,
  duration = 30,
  chain = 'ethereum',
) => {
  if (!contractAddress) return [];
  try {
    let URL = '';
    if (duration === 1) {
      if (chain === 'polygon') {
        URL = `https://polygon.rest.mnemonichq.com/polygon/collections/v1beta1/owners_count/${contractAddress}?duration=${durations[duration]}&groupByPeriod=GROUP_BY_PERIOD_1_HOUR`;
      } else {
        URL = `https://ethereum.rest.mnemonichq.com/collections/v1beta1/owners_count/${contractAddress}?duration=${durations[duration]}&groupByPeriod=GROUP_BY_PERIOD_1_HOUR`;
      }
    } else {
      if (chain === 'polygon') {
        URL = `https://polygon.rest.mnemonichq.com/polygon/collections/v1beta1/owners_count/${contractAddress}?duration=${durations[duration]}&groupByPeriod=GROUP_BY_PERIOD_1_DAY`;
      } else {
        URL = `https://ethereum.rest.mnemonichq.com/collections/v1beta1/owners_count/${contractAddress}?duration=${durations[duration]}&groupByPeriod=GROUP_BY_PERIOD_1_DAY`;
      }
    }
    const { data } = await nonInterceptedAxios.get(URL, {
      headers: {
        'X-API-KEY': process.env.REACT_APP_MNEMONIC_API_KEY,
      },
    });

    if (data) {
      return data.dataPoints;
    } else {
      return errorCode;
    }
  } catch (err) {}
};

export const fetchTopTenCollectors = async (
  contractAddress,
  limit = 500,
  chain = 'ethereum',
) => {
  if (!contractAddress) return [];
  try {
    const allAddresses = [];
    let URL = '';
    if (chain === 'polygon') {
      URL = `https://polygon.rest.mnemonichq.com/polygon/collections/v1beta1/current_owners/${contractAddress}?limit=${limit}&sortDirection=SORT_DIRECTION_DESC`;
    } else {
      URL = `https://ethereum.rest.mnemonichq.com/collections/v1beta1/current_owners/${contractAddress}?limit=${limit}&sortDirection=SORT_DIRECTION_DESC`;
    }
    const { data } = await nonInterceptedAxios.get(URL, {
      headers: {
        'X-API-KEY': process.env.REACT_APP_MNEMONIC_API_KEY,
      },
    });
    if (data) {
      let newData = data.owner.slice(0, 10);
      let finalData = [];
      for (let i = 0; i < newData.length; i++) {
        allAddresses.push(newData[i].address);
        let address = getSmallAddress(newData[i].address);
        // finalData.push([address, percentage]);
        finalData.push([address, parseInt(newData[i].ownedCount)]);
      }

      return { finalData, allAddresses };
    } else {
      return { finalData: [], allAddresses: [] };
    }
  } catch (err) {}
};

const isCollectorDistributionAlreadyAvailable = {};
export const fetchCollectorDistributionByNFTs = async (
  contractAddress,
  tokenId,
  chain = 'ethereum',
) => {
  if (!contractAddress) return {};
  try {
    if (isCollectorDistributionAlreadyAvailable[tokenId]) {
      return isCollectorDistributionAlreadyAvailable[tokenId];
    }
    let allCollectors = {};
    let uniqueAddress = 0;
    let totalAddress = 0;

    let URL = '';
    if (chain === 'polygon') {
      URL = `https://polygon.rest.mnemonichq.com//polygon/transfers/v1beta1/nft?transferTypes=TRANSFER_TYPE_REGULAR&tokenTypes=TOKEN_TYPE_ERC721&labelsAny=LABEL_SALE&contractAddress=${contractAddress}&tokenId=${tokenId}`;
    } else {
      URL = `https://ethereum.rest.mnemonichq.com//transfers/v1beta1/nft?transferTypes=TRANSFER_TYPE_REGULAR&tokenTypes=TOKEN_TYPE_ERC721&labelsAny=LABEL_SALE&contractAddress=${contractAddress}&tokenId=${tokenId}`;
    }
    const { data } = await nonInterceptedAxios.get(URL, {
      headers: {
        'X-API-KEY': process.env.REACT_APP_MNEMONIC_API_KEY,
      },
    });
    if (data) {
      let allSalesTx = data.nftTransfers;
      for (let i = 0; i < allSalesTx.length; i++) {
        let senderAddress = allSalesTx[i].sender.address;
        let recipientAddress = allSalesTx[i].recipient.address;

        allCollectors[senderAddress] = allCollectors[senderAddress]
          ? allCollectors[senderAddress] + 1
          : 1;

        allCollectors[recipientAddress] = allCollectors[recipientAddress]
          ? allCollectors[recipientAddress] + 1
          : 1;
      }

      for (const key in allCollectors) {
        if (allCollectors[key] === 1) {
          uniqueAddress++;
          totalAddress++;
        }
        if (allCollectors[key] > 1) {
          totalAddress = totalAddress + allCollectors[key] - 1;
        }
      }
      let filteredData = {
        totalCount: totalAddress,
        uniqueCount: uniqueAddress,
      };
      isCollectorDistributionAlreadyAvailable[tokenId] = filteredData;
      return filteredData;
    } else {
      return errorCode;
    }
  } catch (err) {}
};

export const fetchNFTHoldings = async (
  contractAddress,
  tokenId,
  nftName = 'N/A',
  chain = 'ethereum',
) => {
  if (!contractAddress || !tokenId) return [];

  const allSalesData = await fetchNFTSalesData(
    contractAddress,
    tokenId,
    chain,
    true,
  );
  if (!allSalesData.length) {
    return [nftName, 0, 0, 0];
  }
  const URL = `https://api.nftport.xyz/v0/transactions/nfts/${contractAddress}/${tokenId}?chain=${chain}&type=mint`;
  try {
    const { data } = await nonInterceptedAxios.get(URL, {
      headers: {
        Authorization: process.env.REACT_APP_NFTPORT_API_KEY,
      },
    });
    if (data.response !== 'OK') {
      return [nftName, 0, 0, 0];
    }
    let mintTime = data.transactions[0].transaction_date;

    let flippers = 0;
    let holders = 0;
    let loyal = 0;

    let allSellerAddresses = {};
    let allBuyerAddresses = {};

    function getFlippersAndHolders(data) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].type !== 'cancel_list') {
          allSellerAddresses[data[i].seller_address] = true;
          allBuyerAddresses[data[i].buyer_address] = true;
          let start = moment(mintTime);
          let end = moment(data[i].transaction_date);
          let diff = end.diff(start, 'days');
          mintTime = data[i].transaction_date;

          if (diff > 30) {
            holders++;
          } else if (diff < 30) {
            flippers++;
          } else {
            loyal++;
          }
        }
      }
    }

    getFlippersAndHolders(allSalesData.reverse());

    function getLoyalHolderscount() {
      for (const key in allBuyerAddresses) {
        if (!allSellerAddresses[key]) {
          loyal++;
        }
      }
    }
    getLoyalHolderscount();
    return [nftName, flippers, holders, loyal];
  } catch (error) {}
};

// Wallet Data

export const walletData = async (walletAddress) => {
  // 0x29429b21c174a7f28c3b0bd7adf7e80850b4698e
  if (!walletAddress) return [];
  try {
    if (!walletAddress) return [];
    const URL = `https://api.etherscan.io/api?module=account&action=txlist&address=${walletAddress}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${process.env.REACT_APP_ETHERSCAN_API_KEY}`;
    const { data } = await nonInterceptedAxios.get(URL);

    if (data.message !== 'OK') {
      return [];
    }

    let allTx = data.result;
    let finalArray = [];

    for (let i = 0; i < allTx.length; i++) {
      let tx = allTx[i];
      if (tx.to === walletAddress) {
        const ethValue = ethers.utils.formatEther(tx.value);
        const shortAddress = getSmallAddress(tx.from);
        finalArray.push([shortAddress, ethValue]);
      }
    }
    return finalArray;
  } catch (error) {
    return [];
  }
};
