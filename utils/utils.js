import { formatDistance } from 'date-fns';
import mixpanel from 'mixpanel-browser';
import { env } from '~/config';
import { useMediaQuery } from '@mui/material';
import { getBadgesMappings, TWO_COL_MAX_WIDTH } from '~/constants';
import { adjectives, nouns } from 'constants/words';
import { timeConverter } from './timeConverter';
import { ethers } from 'ethers';
import { COLLAB_PAYMENT_MODE } from 'constants/collab';
import nookies from 'nookies';

export const getDateDistance = (date) => {
  if (date) {
    let dateDistance = formatDistance(new Date(date), new Date(), {
      addSuffix: true,
      includeSeconds: true,
    });

    const dateDistanceSplit = dateDistance.split(' ');

    if (dateDistanceSplit[0] === 'less' && dateDistanceSplit[1] === 'than') {
      dateDistance = 'few seconds ago';
    }
    return dateDistance.replace('about ', '');
  } else {
    return '';
  }
};

export const truncateString = (text, limit) =>
  text.length > limit ? `${text.substring(0, limit)}...` : text;

export const captilalizeString = (text) =>
  text?.charAt(0).toUpperCase() + text?.slice(1);

export const getAmountAndType = (paymentInfo) => {
  if (!paymentInfo) {
    return 0;
  }
  if (paymentInfo.paymentMode === COLLAB_PAYMENT_MODE.NoPayment) {
    return 0;
  }
  if (paymentInfo.paymentMode === COLLAB_PAYMENT_MODE.FixedPayment) {
    return `${paymentInfo.amount} ${paymentInfo.paymentType}`;
  }
  if (paymentInfo.paymentMode === COLLAB_PAYMENT_MODE.RevenueSharing) {
    return `${paymentInfo.amount} %`;
  }
};

export const getTotalPercetageFromCollabRoles = (roles) => {
  if (roles?.length > 0) {
    let totalPercentage = 0;
    const percetageRoles = roles.filter(
      ({ paymentMode }) => paymentMode === COLLAB_PAYMENT_MODE.RevenueSharing,
    );
    if (percetageRoles?.length > 0) {
      percetageRoles.forEach(({ amount }) => {
        totalPercentage += +amount;
      });
    }
    return totalPercentage;
  }
  return 0;
};

export const openWindowLink = (link) => {
  if (typeof window !== 'undefined') {
    const width = 800;
    const height = 600;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;
    window.open(
      link,
      'share-dialog',
      `width=${width},height=${height},top=${top},left=${left}`,
    );
  }
  return false;
};

export const shareLinkHandler = (type, shareUrl, introText) => {
  switch (type) {
    case 'linkedin':
      openWindowLink(
        `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
      );
      return;
    case 'facebook':
      openWindowLink(
        `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
      );
      return;
    case 'twitter':
      openWindowLink(`https://twitter.com/share?&url=${shareUrl}`);
      return;
    case 'gmail':
      openWindowLink(
        `https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=&su=Share+Collab&body=%27+${shareUrl}+%27&ui=2&tf=1&pli=1`,
      );
      return;
    case 'telegram':
      openWindowLink(`https://telegram.me/share/url?url=${shareUrl}`);
      return;
    case 'whatsapp':
      shareWhatsAppHandler(introText, shareUrl);
      return;
    default:
      return;
  }
};

const shareWhatsAppHandler = (introText = 'Check this out', shareUrl) => {
  const message = `${introText}: ${shareUrl}`;
  const encodedMessage = encodeURIComponent(message);
  const whatsappLink = `https://wa.me/?text=${encodedMessage}`;
  window.open(whatsappLink, '_blank');
};

export const copyToClipBoard = (text) => {
  navigator.clipboard.writeText(text);
};

export const filterAcceptedMembers = (members) => {
  return members.filter(({ member }) => member?.status === 'ACCEPTED');
};

export const dataUrlToFile = async (dataUrl, fileName) => {
  const res = await fetch(dataUrl);
  const blob = await res.blob();
  return new File([blob], fileName, { type: 'image/png' });
};

export const isURL = (url) => {
  const urlPattern = new RegExp(
    '^(https?:\\/\\/)?' + // validate protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
      '(\\#[-a-z\\d_]*)?$',
    'i',
  ); // validate fragment locator
  return !!urlPattern.test(url);
};

export const openLinkInNewTab = (url) => {
  if (typeof window !== 'undefined') {
    if (!/^https?:\/\//i.test(url)) {
      url = 'https://' + url;
    }
    window.open(url, '_blank');
  }
};

export const parseSocialMediaLinks = (userInfo) => {
  const platformsToParse = ['twitter', 'facebook', 'instagram'];
  const updatedSocialMediaLinks = [];
  platformsToParse.forEach((platform) => {
    const link = userInfo[platform];
    if (link) {
      const linkObj = {
        platform,
        link,
      };
      updatedSocialMediaLinks.push(linkObj);
    }
  });
  return updatedSocialMediaLinks;
};

export const parseSocialHandle = (link) => {
  const splitted = link.split('.com/');
  if (splitted.length === 1) {
    return link;
  } else if (splitted.length === 2) {
    if (splitted[1]) {
      return splitted[1];
    } else {
      return link;
    }
  }
};

export const getSmallAddress = (address) => {
  return address
    ? address.slice(0, 6) + '...' + address.slice(address.length - 6)
    : address;
};

export const getImageWithIpfs = (url) => {
  const imageSrc =
    url && url.slice(0, 7) === 'ipfs://'
      ? `https://ipfs.io/ipfs/${url.slice(7, url.length)}`
      : url;

  return imageSrc || url;
};

export const onlyLetters = (str) => {
  return /^[a-zA-Z]+$/.test(str);
};

export const removeBracketsAndGetLinks = (text) => {
  //   var urlRegex = /(https?:\/\/[^\s]+)/g;
  const urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
  const urlRegex1 = text.replace(/ *\[[^\]]*]/, '');
  let regex = / *\(|\)|\[|\]/g;

  let data = urlRegex1.replace(urlRegex, function (url) {
    return (
      ' ' +
      '<a target=`_blank` href="' +
      url +
      '">' +
      ' ' +
      url.slice(8, url.indexOf('.')) +
      ' ' +
      '</a>'
    );
  });

  let result = data.replace(regex, '');

  return result;
};

export const trackMixPanel = async () => {
  if (env !== 'local') {
    const token =
      env === 'staging'
        ? process.env.REACT_APP_MIX_PANEL_ID_STAGING
        : process.env.REACT_APP_MIX_PANEL_ID_PROD;

    mixpanel.init(token, {
      debug: true,
      ignore_dnt: true,
    });

    // mixpanel?.track(eventName, data);
  }
};

export const filterNullValuesFromArray = (array) => {
  const filteredArray = [];
  array.forEach((arrayItem) => {
    if (arrayItem) filteredArray.push(arrayItem);
  });
  return filteredArray;
};

export const isEmailValid = (email) => {
  return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/.test(email);
};

export const filterMongoObjectsFromId = (objects, id) => {
  return objects.filter(({ _id }) => _id !== id);
};

export const forceRoutePush = (url) => {
  history.pushState({ urlPath: url }, '', url);
  window.location.reload(true);
};
export const getRandomAvatar = (username) =>
  `https://source.boringavatars.com/marble/120/${username}?colors=264653,2a9d8f,e9c46a,f4a261,e76f51`;

export const debounce = (func, wait, immediate) => {
  let timeout;
  return function () {
    const context = this,
      args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

export const useIsMobileView = () =>
  !useMediaQuery(`(min-width: ${TWO_COL_MAX_WIDTH}px)`);

export const changeImageWidth = (url, queryKey, newWidth) => {
  const regEx = new RegExp(`${queryKey}=\\d+`);
  return url?.replace(regEx, `${queryKey}=${newWidth}`);
};

export const randomColor = () => {
  let hexString = '0123456789abcdef';
  let hexCode = '#';
  for (let i = 0; i < 6; i++) {
    hexCode += hexString[Math.floor(Math.random() * hexString.length)];
  }
  return hexCode;
};

export const generateGradientColor = (returnClass = true) => {
  // if @param returnClass is false then it returns the color values else return with property.
  let colorOne = randomColor();
  let colorTwo = randomColor();
  let angle = Math.floor(Math.random() * 360);
  if (!returnClass) {
    return { colorOne, colorTwo, angle };
  }
  const gradient = `linear-gradient(${angle}deg, ${colorOne}, ${colorTwo})`;
  return gradient;
};

export const getReadableNumbers = (value) => {
  if (!value) return 0;
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    compactDisplay: 'short',
  }).format(value);
};

export const toTitleCase = (str) => {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};
export const capitalizeWord = (word) =>
  word?.charAt(0).toUpperCase() + word?.slice(1);

export const getRandomLinearGradientStyles = () => {
  const linearGradients = [
    'linear-gradient(to right, #dc2424, #4a569d)',
    'linear-gradient(to right, #24c6dc, #514a9d)',
    'linear-gradient(to right, #283048, #859398)',
    'linear-gradient(to right, #3d7eaa, #ffe47a)',
    'linear-gradient(to right, #1cd8d2, #93edc7)',
    'linear-gradient(to right, #232526, #414345)',
    'linear-gradient(to right, #5c258d, #4389a2)',
    'linear-gradient(to right, #134e5e, #71b280)',
  ];

  const random = Math.floor(Math.random() * linearGradients.length - 1);

  return linearGradients[random];
};

export const isValidEmail = (email) => {
  const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[\w-]{2,}$/;
  return regex.test(email);
};

export const isValidURL = (url) => {
  const urlPattern =
    /^(?:https?:\/\/)?(?:www\.)?([\w.-]+\.[a-zA-Z]{2,})(?:\/.*)?$/;
  return urlPattern.test(url);
};

export const findMissingValue = (arr1, arr2) => {
  /*
  Find the missing value in arr1 that is present in arr2.
  */
  // Convert both arrays to sets for faster lookup
  const set1 = new Set(arr1);
  const set2 = new Set(arr2);

  // Iterate through each value in arr2
  for (let value of set2) {
    // If the value is not in arr1, it is the missing value
    if (!set1.has(value)) {
      return value;
    }
  }

  // If no missing value was found, return null or undefined
  return null; // or undefined
};

// use this to make ipfs url valid to fetch image
export const makeIPFSURLValid = (url) => {
  if (url.includes('ipfs://')) {
    return url.replace('ipfs://', 'https://ipfs.io/ipfs/');
  }
};

// use this to get the correct image from metadataUri of nft
export const getCorrectImage = async (metadataUri) => {
  if (!metadataUri) return metadataUri;
  const validMetadataUri = makeIPFSURLValid(metadataUri);
  const data = await fetch(validMetadataUri);
  const makeJson = await data.json();

  const image = makeJson?.image;
  if (image) {
    return await makeIPFSURLValid(image);
  }
};
export const generateUsername = () => {
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];

  return `${adj}${noun}`;
};
export const isEmpty = (obj) => {
  if (obj) {
    return Object.keys(obj).length === 0;
  }
  return true;
};
export const getTodayDate = () => {
  const now = new Date();
  const date = now.getDate();
  const monthIndex = now.getMonth();
  const monthNames = [
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
  const month = monthNames[monthIndex];
  return `${date} ${month}`;
};

export const getJoinedRewardableBadgesText = (rewardableBadges) => {
  if (rewardableBadges?.length > 0) {
    const res = rewardableBadges
      .map((badge) => getBadgesMappings(badge)?.name)
      .filter(Boolean) // Filter out undefined values
      .join(', ');

    if (!res) {
      // take the badge and replace the _ with space and capitalize the first letter

      const badgeNamesList = rewardableBadges.map((badge) => {
        const badgeName = badge.replace(/-/g, ' ');
        return capitalizeWord(badgeName);
      });
      return badgeNamesList.join(', ');
    } else {
      return res;
    }
  } else {
    return '-';
  }
};

export const darkModeGraphColors = [
  '#2f2f2f',
  '#2f2f2f',
  '#000000',
  '#ffffff',
  '#ffffff',
];
export const lightModeGraphColors = [
  '#A3A3A345',
  '#A3A3A345',
  '#A3A3A31a',
  '#A3A3A3',
  '#2f62fd',
];

export function getGraphData(
  isDarkmode = false,
  historyData,
  countKey,
  dateKey = 'timestamp',
  isFormatEther = false,
) {
  return () => {
    let ctx = document.getElementById('chart').getContext('2d');
    let gradient = ctx.createLinearGradient(0, 0, 0, 400);
    const rgb1 = isDarkmode ? darkModeGraphColors[0] : lightModeGraphColors[0];
    const rgb2 = isDarkmode ? darkModeGraphColors[1] : lightModeGraphColors[1];
    const rgb3 = isDarkmode ? darkModeGraphColors[2] : lightModeGraphColors[2];
    const lineColor = isDarkmode
      ? darkModeGraphColors[3]
      : lightModeGraphColors[3];
    const pointColor = isDarkmode
      ? darkModeGraphColors[4]
      : lightModeGraphColors[4];
    gradient.addColorStop(0.1, rgb1);
    gradient.addColorStop(0.3, rgb2);
    gradient.addColorStop(0.5, rgb3);

    let demodata2 = {
      labels: historyData
        ? historyData.map((item) => timeConverter(item[dateKey]))
        : ['jan', 'feb', 'march', 'may', 'june', 'july'],
      datasets: [
        {
          data: historyData
            ? historyData.map((item) =>
                isFormatEther
                  ? ethers.utils.formatEther(item[countKey])
                  : item[countKey],
              )
            : [8, 7, 1, 5, 4, 7.4, 6, 10, 12, 2, 4],
          backgroundColor: gradient,
          borderColor: lineColor,
          borderWidth: 2,
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

export const removeURLInitials = (url) => {
  return url
    .replace(/(^\w+:|^)\/\//, '') // Removes 'http://', 'https://'
    .replace('www.', '') // Removes 'www.'
    .replace(/\/$/, ''); // Removes trailing '/'
};

export const doNothing = () => {};

export const getTweetIdFromLink = (tweetLink) => {
  try {
    const url = new URL(tweetLink);
    const pathname = url.pathname;
    const tweetIdMatch = pathname.match(/\/status\/(\d+)/);

    if (tweetIdMatch && tweetIdMatch[1]) {
      return tweetIdMatch[1];
    } else {
      throw new Error('Invalid tweet link');
    }
  } catch (error) {
    console.error('Error extracting Tweet ID:', error);
    return null;
  }
};

export const urlToFile = async (url, filename, mimeType) => {
  const response = await fetch(url);
  const data = await response.blob();
  return new File([data], filename, { type: mimeType });
};
export const dataURLtoBlob = (dataUrl) => {
  let arr = dataUrl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
};

export const getFirstName = (fullName) => fullName.split(' ')[0];

export const getRefinedValue = (value) => {
  try {
    const urlObj = new URL(value);
    return (urlObj.pathname + urlObj.search).slice(1);
  } catch (e) {
    return value;
  }
};
export const getRefinedValueForCustomLink = (value) => {
  try {
    const urlObj = new URL(value);
    return urlObj.host + urlObj.pathname + urlObj.search;
  } catch (e) {
    return value;
  }
};

export const getDomainName = (url) => {
  try {
    const domainname = new URL(url).hostname;
    let updatedUrl = domainname.replace('www.', '');
    return updatedUrl;
  } catch (error) {
    return '';
  }
};

export const removeDraftCollabs = (collabs, userId) => {
  return collabs.filter((collab) => {
    if (collab.status === 'draft') {
      return collab.creatorId._id === userId;
    }
    return true;
  });
};

export const ensureHttpsPrefix = (url) => {
  if (!url) return url; // Return early if url is null or undefined
  return url.startsWith('http://') || url.startsWith('https://')
    ? url
    : 'https://' + url;
};

export const sortByUpdateOrCreatedAt = (a, b) => {
  const dateA = new Date(a.updatedAt || a.timeStamp);
  const dateB = new Date(b.updatedAt || b.timeStamp);
  return dateB - dateA;
};

export const convertTimestampToFullDate = (timestamp) => {
  const date = new Date(timestamp);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

export const calculateSkeletonIterations = (targetValue) => {
  let result = 0;
  let numberOfSkeletons = 0;

  while (result < targetValue) {
    result += 320;
    numberOfSkeletons++;
  }

  return { finalValue: result, numberOfSkeletons };
};

export const updateUserCookieField = (field, newValue) => {
  // Get the current cookies
  const cookies = nookies.get(null);

  // Parse the 'user' cookie to an object
  const user = cookies.user ? JSON.parse(cookies.user) : {};

  // Update the specified field
  user[field] = newValue;

  // Set the updated cookie
  nookies.set(null, 'user', JSON.stringify(user), {
    path: '/',
    maxAge: 10 * 365 * 24 * 60 * 60, // 10 years in seconds
  });
};
export const getCountryFromAddress = (address) => {
  const parts = address.split(',');
  return parts[parts.length - 1].trim();
};
export const isSameDay = (ts1, ts2) => {
  const date1 = new Date(ts1).setHours(0, 0, 0, 0);
  const date2 = new Date(ts2).setHours(0, 0, 0, 0);
  return date1 === date2;
};
export const getDateLabel = (ts) => {
  const messageDate = new Date(ts);
  const today = new Date();
  const yesterday = new Date(today);

  yesterday.setDate(yesterday.getDate() - 1);

  // Reset the hours for comparison
  today.setHours(0, 0, 0, 0);
  yesterday.setHours(0, 0, 0, 0);
  messageDate.setHours(0, 0, 0, 0);

  const timeString = new Date(ts).toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  if (messageDate.getTime() === today.getTime()) {
    return 'Today';
  } else if (messageDate.getTime() === yesterday.getTime()) {
    return 'Yesterday';
  } else {
    // Check if the date is older than a week
    const oneWeekAgo = new Date(today.setDate(today.getDate() - 7));
    if (messageDate < oneWeekAgo) {
      // For messages older than a week, return the full date and time
      return (
        new Date(ts).toLocaleDateString(undefined, {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })
      );
    } else {
      // For messages within the last week, return the weekday and time
      return (
        new Date(ts).toLocaleDateString(undefined, {
          weekday: 'long',
        })
      );
    }
  }
};

export const getDateLabelWithTime = (ts) => {
  const messageDate = new Date(ts);
  const today = new Date();
  const yesterday = new Date(today);

  yesterday.setDate(yesterday.getDate() - 1);

  // Reset the hours for comparison
  messageDate.setHours(0, 0, 0, 0);

  const timeString = new Date(ts).toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return (
    new Date(ts).toLocaleDateString(undefined, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }) + ` at ${timeString}`
  );
};

export const shouldShowTimestamp = (currentMsg, prevMsg) => {
  if (!prevMsg) {
    return true; // Always show for the first message
  }

  const currentMsgDate = new Date(currentMsg.timeStamp);
  const prevMsgDate = new Date(prevMsg.timeStamp);

  // Check if it's a new day
  return !isSameDay(currentMsgDate, prevMsgDate);

};
