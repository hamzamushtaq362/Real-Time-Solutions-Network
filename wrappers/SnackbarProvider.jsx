import React from 'react';
import { SnackbarProvider as NotistackThemeProvider } from 'notistack';
import CloseIcon from '../components/Icons/CloseIcon';
import InfoIcon from '../components/Icons/InfoIcon';
import { WarningOutlined } from '@mui/icons-material';
import TickIcon from '../components/Icons/TickIcon';
import CustomSnackbar from '../components/Notifications/CustomSnackbar';
import NotificationSnackbar from '../components/Notifications/NotificationSnackbar';

export const SnackbarProvider = ({ children }) => {
  return (
    <NotistackThemeProvider
      maxSnack={4}
      autoHideDuration={4000}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      Components={{
        default: CustomSnackbar,
        success: CustomSnackbar,
        error: CustomSnackbar,
        warning: CustomSnackbar,
        info: CustomSnackbar,
        notification: NotificationSnackbar,
      }}
    >
      {children}
    </NotistackThemeProvider>
  );
};

export const getSnackbarBackgroundColor = (variant, colors) => {
  switch (variant) {
    case 'success':
      return colors.success.background;
    case 'error':
      return colors.error.background;
    case 'info':
      return colors.info.background;
    case 'warning':
      return colors.warning.background;
    case 'notification':
      return colors.notification.background;
    default:
      return colors.default.background;
  }
};
export const getSnackbarTextColor = (variant, colors) => {
  switch (variant) {
    case 'success':
      return colors.success.text;
    case 'error':
      return colors.error.text;
    case 'info':
      return colors.info.text;
    case 'warning':
      return colors.warning.text;
    case 'notification':
      return colors.notification.text;
    default:
      return colors.default.text;
  }
};
export const getSnackbarIcon = (variant, color) => {
  switch (variant) {
    case 'success':
      return <TickIcon width={24} height={20} color={color} />;
    case 'error':
      return <CloseIcon width={30} height={30} color={color} />;
    case 'info':
      return <InfoIcon width={30} height={30} color={color} />;
    case 'warning':
      return <WarningOutlined fontSize="large" sx={{ fill: color }} />;
    case 'default':
      return null;
  }
};
