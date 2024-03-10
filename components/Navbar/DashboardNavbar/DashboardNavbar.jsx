import React, { useContext, useState } from 'react';
import {
  DashboardNavbarContainer,
  NavRightActionsContainer,
  ProfileMenuContainer,
  IconButtonContainer,
  StyledToolbar,
  SearchContainer,
  MobileSearchContainer,
  SearchInputContainer,
} from 'components/Navbar/DashboardNavbar/elements';
import {
  NotificationDropdown,
  ProfileDropdown,
  SearchDropdown,
  AppLogo,
  MessagesDropdown, PrimaryButton,
} from '~/components';
import VerticalDivider from 'components/Divider/VerticalDivider';
import TopSections from 'components/Navbar/DashboardNavbar/TopSections';
import { useIsMobileView } from '~/utils';
import ProfileDropdownMobile from 'components/Dropdown/ProfileDropdownMobile';
import SearchMobile from 'components/Dropdown/SearchMobile';
import CloseIcon from 'components/Icons/CloseIcon';
import { RoundedBorderedContainer } from 'components/Dropdown/elements';
import { useTheme } from '@mui/material';
import dynamic from 'next/dynamic';
import { useLocalStorage } from '~/hooks';
import axios from 'axios';
import { BASE_URL } from '~/apis';
import { fetchRefreshToken, reFetchTokenExpire, setCurrentDialog } from '~/redux';
import AppContext from 'context/AppContext';
import { useDispatch } from 'react-redux';

const Tour = dynamic(
  () => import('reactour'),
  { ssr: false },
);

const steps = [
  {
    selector: '[data-tour="collabs"]',
    content: 'This is where you can manage and view your collaborations.'
  },
  {
    selector: '[data-tour="creators"]',
    content: 'Here you can explore and connect with other creators.'
  },
  {
    selector: '[data-tour="search"]',
    content: 'Search all Creators, Collabs, and NFTs.'
  },
  {
    selector: '[data-tour="notifications"]',
    content: 'Check your notifications here.'
  },
  {
    selector: '[data-tour="messages"]',
    content: 'Here you can read and respond to your messages.'
  }
];

export const DashboardNavbar = ({
  userProfileImage,
  userFullName,
  isVerified,
}) => {
  const dispatch = useDispatch();
  const isMobileView = useIsMobileView();
  const theme = useTheme();
  const [showSearch, setShowSearch] = useState(false);
  const [auth, setAuth] = useLocalStorage('auth');
  const { user, setUser } = useContext(AppContext);

  const [isTourOpen, setIsTourOpen] = useState(user && !user?.hasSeenTour);
  const showBanner = user && !user?.isProfileComplete;

  const handleTourClose = async () => {
    setIsTourOpen(false);
    setUser({ ...user, hasSeenTour: true });
    setAuth({...auth, hasSeenTour: true});
    try {
      const f1 = async () => {
        return await axios.patch(`${BASE_URL}/user`, {
          hasSeenTour: true,
        });
      };
      await reFetchTokenExpire(f1, fetchRefreshToken);
    } catch(e){

    }
  }

  return (
    <>
      <DashboardNavbarContainer
        showBanner={showBanner}
        isMobileView={isMobileView}
        elevation={0}
      >
        {showSearch ? (
          <MobileSearchContainer>
            <SearchInputContainer>
              <SearchDropdown />
            </SearchInputContainer>
            <RoundedBorderedContainer
              onClick={() => setShowSearch(false)}
              ml={2}
            >
              <CloseIcon width={20} height={20} />
            </RoundedBorderedContainer>
          </MobileSearchContainer>
        ) : (
          <StyledToolbar disableGutters>
            <AppLogo margin='0 0 0 16x' color={theme.palette.text.primary} />

            {!isMobileView && (
              <>
                <VerticalDivider />
                <TopSections />
                <VerticalDivider />
              </>
            )}

            {!isMobileView && (
              <SearchContainer>
                <SearchDropdown />
              </SearchContainer>
            )}

            {!isMobileView && user && (
              <>
                <VerticalDivider />
                <NavRightActionsContainer>
                  <IconButtonContainer
                    sx={{ display: { xs: 'none', sm: 'block' } }}
                  >
                    <NotificationDropdown />
                  </IconButtonContainer>

                  <IconButtonContainer
                    sx={{ display: { xs: 'none', sm: 'block' } }}
                  >
                    <MessagesDropdown />
                  </IconButtonContainer>
                </NavRightActionsContainer>
                <VerticalDivider />
              </>
            )}

            {user ?
              <ProfileMenuContainer isMobileView={isMobileView}>
                {isMobileView && (
                  <SearchMobile onSearchClick={() => setShowSearch(true)} />
                )}
                <ProfileDropdown
                  userFullName={userFullName}
                  userProfileImage={userProfileImage}
                  isVerified={isVerified}
                />
                {isMobileView && <ProfileDropdownMobile />}
              </ProfileMenuContainer>:
              <>
                <VerticalDivider />
                <PrimaryButton
                  width="120px"
                  sx={{ marginLeft: '32px', marginRight: '32px' }}
                  onClick={() => dispatch(setCurrentDialog('signup-open-dialog'))}
                >
                  Join RTSN.
                </PrimaryButton>
              </>
            }
          </StyledToolbar>
        )}
        <Tour
          steps={steps}
          isOpen={isTourOpen}
          onRequestClose={handleTourClose}
          rounded={5}
          accentColor="#0073e6"
        />
      </DashboardNavbarContainer>
    </>
  );
};
