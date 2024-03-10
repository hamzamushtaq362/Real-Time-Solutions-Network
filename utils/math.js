export const getPercentage = (partialValue, totalValue, percentSign) => {
  let percentage = (100 * parseInt(partialValue)) / totalValue;
  if (percentSign) {
    return percentage + '%';
  }

  return percentage;
};

export const getShortNumber = (number) => {
  try {
    if (number < 1000) {
      return number;
    }

    let num = parseInt(number);

    num = num.toString().replace(/[^0-9.]/g, '');
    if (num < 1000) {
      return num;
    }
    let si = [
      { v: 1e3, s: 'K' },
      { v: 1e6, s: 'M' },
      { v: 1e9, s: 'B' },
      { v: 1e12, s: 'T' },
      { v: 1e15, s: 'P' },
      { v: 1e18, s: 'E' },
    ];
    let index;
    for (index = si.length - 1; index > 0; index--) {
      if (num >= si[index].v) {
        break;
      }
    }
    return (
      (num / si[index].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') +
      si[index].s
    );
  } catch (error) {
    return number;
  }
};

export const getLimitRecordsByScreenSize = (width) => {
  if (width <= 1800) {
    return 25;
  } else if (width <= 1920) {
    return 30;
  } else if (width <= 2160) {
    return 40;
  } else if (width <= 2880) {
    return 60;
  } else if (width <= 4320) {
    return 130;
  }
};




export function calculatePercentageChangeInSubscriber(countData) {
  if (countData.length < 14) {
    throw new Error('Insufficient data to compare the last 7 days with the previous 7 days.');
  }

  countData.sort((a, b) => (a._id > b._id) ? 1 : -1); // Sort the array by date

  const lastDayIndex = countData.length - 1;
  const last7DaysCount = countData.slice(lastDayIndex - 6, lastDayIndex + 1).map(obj => obj.count);
  const previous7DaysCount = countData.slice(lastDayIndex - 13, lastDayIndex - 6).map(obj => obj.count);

  const sumLast7Days = last7DaysCount.reduce((total, count) => total + count, 0);
  const sumPrevious7Days = previous7DaysCount.reduce((total, count) => total + count, 0);

  const percentageChange = ((sumLast7Days - sumPrevious7Days) / sumPrevious7Days) * 100;
  const increase = percentageChange > 0;
  const absPercentageChange = Math.abs(percentageChange).toFixed(2);

  return {
    totalCount: sumLast7Days,
    percentageChange: absPercentageChange,
    increase: increase,
  };
}
