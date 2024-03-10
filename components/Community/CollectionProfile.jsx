import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import {
  getReadableNumbers,
  getSmallAddress,
} from 'utils/utils';
import { Spacer } from '..';
import {
  ProfileFlex,
  ProfileStatsBox,
  StatsChildBox,
  StatsNum,
  StatsTitle,
} from './element';
import { fetchContractStatsByOpenSea } from 'apis/NFTApi';
import { Skeleton } from '@mui/material';

export default function CollectionProfile({
  selectedContractAddress,
  ensName,
}) {
  const { t } = useTranslation();

  const [contractStats, setContractStats] = useState({});
  const [contractMetadata, setContractMetadata] = useState({});
  const [statsLoading, setStatsLoading] = useState(true);

  const fetchContractStat = async (contractAddress) => {
    setStatsLoading(true);
    const stats = await fetchContractStatsByOpenSea(contractAddress);
    setContractStats(stats.stats || {});
    setContractMetadata(stats.contractMetadata);
    setStatsLoading(false);
  };

  useEffect(() => {
    if (!selectedContractAddress) return;
    fetchContractStat(selectedContractAddress);
  }, [selectedContractAddress]);

  return (
    (<div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <ProfileFlex>
        <Image
          style={{ border: '1px solid black' }}
          width={180}
          height={180}
          src={contractMetadata?.image}
        />

        <div style={{ maxWidth: '80rem' }}>
          <p style={{ fontSize: '3rem', margin: '1rem 0', fontWeight: '500' }}>
            {contractMetadata?.name}
          </p>
          <div
            style={{
              display: 'flex',
              margin: '1rem 0',
              gap: '0 4rem',
              alignItems: 'center',
            }}
          >
            <p style={{ fontSize: '1.2rem', fontWeight: '500' }}>{t("By")}{ensName || '-'}
            </p>
            <p style={{ fontSize: '1.2rem', fontWeight: '500' }}>
              {getSmallAddress(selectedContractAddress)}
            </p>
          </div>
          <p style={{ fontSize: '2rem', margin: '1.5rem 0' }}>
            {contractMetadata?.description}
          </p>
        </div>
      </ProfileFlex>
      <Spacer value={100} />
      <ProfileStatsBox height={'auto'} width={'40rem'}>
        <StatsBox
          loading={statsLoading}
          title={t("Market Cap")}
          number={contractStats?.market_cap}
        />
        <StatsBox
          loading={statsLoading}
          title={t("Floor price")}
          number={contractStats?.floor_price}
        />
        <StatsBox
          loading={statsLoading}
          title={t("Total sales")}
          number={contractStats?.total_sales}
        />
        <StatsBox
          loading={statsLoading}
          title={'Volume'}
          number={contractStats?.total_volume}
        />
        <StatsBox
          loading={statsLoading}
          title={'Supply'}
          number={contractStats.total_supply}
        />
        <StatsBox
          loading={statsLoading}
          title={'Owners'}
          number={contractStats?.num_owners}
        />
      </ProfileStatsBox>
    </div>)
  );
}

export const StatsBox = ({ title, loading = false, number }) => (
  <StatsChildBox>
    <StatsTitle>{title || ''}</StatsTitle>
    {loading ? (
      <Skeleton variant="rounded" width={40} height={30} />
    ) : (
      <StatsNum>{getReadableNumbers(number) || '-'}</StatsNum>
    )}
  </StatsChildBox>
);
