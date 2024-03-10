import { createSlice } from '@reduxjs/toolkit';

export const nftsDataSlice = createSlice({
  name: 'nftsData',
  initialState: {
    data: '',
    loading: false,
    error: false,
  },
  reducers: {
    nftsDataStart: (state) => {
      state.loading = true;
    },
    nftsDataSuccess: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    nftsDataError: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { nftsDataStart, nftsDataSuccess, nftsDataError } =
  nftsDataSlice.actions;

export default nftsDataSlice.reducer;
