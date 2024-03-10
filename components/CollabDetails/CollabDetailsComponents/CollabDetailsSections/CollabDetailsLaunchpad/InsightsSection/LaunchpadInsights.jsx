import React, { useState } from 'react';
import LaunchpadInsightStats from './LaunchpadInsightStats';
import { getRtsnSubscribers } from 'apis/launchpad';
import { useEffect } from 'react';
import LineGraphBox from 'subcomponents/graphs/LineGraph';
import { formatLocalDate } from 'utils/timeConverter';
import { calculatePercentageChangeInSubscriber } from 'utils/math';

function getData(rgb1, rgb2, rgb3, lineColor, pointColor, data) {
  return () => {
    let ctx = document.getElementById('chart').getContext('2d');
    let gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0.1, rgb1);
    gradient.addColorStop(0.3, rgb2);
    gradient.addColorStop(0.5, rgb3);

    let demodata2 = {
      labels: data
        ? data.map((item) => formatLocalDate(item._id))
        : ['jan', 'feb', 'march', 'may', 'june', 'july'],
      datasets: [
        {
          data: data
            ? data.map((item) => item.count)
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

    return demodata2;
  };
}

export default function LaunchpadInsights({ collabId }) {
  const [rtsnSubscriberGraph, setRtsnSubscriberGraph] = useState([]);
  const [rtsnSubscriberPeriod, setRtsnSubscriberPeriod] = useState('month');

  //   Stats

  const [rtsnSubsriberData, setRtsnSubsriberData] = useState({
    isUp: true,
    percentage: 0,
    count: 0,
  });
  // const router = useRouter();
  // const { collabId } = router.query;
  const discordCount = 10;
  const twitterCount = 4;
  const isLoading = false;

  const fetchRtsnSubscribers = async (period) => {
    const stats = await getRtsnSubscribers(collabId, period);
    setRtsnSubscriberGraph(stats);
    const calculate = calculatePercentageChangeInSubscriber(stats);
    setRtsnSubsriberData({
      count: calculate.totalCount,
      isUp: calculate.increase,
      percentage: calculate.percentageChange,
    });
  };

  useEffect(() => {
    if (!collabId) return;
    fetchRtsnSubscribers();
  }, [collabId, rtsnSubscriberPeriod]);

  return (
    <div>
      <LaunchpadInsightStats
        discordCount={discordCount}
        twitterCount={twitterCount}
        RtsnSubsCount={rtsnSubsriberData}
        isLoading={isLoading}
      />

      {/* <LaunchpadInsightCharts /> */}

      {rtsnSubscriberGraph.length > 0 && (
        <LineGraphBox
          title={`RTSN Subscribers`}
          data={getData(
            '#d9def0',
            '#f2f5ff',
            '#ffffff',
            '#2f62fd',
            '#2f62fd',
            rtsnSubscriberGraph,
          )}
          onClick1={() => setRtsnSubscriberPeriod('today')}
          onClick7={() => setRtsnSubscriberPeriod('week')}
          onClick30={() => setRtsnSubscriberPeriod('month')}
          onClick365={() => setRtsnSubscriberPeriod('all')}
          isBold={rtsnSubscriberPeriod}
        />
      )}
    </div>
  );
}
