import {
  ThemeProvider,
  SnackbarProvider,
  AuthProvider,
  AppContextProvider,
  // ThirdWebProviderWrapperDiv,
} from '~/wrappers';
import ErrorBoundary from 'wrappers/ErrorBoundary';
import { Provider as ReduxProvider } from 'react-redux';
import store from '~/redux/store';
import { IntercomProvider } from 'react-use-intercom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CmdkProvider from 'wrappers/CmdkProvider';

export const GlobalAppProvider = ({ children }) => {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider>
        <SnackbarProvider>
          <AppContextProvider>
            {/* <ThirdWebProviderWrapperDiv> */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <AuthProvider>
                <CmdkProvider>
                  <IntercomProvider
                    appId={process.env.REACT_APP_INTERCOM_ID}
                    autoBoot={true}
                    initializeDelay={5000}
                  >
                    <ErrorBoundary>{children}</ErrorBoundary>
                  </IntercomProvider>
                </CmdkProvider>
              </AuthProvider>
            </LocalizationProvider>
            {/* </ThirdWebProviderWrapperDiv> */}
          </AppContextProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </ReduxProvider>
  );
};
