import React, { useEffect, useState, useContext } from 'react';
import { setCurrentDialog } from '~/redux';
import { getRedirectResult } from 'components/Onboard/LoginProviders/magicLink';
import { AuthDialog } from 'components';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useLocalStorage } from 'react-use';
import AppContext from 'context/AppContext';
import { postAuthRedirector } from '~/utils';
import { verifyInviteHash } from 'apis/invite';

export const AuthProvider = ({ children }) => {
  const [loginLoading, setLoginLoading] = useState(false);
  const [auth, setAuth] = useLocalStorage('auth');

  const { user, setUser } = useContext(AppContext);
  const { currentDialog } = useSelector((state) => state.dialog);

  const router = useRouter();
  const dispatch = useDispatch();

  const referralCode = router.query.join;

  useEffect(() => {
    const callbackFunc = async () => {
      if (router.query.provider) {
        setLoginLoading(true);

        dispatch(setCurrentDialog('signup-open-dialog'));
        await getRedirectResult(referralCode, setUser, setAuth, () =>
          postAuthRedirector(router),
        );
        dispatch(setCurrentDialog(''));
        setLoginLoading(false);
      }

      if (router.query.invite || router.query.join) {
        dispatch(setCurrentDialog('signup-open-dialog'));
      }
      if (router.query.signup && !user) {
        dispatch(setCurrentDialog('signup-open-dialog'));
      }
    };
    callbackFunc();
  }, [router.query]);

  useEffect(() => {
    const getInviteLink = async (inviteHash) => {
      if (!inviteHash) return;

      const res = await verifyInviteHash(inviteHash);

      if (res?.status === 'success') {
        setAuth({ ...auth, email: res.email });
        sessionStorage.removeItem('invite');
      }
    };

    const inviteHash = sessionStorage.getItem('invite');

    if (user && inviteHash) {
      getInviteLink(inviteHash);
    }
  }, []);

  return (
    <>
      {/* Auth Dialog start */}

      <AuthDialog
        open={currentDialog === 'signup-open-dialog'}
        handleClose={() => dispatch(setCurrentDialog(''))}
        loginLoading={loginLoading}
      />

      {/* Auth Dialog Ends */}

      <>{children}</>
    </>
  );
};
