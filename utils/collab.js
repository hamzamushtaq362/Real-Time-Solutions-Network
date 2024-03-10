import { COLLAB_PAYMENT_MODE } from 'constants/collab';
import config from '../config';

export const APP_URL = config.APP_URL;

export const getCollabPricing = (details) => {
  const { paymentMode, paymentType, amount } = details || {};

  switch (paymentMode) {
    case COLLAB_PAYMENT_MODE.NoPayment:
      return {
        title: '',
        boldTitle: COLLAB_PAYMENT_MODE.NoPayment,
      };
    case COLLAB_PAYMENT_MODE.RevenueSharing:
      return {
        title: COLLAB_PAYMENT_MODE.RevenueSharing,
        boldTitle: `${amount}%`,
      };
    case COLLAB_PAYMENT_MODE.FixedPayment:
      return {
        title: COLLAB_PAYMENT_MODE.FixedPayment,
        boldTitle: `${amount} ${paymentType}`,
      };
    default:
      return {
        title: 'Pricing details not found',
        boldTitle: '',
      };
  }
};

export const getCollabMembersTrimmedList = (members) => {
  if (members) {
    if (members.length > 0) {
      return members.map(({ username, imageUrl }) => ({
        username,
        imageUrl,
      }));
    } else {
      return [];
    }
  } else {
    return [];
  }
};

export const filterAcceptedCollabMemberDetails = (members) => {
  if (members) {
    if (members?.length > 0) {
      return members
        .filter(({ member }) => member && member.status === 'ACCEPTED')
        .map(({ user }) => user);
    } else {
      return [];
    }
  } else {
    return [];
  }
};

export const constructCollabURL = (collabIdentifier) => {
  return `${APP_URL}/collab/${collabIdentifier}`;
};
