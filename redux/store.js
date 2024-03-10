import { configureStore } from '@reduxjs/toolkit';
import nftsReducer from './nftsSlice';
import nftsDataReducer from './nftsDataSlice';
import userReducer from './userSlice';
import walletReducer from './walletSlice';
import notificationsReducer from './notificationsSlice';
import worldReducer from './worldSlice';
import performanceReducer from './performanceSlice';
import collectionsReducer from './groupCollectionsSlice';
import singleCollectionReducer from './singleCollectionSlice';

import menuSlice from './menuSlice';
import dialogSlice from './dialogSlice';
import collabSlice from './collabSlice';
import inviteSlice from './inviteUser';
import currentWalletSlice from './currentWallet';
import settingsSlice from './settingsSlice';
import routeSlice from './routeSlice';
import badgeSlice from './badgeSlice';
import rtsnWidthSlice from './rtsnWidthSlice';

export default configureStore({
  reducer: {
    nfts: nftsReducer,
    nftsData: nftsDataReducer,
    user: userReducer,
    wallet: walletReducer,
    notifications: notificationsReducer,
    world: worldReducer,
    performanceNfts: performanceReducer,
    collectionsList: collectionsReducer,
    singleCollection: singleCollectionReducer,
    menu: menuSlice,
    dialog: dialogSlice,
    collab: collabSlice,
    inviteUser: inviteSlice,
    badge: badgeSlice,
    currentWallet: currentWalletSlice,
    settings: settingsSlice,
    route: routeSlice,
    rtsnWidth: rtsnWidthSlice,
  },
});
