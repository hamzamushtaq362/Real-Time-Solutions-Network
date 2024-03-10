export const COLLAB_PAYMENT_TYPES = {
  ETH: 'ETH',
  MATIC: 'MATIC',
};

export const COLLAB_PAYMENT_MODE = {
  NoPayment: 'No Payment',
  RevenueSharing: 'Revenue Sharing',
  // FixedPayment: 'Fixed Payment',
};

export const SOCIAL_LINKS = [
  'Personal Website',
  'Instagram',
  'Twitter',
  'Behance',
  'Dribbble',
  'Artstation',
  'SketchFab',
  'Vimeo',
  'Youtube',
];
export const MARKETPLACE_LINKS = [
  'Foundation',
  'OpenSea',
  'ArtSync',
  'SuperRare',
  'SolSea',
  'Nifty Gateway',
  'Rarible',
  'Magic Eden',
  'Zora',
  'LooksRare',
];

export const COLLAB_SOURCE = {
  internal: 'internal',
  external: 'external',
  collective: 'collective',
};

export const CollabEventType = {
  hybrid: 'hybrid',
  virtual: 'virtual',
  physical: 'physical',
};

export const CollabEventDurationType = {
  timeBound: 'timeBound',
  noTimeBound: 'noTimeBound',
};

export const CollabCategories = [
  '3D',
  'Virtual Avatar',
  'Virtual Worlds',
  'AR/VR/XR',
  'Physical',
  'Others',
];

export const getInputStartText = (type) => {
  switch (type) {
    case 'Personal Website':
      return 'https://';
    case 'Instagram':
      return 'https://www.instagram.com/';
    case 'Twitter':
      return 'https://www.twitter.com/';
    case 'Behance':
      return 'https://www.behance.net/';
    case 'Dribbble':
      return 'https://www.dribbble.com/';
    case 'Artstation':
      return 'https://www.artstation.com/';
    case 'SketchFab':
      return 'https://www.sketchfab.com/';
    case 'Vimeo':
      return 'https://www.vimeo.com/';
    case 'Youtube':
      return 'https://www.youtube.com/';
    case 'Foundation':
      return 'https://www.foundation.app/';
    case 'OpenSea':
      return 'https://www.opensea.io/';
    case 'ArtSync':
      return 'https://www.artsync.app/';
    case 'SuperRare':
      return 'https://www.superrare.co/';
    case 'SolSea':
      return 'https://www.solsea.io/';
    case 'Nifty Gateway':
      return 'https://www.niftygateway.com/';
    case 'Rarible':
      return 'https://www.rarible.com/';
    case 'Magic Eden':
      return 'https://www.magiceden.io/';
    case 'Zora':
      return 'https://www.zora.co/';
    case 'LooksRare':
      return 'https://www.looksrare.com/';
    default:
      return '';
  }
}