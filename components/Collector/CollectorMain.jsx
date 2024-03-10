import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { LoadingMore, NavButtonGroup } from '..';
import { ProfilePageContainer } from 'components/CreatorProfile/elements';
import { ProfileCoverImage } from 'components/Creator/CreatorProfileCard/elements';

import { Avatar, Tooltip, Spacer } from '~/components';
import AvatarLogo from '../UserProfile/assets/Avatar.jpg';
import {
  ProfileBanneInfoContainer,
  ProfileBanneInfoDetailContainer,
  ProfileBanneInfoSubText,
  ProfileBanneInfoTitle,
  ProfileDetailContainer,
} from 'components/common/ProfileCommon/element';
import {
  getImageWithIpfs,
  getSmallAddress,
  useIsMobileView,
} from 'utils/utils';
import { useEffect } from 'react';
import {
  getCollectorCreatedNFTs,
  getCollectorNftsMnemonic,
  getCollectorOwnedCollections,
  getEnsName,
} from 'apis/collector';
import InfiniteScroll from 'react-infinite-scroll-component';
import { NFTCardMain } from 'components/NFTTile/NFTCard';
import { GridContainer } from 'components/common/elements';
import { CoverImageSmall } from '~/assets';

export default function CollectorMain({ address }) {
  const { t } = useTranslation();

  const [activeButton, setActiveButton] = useState('owned-nfts');
  const isMobileView = useIsMobileView();

  const [contractNfts, setContractNfts] = useState([]);
  const [createdNfts, setCreatedNfts] = useState([]);
  const [ownedCollections, setOwnedCollections] = useState([]);
  const [EnsName, setEnsName] = useState('');

  const [offset, setOffset] = useState(0);
  const [collectionOffset, setCollectionOffset] = useState(0);

  const [isAllNftsCompleted, setIsAllNftsCompleted] = useState(false);
  const [isAllCollectionsCompleted, setIsAllCollectionsCompleted] =
    useState(false);

  const buttonsData = [
    {
      text: 'Owned Nfts',
      value: 'owned-nfts',
      count: contractNfts.length || 0,
    },
    {
      text: 'Owned Collections',
      value: 'owned-collections',
      count: ownedCollections.length || 0,
    },
    {
      text: 'Created Nfts',
      value: 'created',
      count: createdNfts.length || 0,
    },
  ];

  const fetchNextContractNfts = async () => {
    const contractNftsData = await getCollectorNftsMnemonic(
      address,
      offset + 1,
    );

    if (!contractNftsData.length) {
      setIsAllNftsCompleted(true);
      return;
    }

    setContractNfts((prevState) => [...prevState, ...contractNftsData]);
    setOffset((prevState) => prevState + 1);
  };
  const fetchNextContractCollections = async () => {
    const contractNftsData = await getCollectorOwnedCollections(
      address,
      collectionOffset + 1,
    );
    if (!contractNftsData.length) {
      setIsAllCollectionsCompleted(true);
      return;
    }

    setOwnedCollections((prevState) => [...prevState, ...contractNftsData]);
    setCollectionOffset((prevState) => prevState + 1);
  };

  const getEns = async (address) => {
    if (!address) return;
    const data = await getEnsName(address);
    setEnsName(data);
  };

  const fetchCollectorNftsMnemonic = async (address) => {
    const nfts = await getCollectorNftsMnemonic(address);
    setContractNfts(nfts);
  };

  const getCollectorCreatedNFT = async (address) => {
    if (!address) return;
    const data = await getCollectorCreatedNFTs(address);
    const newData = [...data.collections, ...data.nfts];
    setCreatedNfts(newData);
  };

  const fetchCollectorOwnedCollections = async (address) => {
    if (!address) return;
    const collections = await getCollectorOwnedCollections(address);
    setOwnedCollections(collections);
  };

  useEffect(() => {
    if (!address) return;
    getEns(address);
    fetchCollectorNftsMnemonic(address);
    getCollectorCreatedNFT(address);
    fetchCollectorOwnedCollections(address);
  }, [address]);

  return (
    (<div>
      <ProfilePageContainer>
        <>
          <ProfileCoverImage
            src={CoverImageSmall.src}
            alt="banner"
            isPublicView={false}
          />

          <ProfileDetailContainer showBorder={false}>
            <ProfileBanneInfoContainer>
              <Tooltip title={t("Profile Image")}>
                <Avatar
                  withBorder={false}
                  borderSize="6px"
                  size={isMobileView ? 112 : 190}
                  marginRight="10px"
                  avatar={AvatarLogo}
                  statusIconSize="36px"
                  borderRadius={'50%'}
                  statusIconRightPosition={-6}
                  statusIconBottomPosition={-6}
                  sx={{
                    marginTop: '-3.5rem',
                    position: 'absolute',
                  }}
                />
              </Tooltip>

              <ProfileBanneInfoDetailContainer>
                {EnsName && (
                  <ProfileBanneInfoTitle>{EnsName}</ProfileBanneInfoTitle>
                )}

                {address && (
                  <ProfileBanneInfoSubText>
                    <Tooltip title={address}>
                      <div>{`${getSmallAddress(address)}`}</div>
                    </Tooltip>
                  </ProfileBanneInfoSubText>
                )}
              </ProfileBanneInfoDetailContainer>
            </ProfileBanneInfoContainer>
          </ProfileDetailContainer>

          <NavButtonGroup
            buttonsData={buttonsData}
            activeButton={activeButton}
            setActiveButton={setActiveButton}
            sx={{padding: '25px 30px'}}
            showBorderTop={true}
            showBorderBottom={true}
          />

          <Spacer value={50} />

          {activeButton === 'owned-nfts' && (
            <>
              {contractNfts && contractNfts.length > 0 ? (
                <InfiniteScroll
                  dataLength={contractNfts.length}
                  next={fetchNextContractNfts}
                  hasMore={!isAllNftsCompleted}
                  loader={<LoadingMore />}
                  endMessage={<></>}
                >
                  <GridContainer>
                    {contractNfts.map((item, index) => {
                      const nft = item?.nft;
                      const isAllRight =
                        !(!nft || !nft?.metadata?.name || !nft?.metadata?.image);
                      return !isAllRight ? null : (
                        <NFTCardMain
                          key={index}
                          contractAddress={nft?.contractAddress}
                          tokenId={nft?.tokenId}
                          metadataUri={nft?.metadata?.metadataUri?.uri}
                          imgSrc={
                            nft?.metadata?.image?.uri ||
                            nft?.metadata?.image?.uriOriginal
                          }
                          // creatorName={
                          //   contractDetails?.collection?.name ||
                          //   contractDetails?.name
                          // }
                          // creatorImage={
                          //   contractDetails.collection?.image_url ||
                          //   contractDetails.collection?.featured_image_url
                          // }
                          title={nft?.metadata?.name || nft?.tokenId}
                          description={
                            nft?.metadata?.description &&
                            nft?.metadata?.description.slice(0, 200)
                          }
                        />
                      );
                    })}
                  </GridContainer>
                </InfiniteScroll>
              ) :
                'No NFTs Found'
              }
            </>
          )}

          {activeButton === 'created' && (
            <>
              {createdNfts && createdNfts.length > 0 ? (
                <GridContainer>
                  {createdNfts.map((item, index) => {
                    const isAllRight =
                      !item || !item?.name || !item?.img_url ? false : true;
                    return !isAllRight ? null : (
                      <NFTCardMain
                        key={index}
                        contractAddress={item?.address}
                        tokenId={item?.slug}
                        imgSrc={getImageWithIpfs(item?.img_url)}
                        title={item?.name || ''}
                        // description={
                        //   item?.metadata?.description &&
                        //   item?.metadata?.description?.slice(0, 200)
                        // }
                      />
                    );
                  })}
                </GridContainer>
              ) : 'No NFTs Found'
              }
            </>
          )}
          {activeButton === 'owned-collections' && (
            <>
              {ownedCollections && ownedCollections.length > 0 ? (
                <InfiniteScroll
                  dataLength={ownedCollections.length}
                  next={fetchNextContractCollections}
                  hasMore={!isAllCollectionsCompleted}
                  loader={<LoadingMore />}
                  endMessage={<></>}
                >
                  <GridContainer>
                    {ownedCollections.map((item, index) => {
                      const isAllRight =
                        !item || !item?.name || !item?.image ? false : true;
                      return !isAllRight ? null : (
                        <NFTCardMain
                          key={index}
                          contractAddress={
                            item?.contractAddress || item?.address || ''
                          }
                          // tokenId={item?.slug}
                          imgSrc={getImageWithIpfs(item?.image)}
                          title={item?.name || ''}
                          // description={
                          //   item?.metadata?.description &&
                          //   item?.metadata?.description?.slice(0, 200)
                          // }
                        />
                      );
                    })}
                  </GridContainer>
                </InfiniteScroll>
              ) : 'No NFTs Found'}
            </>
          )}
        </>
      </ProfilePageContainer>
    </div>)
  );
}
