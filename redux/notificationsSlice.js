import { createSlice } from '@reduxjs/toolkit';

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: {
    notification: {message: '', variant: 'default'},
  },
  reducers: {
    setNotification: (state, action) => {
      state.notification = action.payload;
    },
  },
});

export const { setNotification } =
  notificationsSlice.actions;

export default notificationsSlice.reducer;
