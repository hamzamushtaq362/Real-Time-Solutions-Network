import React, { useState, useEffect } from 'react';
import { fetchTrendingNFTs } from '~/apis';
import {
  DashboardSectionContainer,
  nftCarouselResponsiveRules,
} from '../elements';
import { NFTTile, SectionHeader } from '~/components';
import Carousel from '../../Carousel/Carousel';
import { NFTTileSkeleton } from 'components/NFTTile/NFTTileSkeleton';
import { useTranslation } from 'react-i18next';

export const TrendingNFTs = () => {
  const [suggestedNFTs, setSuggestedNFTs] = useState([]);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const getSuggestedNFTs = async () => {
    try {
      setLoading(true);
      const nfts = await fetchTrendingNFTs();
      setSuggestedNFTs(nfts.trendingNfts);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSuggestedNFTs();
  }, []);

  return (
    (<DashboardSectionContainer pl={4}>
      <SectionHeader
        text={t("Popular Drops")}
      />
      <Carousel settings={nftCarouselResponsiveRules}>
        {!loading
          ? suggestedNFTs?.length > 0 &&
            suggestedNFTs.map(
              ({
                name,
                image,
                description,
                contractAddress,
                salesCount,
                itemsCount,
                ownersCount,
              }, index) => (
                <NFTTile
                  key={index}
                  category={t("Fashion NFT")}
                  title={name}
                  image={image}
                  contractAddress={contractAddress}
                  salesCount={salesCount}
                  itemsCount={itemsCount}
                  ownersCount={ownersCount}
                  description={description}
                />
              ),
            )
          : [...Array(9)].map((index) => <NFTTileSkeleton key={index} />)}
      </Carousel>
    </DashboardSectionContainer>)
  );
};
