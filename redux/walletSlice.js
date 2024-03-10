import { createSlice } from "@reduxjs/toolkit";

export const walletSlice = createSlice({
  name: "wallet",
  initialState: {
    addresses: "",
    addloading: false,
    removeLoading: false,
    error: false,
  },
  reducers: {
    walletAddStart: (state) => {
      state.addloading = true;
    },
    walletAddSuccess: (state, action) => {
      state.addresses = action.payload;
      state.addloading = false;
    },
    walletAddError: (state) => {
      state.addloading = false;
      state.error = true;
    },
    walletRemoveStart: (state) => {
      state.removeLoading = true;
    },
    walletRemoveSuccess: (state, action) => {
      state.addresses = action.payload;
      state.removeLoading = false;
    },
    walletRemoveError: (state) => {
      state.removeLoading = false;
      state.error = true;
    },
  },
});

export const {
  walletAddStart,
  walletAddSuccess,
  walletAddError,
  walletRemoveStart,
  walletRemoveSuccess,
  walletRemoveError,
} = walletSlice.actions;

export default walletSlice.reducer;
