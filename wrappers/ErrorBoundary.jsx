import React from 'react';
import { ErrorBoundaryComponent } from '~/components';
import { passErrorCrashToDiscordErrorAPI } from '~/apis';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // Display fallback UI

    this.setState({ hasError: true });

    const errorMessage = error?.toString();
    const componentStack = info?.componentStack?.toString();

    let appCrashErrorInfo = {
      errorMessage,
      userDetails: '',
      componentStack,
    };

    const user = JSON.parse(localStorage.getItem('auth'));
    if (user) {
      const userName = user?.username || 'No name found';
      const userId = user?.userId || 'No User ID found';
      const profileImage = user?.imageUrl || 'No Profile Image';

      appCrashErrorInfo.userDetails = {
        userName,
        userId,
        profileImage,
      };
    }

    if (
      process.env.REACT_APP_ENV === 'staging' ||
      process.env.REACT_APP_ENV === 'prod'
    ) {
      passErrorCrashToDiscordErrorAPI(appCrashErrorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <ErrorBoundaryComponent />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
