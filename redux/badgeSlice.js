import { createSlice } from '@reduxjs/toolkit';

export const badgeSlice = createSlice({
  name: 'badgeSlice',
  initialState: {
    badgeType: '',
    showBadgeDialog: false,
    badgeImage: '',
  },
  reducers: {
    setBadgeType: (state, action) => {
      state.badgeType = action.payload;
    },
    setShowBadgeDialog: (state, action) => {
      state.showBadgeDialog = action.payload;
    },
    setBadgeImage: (state, action) => {
      state.badgeImage = action.payload;
    },
  },
});

export const { setBadgeType, setShowBadgeDialog, setBadgeImage } =
  badgeSlice.actions;

export default badgeSlice.reducer;
