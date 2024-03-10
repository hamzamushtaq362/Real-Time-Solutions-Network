import { createSlice } from '@reduxjs/toolkit';

export const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    themeMode: 'light', // light, dark
  },
  reducers: {
    setCurrentThemeMode: (state, action) => {
      const settings = {
        theme: action.payload.mode,
      };
      if (action.payload.setLocalStorage) {
        localStorage.setItem('settings', JSON.stringify(settings));
      }
      state.themeMode = action.payload.mode;
    },
  },
});

export const { setCurrentThemeMode } = settingsSlice.actions;

export default settingsSlice.reducer;
