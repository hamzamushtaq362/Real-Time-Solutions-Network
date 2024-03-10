import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { Button, Flex, GraphCont } from './element';
import Graph from './graphs/Graph';
import { Chart } from 'react-google-charts';
import {
  fetchAllContractNFTsUsingNFTPORT,
  fetchCollectorDistributionByNFTs,
  fetchNFTHoldings,
} from '~/apis';
import { timeConverter } from '~/utils';
import MultiSelectDropdown from 'subcomponents/dropdowns/MultiSelectDropdown';
import { TopBar } from 'subcomponents/graphs/LineGraph';
import SkeletonLoader from './SkeletonLoader';
// import './index.css';

export default function CollectorInsights({
  address,
  currentChain,
  contractSalesHistory,
  salesHistoryDuration,
  setSalesHistoryDuration,
  contractOwnerCounts,
  ownerCountDuration,
  setOwnerCountDuration,
  topTenCollectors,
  topTenCollectorsLoading,
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

  const [walletData1] = useState([]);

  const totalDistributionData = [
    ['NFT', 'Collector'],
    // ['2014', 1000, 400],
    ...totalDistributon,
  ];
  const uniqueDistributionData = [
    ['NFT', 'Collector'],
    // ['2014', 1000, 400],
    ...uniqueDistributon,
  ];

  const options = {
    chart: {
      title: 'Collector Distribution across NFTs',
      // subtitle: '',
    },
    legend: { position: 'none' },
    isStacked: true,
    colors: ['#004DE6', '#D8DAE6'],
  };

  const optionsVertical = {
    chart: {
      title: 'Top Collectors',
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
    ['Address', 'Count'],
    // ['2015', 2],
    ...topTenCollectors,
  ];

  const multipleChartOptions = {
    title: '',
    // chartArea: { width: "50%" },
    isStacked: true,
    hAxis: {
      title: 'NFTs',
      minValue: 0,
    },
    vAxis: {
      title: 'Collectors',
    },
    legend: { position: 'none' },
    colors: ['#004DE6', '#6389FF', '#BFCFFF'],
  };

  const multipleChartData = [
    ['NFTs', 'Flippers', 'Holders', 'Loyal Collectors'],
    // ['NFT1', 12, 10, 4],
    ...contractHolders,
  ];

  const pieData = [
    ['Address', 'ETH'],
    // ['Work', 11],
    ...walletData1,
  ];

  const pieOptions = {
    title: '',
    legend: { position: 'none' },
  };

  const getNFTHoldings = async (address, contractHolders) => {
    try {
      setNftHoldingLoading(true);
      const data = [];
      for (let i = 0; i < contractHolders.length; i++) {
        const contractHoldingData = await fetchNFTHoldings(
          address,
          contractHolders[i].token_id,
          contractHolders[i].metadata.name,
          currentChain,
        );
        let checkData = [...contractHoldingData];
        checkData.shift();
        if (Math.max(...checkData) !== 0) {
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
        const collectorDistribution = await fetchCollectorDistributionByNFTs(
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
      const contractNftsData = await fetchAllContractNFTsUsingNFTPORT(
        address,
        page,
        50,
        currentChain,
      );
      setContractNFTs(contractNftsData);
    } catch (error) {
      //
    }
  };

  useEffect(() => {
    if (address && currentChain && value.length) {
      getNFTHoldings(address, value);
    }
  }, [address, value]);

  useEffect(() => {
    if (address && currentChain) {
      getContractNFTs(address, page);
    }
  }, [address, currentChain, page]);

  useEffect(() => {
    if (address && currentChain && collectorDistributionValue.length >= 2) {
      getCollectorDistribution(address, collectorDistributionValue);
    }
  }, [address, currentChain, collectorDistributionValue]);

  return (<>
    <GraphCont>
      <div className="grid">
        {contractOwnerCounts.length ? (
          <Graph
            title={t("Collector Growth")}
            height={100}
            data={contractOwnerCounts.map((item) => item.count)}
            allLabels={contractOwnerCounts.map((item) =>
              timeConverter(item.timestamp),
            )}
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
          <TopBar showDurationButtons={true} title={t("Collector Distribution")}>
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
                  contractNFTs?.nfts
                    ? [
                        contractNFTs?.nfts[0],
                        contractNFTs?.nfts[1],
                        contractNFTs?.nfts[2],
                        contractNFTs?.nfts[3],
                        contractNFTs?.nfts[4],
                      ]
                    : []
                }
                limit={5}
              />
            )}
          </TopBar>
          {totalDistributon.length ? (
            <Chart
              chartType="Bar"
              width="100%"
              height="400px"
              data={
                isUniqueData ? uniqueDistributionData : totalDistributionData
              }
              options={options}
            />
          ) : collectorDistributionLoading ? (
            <SkeletonLoader />
          ) : (
            'No Distribution Found.'
          )}
        </div>
      </div>
      <div className="grid1">
        {topTenCollectors && topTenCollectors.length > 3 ? (
          <Chart
            chartType="Bar"
            width="100%"
            height="400px"
            data={dataVertical}
            options={optionsVertical}
          />
        ) : topTenCollectorsLoading ? (
          <SkeletonLoader width="100%" height={550} />
        ) : (
          'No Collectors Found'
        )}
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
                  contractNFTs?.nfts
                    ? [
                        contractNFTs?.nfts[0],
                        contractNFTs?.nfts[1],
                        contractNFTs?.nfts[2],
                        contractNFTs?.nfts[3],
                        contractNFTs?.nfts[4],
                      ]
                    : []
                }
              />
            )}
          </TopBar>
          {contractHolders.length ? (
            <Chart
              chartType="ColumnChart"
              width="100%"
              height="400px"
              data={multipleChartData}
              options={multipleChartOptions}
            />
          ) : nftHoldingLoading ? (
            <SkeletonLoader />
          ) : (
            'No Holdings Found'
          )}
        </div>
      </div>
      <Graph
        title={'Sales'}
        data={contractSalesHistory.map((item) => item.count)}
        allLabels={contractSalesHistory.map((item) =>
          timeConverter(item.timestamp),
        )}
        is1
        is7
        is30
        is365
        duration={salesHistoryDuration}
        setDuration={setSalesHistoryDuration}
      />
      <div className="grid1">
        {walletData1.length && (
          <div className="lg">
            <TopBar
              showDurationButtons={false}
              title={t("Wallet Share Of Total Earnings")}
            ></TopBar>
            {
              walletData1.length && (
                <Chart
                  chartType="PieChart"
                  data={pieData}
                  options={pieOptions}
                  width={'100%'}
                  height={'300px'}
                />
              ) //: (
              //   <SkeletonLoader />
              //)
            }
          </div>
        )}
      </div>
    </GraphCont>
  </>);
}
