export let env = 'staging';

// Uncomment line#4 to connect the UI with local API
// env = 'local';

const config = {
  local: {
    BASE_URL: 'http://localhost:3000',
    APP_URL: 'http://localhost:8080',
    DISCORD_INVITE_URL: 'https://discord.gg/4pRQNRWmZa',
    MEETCREATOR_URL: 'https://meetcreator.vercel.app',
    NFTMINT_URL:
      'https://gateway.ipfscdn.io/ipfs/Qmcine1gpZUbQ73nk7ZGCcjKBVFYXrEtqrhujXk3HDQ6Nn/erc721.html?contract=',
    NFTRarible_URL: 'https://rarible.com/collection/polygon/',
    NFTOpensea_URL: 'https://opensea.io/assets?search[query]=',
    NETWORK_CHAIN_ID: 80001,
    NETWORK_NAME: 'Polygon Mumbai Testnet',
    currentEnviorement: 'local',
  },
  staging: {
    BASE_URL: 'https://nft-console-api-staging.herokuapp.com',
    APP_URL: 'https://next.rtsn.xyz',
    DISCORD_INVITE_URL: 'https://discord.gg/4pRQNRWmZa',
    MEETCREATOR_URL: 'https://meetcreator.vercel.app',
    NFTMINT_URL:
      'https://gateway.ipfscdn.io/ipfs/Qmcine1gpZUbQ73nk7ZGCcjKBVFYXrEtqrhujXk3HDQ6Nn/erc721.html?contract=',
    NFTRarible_URL: 'https://rarible.com/collection/polygon/',
    NFTOpensea_URL: 'https://opensea.io/assets?search[query]=',
    NETWORK_NAME: 'Polygon Mumbai Testnet',
    NETWORK_CHAIN_ID: 80001,
    currentEnviorement: 'staging',
  },
  prod: {
    BASE_URL: 'https://nft-console-api-prod.herokuapp.com',
    APP_URL: 'https://rtsn.xyz',
    DISCORD_INVITE_URL: 'https://discord.gg/4pRQNRWmZa',
    MEETCREATOR_URL: 'https://meetcreator.xyz',
    NFTMINT_URL:
      'https://gateway.ipfscdn.io/ipfs/Qmcine1gpZUbQ73nk7ZGCcjKBVFYXrEtqrhujXk3HDQ6Nn/erc721.html?contract=',
    NFTRarible_URL: 'https://rarible.com/collection/polygon/',
    NFTOpensea_URL: 'https://opensea.io/assets?search[query]=',
    NETWORK_NAME: 'Polygon Mainnet',
    NETWORK_CHAIN_ID: 137,
    currentEnviorement: 'prod',
  },
};
export default config[env];

export const UserRole = {
  DEFAULT_USER: 'default',
  ADMIN_USER: 'admin',
};

export const UserAction = {
  CREATE_COLLAB: 'create-collab',
  DELETE_COLLAB: 'delete-collab',
  EXPLORE_COLLABS: 'explore-collabs',
  VISIT_SETTINGS: 'visit-settings',
  CREATE_CONTRIBUTE_COLLAB: 'create-contribute-collab',
  EDIT_CONTRIBUTED_PROFILE: 'edit-contributed-profile',
  // Add more actions here
};

export const allowedRoles = {
  [UserAction.CREATE_COLLAB]: [UserRole.DEFAULT_USER, UserRole.ADMIN_USER],
  [UserAction.DELETE_COLLAB]: [UserRole.ADMIN_USER],
  [UserAction.EXPLORE_COLLABS]: [UserRole.DEFAULT_USER, UserRole.ADMIN_USER],
  [UserAction.VISIT_SETTINGS]: [UserRole.DEFAULT_USER, UserRole.ADMIN_USER],
  [UserAction.CREATE_CONTRIBUTE_COLLAB]: [UserRole.ADMIN_USER],
  [UserAction.CREATE_COLLAB_TEMPLATE]: [UserRole.ADMIN_USER],
  [UserAction.EDIT_CONTRIBUTED_PROFILE]: [UserRole.ADMIN_USER],
  // Add more actions and their allowed roles here
};
