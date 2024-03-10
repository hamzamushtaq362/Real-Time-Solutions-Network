import { createSlice } from '@reduxjs/toolkit';

export const currentWallet = createSlice({
  name: 'currentWallet',
  initialState: {
    currentWallet: '',
  },
  reducers: {
    setCurrentWallet: (state, action) => {
      state.currentWallet = action.payload;
    },
  },
});

export const { setCurrentWallet } = currentWallet.actions;

export default currentWallet.reducer;
