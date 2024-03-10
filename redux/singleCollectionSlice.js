import { createSlice } from "@reduxjs/toolkit";

export const singleCollectionSlice = createSlice({
  name: "singleCollection",
  initialState: {
    singleCollectionData: "",
    loading: false,
    error: false,
  },
  reducers: {
    singleCollectionFetchStart: (state) => {
      state.loading = true;
    },
    singleCollectionFetchSuccess: (state, action) => {
      state.singleCollectionData = action.payload;
      state.loading = false;
    },
    singleCollectionFetchError: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  singleCollectionFetchStart,
  singleCollectionFetchSuccess,
  singleCollectionFetchError,
} = singleCollectionSlice.actions;

export default singleCollectionSlice.reducer;
