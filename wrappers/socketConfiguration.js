import { useEffect } from 'react';
import io from 'socket.io-client';
import { BASE_URL } from '~/apis';
import { getFormattedNotifications } from '~/utils';
import { useNotistack } from '~/hooks';
import { useDispatch } from 'react-redux';

export const configureSocketIO = (
  loading,
  setLoading,
  notifications,
  setNotifications,
  user,
  setUser,
  setSocket,
) => {
  const generateSnackbar = useNotistack();
  const dispatch = useDispatch();


  useEffect(() => {
    if (user?.userId) {
      const socket = io(BASE_URL, {
        query: {
          accessToken: user?.accessToken,
        },
        pingInterval: 10000,
        pingTimeout: 5000,
      });
      setSocket(socket);
      socket.on('connect', () => {});
      socket.on('disconnect', () => {
        // Try to reconnect after 5 seconds
        setTimeout(() => {
          socket.connect();
        }, 5000);
      });

      socket.on('send_notification', (notification) => {
        const formattedNotification = getFormattedNotifications(
          [notification],
          dispatch,
        )[0];

        generateSnackbar('', 'notification', {
          vertical: 'bottom',
          horizontal: 'right',
          customData: formattedNotification,
        });
        setUser({
          ...user,
          notificationData: notification.metadata.data,
        });
      });
      socket.on('receive_all_notifications', (notifications) => {
        const formattedNotedNotifications = getFormattedNotifications(
          notifications,
          dispatch,
        );
        setNotifications(formattedNotedNotifications);
      });
    }
  }, [user?.userId]);
};
