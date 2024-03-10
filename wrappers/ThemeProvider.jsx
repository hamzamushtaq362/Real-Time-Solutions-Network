import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material';
import { ThemeGlobalStyleContainer } from './elements';
import { getTheme } from '~/utils';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { setCurrentThemeMode } from '~/redux';

const useInitialColorMode = () => {
  const { themeMode } = useSelector((state) => state.settings);
  const dispatch = useDispatch();
  const [theme, setTheme] = useState(themeMode);
  useEffect(() => {
    let theme = 'light';

    const userSettings = JSON.parse(localStorage.getItem('settings'));
    if (userSettings && userSettings?.theme) {
      theme = userSettings?.theme;
    } else {
      const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');
      if (darkThemeMq.matches) {
        theme = 'dark';
      } else {
        theme = 'light';
      }
    }

    setTheme(theme);
    dispatch(setCurrentThemeMode({ mode: theme, setLocalStorage: false }));
  }, [themeMode]);
  return theme;
};

export const ThemeProvider = ({ children }) => {
  const mode = useInitialColorMode();

  return (
    <MuiThemeProvider theme={createTheme(getTheme(mode))}>
      <ThemeGlobalStyleContainer>{children}</ThemeGlobalStyleContainer>
    </MuiThemeProvider>
  );
};
