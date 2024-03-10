import { ThirdwebProvider } from '@thirdweb-dev/react';
import { useEffect, useState } from 'react';
import config from '~/config';

export const ThirdWebProviderWrapperDiv = ({ children }) => {
  // Default Network Based On Enviorement.
  const standardEnvNetwork = config.NETWORK_CHAIN_ID;
  const [currentChainId, setCurrentChainId] = useState(standardEnvNetwork);

  useEffect(() => {
    if (window && window.ethereum) {
      window.ethereum.on('chainChanged', (chain) => {
        setCurrentChainId(parseInt(chain, 16));
      });
    }
  }, []);
  return (
    <ThirdwebProvider activeChain={currentChainId}>{children}</ThirdwebProvider>
  );
};
