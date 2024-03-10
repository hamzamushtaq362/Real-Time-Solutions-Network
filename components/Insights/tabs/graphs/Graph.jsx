import React, { useEffect } from 'react';
import LineGraphBox from 'subcomponents/graphs/LineGraph';

export default function Graph({
  title,
  data,
  allLabels,
  duration,
  setDuration,
  showDurationButtons,
  height,
  is1 = false,
  is7 = false,
  is30 = false,
  is365 = false,
  is1Border = true,
  is7Border = true,
  is30Border = true,
  is365Border = false,
}) {
  function getData(rgb1, rgb2, rgb3, lineColor, pointColor, data, allLabels) {
    return () => {
      let ctx = document.getElementById('chart').getContext('2d');
      let gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0.1, rgb1);
      gradient.addColorStop(0.3, rgb2);
      gradient.addColorStop(0.5, rgb3);

      let demodata2 = {
        labels: allLabels
          ? allLabels
          : ['jan', 'feb', 'march', 'may', 'june', 'july'],
        datasets: [
          {
            data: data ? data : [8, 7, 1, 5, 4, 7.4, 6, 10, 12, 2, 4],
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

  useEffect(() => {
    getData(
      '#f0ecd9',
      '#fffef9',
      '#ffffff',
      '#fde82f',
      '#fde82f',
      data,
      allLabels,
      height,
    );
  }, [data, allLabels]);

  return (
    <LineGraphBox
      title={title}
      data={getData(
        '#d9def0',
        '#f2f5ff',
        '#ffffff',
        '#2f62fd',
        '#2f62fd',
        data,
        allLabels,
      )}
      onClick1={is1 ? () => setDuration(1) : ''}
      onClick7={is7 ? () => setDuration(7) : ''}
      onClick30={is30 ? () => setDuration(30) : ''}
      onClick365={is365 ? () => setDuration(365) : ''}
      isBold={duration}
      showDurationButtons={showDurationButtons}
      height={height}
      is1Border={is1Border}
      is7Border={is7Border}
      is30Border={is30Border}
      is365Border={is365Border}
    />
  );
}
