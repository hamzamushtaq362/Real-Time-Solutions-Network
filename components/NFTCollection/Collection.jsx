import { useTranslation } from 'react-i18next';
/* eslint-disable react/jsx-no-target-blank */
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import LineGraphBox from 'subcomponents/graphs/LineGraph';
import {
  changeImageWidth,
  getGraphData,
  getSmallAddress,
  timeConverter,
} from '~/utils';
import { ShareIcon, MenuDotsIcon } from '~/assets';
import {
  CollectionTopContainer,
  CollectionTopBelowContainer,
  CollectionTopBelowImageHeading,
  ProfileTextPrimary,
  CollectionTopBelowImageLinks,
  MarginContainer,
  CollectionTopBelowStatusGrid,
  CollectionTopBelowContainerCenter,
  CollectionStatusLabel,
  CollectionStatusValue,
  CollectionContainerTop,
  CollectionProfileCard,
  ProfileImage,
  ProfileTextSecondary,
  CollectionTopBelowStatusGridSection,
  CollectionTopBelowImageLink,
  ContainerCenterEmptyBox,
  NavTopContainer,
} from './element';
import {
  Avatar,
  NavButtonGroup,
  ImageIcon,
  LoadingMore,
  Spacer,
} from '~/components';
import { shareDropdownPaperProps } from '~/components/Dropdown/DropdownPaperProps';
import { Menu, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import {
  ProfilePageSkeleton,
  CollectionLoadingSkeleton,
} from './skeleton/Skeleton';
import {
  fetchAllContractNFTs,
  fetchContractPriceHistory1,
  fetchContractVolumeHistory1,
  getCollectorGrowth,
} from '~/apis';
import InfiniteScroll from 'react-infinite-scroll-component';
import Link from 'next/link';
import ShareMenu from 'components/SecondaryNavbar/ShareMenu';
import { MenuItem } from 'components/Menu';
import { NFTCardMain } from 'components/NFTTile/NFTCard';
import { GridContainer } from 'components/common/elements';

const StatsComp = ({
  label,
  value,
  isEthereumIcon = true,
  isPercentIcon = false,
}) => {
  const valueRounded = new Intl.NumberFormat('en', {
    notation: 'compact',
    compactDisplay: 'short',
  }).format(value);
  return (
    (<Box
      sx={{
        borderRight: '1px solid #fff',
        padding: '0.2rem 1.6rem',
        '&:last-child': { borderRight: 'none' },
      }}
    >
      <CollectionStatusValue>
        <span>
          {isEthereumIcon && 'Ξ'}{" "}
          {valueRounded ? `${valueRounded}${isPercentIcon ? '%' : ''}` : 0}
        </span>
      </CollectionStatusValue>
      <CollectionStatusLabel>{label}</CollectionStatusLabel>
    </Box>)
  );
};

export function Collection({
  contractDetailsData,
  contractStatsData,
  contractNftsData,
  nftDetails
}) {
  const { t } = useTranslation();

  const router = useRouter();
  const { address } = router.query;
  const [priceDuration, setPriceDuration] = useState(30);
  const [volumeDuration, setVolumeDuration] = useState(30);
  const [collectorGrowthDuration, setCollectorGrowthDuration] = useState(30);
  const [salesDuration, setSalesDuration] = useState(30);
  const [contractDetails] = useState(contractDetailsData || {});
  const [contractStats] = useState(contractStatsData || {});
  const [contractNfts, setContractNfts] = useState(contractNftsData || []);
  const [contractPricingHistory, setcontractPricingHistory] = useState([]);
  const [contractVolumeHistory, setContractVolumeHistory] = useState([]);
  const [collectorGrowth, setCollectorGrowth] = useState([]);
  const [salesHistory, setSalesHistory] = useState([]);

  const [contractNFTLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const [offset, setOffset] = useState(0);
  const [isAllNftsCompleted, setIsAllNftsCompleted] = useState(false);

  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  function getData(
    rgb1,
    rgb2,
    rgb3,
    lineColor,
    pointColor,
    historyData,
    countKey,
  ) {
    return () => {
      setLoading(true);
      let ctx = document.getElementById('chart').getContext('2d');
      let gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0.1, rgb1);
      gradient.addColorStop(0.3, rgb2);
      gradient.addColorStop(0.5, rgb3);

      let demodata2 = {
        labels: historyData
          ? historyData.map((item) => timeConverter(item.timestamp))
          : ['jan', 'feb', 'march', 'may', 'june', 'july'],
        datasets: [
          {
            data: historyData
              ? historyData.map((item) => item[countKey])
              : [8, 7, 1, 5, 4, 7.4, 6, 10, 12, 2, 4],
            backgroundColor: gradient,
            borderColor: lineColor,
            pointBorderColor: pointColor,
            pointBackgroundColor: 'transparent',
            pointBorderWidth: 0,
            pointHoverBackgroundColor: lineColor,
            pointHoverBorderColor: lineColor,
            pointHoverBorderWidth: 4,
            tension: 0.4,
            fill: true,
          },
        ],
      };

      setLoading(false);

      return demodata2;
    };
  }

  const getContractPriceHistory = async (duration) => {
    try {
      const contractPricingHistoryData = await fetchContractPriceHistory1(
        address,
        duration,
      );
      setcontractPricingHistory(contractPricingHistoryData);
    } catch (error) {
    } finally {
    }
  };

  const getContractVolumeHistory = async (duration) => {
    try {
      const contractVolumeistoryData = await fetchContractVolumeHistory1(
        address,
        duration,
      );

      setContractVolumeHistory(contractVolumeistoryData);
    } catch (error) {}
  };
  const getContractSalesHistory = async (duration) => {
    try {
      const contractSalesHistory = await fetchContractVolumeHistory1(
        address,
        duration,
      );

      setSalesHistory(contractSalesHistory);
    } catch (error) {}
  };

  const fetchCollectorGrowth = async (duration) => {
    try {
      const growth = await getCollectorGrowth(address, duration);

      setCollectorGrowth(growth || []);
    } catch (error) {}
  };

  const fetchNextContractNfts = async () => {
    const contractNftsData = await fetchAllContractNFTs(address, offset + 1);

    if (!contractNftsData.length) {
      setIsAllNftsCompleted(true);
      return;
    }

    setContractNfts((prevState) => [...prevState, ...contractNftsData]);
    setOffset((prevState) => prevState + 1);
  };

  useEffect(() => {
    if (!address) return;
    getContractPriceHistory(priceDuration);
    getData(
      '#f0ecd9',
      '#fffef9',
      '#ffffff',
      '#fde82f',
      '#fde82f',
      contractPricingHistory,
      'avg',
    );
  }, [address, priceDuration]);

  useEffect(() => {
    if (!address) return;
    getContractVolumeHistory(volumeDuration);
    getData(
      '#f0ecd9',
      '#fffef9',
      '#ffffff',
      '#fde82f',
      '#fde82f',
      contractVolumeHistory,
      'volume',
    );
  }, [address, volumeDuration]);

  useEffect(() => {
    if (!address) return;
    fetchCollectorGrowth(collectorGrowthDuration);
    getData(
      '#f0ecd9',
      '#fffef9',
      '#ffffff',
      '#fde82f',
      '#fde82f',
      collectorGrowth,
      'count',
    );
  }, [address, collectorGrowthDuration]);
  useEffect(() => {
    if (!address) return;
    getContractSalesHistory(salesDuration);
    getData(
      '#f0ecd9',
      '#fffef9',
      '#ffffff',
      '#fde82f',
      '#fde82f',
      salesHistory,
      'quantity',
    );
  }, [address, salesDuration]);

  const bannerImage = changeImageWidth(
    contractDetails?.collection?.banner_image_url
      ? contractDetails?.collection?.banner_image_url
      : contractDetails?.collection?.image_url,
    'w',
    2048,
  );

  const [activeButton, setActiveButton] = useState('nfts');

  const buttonsData = [
    {
      text: 'NFTs',
      value: 'nfts',
      count: contractNfts.length || '',
    },
    {
      text: 'Description',
      value: 'description',
      count: 1,
    },
    {
      text: 'Activity',
      value: 'activity',
      count: 5,
    },
  ];

  const [shareAnchorEl, setShareAnchorEl] = useState(null);
  const [optionAnchorEl, setOptionAnchorEl] = useState(null);
  const [nftUrl, setNftUrl] = useState('');

  const handleShareCollab = (event) => {
    setShareAnchorEl(event.currentTarget);
  };
  const handleOptionNft = (event) => {
    setOptionAnchorEl(event.currentTarget);
  };

  // const optionsVertical = {
  //   chart: {
  //     title: '',
  //     // subtitle: '',
  //   },
  //   legend: { position: 'none' },
  //   colors: ['#004DE6', '#BFCFFF'],
  //   hAxis: {
  //     title: 'Total Population',
  //     minValue: 0,
  //   },
  //   vAxis: {
  //     title: 'City',
  //   },
  //   bars: 'horizontal',
  //   axes: {
  //     y: {
  //       0: { side: 'left' },
  //     },
  //     h: {
  //       0: { side: 'right' },
  //     },
  //   },
  // };

  // const dataVertical = [
  //   ['', ''],
  //   ...topTenCollectors
  // ];

  const open = Boolean(optionAnchorEl);

  const handleClose = () => {
    setOptionAnchorEl(null);
  };

  // useEffect(() => {
  //   if (!activeButton) return;
  //   if (activeButton === 'activity') {
  //     getTopTenCollectors(address);
  //   }
  // }, [activeButton]);

  useEffect(() => {
    if (address && typeof window !== 'undefined') {
      setNftUrl(window.location.href);
    }
  }, [address]);

  return (
    (<div>
      {loading ? (
        <ProfilePageSkeleton />
      ) : (
        <div>
          {contractDetails ? (
            <>
              <CollectionTopContainer bgImage={bannerImage}>
                <CollectionContainerTop>
                  <div>
                    <CollectionTopBelowImageHeading>
                      {contractDetails?.collection?.name ||
                        contractDetails?.name}
                    </CollectionTopBelowImageHeading>
                    <CollectionProfileCard>
                      <Link href={`/${nftDetails?.creator?.address}`}>
                        <ProfileImage
                          component="img"
                          src={
                            contractDetails?.collection?.featured_image_url ||
                            contractDetails?.image_url
                          }
                          alt={contractDetails?.name}
                        />
                      </Link>
                      <div>
                        <ProfileTextPrimary ml={2}>
                          {nftDetails?.creator?.user?.username}
                        </ProfileTextPrimary>
                        <ProfileTextSecondary ml={2}>
                          {getSmallAddress(nftDetails?.creator?.address)}
                        </ProfileTextSecondary>
                        {/* <div>
                          {(contractOwner.ens || contractOwner.address) && (
                            <div
                              style={{
                                cursor: 'pointer',
                                // display: 'flex',
                                // alignItems: 'center',
                              }}
                            >

                              {contractOwner.ens ? (
                                <Link href={`/${contractOwner.address}`}>
                                  <ProfileTextSecondary>
                                  By {contractOwner.ens}
                                  </ProfileTextSecondary>
                                </Link>
                              ) : (
                                <Link href={`/${contractOwner.address}`}>
                                  <ProfileTextSecondary>
                                  By {getSmallAddress(contractOwner.address)}
                                  </ProfileTextSecondary>
                                </Link>
                              )}
                            </div>
                          )}
                        </div> */}
                        {/* <ProfileTextSecondary>
                          Chain : {contractDetails?.chain_identifier}
                        </ProfileTextSecondary> */}
                        {/* <ProfileTextSecondary>
                          Created On :{' '}
                          {timeConverter(
                            contractDetails?.collection?.created_date,
                            true,
                          )}
                        </ProfileTextSecondary> */}
                      </div>
                    </CollectionProfileCard>
                  </div>
                  <CollectionTopBelowImageLinks>
                    {(contractDetails.external_url ||
                      contractDetails.external_link) && (
                      // <Link target='_blank' href={contractDetails.external_url || contractDetails.external_link}>
                      (<CollectionTopBelowImageLink onClick={handleShareCollab}>
                        <ImageIcon size={'32px'} icon={ShareIcon} />
                      </CollectionTopBelowImageLink>)
                      // </Link>
                    )}

                    <Menu
                      anchorEl={optionAnchorEl}
                      id="account-menu"
                      open={open}
                      disableScrollLock={false}
                      onClose={handleClose}
                      onClick={handleClose}
                      PaperProps={shareDropdownPaperProps}
                      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                      {(contractDetails.external_url ||
                        contractDetails.external_link) && (
                        <Link
                          target="_blank"
                          href={
                            contractDetails.external_url ||
                            contractDetails.external_link
                          }
                        >
                          <MenuItem>{t("External Website")}</MenuItem>
                        </Link>
                      )}

                      {contractDetails?.collection?.twitter_username && (
                        <Link
                          target="_blank"
                          href={`https://twitter.com/${contractDetails?.collection?.twitter_username}`}
                        >
                          <MenuItem>{t("Twitter")}</MenuItem>
                        </Link>
                      )}
                      {contractDetails?.collection?.discord_url && (
                        <Link
                          target="_blank"
                          href={`${contractDetails?.collection?.discord_url}`}
                        >
                          <MenuItem>{t("Discord")}</MenuItem>
                        </Link>
                      )}
                    </Menu>

                    <ShareMenu
                      shareAnchorEl={shareAnchorEl}
                      setShareAnchorEl={setShareAnchorEl}
                      // collabBelongsToLoginUser={isCollabBelongsToLoginUser}
                      collabUrl={nftUrl}
                    />

                    {contractDetails?.collection?.twitter_username && (
                      <CollectionTopBelowImageLink>
                        <ImageIcon
                          size={'32px'}
                          onClick={handleOptionNft}
                          icon={MenuDotsIcon}
                        />
                      </CollectionTopBelowImageLink>
                    )}
                  </CollectionTopBelowImageLinks>
                </CollectionContainerTop>
                <CollectionTopBelowContainer>
                  <div>
                    <ProfileTextPrimary mb='10px'>{t("Info")}</ProfileTextPrimary>
                    <ProfileTextSecondary>{t("Chain: ")}{contractDetails?.chain_identifier}
                    </ProfileTextSecondary>
                    <ProfileTextSecondary>{t("Created On: ")}{" "}
                      {timeConverter(
                        contractDetails?.collection?.created_date,
                        true,
                      )}
                    </ProfileTextSecondary>
                  </div>
                  <CollectionTopBelowContainerCenter>
                    <Avatar
                      avatar={
                        contractDetails.collection?.image_url ||
                        contractDetails.collection?.featured_image_url
                      }
                      size="200px"
                      borderRadius="50%"
                      borderColor={theme.palette.background.paper}
                      borderSize={'2px'}
                      withBorder={'true'}
                    />
                  </CollectionTopBelowContainerCenter>
                  <ContainerCenterEmptyBox />
                </CollectionTopBelowContainer>

                {contractStats && (
                  <CollectionTopBelowStatusGrid>
                    <CollectionTopBelowStatusGridSection>
                      <StatsComp
                        label="Floor"
                        isEthereumIcon={true}
                        value={contractStats?.floor_price}
                      />
                      <StatsComp
                        label="MCAP"
                        isEthereumIcon={true}
                        value={
                          contractStats?.market_cap &&
                          contractStats?.market_cap.toFixed(2)
                        }
                      />
                      <StatsComp
                        label="Avg"
                        value={
                          contractStats?.average_price &&
                          contractStats?.average_price.toFixed(2)
                        }
                      />
                      <StatsComp
                        isEthereumIcon={true}
                        label="Volume"
                        value={
                          contractStats?.total_volume &&
                          contractStats?.total_volume.toFixed(2)
                        }
                      />
                    </CollectionTopBelowStatusGridSection>
                    <CollectionTopBelowStatusGridSection>
                      <StatsComp
                        label="#Sales"
                        value={contractStats?.total_sales}
                        isEthereumIcon={false}
                      />
                      <StatsComp
                        isEthereumIcon={false}
                        label="Owners"
                        value={contractStats?.num_owners}
                      />
                      <StatsComp
                        isEthereumIcon={false}
                        label="Items"
                        value={contractStats?.count}
                      />
                      <StatsComp
                        isEthereumIcon={false}
                        label={t("Creator Earnings")}
                        isPercentIcon
                        value={
                          contractDetails?.collection &&
                          (Object.values(
                            contractDetails?.collection?.fees?.seller_fees,
                          ) ||
                            contractDetails?.dev_seller_fee_basis_points
                          )/10}
                      />
                    </CollectionTopBelowStatusGridSection>
                  </CollectionTopBelowStatusGrid>
                )}
              </CollectionTopContainer>

              <Box>
                <NavTopContainer>
                  <NavButtonGroup
                    buttonsData={buttonsData}
                    activeButton={activeButton}
                    setActiveButton={setActiveButton}
                    sx={{padding: '25px 30px'}}
                    showBorderTop={true}
                    showBorderBottom={true}
                  />
                </NavTopContainer>
              </Box>

              <MarginContainer>
                <Box>
                  {activeButton == 'nfts' && (
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
                              // const uriOriginal =
                              //   item?.metadata?.image?.uriOriginal;
                              // const imageSrc =
                              //   uriOriginal &&
                              //   uriOriginal.slice(0, 7) === 'ipfs://'
                              //     ? `https://ipfs.io/ipfs/${uriOriginal.slice(
                              //         7,
                              //         uriOriginal.length,
                              //       )}`
                              //     : item?.metadata?.image?.uri
                              //     ? item?.metadata?.image?.uri
                              //     : item?.metadata?.image?.uriOriginal;
                              // const imageSrc = item.metadata.image.uri ||  getCorrectImage(item?.metadata?.metadataUri?.uri)

                              return !item.metadata ? null : (
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
                                  metadataUri={item?.metadata?.metadataUri?.uri}
                                  imgSrc={item?.metadata?.image?.uri}
                                  creatorName={
                                    contractDetails?.collection?.name ||
                                    contractDetails?.name
                                  }
                                  creatorImage={
                                    contractDetails.collection?.image_url ||
                                    contractDetails.collection
                                      ?.featured_image_url
                                  }
                                  title={item?.metadata?.name || item.tokenId}
                                  description={
                                    item?.metadata?.description &&
                                    item.metadata.description.slice(0, 200)
                                  }
                                />)
                                // </Link>
                              );
                            })}
                          </GridContainer>
                        </InfiniteScroll>
                      ) : contractNFTLoading ? (
                        <CollectionLoadingSkeleton />
                      ) : (
                        'No NFTs Found'
                      )}
                    </>
                  )}
                  {activeButton === 'description' && (
                    <div>
                      <Box style={{ margin: '0 0 2rem 0', color: theme.palette.text.primary }}>
                        {contractDetails?.collection?.description}
                      </Box>
                    </div>
                  )}
                  {activeButton === 'activity' && (
                    <div>
                      <LineGraphBox
                        title='Price Trend'
                        data={getGraphData(
                          isDarkMode,
                          contractPricingHistory,
                          'avg',
                        )}
                        onClick1={() => setPriceDuration(1)}
                        onClick7={() => setPriceDuration(7)}
                        onClick30={() => setPriceDuration(30)}
                        onClick365={() => setPriceDuration(365)}
                        isBold={priceDuration}
                      />
                      <Spacer value={60} />{" "}
                      <LineGraphBox
                        title='Sales Trend'
                        data={getGraphData(
                          isDarkMode,
                          salesHistory,
                          'quantity',
                        )}
                        onClick1={() => setSalesDuration(1)}
                        onClick7={() => setSalesDuration(7)}
                        onClick30={() => setSalesDuration(30)}
                        onClick365={() => setSalesDuration(365)}
                        isBold={salesDuration}
                      />
                      <Spacer value={60} />
                      <LineGraphBox
                        title='Volume Trend'
                        data={getGraphData(
                          isDarkMode,
                          contractVolumeHistory,
                          'volume',
                        )}
                        onClick1={() => setVolumeDuration(1)}
                        onClick7={() => setVolumeDuration(7)}
                        onClick30={() => setVolumeDuration(30)}
                        onClick365={() => setVolumeDuration(365)}
                        isBold={volumeDuration}
                      />
                      <Spacer value={60} />
                      <LineGraphBox
                        title='Collector Growth'
                        data={getGraphData(
                          isDarkMode,
                          collectorGrowth,
                          'count',
                        )}
                        onClick1={() => setCollectorGrowthDuration(1)}
                        onClick7={() => setCollectorGrowthDuration(7)}
                        onClick30={() => setCollectorGrowthDuration(30)}
                        onClick365={() => setCollectorGrowthDuration(365)}
                        isBold={collectorGrowthDuration}
                      />
                      <Spacer value={60} />
                      {/* <h2>
                        Top 10 Collectors of Contract (
                        {getSmallAddress(address)})
                      </h2> */}
                      {/* {topTenCollectors !== undefined &&
                      topTenCollectors.length > 2 ? (
                        <div
                          style={{
                            margin: '50px 0 20px 60px',
                            width: '600px',
                            display: '',
                            justifyContent: 'center',
                          }}
                          onClick={handleTopTenCollectorClick}
                          className="graphGap"
                        >
                          <Chart
                            chartType="Bar"
                            width="100%"
                            style={{backgroundColor: "#000000"}}
                            height={
                              topTenCollectors.length < 2 ? '70px' : '400px'
                            }
                            data={[['', ''], ...topTenCollectors]}
                            options={optionsVertical}
                          />
                        </div>
                      ) : topTenCollectorsLoading ? (
                        <SkeletonLoader
                          margin={'-3rem 0 0rem 1.5rem'}
                          height={250}
                        />
                      ) : (
                        'No Collectors Found'
                      )} */}
                    </div>
                  )}
                  {/* <TabContext value={value}>
                    <Box sx={{ borderBottom: 2, borderColor: 'divider' }}>
                      <TabList onChange={handleChange}>
                        <CollectionBottomTabs
                          label="Items"
                          value="1"
                          // active={value == 1 ? true : false}
                        />
                        <CollectionBottomTabs
                          label="Stats"
                          value="2"
                          // active={value == 2 ? true : false}
                        />
                      </TabList>
                    </Box>
                    <TabPanel value="1" sx={{ padding: theme.spacing(3, 0) }}>
                      {contractNfts && contractNfts.length ? (
                        <CollabsExploreContainerGrid>
                          {contractNfts.map((item, index) => {
                            const uriOriginal =
                              item?.metadata?.image?.uriOriginal;
                            const imageSrc =
                              uriOriginal &&
                              uriOriginal.slice(0, 7) === 'ipfs://'
                                ? `https://ipfs.io/ipfs/${uriOriginal.slice(
                                    7,
                                    uriOriginal.length,
                                  )}`
                                : item?.metadata?.image?.uri
                                ? item?.metadata?.image?.uri
                                : item?.metadata?.image?.uriOriginal;

                            return !item.metadata ||
                              !item?.metadata?.name ? null : (
                              <NFTCard
                                key={index}
                                onClick={() =>
                                  router.push(
                                    `/nft/${item?.contractAddress}/${item?.tokenId}`,
                                  )
                                }
                                imgSrc={imageSrc}
                                title={item?.metadata?.name}
                                description={
                                  item?.metadata?.description &&
                                  item.metadata.description.slice(0, 200)
                                }
                              />
                            );
                          })}
                        </CollabsExploreContainerGrid>
                      ) : contractNFTLoading ? (
                        <CollectionLoadingSkeleton />
                      ) : (
                        'No NFTs Found'
                      )}
                    </TabPanel>
                    <TabPanel value="2">
                      <div>
                        <LineGraphBox
                          title={`Pricing History of Contract (${getSmallAddress(
                            address,
                          )}) `}
                          data={getData(
                            '#d9def0',
                            '#f2f5ff',
                            '#ffffff',
                            '#2f62fd',
                            '#2f62fd',
                            contractPricingHistory,
                          )}
                          onClick1={() => setPriceDuration(1)}
                          onClick7={() => setPriceDuration(7)}
                          onClick30={() => setPriceDuration(30)}
                          onClick365={() => setPriceDuration(365)}
                          isBold={priceDuration}
                        />
                        <LineGraphBox
                          title={`Volume History of Contract (${getSmallAddress(
                            address,
                          )}) `}
                          data={getData(
                            '#e2d5f0',
                            '#fdfbff',
                            '#ffffff',
                            '#8a2ffd',
                            '#8a2ffd',
                            contractVolumeHistory,
                            true,
                          )}
                          onClick1={() => setVolumeDuration(1)}
                          onClick7={() => setVolumeDuration(7)}
                          onClick30={() => setVolumeDuration(30)}
                          onClick365={() => setVolumeDuration(365)}
                          isBold={volumeDuration}
                        />
                      </div>
                    </TabPanel>
                  </TabContext> */}
                </Box>
              </MarginContainer>
            </>
          ) : (
            'Something Went Wrong! try again later'
          )}
        </div>
      )}
    </div>)
  );
}
