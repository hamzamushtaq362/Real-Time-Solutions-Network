import { createSlice } from '@reduxjs/toolkit';

export const worldSlice = createSlice({
  name: 'world',
  initialState: {
    page: 'Dashboard',
  },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const { setPage } = worldSlice.actions;

export default worldSlice.reducer;
