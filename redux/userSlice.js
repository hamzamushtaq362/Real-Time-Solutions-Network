import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: "",
    loading: false,
    error: false,
  },
  reducers: {
    userFetchStart: (state) => {
      state.loading = true;
    },
    userFetchSuccess: (state, action) => {
      state.userInfo = action.payload;
      state.loading = false;
    },
    userFetchError: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { userFetchStart, userFetchSuccess, userFetchError } =
  userSlice.actions;

export default userSlice.reducer;
