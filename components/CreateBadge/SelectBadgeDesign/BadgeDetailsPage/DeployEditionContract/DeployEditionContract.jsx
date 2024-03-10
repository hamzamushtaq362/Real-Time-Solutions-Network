import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';

import { useMetamask } from '@thirdweb-dev/react';
import { useNotistack } from 'hooks/useNotistack';
import { Grid, useTheme } from '@mui/material';
import { StandingMenMetaverse } from 'assets/png';
import { PrimaryButton } from 'components/Button';
import { ThreeDots } from 'components/ThreeDots';
import { useEffect } from 'react';
import config from '~/config';
import { LeftHeaderComp } from 'components/CollabCreate/LeftHeaderComp';

export const DeployEditionContract = ({
  contractImage,
  contractTitle,
  contractDescription,
  editionContractAddress,
  setEditionContractAddress,
  sdk,
  address,
}) => {
  const { t } = useTranslation();

  const theme = useTheme();
  const generateSnackbar = useNotistack();
  const [loading, setLoading] = useState(false);
  const connectWithMetamask = useMetamask();

  const [currentChainId, setCurrentChainId] = useState();
  const currentEnv = config.currentEnviorement;

  const switchToStandardNetwork = async (environment) => {
    try {
      let chainId, rpcUrls, chainName, blockExplorerUrls;

      if (environment === 'staging') {
        // Polygon Mumbai Testnet configuration
        chainId = '0x13881'; // 80001
        rpcUrls = ['https://rpc-mumbai.maticvigil.com/'];
        chainName = 'Polygon Mumbai Testnet';
        blockExplorerUrls = ['https://mumbai.polygonscan.com/'];
      } else if (environment === 'prod') {
        // Polygon Mainnet configuration
        chainId = '0x89'; // 137
        rpcUrls = ['https://polygon-rpc.com/'];
        chainName = 'Polygon Mainnet';
        blockExplorerUrls = ['https://polygonscan.com/'];
      } else {
        throw new Error('Invalid environment type');
      }

      const res = await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: chainId,
            rpcUrls: rpcUrls,
            chainName: chainName,
            nativeCurrency: {
              name: 'MATIC',
              symbol: 'MATIC',
              decimals: 18,
            },
            blockExplorerUrls: blockExplorerUrls,
          },
        ],
      });

      if (!res) {
        generateSnackbar(`Switching to ${chainName} Rejected and Failed`);
        setLoading(false);
        return false;
      } else {
        return true;
      }
    } catch (error) {
      setLoading(false);
      if (error.message && error.message.length < 40) {
        generateSnackbar(error.message);
      } else {
        generateSnackbar('Connection Failed.. try Again');
      }
    }
  };

  useEffect(() => {
    async function getNetwork() {
      if (window.ethereum) {
        const chainIdHex = await window.ethereum.request({
          method: 'eth_chainId',
        });
        const chainId = parseInt(chainIdHex, 16); // Convert chainId from hexadecimal to decimal
        setCurrentChainId(chainId);
      } else {
      }
    }
    getNetwork();
  }, []);

  useEffect(() => {
    if (window && window.ethereum) {
      window.ethereum.on('chainChanged', (chain) => {
        setCurrentChainId(parseInt(chain, 16));
      });
    }
  }, [currentChainId]);

  const deployEditionContract = async () => {
    try {
      setLoading(true);

      if (!contractTitle || !contractDescription || !contractImage) {
        generateSnackbar('Please fill all the fields');
        setLoading(false);
        return;
      }

      if (currentChainId !== config.NETWORK_CHAIN_ID) {
        generateSnackbar(`Switching to ${config.NETWORK_NAME} ...`);
        const switchRes = await switchToStandardNetwork(currentEnv);

        if (!switchRes) {
          setLoading(false);
          return;
        }
      }

      generateSnackbar('Deploying Edition Contract  ...');
      const contractSelected = 'edition';
      const contractAddress = await sdk.deployer.deployBuiltInContract(
        contractSelected,
        {
          name: contractTitle
            ? contractTitle
            : `Badge Contract :  ${contractSelected}`,
          primary_sale_recipient: address,
          voting_token_address: address,
          description: contractDescription
            ? contractDescription
            : `My awesome ${contractSelected} badge contract`,
          image: contractImage ? contractImage : StandingMenMetaverse,

          recipients: [
            {
              address,
              sharesBps: 100 * 100,
            },
          ],
        },
      );

      setEditionContractAddress(contractAddress);

      setLoading(false);
      generateSnackbar('NFT Contract Deployed ✅');
    } catch (error) {
      setLoading(false);
      if (error.message && error.message.length < 40) {
        generateSnackbar(error.message);
      } else {
        generateSnackbar('Transaction Failed.. try Again');
      }
    }
  };

  const connectAndSwitchToPolygon = async () => {
    try {
      if (currentChainId !== config.NETWORK_CHAIN_ID) {
        await switchToStandardNetwork(currentEnv);
        await connectWithMetamask();
      } else {
        generateSnackbar('Already connected to Polygon Mainnet ');
      }
      generateSnackbar('Connected to Polygon Mainnet ');
    } catch (error) {
      generateSnackbar(`Please switch Your network to ${config.NETWORK_NAME}`);
    }
  };

  return (
    <Grid container mt={5} mb={6}>
      <Grid item lg={2.5} xs={12}>
        <LeftHeaderComp
          headerText={t('Deploy Contract')}
          subheader={t(
            'Deploy Edition Drop contract for ownership of Badge collection',
          )}
        />
      </Grid>
      <Grid item lg={3} xs={12} key={'1212'}>
        {currentChainId !== config.NETWORK_CHAIN_ID && (
          <PrimaryButton
            width="10rem"
            restrictHoverStyles
            onClick={() => {
              connectAndSwitchToPolygon();
            }}
          >
            {t('Setup Metamask')}
          </PrimaryButton>
        )}

        {currentChainId === config.NETWORK_CHAIN_ID && (
          <PrimaryButton
            width="10rem"
            onClick={() => {
              deployEditionContract();
            }}
            restrictHoverStyles
            disabled={editionContractAddress === null ? false : true}
          >
            {editionContractAddress ? (
              'Contract Deployed'
            ) : loading ? (
              <ThreeDots color={theme.palette.background.default} />
            ) : (
              'Deploy'
            )}
          </PrimaryButton>
        )}
      </Grid>
    </Grid>
  );
};
