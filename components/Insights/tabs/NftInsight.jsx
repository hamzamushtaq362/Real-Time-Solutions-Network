import { useTranslation } from 'react-i18next';
import React from 'react';
import { GraphCont } from './element';
import Graph from './graphs/Graph';
import { timeConverter } from '~/utils';
import SkeletonLoader from './SkeletonLoader';
// import './index.css';

export default function NFTInsight({
  contractPricingHistory,
  contractVolumeHistory,
  priceHistoryDuration,
  setPriceHistoryDuration,
  volumeHistoryDuration,
  setVolumeHistoryDuration,
  contractSalesHistory,
  salesHistoryDuration,
  setSalesHistoryDuration,
}) {
  const { t } = useTranslation();

  return (<>
    <GraphCont>
      {contractPricingHistory.length ? (
        <Graph
          title={t("Floor Price")}
          height={100}
          data={contractPricingHistory.map((item) => item.min)}
          allLabels={contractPricingHistory.map((item) =>
            timeConverter(item.timestamp),
          )}
          duration={priceHistoryDuration}
          setDuration={setPriceHistoryDuration}
          is1
          is7
          is30
          is365
        />
      ) : (
        <SkeletonLoader />
      )}

      {contractVolumeHistory.length ? (
        <Graph
          title={'Volume'}
          is7
          is30
          data={contractVolumeHistory.map((item) => item.volume)}
          allLabels={contractVolumeHistory.map((item) =>
            timeConverter(item.timestamp),
          )}
          duration={volumeHistoryDuration}
          setDuration={setVolumeHistoryDuration}
        />
      ) : (
        <SkeletonLoader />
      )}

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
    </GraphCont>
  </>);
}
