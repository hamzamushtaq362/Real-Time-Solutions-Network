import React, { useState, useEffect, useContext } from 'react';
import {
  CollabInviteDialog,
  PublicInfoBox,
  NavButtonGroup,
  FooterBottomSection,
  BadgeDialog,
  Divider,
} from '~/components';
import { setBadgeType, setCurrentDialog, setShowBadgeDialog } from '~/redux';
import { useDispatch, useSelector } from 'react-redux';
import { CreatorProfilePageSkeleton } from './CreatorProfilePageSkeleton';
import { useTranslation } from 'react-i18next';
import {
  ProfilePageContainer,
  CenterFlex,
  CreatorProfileContainer,
} from './elements';
import { CreatorProfileTopSection } from './CreatorProfileTopSection';
import { CreatorProfileInformationSection } from './CreatorProfileInformationSection';
import { CreatorProfileAllCollabsSection } from './CreatorProfileAllCollabsSection';
import { CreatorProfileOpenCollabsSection } from './CreatorProfileOpenCollabsSection';
import { CreatorProfileFavouriteCollabsSection } from './CreatorProfileFavouriteCollabsSection';
import { CreatorProfileCollectivesSection } from './CreatorProfileCollectivesSection';
import { CreatorProfileCurationsSection } from './CreatorProfileCurationsSection';

import {
  getUserPlatformsByUserId,
  getUserDetailsByNickname,
  getCollabsByUserId,
  getCollectivesByType,
  fetchUserAssociatedEvents,
} from '~/apis';
import { trackMixPanel } from '~/utils';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material';
import { CreatorProfileCompletedCollabsSection } from './CreatorProfileCompletedCollabsSection';
import { CreatorProfileCollaboratorsSection } from 'components/CreatorProfile/CreatorProfileCollaboratorsSection';
import { CreatorProfileEventsSection } from './CreatorProfileEventsSection';
import AppContext from '../../context/AppContext';

export const CreatorProfilePage = (props) => {
  const { t } = useTranslation();
  const [user, setUser] = useState({});
  const [platforms, setPlatforms] = useState([]);
  // All Collabs related states
  const [allCollabs, setAllCollabs] = useState([]);
  const [allCollabsCount, setAllCollabsCount] = useState(null);

  // Open Collabs related states
  const [openCollabs, setOpenCollabs] = useState([]);
  const [openCollabsCount, setOpenCollabsCount] = useState(null);

  const [userEvents, setUserEvents] = useState([]);
  const [userEventsCount, setUserEventsCount] = useState(null);

  const [completedCollabs, setCompletedCollabs] = useState([]);
  const [completedCollabsCount, setCompletedCollabsCount] = useState(null);

  // Favourite Collabs related states
  const [favouriteCollabs, setFavouriteCollabs] = useState([]);
  const [favouriteCollabsCount, setFavouriteCollabsCount] = useState(null);

  // Teams related states
  const [collectives, setCollectives] = useState([]);
  const [collectivesCount, setCollectivesCount] = useState(null);

  // Curations related status
  const [curations, setCurations] = useState([]);
  const [curationsCount, setCurationsCount] = useState(null);

  // Loading States
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(true);
  const { badgeImage, badgeType, showBadgeDialog } = useSelector(
    (state) => state.badge,
  );
  const [activeButton, setActiveButton] = useState('all-collabs');

  const router = useRouter();

  const dispatch = useDispatch();
  const theme = useTheme();

  const { currentDialog } = useSelector((state) => state.dialog);

  const [profileBelongsToLoggedInUser, setProfileBelongsToLoggedInUser] =
    useState(false);

  const { user: auth } = useContext(AppContext);

  const handlerUserRouteChange = async (username) => {
    try {
      setLoading(true);
      const userDetails = await getUserDetailsByNickname(username);
      setUser(userDetails);
    } catch {
      setLoading(false);
    }
  };
  useEffect(() => {
    props?.user && setUser(props?.user);
  }, [props?.user]);

  useEffect(() => {
    const userIdentifier = router.query.profileId?.substring(1, user?.length);
    if (userIdentifier !== user?.username) {
      // get the new user details on route changes in same component
      handlerUserRouteChange(userIdentifier);
    } else {
      setLoading(false);
    }
  }, [router.query.profileId]);

  useEffect(() => {
    dispatch(setCurrentDialog(''));
  }, [router]);

  useEffect(() => {
    if (badgeType && showBadgeDialog) {
      setShowDialog(true);
    }
  }, [badgeType, showBadgeDialog]);

  const fetchUserCreatedCollabs = async (userId) => {
    const response = await getCollabsByUserId(userId);

    if (response?.data?.status === 'success') {
      const allCollabs = response?.data?.data?.collabs;
      const likedCollabs = response?.data?.data?.likedCollabs;
      const curatedCollabs = response?.data?.data?.curatedCollabs;

      const openCollabs = allCollabs.filter(
        (collab) => !collab.isCollabPublished,
      );
      const completedCollabs = allCollabs.filter(
        (collab) => collab?.isCollabPublished,
      );
      return {
        allCollabs,
        openCollabs,
        completedCollabs,
        likedCollabs,
        curatedCollabs,
      };
    }
  };

  const getUserEvents = async (userId) => {
    const response = await fetchUserAssociatedEvents(userId);
    setUserEvents(response?.data?.collabEvents);
    setUserEventsCount(response?.data?.collabEvents?.length);
  };

  const fetchUserCollectives = async (userId) => {
    return await getCollectivesByType(userId, 'all');
  };

  const fetchUserPlatforms = async () => {
    if (user) {
      return await getUserPlatformsByUserId(user._id);
    }
  };

  useEffect(() => {
    if (user?._id) {
      setLoading(true);

      Promise.all([
        fetchUserCreatedCollabs(user._id),
        fetchUserCollectives(user._id),
        fetchUserPlatforms(),
        getUserEvents(user._id),
      ])
        .then(([collabsData, collectives, platformsData]) => {
          setAllCollabsCount(collabsData.allCollabs.length);
          setAllCollabs(collabsData.allCollabs);

          setOpenCollabs(collabsData.openCollabs);
          setOpenCollabsCount(collabsData.openCollabs.length);

          setCompletedCollabs(collabsData.completedCollabs);
          setCompletedCollabsCount(collabsData.completedCollabs.length);

          setFavouriteCollabs(collabsData.likedCollabs);
          setFavouriteCollabsCount(collabsData.likedCollabs.length);

          setCurations(collabsData.curatedCollabs);
          setCurationsCount(collabsData.curatedCollabs.length);

          setCollectives(collectives);
          setCollectivesCount(collectives.length);

          setPlatforms(platformsData.platforms);

          setProfileBelongsToLoggedInUser(auth?.userId === user._id);

          // Set all loading flags to false at the end
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data: ', error);
          // Set all loading flags to false in case of error
          setLoading(false);
        });
    }
  }, [user]);

  useEffect(() => {
    trackMixPanel('Profile_Page_Protected_View');
  }, []);

  const buttonsData = [
    {
      text: t('All Collabs'),
      value: 'all-collabs',
      count: allCollabsCount,
      hide: !allCollabsCount || allCollabsCount === 0,
    },
    {
      text: t('Open Collabs'),
      value: 'open-collabs',
      count: openCollabsCount,
      hide: user?.isContributedProfile || openCollabsCount === 0,
    },
    {
      text: t('Completed'),
      value: 'completed',
      count: completedCollabsCount,
      hide: user?.isContributedProfile || completedCollabsCount === 0,
    },
    {
      text: t('Collaborators'),
      value: 'collaborators',
      count: user?.connections || '',
      hide: user?.connections === 0,
    },
    {
      text: t('Curations'),
      value: 'curations',
      hide:
        !user?.isCurator || user?.isContributedProfile || curationsCount === 0,
      count: curationsCount,
    },
    {
      text: t('Favourite'),
      value: 'favourite',
      count: favouriteCollabsCount,
      hide: user?.isContributedProfile || favouriteCollabsCount === 0,
    },
    {
      text: t('Teams'),
      value: 'collectives',
      count: collectivesCount,
      hide: user?.isContributedProfile || collectivesCount < 1,
    },
    {
      text: t('Events'),
      value: 'events',
      count: userEventsCount,
      hide: userEventsCount === 0,
    },
    {
      text: t('Information'),
      value: 'information',
    },
  ];
  const visibleTabs = buttonsData.filter(
    (item) => item.hide === false || item.hide === undefined,
  );
  const showNavbar = !(visibleTabs.length === 1);

  return (
    <>
      {user ? (
        <CreatorProfileContainer>
          {!loading ? (
            <>
              {/* Dialogs Start */}

              {badgeType && (
                <BadgeDialog
                  open={showDialog}
                  handleClose={() => {
                    setShowDialog(false);
                    dispatch(setCurrentDialog(''));
                    dispatch(setBadgeType(''));
                    dispatch(setShowBadgeDialog(false));
                  }}
                  message={`You have been awarded ${badgeType} Badge!`}
                  buttonText={t('Go to profile')}
                  onClick={() => {
                    setShowDialog(false);
                    dispatch(setCurrentDialog(''));
                    dispatch(setBadgeType(''));
                    dispatch(setShowBadgeDialog(false));
                  }}
                  badgeImage={badgeImage}
                />
              )}
              <CollabInviteDialog
                open={currentDialog === 'collab-invite-dialog'}
                handleClose={() => dispatch(setCurrentDialog(''))}
                width="520px"
                user={user}
              />
              {/* Dialogs Ends */}
              <ProfilePageContainer>
                {/* Creator Profile Top Section */}
                <CreatorProfileTopSection
                  user={user}
                  platforms={platforms}
                  profileBelongsToLoggedInUser={profileBelongsToLoggedInUser}
                  setUser={setUser}
                  isPublicView={!auth}
                />

                {/* Tab Button Group */}
                {showNavbar ? (
                  <NavButtonGroup
                    buttonsData={buttonsData}
                    activeButton={activeButton}
                    setActiveButton={setActiveButton}
                    sx={{ padding: '12px 30px', flex: 'unset !important' }}
                    showBorderTop={true}
                    showBorderBottom={true}
                    align="center"
                  />
                ) : (
                  <Divider color={theme.palette.borderLight} margin={0} />
                )}

                {/* Sub-sections Renderings start */}

                {visibleTabs.length !== 1 && activeButton === 'all-collabs' && (
                  <CreatorProfileAllCollabsSection
                    collabs={allCollabs}
                    loading={loading}
                    profileBelongsToLoggedInUser={profileBelongsToLoggedInUser}
                  />
                )}

                {activeButton === 'open-collabs' && (
                  <CreatorProfileOpenCollabsSection
                    collabs={openCollabs}
                    loading={loading}
                  />
                )}
                {activeButton === 'events' && (
                  <CreatorProfileEventsSection
                    events={userEvents}
                    loading={loading}
                  />
                )}
                {activeButton === 'completed' && (
                  <CreatorProfileCompletedCollabsSection
                    collabs={completedCollabs}
                    loading={loading}
                    hideRoles={true}
                  />
                )}
                {activeButton === 'collaborators' && (
                  <CreatorProfileCollaboratorsSection
                    members={user?.collaborators}
                  />
                )}

                {activeButton === 'curations' && (
                  <CreatorProfileCurationsSection
                    collabs={curations}
                    loading={loading}
                  />
                )}

                {activeButton === 'favourite' && (
                  <CreatorProfileFavouriteCollabsSection
                    collabs={favouriteCollabs}
                    loading={loading}
                  />
                )}

                {activeButton === 'collectives' && (
                  <CreatorProfileCollectivesSection
                    collectives={collectives}
                    loading={loading}
                  />
                )}

                {(visibleTabs?.[0]?.value === 'information' ||
                  activeButton === 'information') && (
                  <CreatorProfileInformationSection
                    user={user}
                    platforms={platforms}
                    profileBelongsToLoggedInUser={profileBelongsToLoggedInUser}
                  />
                )}
              </ProfilePageContainer>
              <FooterBottomSection />
            </>
          ) : (
            <ProfilePageContainer>
              <CreatorProfilePageSkeleton />
            </ProfilePageContainer>
          )}
        </CreatorProfileContainer>
      ) : (
        <>
          <CenterFlex>
            <PublicInfoBox
              color={theme.palette.red.main}
              backgroundColor={theme.palette.grey.normal2}
              message={t(
                'Oops! Something went wrong or creator profile not found.',
              )}
            />
          </CenterFlex>
        </>
      )}
    </>
  );
};
