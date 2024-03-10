import { useTranslation } from 'react-i18next';
import { CopyIcon } from 'assets/svg';
import { ethers } from 'ethers';
import { useNotistack } from 'hooks/useNotistack';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { NFTCard } from 'subcomponents/cards';
import {
  copyToClipBoard,
  getImageWithIpfs,
  getSmallAddress,
  generateGradientColor,
} from '~/utils';
import {
  getEnsName,
  getCollectorNFTs,
  getCollectorCreatedNFTs,
} from '~/apis';
import { CollabTile, SectionHeader, Spacer } from '~/components';
import { EnsName, MainCont } from './element';
import { useLayoutEffect } from 'react';
import BannerWithProfile from './BannerWithProfile';
import Carousel from 'components/Carousel/Carousel';
import { collabCarouselResponsiveRules } from 'components/DashboardHome/elements';
import { NoCollabsFountText } from 'components/UserProfile/SectionCollabs/elements';

export default function Collector({ address }) {
  const { t } = useTranslation();

  const generateSnackbar = useNotistack();
  const router = useRouter();

  const [bannerImage, setBannerImage] = useState('');

  const [ensName, setEnsName] = useState('');
  const [isNftsLoading, setIsNftsLoading] = useState(true);
  const [isCreatedNftLoading, setIsCreatedNftLoading] = useState(true);
  const [randomeGradientColor, setRandomeGradientColor] = useState('');
  const [collectorNfts, setCollectorNfts] = useState({
    ethereumNfts: [],
    polygonNfts: [],
  });

  const [createdNfts, setCreatedNfts] = useState([]);

  const getImageFromNFT = (data) => {
    try {
      let finalImageLink = '';
      if (!bannerImage) {
        for (let i = 0; i < data.length; i++) {
          const nft = data[i];
          if (getImageWithIpfs(nft?.nft?.metadata?.image.uri)) {
            finalImageLink = nft?.nft?.metadata?.image.uri;
            break;
          }
        }
        setBannerImage(finalImageLink);
      }
    } catch (error) {}
  };

  const randomeColorGenerator = () => {
    const gradient = generateGradientColor();
    setRandomeGradientColor(gradient);
  };

  const getEns = async (address) => {
    if (!address) return;
    const data = await getEnsName(address);
    setEnsName(data);
  };
  const getCollectorNFT = async (address) => {
    if (!address) return;
    const data = await getCollectorNFTs(address);
    const mergeData = [...data.ethereumNfts, ...data.polygonNfts];
    if (!bannerImage && !bannerImage.length) {
      getImageFromNFT(mergeData);
    }
    setIsNftsLoading(false);
    setCollectorNfts(mergeData);
  };
  const getCollectorCreatedNFT = async (address) => {
    if (!address) return;
    const data = await getCollectorCreatedNFTs(address);
    setIsCreatedNftLoading(false);
    const newData = [...data.collections, ...data.nfts];
    setCreatedNfts(newData);
  };

  useLayoutEffect(() => {
    randomeColorGenerator();
  }, []);

  useEffect(() => {
    if (!address) return;

    const isValidAddress = ethers.utils.isAddress(address);
    if (!isValidAddress) {
      generateSnackbar('Invalid Address! redirecting', 'error');
      setTimeout(() => {
        router.back();
      }, 2000);
      return;
    }

    getEns(address);
    getCollectorNFT(address);
    getCollectorCreatedNFT(address);
    // getCollections(address);
  }, [address]);

  return (
    (<MainCont>
      <Spacer value={100} />
      <BannerWithProfile
        url={bannerImage || ''}
        gradient={randomeGradientColor}
      />
      <Spacer value={160} />
      <div
        style={{
          margin: '40px',
          display: 'flex',
          alignItems: 'center',
          gap: '0 .5rem',
        }}
      >
        {ensName && <EnsName>{ensName || ''}</EnsName>}

        <EnsName
          onClick={() => {
            copyToClipBoard(address);
            generateSnackbar('Address Copied', 'success');
          }}
        >
          <span style={{ fontSize: '1.5rem' }}>
            {" "}
            {ensName && <>&#40;</>}
            {getSmallAddress(address)}
            {ensName && <>&#41;</>}
          </span>{" "}
          <Image src={CopyIcon} />
        </EnsName>
      </div>
      <Spacer value={50} />
      <Spacer value={100} />
      <div>
        <SectionHeader text={t("Owned NFTs")} withoutButton={true} />
        <Spacer value={24} />
        <Carousel settings={collabCarouselResponsiveRules}>
          {!isNftsLoading ? (
            collectorNfts?.length > 0 ? (
              collectorNfts?.map(
                (item, index) =>
                  item?.nft?.metadata?.name &&
                  item?.nft?.metadata?.image?.uri && (
                    <NFTCard
                      key={index}
                      onClick={() =>
                        router.push(
                          `/nft/${item?.nft?.contractAddress}/${item?.nft?.tokenId}`,
                        )
                      }
                      imgSrc={getImageWithIpfs(item?.nft?.metadata?.image?.uri)}
                      title={item?.nft?.metadata?.name}
                      description={
                        item?.nft?.metadata?.description &&
                        item?.nft?.metadata?.description?.slice(0, 200)
                      }
                    />
                  ),
              )
            ) : (
              <NoCollabsFountText style={{ marginTop: '1rem' }}>
                {t("No Collections Found")}
              </NoCollabsFountText>
            )
          ) : (
            [...Array(9)].map((index) => <CollabTile key={index} isLoading />)
          )}
        </Carousel>
      </div>
      <Spacer value={100} />
      <div>
        <SectionHeader text={t("Created NFTs")} withoutButton={true} />
        <Spacer value={24} />
        <Carousel settings={collabCarouselResponsiveRules}>
          {!isCreatedNftLoading ? (
            createdNfts?.length > 0 ? (
              createdNfts?.map(
                (item, index) =>
                  item?.name &&
                  item.img_url && (
                    <NFTCard
                      key={index}
                      onClick={
                        () => router.push(`/nft/${item?.address}/${item?.slug}`)
                        // router.push(`/nft/${item?.token_address}`)
                      }
                      imgSrc={getImageWithIpfs(item?.img_url)}
                      title={item?.name || ''}
                      // description={
                      //   item?.metadata?.description &&
                      //   item?.metadata?.description?.slice(0, 200)
                      // }
                    />
                  ),
              )
            ) : (
              <NoCollabsFountText style={{ marginTop: '1rem' }}>
                {t("No Created Nfts/Collections Found")}
              </NoCollabsFountText>
            )
          ) : (
            [...Array(9)].map((index) => <CollabTile key={index} isLoading />)
          )}
        </Carousel>
      </div>
      {/* <CollabsExploreContainerGrid>
        {collectorNfts?.ethereumNfts?.map((item, index) => (
          <NFTCard
            key={index}
            onClick={
              () => router.push(`/nft/${item?.token_address}/${item?.token_id}`)
              // router.push(`/nft/${item?.token_address}`)
            }
            imgSrc={getImageWithIpfs(item?.normalized_metadata?.image)}
            title={item?.normalized_metadata?.name}
            description={
              item?.normalized_metadata?.description &&
              item?.normalized_metadata?.description?.slice(0, 200)
            }
          />
        ))}
        {collectorNfts?.polygonNfts?.map((item, index) => (
          <NFTCard
            key={index}
            onClick={
              () => router.push(`/nft/${item?.token_address}/${item?.token_id}`)
              // router.push(`/nft/${item?.token_address}`)
            }
            imgSrc={item.normalized_metadata.image}
            title={item?.normalized_metadata?.name}
            description={
              item?.normalized_metadata?.description &&
              item?.normalized_metadata?.description?.slice(0, 200)
            }
          />
        ))}
      </CollabsExploreContainerGrid> */}
      <Spacer value={60} />
    </MainCont>)
  );
}
