import { useTranslation } from 'react-i18next';
// use mnemonic api instead of nftport api for transactions fetching of perticular nft..

// https://docs.mnemonichq.com/references/uniform/rest/reference/#operation/FoundationalService_GetNftTransfers
// 0xb75f09b4340aeb85cd5f2dd87d31751edc11ed39 || 4029

import React, { useEffect, useState } from 'react';
import LineGraphBox, { TopBar } from 'subcomponents/graphs/LineGraph';
import {
  Box,
  Table,
  TableBody,
  TableHead,
  TableRow,
  useTheme,
} from '@mui/material';
import {
  getCollectorNFTs,
  getNftEvents,
  getNftOwnersByMnemonic,
  getNftTraitsRarity,
} from '~/apis';
import {
  copyToClipBoard,
  generateGradientColor,
  getGraphData,
  getImageWithIpfs,
  getSmallAddress,
  timeConverter,
  truncateString,
  useIsMobileView,
} from 'utils';
import CollectionDetailSkeleton from './skeleton/CollectionDetailSkeleton';
import { useNotistack } from 'hooks';
import {
  CollectionDetailContainer,
  CollectionDetailItemActivityAddressContainer,
  CollectionDetailSNFTContainer,
  CollectionDetailSNFTTableContainer,
  CollectionDetailTitleContainer,
  CollectionDetailTitleTop,
  CollectionDetailMembersContainer,
  CollectionDetailMembers,
  CollectionDetailMembersPicture,
  CollectionDetailMembersDetails,
  CollectionDetailMembersDetailsPrimary,
  CollectionDetailMembersDetailsSecondary,
  CollectionDetailBigImageContainer,
  CollectionDetailInfoContainer,
  CollectionDetailLinksContainer,
  CollectionDetailLink,
  CollectionDetailTopBar,
  CollectionDetailTopBarTitle,
  CollectionDetailTopBarIcons,
  CollectionDetailBuyingSection,
  CollectionDetailBuyingPriceSection,
  CollectionAttributeContainer,
  CollectionAttributeHeading,
  CollectionAttributeRow,
  CollectionAttributeTraitContainer,
  CollectionAttributeTraitHeading,
  CollectionAttributeTraitValue,
  CollectionAttributeTraitCount,
  CollectionDetailBigImage,
  nftCarouselResponsiveRules,
  TopBarContainer,
  CollectionDetailsActivity,
} from './CollectionDetailElements';
import {
  BodyTableCell,
  HeadTableCell,
  ImageIcon,
  NoResultsText,
  SectionHeader,
  Spacer,
} from '~/components';
import {
  IndividualNFTImage,
  CopyIcon,
  ShareIcon,
  MenuDotsIcon,
} from '~/assets';
import Image from 'next/image';
import Carousel from 'components/Carousel/Carousel';
import { RoundedGradient } from 'components/Collector/element';
import Link from 'next/link';
import { ethers } from 'ethers';
import { NoCollabsFountText } from 'components/UserProfile/SectionCollabs/elements';
import { NFTCardMain } from 'components/NFTTile/NFTCard';
const activityTableHeading = ['Event', 'Price', 'From', 'To', 'Date'];

export const ItemActivityAddress = ({ address }) => {

  const generateSnackbar = useNotistack();
  return (
    <CollectionDetailItemActivityAddressContainer
      onClick={() => {
        copyToClipBoard(address);
        generateSnackbar('Address Copied', 'success');
      }}
    >
      <span>{getSmallAddress(address)}</span> <Image src={CopyIcon} />
    </CollectionDetailItemActivityAddressContainer>
  );
};

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

export default function SingleNFT({
  address,
  token,
  NFTDetailsServer,
  contractNftsData,
  contractDetailsData,
}) {
  const { t } = useTranslation();

  const [nftDetails] = useState(NFTDetailsServer);
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const windowSize = useWindowSize();
  const [contractNfts] = useState(contractNftsData || []);
  const [contractDetails] = useState(contractDetailsData || {});
  const [nftTraitRarity, setNftTraitRarity] = useState([]);

  const [allNftEvents, setAllNftEvents] = useState({
    all: [],
    created: [],
    successful: [],
    transfer: [],
    cancelled: [],
  });

  const [filteredEvent, setFilteredEvent] = useState('all');

  const [loading, setLoading] = useState(true);
  const isMobileView = useIsMobileView();

  const [currentNftOwner, setCurrentNftOwner] = useState({
    ens: '',
    address: '',
  });
  const getNftOwner = async () => {
    const owner = await getNftOwnersByMnemonic(address, token);
    setCurrentNftOwner(owner);
  };

  const [randomeGradientColor, setRandomeGradientColor] = useState('');
  const randomeColorGenerator = () => {
    const gradient = generateGradientColor();
    setRandomeGradientColor(gradient);
  };

  const fetchNftEvents = async () => {
    try {
      const nftEvents = await getNftEvents(address, token);
      setAllNftEvents(nftEvents);
      setFilteredEvent('all');
    } catch (error) {}
  };
  const fetchNftTraitsRarity = async () => {
    try {
      const rarity = await getNftTraitsRarity(address, token);
      setNftTraitRarity(rarity || []);
    } catch (error) {}
  };

  useEffect(() => {
    randomeColorGenerator();
  }, []);

  useEffect(() => {
    if (address && token) {
      // getData(
      //   '#d9def0',
      //   '#f2f5ff',
      //   '#ffffff',
      //   '#2f62fd',
      //   '#2f62fd',
      //   allNftEvents.successful,
      // );
      // getData(
      //   '#474747',
      //   '#3c3c3c',
      //   '#181818',
      //   '#d3d3d3',
      //   '#d3d3d3',
      //   allNftEvents.successful,
      // );
    }
  }, [address, token]);

  const [collectorNfts, setCollectorNfts] = useState([]);

  const getCollectorNFT = async (address) => {
    if (!address) return;
    const data = await getCollectorNFTs(address);
    const mergeData = [
      ...data.ethereumNfts.slice(0, 20),
      ...data.polygonNfts.slice(0, 20),
    ];
    setCollectorNfts(mergeData);
  };

  useEffect(() => {
    if (address && token) {
      getNftOwner();
      fetchNftEvents();
      fetchNftTraitsRarity();
    }
  }, [address, token]);

  useEffect(() => {
    if (currentNftOwner && currentNftOwner.address) {
      getCollectorNFT(currentNftOwner.address);
    }
  }, [currentNftOwner]);

  const getTraitsStatus = () => {
    return Math.floor((windowSize.width || 0) / 190);
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  const updateActiveTraits = () => {
    const displayableTraits = getTraitsStatus();
    if (nftDetails?.traits && nftDetails?.traits.length > displayableTraits) {
    }
  };

  useEffect(() => {
    updateActiveTraits();
  }, [windowSize]);

  const tableFontSize = 'h7';

  return (
    (<div>
      {loading ? (
        <CollectionDetailSkeleton />
      ) : (
        <CollectionDetailContainer>
          <>
            {nftDetails && (
              <>
                <CollectionDetailSNFTContainer>
                  <CollectionDetailTitleContainer>
                    {!isMobileView ? (
                      <>
                        <CollectionDetailTitleTop>
                          {nftDetails?.name}
                        </CollectionDetailTitleTop>
                        <CollectionDetailMembersContainer>
                          <CollectionDetailMembersDetailsPrimary>
                            {'Creator'}
                          </CollectionDetailMembersDetailsPrimary>
                          <Link href={`/${nftDetails?.creator?.address}`}>
                            <CollectionDetailMembers>
                              <CollectionDetailMembersPicture
                                src={
                                  nftDetails?.collection?.creator
                                    ?.profile_img_url || nftDetails?.image_url
                                }
                                alt={nftDetails?.name}
                              />
                              <CollectionDetailMembersDetails>
                                <div>
                                  <CollectionDetailMembersDetailsPrimary>
                                    {nftDetails?.creator?.user?.username}
                                  </CollectionDetailMembersDetailsPrimary>
                                  <CollectionDetailMembersDetailsSecondary>
                                    {getSmallAddress(
                                      nftDetails?.creator?.address,
                                    )}
                                  </CollectionDetailMembersDetailsSecondary>
                                </div>
                              </CollectionDetailMembersDetails>
                            </CollectionDetailMembers>
                          </Link>
                          {(currentNftOwner?.ens ||
                            currentNftOwner?.address) && (
                            <>
                              <CollectionDetailMembersDetailsPrimary>
                                {t("Current Owner")}
                              </CollectionDetailMembersDetailsPrimary>
                              <Link href={`/${currentNftOwner.address}`}>
                                <CollectionDetailMembers>
                                  <CollectionDetailMembersPicture
                                    src={
                                      nftDetails?.collection?.creator
                                        ?.profile_img_url ||
                                      nftDetails?.image_url
                                    }
                                    alt={nftDetails?.name}
                                  />
                                  <CollectionDetailMembersDetails>
                                    <div>
                                      {currentNftOwner?.ens && (
                                        <CollectionDetailMembersDetailsPrimary>
                                          {currentNftOwner.ens}
                                        </CollectionDetailMembersDetailsPrimary>
                                      )}
                                      {currentNftOwner?.address && (
                                        <CollectionDetailMembersDetailsSecondary>
                                          {getSmallAddress(
                                            currentNftOwner.address,
                                          )}
                                        </CollectionDetailMembersDetailsSecondary>
                                      )}
                                    </div>
                                  </CollectionDetailMembersDetails>
                                </CollectionDetailMembers>
                              </Link>
                            </>
                          )}
                        </CollectionDetailMembersContainer>
                        <CollectionDetailInfoContainer>
                          <CollectionDetailMembersDetailsPrimary>
                            {'Info'}
                          </CollectionDetailMembersDetailsPrimary>
                          <CollectionDetailMembersDetailsPrimary>
                            {`Belongs to ${
                              nftDetails?.asset_contract?.name || ''
                            } collection`}
                          </CollectionDetailMembersDetailsPrimary>
                          <CollectionDetailMembersDetailsPrimary>
                            {`${nftDetails?.asset_contract?.schema_name} Token Standard`}
                          </CollectionDetailMembersDetailsPrimary>
                        </CollectionDetailInfoContainer>
                        <CollectionDetailLinksContainer>
                          <CollectionDetailLink
                            href={`${nftDetails?.token_metadata || ''}`}
                            // href={`https://api.opensea.io/api/v1/asset/${nftDetails?.asset_contract?.address}/${nftDetails?.token_id}/?include_orders=true`}
                            rel="noreferrer"
                            target="_blank"
                          >{t("View metadata")}</CollectionDetailLink>
                          <CollectionDetailLink
                            href={`https://etherscan.io/address/${nftDetails?.asset_contract?.address}`}
                            rel="noreferrer"
                            target="_blank"
                          >{t("View on Etherscan")}</CollectionDetailLink>
                        </CollectionDetailLinksContainer>
                      </>
                    ) : (
                      <>
                        <CollectionDetailTopBar>
                          <CollectionDetailTopBarTitle
                            style={{ textTransform: 'uppercase' }}
                          >
                            {nftDetails?.asset_contract?.asset_contract_type}
                          </CollectionDetailTopBarTitle>
                          <CollectionDetailTopBarIcons>
                            <ImageIcon size={'32px'} icon={ShareIcon} />
                            <ImageIcon size={'32px'} icon={MenuDotsIcon} />
                          </CollectionDetailTopBarIcons>
                        </CollectionDetailTopBar>
                        <CollectionDetailBigImageContainer>
                          <CollectionDetailBigImage
                            src={
                              nftDetails?.image_url &&
                              nftDetails?.image_url?.slice(0, 7) === 'ipfs://'
                                ? `https://ipfs.io/ipfs/${nftDetails?.image_url.slice(
                                    7,
                                    nftDetails?.image_url?.length,
                                  )}`
                                : nftDetails?.image_url || IndividualNFTImage
                            }
                            width={450}
                            height={450}
                          />
                        </CollectionDetailBigImageContainer>
                      </>
                    )}
                  </CollectionDetailTitleContainer>
                  {!isMobileView && (
                    <CollectionDetailBigImageContainer>
                      <CollectionDetailBigImage
                        src={
                          nftDetails?.image_url &&
                          nftDetails?.image_url?.slice(0, 7) === 'ipfs://'
                            ? `https://ipfs.io/ipfs/${nftDetails?.image_url.slice(
                                7,
                                nftDetails?.image_url?.length,
                              )}`
                            : nftDetails?.image_url || IndividualNFTImage
                        }
                        width={450}
                        height={450}
                      />
                    </CollectionDetailBigImageContainer>
                  )}
                  <CollectionDetailTitleContainer>
                    {isMobileView ? (
                      <>
                        <CollectionDetailTitleTop>
                          {nftDetails?.name}
                        </CollectionDetailTitleTop>
                        <CollectionDetailMembersContainer>
                          <div>
                            <CollectionDetailMembersDetailsPrimary>
                              {'Creator'}
                            </CollectionDetailMembersDetailsPrimary>
                            <CollectionDetailMembers>
                              <CollectionDetailMembersPicture
                                src={
                                  nftDetails?.collection?.creator
                                    ?.profile_img_url || nftDetails?.image_url
                                }
                                alt={nftDetails?.name}
                              />
                              <CollectionDetailMembersDetails>
                                <div>
                                  <CollectionDetailMembersDetailsPrimary>
                                    {nftDetails?.creator?.user?.username}
                                  </CollectionDetailMembersDetailsPrimary>
                                  <CollectionDetailMembersDetailsSecondary>
                                    {nftDetails?.creator?.address}
                                  </CollectionDetailMembersDetailsSecondary>
                                </div>
                              </CollectionDetailMembersDetails>
                            </CollectionDetailMembers>
                          </div>
                          {(currentNftOwner.ens || currentNftOwner.address) && (
                            <>
                              <div>
                                <CollectionDetailMembersDetailsPrimary>
                                  {t("Current Owner")}
                                </CollectionDetailMembersDetailsPrimary>
                                <CollectionDetailMembers>
                                  <RoundedGradient
                                    width={50}
                                    height={50}
                                    background={randomeGradientColor}
                                  />
                                  <CollectionDetailMembersDetails>
                                    <div>
                                      {currentNftOwner.ens && (
                                        <CollectionDetailMembersDetailsPrimary>
                                          {currentNftOwner.ens}
                                        </CollectionDetailMembersDetailsPrimary>
                                      )}
                                      {currentNftOwner.address && (
                                        <CollectionDetailMembersDetailsSecondary>
                                          {getSmallAddress(
                                            currentNftOwner.address,
                                          )}
                                        </CollectionDetailMembersDetailsSecondary>
                                      )}
                                    </div>
                                  </CollectionDetailMembersDetails>
                                </CollectionDetailMembers>
                              </div>
                            </>
                          )}
                        </CollectionDetailMembersContainer>
                      </>
                    ) : (
                      <>
                        <CollectionDetailTopBar>
                          <CollectionDetailTopBarTitle
                            style={{ textTransform: 'uppercase' }}
                          >
                            {nftDetails?.asset_contract?.asset_contract_type}
                          </CollectionDetailTopBarTitle>
                          <CollectionDetailTopBarIcons>
                            <ImageIcon size={'32px'} icon={ShareIcon} />
                            <ImageIcon size={'32px'} icon={MenuDotsIcon} />
                          </CollectionDetailTopBarIcons>
                        </CollectionDetailTopBar>
                      </>
                    )}
                    <CollectionDetailBuyingSection>
                      <div style={{ width: isMobileView ? '100%' : 170 }}>
                        {/* <CollectionDetailMembersDetailsPrimary>
                          Buy now
                        </CollectionDetailMembersDetailsPrimary> */}
                        <CollectionDetailBuyingPriceSection>
                          {/* <CollectionDetailBuyingPricePrimary>
                            {parseFloat(
                              nftDetails?.collection?.payment_tokens[0]
                                ?.eth_price,
                            )
                              .toFixed(2)
                              .toString()}
                          </CollectionDetailBuyingPricePrimary> */}
                          {/* <CollectionDetailBuyingPriceSecondary>
                            /$
                            {nftDetails?.collection?.payment_tokens[0]?.usd_price.toString()}
                          </CollectionDetailBuyingPriceSecondary> */}
                        </CollectionDetailBuyingPriceSection>
                        {/* <CollectionDetailBuyingButton>
                          Connect Wallet
                        </CollectionDetailBuyingButton> */}
                      </div>
                    </CollectionDetailBuyingSection>
                    <div>
                      <CollectionDetailMembersDetailsPrimary>{t("Description")}</CollectionDetailMembersDetailsPrimary>
                      <CollectionDetailMembersDetailsSecondary
                        style={{ fontSize: 13, margin: '1rem 0' }}
                      >
                        {truncateString(
                          nftDetails?.collection?.description || '',
                          427,
                        )}
                      </CollectionDetailMembersDetailsSecondary>
                    </div>
                    {isMobileView && (
                      <>
                        <CollectionDetailInfoContainer>
                          <CollectionDetailMembersDetailsPrimary>
                            {'Info'}
                          </CollectionDetailMembersDetailsPrimary>
                          <CollectionDetailMembersDetailsPrimary>
                            {`Belongs to ${
                              nftDetails?.asset_contract?.name || ''
                            } collection`}
                          </CollectionDetailMembersDetailsPrimary>
                          <CollectionDetailMembersDetailsPrimary>
                            {`${nftDetails?.asset_contract?.schema_name} Token Standard`}
                          </CollectionDetailMembersDetailsPrimary>
                        </CollectionDetailInfoContainer>
                        <CollectionDetailLinksContainer>
                          <CollectionDetailLink
                            href={`${nftDetails?.token_metadata}`}
                            rel="noreferrer"
                            target="_blank"
                          >{t("View metadata")}</CollectionDetailLink>
                          {/* <CollectionDetailLink
                            href={
                              nftDetails?.image_url &&
                              nftDetails?.image_url?.slice(0, 7) === 'ipfs://'
                                ? `https://ipfs.io/ipfs/${nftDetails?.image_url.slice(
                                    7,
                                    nftDetails?.image_url?.length,
                                  )}`
                                : nftDetails?.image_url || IndividualNFTImage
                            }
                            rel="noreferrer"
                            target="_blank"
                          >
                            View on IPFS
                          </CollectionDetailLink> */}
                          <CollectionDetailLink
                            href={`https://etherscan.io/address/${nftDetails?.asset_contract?.address}`}
                            rel="noreferrer"
                            target="_blank"
                          >{t("View on Etherscan")}</CollectionDetailLink>
                        </CollectionDetailLinksContainer>
                      </>
                    )}
                  </CollectionDetailTitleContainer>
                </CollectionDetailSNFTContainer>
                <CollectionAttributeContainer>
                  <CollectionAttributeHeading>{t("Attributes")}</CollectionAttributeHeading>
                  {/* <CollectionAttributeRow>
                    {activeTraits.length > 0
                      ? activeTraits?.map((trait, index) => (
                          <CollectionAttributeTraitContainer key={index}>
                            <div style={{ textAlign: 'center' }}>
                              <CollectionAttributeTraitHeading>
                                {trait?.trait_type}
                              </CollectionAttributeTraitHeading>
                              <CollectionAttributeTraitValue>
                                {trait?.value}
                              </CollectionAttributeTraitValue>
                              <CollectionAttributeTraitCount>
                                {trait?.trait_count} have this trait
                              </CollectionAttributeTraitCount>
                            </div>
                          </CollectionAttributeTraitContainer>
                        ))
                      : 'No traits found!'}
                    {extraTraits && (
                      <CollectionAttributeTraitContainer>
                        <div style={{ textAlign: 'center' }}>
                          <CollectionAttributeTraitCountMore>
                            +{countTraits} more
                          </CollectionAttributeTraitCountMore>
                        </div>
                      </CollectionAttributeTraitContainer>
                    )}
                  </CollectionAttributeRow> */}
                  <CollectionAttributeRow>
                    {nftTraitRarity && nftTraitRarity.length > 0 ? (
                      nftTraitRarity.map((trait, index) => {
                        const percentage = trait?.prevalence * 100;

                        return (
                          <CollectionAttributeTraitContainer key={index}>
                            <div style={{ textAlign: 'center' }}>
                              <CollectionAttributeTraitHeading>
                                {trait?.trait_type}
                              </CollectionAttributeTraitHeading>
                              <CollectionAttributeTraitValue>
                                {trait?.value}
                              </CollectionAttributeTraitValue>
                              <CollectionAttributeTraitCount>
                                {percentage && percentage.toFixed(2)}%
                              </CollectionAttributeTraitCount>
                            </div>
                          </CollectionAttributeTraitContainer>
                        );
                      })
                    ) : (
                      <div style={{ padding: '2rem' }}>{t("No Result Found")}</div>
                    )}
                  </CollectionAttributeRow>
                </CollectionAttributeContainer>
                {/* Graph */}
                <div
                  style={{ display: 'flex' }}
                  // style={{
                  //   display: 'grid',
                  //   gridTemplateColumns: isMobileView ? '100%' : '1fr 1fr',
                  //   gridColumnStart: 'auto',
                  // }}
                >
                  {/* {allSalesPrices && allSalesPrices.length !== 0 && ( */}
                  <TopBarContainer>
                    {allNftEvents?.successful.length !== 0 ? (
                      <div>
                        <TopBar title={t("Price History")} />
                        <LineGraphBox
                          // style={{maxHeight: '400px'}}
                          // title={`Price History`}
                          // showDurationButtons={true}
                          // isBold={'1'}
                          data={getGraphData(
                            isDarkMode,
                            allNftEvents.successful,
                            'price',
                            'date',
                            true,
                          )}
                          // options={{ maintainAspectRatio: false }}
                          // data={getData(
                          //   '#474747',
                          //   '#3c3c3c',
                          //   '#181818',
                          //   '#d3d3d3',
                          //   '#d3d3d3',
                          //   allNftEvents.successful,
                          // )}
                        />
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </TopBarContainer>

                  <CollectionDetailsActivity>
                    <TopBar title="Activity" />

                    {/* <ButtonGroup
                color="inherit"
                size="large"
                variant="outlined"
                aria-label="outlined button group"
              >
                <GraphButton
                  onClick={() => {
                    setFilteredEvent('all');
                  }}
                  isActive={filteredEvent === 'all'}
                  isRightBorder={true}
                  flatLeftBorderRadius={true}
                >
                  All
                </GraphButton>
                <GraphButton
                  onClick={() => {
                    setFilteredEvent('successful');
                  }}
                  isActive={filteredEvent === 'successful'}
                  isRightBorder={true}
                  flatLeftBorderRadius={true}
                >
                  Sales
                </GraphButton>
                <GraphButton
                  onClick={() => {
                    setFilteredEvent('transfer');
                  }}
                  isActive={filteredEvent === 'transfer'}
                  isRightBorder={true}
                  flatLeftBorderRadius={true}
                >
                  transfers
                </GraphButton>
                <GraphButton
                  onClick={() => {
                    setFilteredEvent('cancelled');
                  }}
                  isActive={filteredEvent === 'cancelled'}
                  isRightBorder={true}
                  flatLeftBorderRadius={true}
                >
                  Cancelled
                </GraphButton>
                <GraphButton
                  onClick={() => {
                    setFilteredEvent('created');
                  }}
                  isActive={filteredEvent === 'created'}
                  isRightBorder={false}
                  flatLeftBorderRadius={false}
                >
                  List
                </GraphButton>
              </ButtonGroup> */}

                    <CollectionDetailSNFTTableContainer>
                      <Table sx={{ width: '100%' }}>
                        <TableHead>
                          <TableRow>
                            {activityTableHeading?.map((item, index) => (
                              <HeadTableCell fontH={tableFontSize} key={index}>
                                {item}
                              </HeadTableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        {allNftEvents.all.length > 0 &&
                        allNftEvents[filteredEvent].length > 0 ? (
                          allNftEvents[filteredEvent].map((item, index) => (
                            <TableBody key={index}>
                              <TableRow>
                                <BodyTableCell fontH={tableFontSize}>
                                  {item?.eventType || '-'}
                                </BodyTableCell>
                                <BodyTableCell fontH={tableFontSize}>
                                  {" "}
                                  {item?.price
                                    ? `${ethers.utils.formatEther(
                                        item.price,
                                      )} ETH`
                                    : ''}
                                </BodyTableCell>
                                <BodyTableCell fontH={tableFontSize}>
                                  {item?.from.address ? (
                                    <Link href={`/${item.from.address}`}>
                                      <CollectionDetailMembers>
                                        <CollectionDetailMembersDetails>
                                          <div>
                                            {item?.from?.user && (
                                              <CollectionDetailMembersDetailsPrimary>
                                                {item?.from?.user}
                                              </CollectionDetailMembersDetailsPrimary>
                                            )}
                                            <CollectionDetailMembersDetailsSecondary>
                                              {getSmallAddress(
                                                item.from.address,
                                              )}
                                            </CollectionDetailMembersDetailsSecondary>
                                          </div>
                                        </CollectionDetailMembersDetails>
                                      </CollectionDetailMembers>
                                    </Link>
                                  ) : (
                                    ''
                                  )}
                                </BodyTableCell>
                                <BodyTableCell fontH={tableFontSize}>
                                  {item?.to.address ? (
                                    <Link href={`/${item.to.address}`}>
                                      <CollectionDetailMembers>
                                        <CollectionDetailMembersDetails>
                                          <div>
                                            {item?.to?.user && (
                                              <CollectionDetailMembersDetailsPrimary>
                                                {item?.to?.user}
                                              </CollectionDetailMembersDetailsPrimary>
                                            )}
                                            <CollectionDetailMembersDetailsSecondary>
                                              {getSmallAddress(item.to.address)}
                                            </CollectionDetailMembersDetailsSecondary>
                                          </div>
                                        </CollectionDetailMembersDetails>
                                      </CollectionDetailMembers>
                                    </Link>
                                  ) : (
                                    ''
                                  )}
                                </BodyTableCell>
                                {/* <BodyTableCell>
                          {' '}
                          {item?.to?.address ? (
                            <Link href={`/${item.to.address}`}>
                              {item?.to?.user ||
                                getSmallAddress(item.to.address)}
                            </Link>
                          ) : (
                            ''
                          )}
                        </BodyTableCell> */}
                                <BodyTableCell fontH={tableFontSize}>
                                  {" "}
                                  {timeConverter(item.date)}
                                </BodyTableCell>
                              </TableRow>
                            </TableBody>
                          ))
                        ) : (
                          <Box
                            mt={6}
                            sx={{
                              width: '100%',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            <NoResultsText>{t("No Activity found")}</NoResultsText>
                          </Box>
                        )}
                      </Table>
                    </CollectionDetailSNFTTableContainer>
                  </CollectionDetailsActivity>
                </div>
              </>
            )}

            <Spacer value={32} />
            <div style={{ margin: '3rem' }}>
              <SectionHeader text={t("More from this Collection")} />
              <Carousel settings={nftCarouselResponsiveRules}>
                {contractNfts &&
                  contractNfts.length &&
                  contractNfts.map((item, index) => {
                    const uriOriginal = item?.metadata?.image?.uriOriginal;
                    const imageSrc =
                      uriOriginal && uriOriginal.slice(0, 7) === 'ipfs://'
                        ? `https://ipfs.io/${uriOriginal.slice(
                            7,
                            uriOriginal.length,
                          )}`
                        : item?.metadata?.image?.uri
                        ? item?.metadata?.image?.uri
                        : item?.metadata?.image?.uriOriginal;

                    return !item.metadata || !item?.metadata?.name ? null : (
                      // <Link
                      //   href={`/nft/${item?.contractAddress}/${item?.tokenId}`}
                      // >
                      (<NFTCardMain
                        key={index}
                        // onClick={() =>
                        //   router.push(
                        //     `/nft/${item?.contractAddress}/${item?.tokenId}`,
                        //   )
                        // }
                        contractAddress={item?.contractAddress}
                        tokenId={item?.tokenId}
                        imgSrc={imageSrc}
                        creatorName={
                          contractDetails?.collection?.name ||
                          contractDetails?.name
                        }
                        creatorImage={
                          contractDetails.collection?.image_url ||
                          contractDetails.collection?.featured_image_url
                        }
                        title={item?.metadata?.name}
                        description={
                          item?.metadata?.description &&
                          item.metadata.description.slice(0, 200)
                        }
                      />)
                    );
                  })}
              </Carousel>
            </div>
            <Spacer value={32} />
            <div style={{ margin: '3rem' }}>
              <SectionHeader
                text={t("Holders Of this NFT also Holds")}
                withoutButton={true}
              />
              <Spacer value={24} />
              <Carousel settings={nftCarouselResponsiveRules}>
                {collectorNfts?.length > 0 ? (
                  collectorNfts?.map(
                    (item, index) =>
                      item?.nft?.metadata?.name &&
                      item?.nft?.metadata?.image?.uri && (
                        // <Link
                        //   href={`/nft/${item?.nft?.contractAddress}/${item?.nft?.tokenId}`}
                        // >
                        (<NFTCardMain
                          key={index}
                          // onClick={() =>
                          //   router.push(
                          //     `/nft/${item?.nft?.contractAddress}/${item?.nft?.tokenId}`,
                          //   )
                          // }
                          imgSrc={getImageWithIpfs(
                            item?.nft?.metadata?.image?.uri,
                          )}
                          title={item?.nft?.metadata?.name}
                          description={
                            item?.nft?.metadata?.description &&
                            item?.nft?.metadata?.description?.slice(0, 200)
                          }
                          contractAddress={item?.nft?.contractAddress}
                          tokenId={item?.nft?.tokenId}
                        />)
                        // </Link>
                      ),
                  )
                ) : (
                  <NoCollabsFountText style={{ marginTop: '1rem' }}>
                    {t("No Collections Found")}
                  </NoCollabsFountText>
                )}
              </Carousel>
            </div>
          </>
        </CollectionDetailContainer>
      )}
    </div>)
  );
}
