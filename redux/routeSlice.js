import { createSlice } from '@reduxjs/toolkit';

export const routeSlice = createSlice({
  name: 'route',
  initialState: {
    currentQueryPath: '',
    navActions: []
  },
  reducers: {
    setCurrentQueryPath: (state, action) => {
      state.currentQueryPath = action.payload;
    },
    setNavActions: (state, action) => {
      state.navActions = action.payload;
    },
  },
});

export const { setCurrentQueryPath, setNavActions } = routeSlice.actions;

export default routeSlice.reducer;
