import { createSlice } from '@reduxjs/toolkit';

export const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    miniBar: false,
  },
  reducers: {
    setMiniBar: (state, action) => {
      state.miniBar = action.payload;
    },
  },
});

export const { setMiniBar } = menuSlice.actions;

export default menuSlice.reducer;
