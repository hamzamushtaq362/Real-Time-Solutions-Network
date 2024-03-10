const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const timeConverter = (date, isYear = false) => {
  const a = new Date(date);
  const year = a.getFullYear();
  const month = months[a.getMonth()];
  const day = a.getDate() < 10 ? '0' + a.getDate() : a.getDate();
  if (isYear) {
    return day + ' ' + month + ' ' + year;
  }
  return day + ' ' + month;
};

export const getMonthYear = (date) => {
  if (!date) {
    return null;
  }

  const a = new Date(date);
  const year = a.getFullYear();
  const month = months[a.getMonth()];
  return month + ' ' + year;
};

// get time like 06:12 PM from the datetime
export const getTimeFromDate = (myDate) => {
  const date = new Date(myDate);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  let strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
};

// get date like "12 Nov" from "2023-11-12"
export function formatLocalDate(dateString) {
  const date = new Date(dateString);
  const localizedDate = date.toLocaleDateString();
  const [, day] = localizedDate.split(/\/|-/);
  const monthAbbreviation = new Intl.DateTimeFormat('en', {
    month: 'short',
  }).format(date);

  return `${day} ${monthAbbreviation}`;
}

export const parseTimestampToMinutes = (timestamp) => {
  if (timestamp.includes('seconds')) {
    // Consider "few seconds ago" as 5 seconds
    return 5;
  } else if (timestamp.includes('half a minute')) {
    return 30; // Half a minute ago is considered as 30 seconds
  } else {
    const [value, unit] = timestamp.split(' ');

    let multiplier;
    if (unit === 'seconds' || unit === 'second') {
      multiplier = 1;
    } else if (unit === 'minutes' || unit === 'minute') {
      multiplier = 60;
    } else if (unit === 'hours' || unit === 'hour') {
      multiplier = 3600; // 1 hour = 60 minutes = 3600 seconds
    } else if (unit === 'days' || unit === 'day') {
      multiplier = 86400; // 1 day = 24 hours = 86400 seconds
    }

    return parseInt(value) * multiplier;
  }
};

export const sortByTimestamp = (a, b) => {
  const minutesAgoA = parseTimestampToMinutes(a.timeStamp);
  const minutesAgoB = parseTimestampToMinutes(b.timeStamp);

  return minutesAgoA - minutesAgoB; // Sort in ascending order
};