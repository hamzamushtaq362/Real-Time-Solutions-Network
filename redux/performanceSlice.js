import { createSlice } from '@reduxjs/toolkit';

export const performanceSlice = createSlice({
  name: 'nfts',
  initialState: {
    nftsList: '',
    loading: false,
    error: false,
  },
  reducers: {
    nftsPerFetchStart: (state) => {
      state.loading = true;
    },
    nftsPerFetchSuccess: (state, action) => {
      state.nftsList = action.payload;
      state.loading = false;
    },
    nftsPerFetchError: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { nftsPerFetchStart, nftsPerFetchSuccess, nftsPerFetchError } =
  performanceSlice.actions;

export default performanceSlice.reducer;
