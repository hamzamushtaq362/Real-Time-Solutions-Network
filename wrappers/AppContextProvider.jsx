import React, { useEffect, useState } from 'react';
import { useLocalStorage } from '~/hooks';
import AppContext from '../context/AppContext';
import { configureSocketIO } from './socketConfiguration';
import { NProgressConfiguration } from './NProgressConfiguration';
import { useTranslation } from 'react-i18next';

export const AppContextProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState([]);
  const [auth, setAuth] = useLocalStorage('auth');
  const [user, setUser] = useState(auth);
  const [socket, setSocket] = useState(null);
  const { i18n } = useTranslation();

  useEffect(() => {
    // update language
    i18n.changeLanguage(auth?.languageType ?? 'en');
  }, [])

  useEffect(() => {
    if (user) {
      setAuth(user);
    }
  }, [user]);

  configureSocketIO(
    loading,
    setLoading,
    user,
    setUser,
    setSocket,
  );
  NProgressConfiguration();

  return (
    <AppContext.Provider
      value={{
        loading,
        setLoading,
        notifications,
        setNotifications,
        user,
        setUser,
        socket,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
