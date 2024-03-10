import { useSnackbar } from 'notistack';
import { IconButton } from '@mui/material';
import { Iconify } from '~/components';
import { useRef, useState } from 'react';

export const useNotistack = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [notifications, setNotifications] = useState([]);
  const notificationsRef = useRef(notifications);

  // Add a notification to the queue
  return (message, variant, anchorOrigin = null) => {
    // Check if the notification key already exists
    if (!notificationsRef.current.includes(message)) {
      // Add the notification to the queue and update the array of messages
      setNotifications([...notificationsRef.current, message]);

      // Create the notification options with the close button
      const options = {
        variant,
        anchorOrigin: anchorOrigin
          ? { ...anchorOrigin, closeSnackbar }
          : { vertical: 'bottom', horizontal: 'center' },
        action: (key) => {
          return (
            <IconButton onClick={() => closeSnackbar(key)} id={key}>
              <Iconify icon="ep:close-bold" color="#FFF" />
            </IconButton>
          );
        },
      };
      enqueueSnackbar(message, { key: message, ...options });
    }
  };
};
