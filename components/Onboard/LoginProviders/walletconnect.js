import WalletConnectProvider from '@walletconnect/web3-provider';
import { providers } from 'ethers';
import config from '~/config';
import axios from 'axios';

const { BASE_URL } = config;

export const walletConnectLogin = (referralCode, generateSnackbar, setUser) => {
  const walletConnectProvider = new WalletConnectProvider({
    infuraId: process.env.REACT_APP_WALLET_CONNECT_INFURA_ID, // Required
    // qrcode: true
  });
  const provider = new providers.Web3Provider(walletConnectProvider);
  const signer = provider.getSigner();

  return walletConnectProvider.enable().then(() => {
    return signer.getAddress();
  }).then((address) => {
    return axios.get(`${BASE_URL}/auth?address=${address}`);
  }).then(async (res) => {
    const nonce = res.data;
    const message = `Please sign this message to login to RTSN ${nonce}`;
    generateSnackbar('Sign the message to continue', 'info');
    const signature = await signer.signMessage(message);

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
