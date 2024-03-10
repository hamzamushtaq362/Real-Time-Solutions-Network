import { getCollectorNftsCount, getEnsName } from 'apis/collector';
import { RoundedGradient } from 'components/Collector/element';
import { ItemActivityAddress } from 'components/NFTCollection/CollectionDetails';
import React, { useLayoutEffect, useEffect, useState } from 'react';
import { generateGradientColor } from 'utils/utils';
import { Spacer } from '..';
import { StatsBox } from './CollectionProfile';
import {
  ProfileFlex,
  ProfileStatsBox,
} from './element';

export default function CreatorProfile({
  walletAddress,
  stats,
  ensName,
  setEnsName,
}) {
  const [randomeGradientColor, setRandomeGradientColor] = useState('');
  const [nftsCount, setNftsCount] = useState(-1);
  const [isNftsCountLoading, setIsNftsCountLoading] = useState(true);

  const randomeColorGenerator = () => {
    const gradient = generateGradientColor();
    setRandomeGradientColor(gradient);
  };

  const getEns = async (address) => {
    if (!address) return;
    const data = await getEnsName(address);
    setEnsName(data);
  };

  const getNftsCount = async (address) => {
    if (!address) return;
    setIsNftsCountLoading(true);
    const data = await getCollectorNftsCount(address);
    setNftsCount(data);
    setIsNftsCountLoading(false);
  };

  useLayoutEffect(() => {
    randomeColorGenerator();
  }, []);

  useEffect(() => {
    if (!walletAddress) return;

    getEns(walletAddress);
    getNftsCount(walletAddress);
  }, [walletAddress]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <ProfileFlex>
        {randomeGradientColor && (
          <RoundedGradient position={false} background={randomeGradientColor} />
        )}
        <div>
          <p
            style={{ fontSize: '2.5rem', margin: '1rem 0', fontWeight: '500' }}
          >
            {ensName || ''}
          </p>
          <ItemActivityAddress address={walletAddress} />
        </div>
        <Spacer value={100} />
      </ProfileFlex>

      <ProfileStatsBox>
        <StatsBox
          loading={isNftsCountLoading}
          title={'NFTs'}
          number={nftsCount}
        />
        <StatsBox
          loading={stats.fetched ? false : true}
          title={'Sales'}
          number={stats?.Sale?.sale || 0}
        />
        <StatsBox
          loading={stats.fetched ? false : true}
          title={'Collector'}
          number={stats?.Collector?.collectors || 0}
        />
      </ProfileStatsBox>
    </div>
  );
}
