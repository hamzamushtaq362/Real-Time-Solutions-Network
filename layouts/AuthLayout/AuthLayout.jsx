import React, { useContext, useEffect, useState } from 'react';
import { DashboardNavbar, RemindMissingDetailsDialog } from '~/components';
import {
  DashboardContainer,
  DashboardContainerBottom,
  DashboardContainerRight,
} from './elements';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentDialog } from '~/redux';
import { useLocalStorage } from '~/hooks';
import AppContext from '../../context/AppContext';
import ProfileBanner from 'components/Navbar/DashboardNavbar/ProfileBanner';
import Header from 'components/Landing/Header/Header';

export const AuthLayout = ({ children, IsInbox, landing }) => {
  const [userProfileImage, setUserProfileImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [userFullName, setUserFullName] = useState('');
  const { user } = useContext(AppContext);
  const [alertMissingInfo, setAlertMissingInfo] = useState(false);
  const { currentDialog } = useSelector((state) => state.dialog);
  const [, , getWithExpiry, setWithExpiry] =
    useLocalStorage('alertMissingInfo');
  const dispatch = useDispatch();
  const isProfileComplete = user?.isProfileComplete;

  useEffect(() => {
    if (user) {
      const { imageUrl, fullName, coverImageUrl, bio, isLogin } = user;
      setUserProfileImage(imageUrl);
      setUserFullName(fullName);
      if (isLogin && !(coverImageUrl && fullName && bio && imageUrl)) {
        const showAlert = getWithExpiry();
        if (showAlert === null) {
          setWithExpiry(true, 172800000); // 2 days expiry
          setAlertMissingInfo(true);
        } else {
          setAlertMissingInfo(showAlert);
        }
        dispatch(setCurrentDialog('remind-missing-details'));
      }
    }

    setLoading(false);
  }, [user]);

  const showBanner = user && !isProfileComplete;

  return (
    <>
      {!loading ? (
        <>
          {showBanner && <ProfileBanner />}
          <DashboardContainer>
            {user && (
              <RemindMissingDetailsDialog
                open={
                  currentDialog === 'remind-missing-details' &&
                  alertMissingInfo === true
                }
                handleClose={() => {
                  dispatch(setCurrentDialog(''));
                  setWithExpiry(false, 172800000); // 2 days expiry
                }}
                user={user}
              />
            )}

            {landing ?
              <Header dark /> :
              <DashboardNavbar
              userFullName={userFullName}
              userProfileImage={userProfileImage}
              isVerified={user?.verificationStatus === 'VERIFIED'}
            />}

            <DashboardContainerBottom showBanner={showBanner}>
              <DashboardContainerRight showBanner={showBanner} IsInbox={IsInbox}>
                {children}
              </DashboardContainerRight>
            </DashboardContainerBottom>
          </DashboardContainer>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
