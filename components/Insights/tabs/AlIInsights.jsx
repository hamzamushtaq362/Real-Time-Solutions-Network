import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { Button, Flex, GraphCont } from './element';
import Graph from './graphs/Graph';
import { Chart } from 'react-google-charts';
import {
  fetchAllContractNFTsUsingNFTPORT1,
  fetchCollectorDistributionByNFTs1,
  fetchNFTHoldings1,
} from '~/apis';
import { useEffect } from 'react';
import { getSmallAddress, getTimeFromDate, timeConverter } from '~/utils';
import MultiSelectDropdown from 'subcomponents/dropdowns/MultiSelectDropdown';
import { TopBar } from 'subcomponents/graphs/LineGraph';
import SkeletonLoader from './SkeletonLoader';

export default function AllInsights({
  address,
  currentChain,
  contractPricingHistory,
  contractVolumeHistory,
  contractSalesHistory,
  priceHistoryDuration,
  setPriceHistoryDuration,
  volumeHistoryDuration,
  setVolumeHistoryDuration,
  salesHistoryDuration,
  setSalesHistoryDuration,
  contractOwnerCounts,
  ownerCountDuration,
  setOwnerCountDuration,
  topTenCollectors,
  topTenCollectorsLoading,
  topTenCollectorsAddressFull,
}) {
  const [isUniqueData, setIsUniqueData] = useState(false);
  const { t } = useTranslation();

  // Loadings
  const [collectorDistributionLoading, setCollectorDistributionLoading] =
    useState(true);
  const [nftHoldingLoading, setNftHoldingLoading] = useState(true);

  const [value, setValue] = useState([]);
  const [page, setPage] = useState(1);
  const [collectorDistributionPages, setCollectorDistributionPages] =
    useState(1);
  const [collectorDistributionValue, setCollectorDistributionValue] = useState(
    [],
  );
  const [contractHolders, setContractHolders] = useState([]);
  const [contractNFTs, setContractNFTs] = useState([]);
  const [totalDistributon, setTotalDistributon] = useState([]);
  const [uniqueDistributon, setUniqueDistributon] = useState([]);


  const totalDistributionData = [
    // ['NFT', 'Collector'],
    ['', ''],
    // ['2014', 1000, 400],
    ...totalDistributon,
  ];
  const uniqueDistributionData = [
    // ['NFT', 'Collector'],
    ['', ''],
    // ['2014', 1000, 400],
    ...uniqueDistributon,
  ];

  const options = {
    chart: {
      // title: 'Collector Distribution across NFTs',
      title: '',
      // subtitle: '',
    },
    legend: { position: 'none' },
    isStacked: true,
    colors: ['#004DE6', '#D8DAE6'],
  };

  const optionsVertical = {
    chart: {
      title: '',
      // subtitle: '',
    },
    legend: { position: 'none' },
    colors: ['#004DE6', '#BFCFFF'],
    hAxis: {
      title: 'Total Population',
      minValue: 0,
    },
    vAxis: {
      title: 'City',
    },
    bars: 'horizontal',
    axes: {
      y: {
        0: { side: 'left' },
      },
      h: {
        0: { side: 'right' },
      },
    },
  };

  const dataVertical = [
    // ['Address', 'Count'],
    ['', ''],
    // ['2015', 2],
    ...topTenCollectors,
  ];

  const multipleChartOptions = {
    title: '',
    // chartArea: { width: "50%" },
    isStacked: true,
    hAxis: {
      // title: 'NFTs',
      title: '',
      minValue: 0,
    },
    vAxis: {
      // title: 'Collectors',
      title: '',
    },
    legend: { position: 'none' },
    colors: ['#004DE6', '#6389FF', '#BFCFFF'],
  };

  const getNFTHoldings = async (address, contractHolders) => {
    try {
      setNftHoldingLoading(true);
      const data = [];
      for (let i = 0; i < contractHolders.length; i++) {
        const contractHoldingData = await fetchNFTHoldings1(
          address,
          contractHolders[i].token_id,
          currentChain,
        );
        if (Math.max(...contractHoldingData) !== 0) {
          contractHoldingData.unshift(contractHolders[i].metadata.name);
          data.push(contractHoldingData);
        }
      }

      setContractHolders(data);
    } catch (error) {
      //
    } finally {
      setNftHoldingLoading(false);
    }
  };

  const getCollectorDistribution = async (address, selectedNfts) => {
    try {
      setCollectorDistributionLoading(true);
      let finalData = { unique: [], total: [] };
      for (let i = 0; i < selectedNfts.length; i++) {
        const collectorDistribution = await fetchCollectorDistributionByNFTs1(
          address,
          selectedNfts[i].token_id,
          currentChain,
        );
        finalData.unique.push([
          selectedNfts[i].metadata.name,
          collectorDistribution.uniqueCount,
        ]);
        finalData.total.push([
          selectedNfts[i].metadata.name,
          collectorDistribution.totalCount,
        ]);
      }
      setUniqueDistributon(finalData.unique);
      setTotalDistributon(finalData.total);
    } catch (error) {
      //
    } finally {
      setCollectorDistributionLoading(false);
    }
  };

  const getContractNFTs = async (address, page) => {
    try {
      const contractNftsData = await fetchAllContractNFTsUsingNFTPORT1(
        address,
        page,
        50,
        currentChain,
      );
      setContractNFTs(contractNftsData);
    } catch (error) {
      //
    } finally {
      //
    }
  };
  const handleTopTenCollectorClick = (e) => {
    const value = e.target.innerHTML;
    if (!value) return;
    for (let i = 0; i < topTenCollectorsAddressFull.length; i++) {
      const element = topTenCollectorsAddressFull[i];
      if (getSmallAddress(element) == value) {
        window.open(`/collector/${element}`, '_blank');
      }
    }
  };

  useEffect(() => {
    if (address && currentChain) {
      getContractNFTs(address, page);
    }
  }, [address, currentChain, page]);

  useEffect(() => {
    if (address && currentChain && collectorDistributionValue.length) {
      getCollectorDistribution(address, collectorDistributionValue);
    }
  }, [address, currentChain]);

  useEffect(() => {
    if (collectorDistributionValue.length) {
      getCollectorDistribution(address, collectorDistributionValue);
    }
  }, [collectorDistributionValue]);
  useEffect(() => {
    if (value.length) {
      getNFTHoldings(address, value);
    }
  }, [value]);

  useEffect(() => {
    getContractNFTs(address, collectorDistributionPages);
  }, [collectorDistributionPages]);

  return (<>
    <GraphCont>
      <div className="grid">
        {contractPricingHistory.length ? (
          <Graph
            title={t("Floor Price")}
            height={100}
            data={contractPricingHistory.map((item) => item.min)}
            allLabels={
              priceHistoryDuration === 1
                ? contractPricingHistory.map((item) =>
                    getTimeFromDate(item.timestamp),
                  )
                : contractPricingHistory.map((item) =>
                    timeConverter(item.timestamp),
                  )
            }
            duration={priceHistoryDuration}
            setDuration={setPriceHistoryDuration}
            is1
            is7
            is30
            is365
            showDurationButtons={true}
          />
        ) : (
          <SkeletonLoader />
        )}

        {contractVolumeHistory.length ? (
          <Graph
            height={200}
            title={'Volume'}
            is7
            is30
            is1Border={false}
            is365Border={false}
            is30Border={false}
            data={contractVolumeHistory.map((item) => item.volume)}
            allLabels={contractVolumeHistory.map((item) =>
              timeConverter(item.timestamp),
            )}
            duration={volumeHistoryDuration}
            setDuration={setVolumeHistoryDuration}
          />
        ) : (
          <SkeletonLoader height={210} />
        )}
      </div>
      <div className="grid">
        {contractOwnerCounts.length ? (
          <Graph
            title={t("Collector Growth")}
            height={140}
            data={contractOwnerCounts.map((item) => item.count)}
            allLabels={
              ownerCountDuration === 1
                ? contractOwnerCounts.map((item) =>
                    getTimeFromDate(item.timestamp),
                  )
                : contractOwnerCounts.map((item) =>
                    timeConverter(item.timestamp),
                  )
            }
            duration={ownerCountDuration}
            setDuration={setOwnerCountDuration}
            is1
            is7
            is30
            is365
          />
        ) : (
          <SkeletonLoader />
        )}
        <div className="lg">
          <TopBar
            showDurationButtons={true}
            // title="Collector Distribution Across NFTs"
            title={t("Collector Distribution")}
          >
            <Flex>
              <Button
                index={0}
                isActive={!isUniqueData ? true : false}
                onClick={() => setIsUniqueData(false)}
              >{t("Total")}</Button>
              <Button
                index={1}
                isActive={isUniqueData ? true : false}
                onClick={() => setIsUniqueData(true)}
              >{t("Unique")}</Button>
            </Flex>

            {contractNFTs?.nfts && (
              <MultiSelectDropdown
                value={collectorDistributionValue}
                setValue={setCollectorDistributionValue}
                options={contractNFTs?.nfts || []}
                page={collectorDistributionPages}
                setPage={setCollectorDistributionPages}
                count={Math.floor(contractNFTs?.total / 50)}
                defaultValue={
                  contractNFTs?.nfts.length > 1
                    ? [
                        contractNFTs?.nfts[0],
                        contractNFTs?.nfts[1],
                        contractNFTs?.nfts[2],
                        contractNFTs?.nfts[3],
                        contractNFTs?.nfts[4],
                      ]
                    : [contractNFTs?.nfts[0]]
                }
                limit={5}
              />
            )}
          </TopBar>
          {totalDistributon.length > 1 ? (
            <div className="graphGap">
              <Chart
                chartType="Bar"
                height="400px"
                width={'100%'}
                data={
                  isUniqueData
                    ? uniqueDistributionData
                    : totalDistributionData
                }
                options={options}
              />
            </div>
          ) : collectorDistributionLoading ? (
            <SkeletonLoader height={220} margin="-2rem 0 0 1.5rem" />
          ) : (
            <div style={{ margin: '1rem 4rem' }}>{t("No Distribution Found.")}</div>
          )}
        </div>
      </div>
      <div className="grid1">
        <div className="lg">
          <TopBar showDurationButtons={false} title={t("Top Collectors")} />

          {topTenCollectors && topTenCollectors.length ? (
            <div onClick={handleTopTenCollectorClick} className="graphGap">
              <Chart
                chartType="Bar"
                width="100%"
                height={topTenCollectors.length < 2 ? '70px' : '400px'}
                data={dataVertical}
                options={optionsVertical}
              />
            </div>
          ) : topTenCollectorsLoading ? (
            <SkeletonLoader margin={t("-3rem 0 0rem 1.5rem")} height={250} />
          ) : (
            'No Collectors Found'
          )}
        </div>
        <div className="lg">
          <TopBar
            showDurationButtons={true}
            title={t("Average Holding Time Of All Your Collectors")}
          >
            {contractNFTs?.nfts && (
              <MultiSelectDropdown
                value={value}
                setValue={setValue}
                options={contractNFTs?.nfts || []}
                page={page}
                setPage={setPage}
                count={Math.floor(contractNFTs?.total / 50)}
                defaultValue={
                  contractNFTs?.nfts.length > 2
                    ? [
                        contractNFTs?.nfts[0],
                        contractNFTs?.nfts[1],
                        contractNFTs?.nfts[2],
                        contractNFTs?.nfts[3],
                        contractNFTs?.nfts[4],
                      ]
                    : [contractNFTs?.nfts[0], contractNFTs?.nfts[1]]
                }
              />
            )}
          </TopBar>
          {contractHolders.length ? (
            <div className="graphGap">
              <Chart
                chartType="ColumnChart"
                width="100%"
                height="400px"
                data={[
                  ['NFTs', 'Flippers', 'Holders', 'Loyal Collectors'],
                  // ['NFT1', 12, 10, 4],
                  ...contractHolders,
                ]}
                options={multipleChartOptions}
              />
            </div>
          ) : nftHoldingLoading ? (
            <SkeletonLoader height={210} />
          ) : (
            <div style={{ margin: '1rem 4rem' }}>{t("No Holdings Found")}</div>
          )}
        </div>
      </div>
      <Graph
        title={'Sales'}
        data={contractSalesHistory.map((item) => item.count)}
        allLabels={ salesHistoryDuration === 1 ? contractSalesHistory.map((item) =>
          getTimeFromDate(item.timestamp),
        )  : contractSalesHistory.map((item) =>
          timeConverter(item.timestamp),
        )}
        is1
        is7
        is30
        is365
        duration={salesHistoryDuration}
        setDuration={setSalesHistoryDuration}
      />
      {/*{walletData1.length ? (*/}
      {/*  <div className="grid1">*/}
      {/*    <div className="lg">*/}
      {/*      <TopBar*/}
      {/*        showDurationButtons={false}*/}
      {/*        title={t("Wallet Share Of Total Earnings")}*/}
      {/*      ></TopBar>*/}
      {/*      <Chart*/}
      {/*        chartType="PieChart"*/}
      {/*        data={pieData}*/}
      {/*        options={pieOptions}*/}
      {/*        width={'100%'}*/}
      {/*        height={'300px'}*/}
      {/*      />*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*) : (*/}
      {/*  ''*/}
      {/*)}*/}
    </GraphCont>
  </>);
}
