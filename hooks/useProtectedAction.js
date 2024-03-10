import { setCurrentDialog } from '~/redux';
import { useDispatch } from 'react-redux';
import { useContext } from 'react';
import AppContext from 'context/AppContext';
import { useRouter } from 'next/router';
import { useNotistack } from 'hooks/useNotistack';

export const useProtectedAction = (
  authenticatedCallBack,
  nonAuthenticatedCallBack = null,
) => {
  const { user } = useContext(AppContext);
  const router = useRouter();
  const dispatch = useDispatch();
  const generateSnackbar = useNotistack();

  return (data, checkProfileCompleteness = false) => {
    if (user) {
      // User is authenticated, simply run the callback
      if (!checkProfileCompleteness) {
        authenticatedCallBack(data);
        return;
      }
      if (user.isProfileComplete) {
        authenticatedCallBack(data);
      }else {
        router.push('/settings?view=profile')
        generateSnackbar('Please complete your profile to begin collaborating', 'warning')
      }
    } else {
      if (nonAuthenticatedCallBack) {
        nonAuthenticatedCallBack(data);
      } else {
        dispatch(setCurrentDialog('signup-open-dialog'));
      }
    }
  };
};
