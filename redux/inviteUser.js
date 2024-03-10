import { createSlice } from '@reduxjs/toolkit';

export const inviteUser = createSlice({
  name: 'inviteUser',
  initialState: {
    selectedUser: '',
  },
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
  },
});

export const { setSelectedUser } = inviteUser.actions;

export default inviteUser.reducer;
