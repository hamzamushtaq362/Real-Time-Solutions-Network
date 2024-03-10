import { createSlice } from '@reduxjs/toolkit';

export const groupCollectionsSlice = createSlice({
  name: 'collectionsList',
  initialState: {
    groupCollectionsList: '',
    loading: false,
    error: false,
  },
  reducers: {
    collectionsFetchStart: (state) => {
      state.loading = true;
    },
    collectionsFetchSuccess: (state, action) => {
      state.groupCollectionsList = action.payload;
      state.loading = false;
    },
    collectionsFetchError: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  collectionsFetchStart,
  collectionsFetchSuccess,
  collectionsFetchError,
} = groupCollectionsSlice.actions;

export default groupCollectionsSlice.reducer;
