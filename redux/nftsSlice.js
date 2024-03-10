import { createSlice } from '@reduxjs/toolkit';

export const nftsSlice = createSlice({
  name: 'nfts',
  initialState: {
    nftsList: '',
    loading: false,
    error: false,
  },
  reducers: {
    nftsFetchStart: (state) => {
      state.loading = true;
    },
    nftsFetchSuccess: (state, action) => {
      state.nftsList = action.payload;
      state.loading = false;
    },
    nftsFetchError: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { nftsFetchStart, nftsFetchSuccess, nftsFetchError } =
  nftsSlice.actions;

export default nftsSlice.reducer;
