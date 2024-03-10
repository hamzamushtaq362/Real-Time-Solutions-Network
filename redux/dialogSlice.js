import { createSlice } from '@reduxjs/toolkit';

export const dialogSlice = createSlice({
  name: 'dialog',
  initialState: {
    currentDialog: '',
  },
  reducers: {
    setCurrentDialog: (state, action) => {
      state.currentDialog = action.payload;
    },
  },
});

export const { setCurrentDialog } = dialogSlice.actions;

export default dialogSlice.reducer;
