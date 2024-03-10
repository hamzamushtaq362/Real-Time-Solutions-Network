import { ethers } from 'ethers';
import axios from 'axios';
import config from '~/config';

const { BASE_URL } = config;

export const metamaskLogin = (referralCode,generateSnackbar, setUser) => {
  if (!window.ethereum || !window.ethereum.isMetaMask) return Promise.resolve();

  const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
  const signer = provider.getSigner();

  return window.ethereum.request({
    method: 'wallet_switchEthereumChain',
    params: [
      {
        chainId: '0x1',
      },
    ],
  }).then(() => {
    return window.ethereum.request({ method: 'eth_requestAccounts' });
  }).then(() => {
    return signer.getAddress();
  }).then(async (address) => {
    const lopa = await provider.lookupAddress(address);
    localStorage.setItem('name', JSON.stringify(lopa));
    return axios.get(`${BASE_URL}/auth?address=${address}`);
  }).then(async (res) => {
    const nonce = res.data;
    const message = `Please sign this message to login to RTSN ${nonce}`;
    generateSnackbar("Sign the message to continue", 'info')
    const signature = await signer.signMessage(message);
    localStorage.setItem('sig', JSON.stringify(signature));

    if (signature) {
      return axios.post(`${BASE_URL}/auth/verify`, {
        message,
        signature,
        address: await signer.getAddress(),
        referralCode,
      });
    }
  }).then((res) => {
    localStorage.setItem('injected', 'web3');
    localStorage.setItem('addresss', JSON.stringify(res.data.addresses));
    setUser(res.data);
    return res.data;
  }).catch((err) => {
    console.error(err);
    throw err;
  });
};
