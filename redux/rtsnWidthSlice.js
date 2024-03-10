import { createSlice } from '@reduxjs/toolkit';

export const rtsnWidthSlice = createSlice({
  name: 'rtsnLogoWidth',
  initialState: {
    pageWidth: 0, // Zero
  },
  reducers: {
    setRtsnWidth: (state, action) => {
      state.pageWidth = action.payload;
    },
  },
});

export const { setRtsnWidth } = rtsnWidthSlice.actions;

export default rtsnWidthSlice.reducer;