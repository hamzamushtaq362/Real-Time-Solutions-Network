import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';

import {
  ProfileDetailContainer,
  ProfileBioNew,
  ProfileBanneInfoContainer,
  ProfileBanneInfoDetailContainer,
  ProfileBanneInfoTitle,
  ProfileCoverImage,
  BlurredSide,
  CoverContainer,
  ProfileStatWrap,
  DotWrap,
  ButtonsWrap,
  FollowWrap,
  RoundedIcon,
} from 'components/common/ProfileCommon/element';
import {
  CollectiveFollowListDialog,
  ShareUploadIcon,
  SmallSpinner,
} from '~/components';
import { Avatar, Tooltip } from '~/components';
import {
  isUserFollowingCollective,
  followCollective,
  unfollowCollective,
  getCollectiveFollowers,
} from '~/apis';
import { useNotistack } from 'hooks';
import { useTheme, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentDialog } from '~/redux';
import { useLocalStorage } from 'hooks';
import { ShareHorizontalMenu } from '../../../ShareHorizontalMenu';

export const CollectiveDetailsTopSection = ({
  collective,
  isPublic,
  isAdmin,
}) => {
  const [isLoggedInUserFollowing, setIsLoggedInUserFollowing] = useState(false);
  const generateSnackbar = useNotistack();
  const [followLoading, setFollowLoading] = useState(false);
  const [shareAnchorEl, setShareAnchorEl] = useState(null);
  const [collectiveUrl, setCollectiveUrl] = useState('');
  const [collabCount, setCollabCount] = useState(0);
  const [membersCount, setMembersCount] = useState(0);
  const [followersCount, setFollowersCount] = useState(0);
  const [followersList, setFollowersList] = useState([]);
  const { currentDialog } = useSelector((state) => state.dialog);
  const [auth] = useLocalStorage('auth');
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const [isFollowingButtonHovered, setIsFollowingButtonHovered] =
    useState(false);

  const theme = useTheme();

  const updateLoggedInUserFollowingStatus = async () => {
    try {
      setFollowLoading(true);
      const response = await isUserFollowingCollective(collective._id);

      if (response.data.status === 'success') {
        setIsLoggedInUserFollowing(response.data.isFollowed);
      }
      setFollowLoading(false);
    } catch (error) {
      setFollowLoading(false);

      if (auth) {
        generateSnackbar(
          'Something went wrong while fetching following status',
          'error',
        );
      }
    }
  };

  const followCollectiveHandler = async () => {
    if (!isPublic) {
      try {
        setIsLoggedInUserFollowing(true);
        setFollowLoading(true);
        const response = await followCollective(collective._id);
        setFollowLoading(false);

        if (response.data.status === 'success') {
          setIsLoggedInUserFollowing(true);
          setFollowersCount((prevState) => prevState + 1);

          const { fullName, username, userId, imageUrl } = auth;

          setFollowersList((prevState) => [
            ...prevState,
            { fullName, username, _id: userId, imageUrl },
          ]);
        } else {
          setIsLoggedInUserFollowing(false);
        }
      } catch (error) {
        setIsLoggedInUserFollowing(false);
        setFollowLoading(false);
        generateSnackbar('Something went wrong while following', 'error');
      }
    } else {
      dispatch(setCurrentDialog('signup-open-dialog'));
    }
  };

  const unfollowCollectiveHandler = async () => {
    try {
      setFollowLoading(true);
      const response = await unfollowCollective(collective._id);
      setFollowLoading(false);
      if (response.data.status === 'success') {
        setFollowersCount((prevState) => prevState - 1);

        setFollowersList((prevState) =>
          prevState.filter((follower) => follower._id !== auth?.userId),
        );

        setIsLoggedInUserFollowing(false);
      }
    } catch (error) {
      setFollowLoading(false);
      generateSnackbar('Something went wrong while unfollowing', 'error');
    }
  };

  const handleShareCollab = (event) => {
    setShareAnchorEl(event.currentTarget);
  };

  const collectiveFollowersHandler = async () => {
    try {
      setFollowLoading(true);
      const response = await getCollectiveFollowers(collective._id);

      if (response.data.status === 'success') {
        setFollowersList(response.data.collectiveFollowers);
      }

      setFollowLoading(false);
    } catch {
      setFollowLoading(false);
    }
  };

  useEffect(() => {
    if (collective?._id) {
      collectiveFollowersHandler();
      if (!isPublic) {
        updateLoggedInUserFollowingStatus();
      }
    }

    if (typeof window !== 'undefined') {
      setCollectiveUrl(window.location.href);
    }

    setCollabCount(
      collective?.projects?.length + collective?.selectedProjects?.length,
    );
    let membersCount = 0;

    if (collective?.members) {
      membersCount = collective?.members?.filter(
        (member) => member.status === 'ACCEPTED',
      ).length;
    }
    // Adding the admin in the members count as well
    setMembersCount(membersCount + 1);
    setFollowersCount(collective?.numberOfFollowers);
  }, [collective]);
  const coverImage = collective?.collectiveBanner
    ? collective?.collectiveBanner
    : '';

  return (
    <>
      <CoverContainer>
        <BlurredSide src={coverImage} />
        <ProfileCoverImage
          src={coverImage}
          isGradient={!collective?.collectiveBanner}
          alt="banner"
        />
        <BlurredSide src={coverImage} />
      </CoverContainer>

      <ProfileDetailContainer showBorder={isPublic} mt={-7}>
        <ProfileBanneInfoContainer padding="20px 0 0 20px">
          <Tooltip title={t('Profile Image')}>
            <Avatar
              withBorder={
                !collective?.image?.includes(
                  'https://source.boringavatars.com/',
                )
              }
              borderSize="6px"
              size={'14rem'}
              marginRight="10px"
              avatar={collective?.image}
              statusIconSize="36px"
              borderRadius={'50%'}
              statusIconRightPosition={-6}
              statusIconBottomPosition={-6}
            />
          </Tooltip>

          <ProfileBanneInfoDetailContainer>
            <ProfileBanneInfoTitle>{collective.title}</ProfileBanneInfoTitle>

            <ProfileBioNew>{collective?.introduction}</ProfileBioNew>
            <ProfileStatWrap>
              {collabCount > 0 && (
                <Box>
                  {collabCount || 0} {`collab${collabCount > 1 ? 's' : ''}`}
                </Box>
              )}

              {membersCount > 0 && (
                <>
                  {collabCount > 0 && <DotWrap>•</DotWrap>}
                  <Box>
                    {membersCount || 0} {`member${membersCount > 1 ? 's' : ''}`}
                  </Box>
                </>
              )}

              {followersCount > 0 && (
                <>
                  <DotWrap>•</DotWrap>
                  <Box
                    cursor="pointer"
                    onClick={() =>
                      dispatch(
                        setCurrentDialog('collective-follow-list-dialog'),
                      )
                    }
                  >
                    {followersCount || 0}{' '}
                    {`follower${followersCount > 0 ? 's' : ''}`}
                  </Box>
                </>
              )}
            </ProfileStatWrap>

            {!isPublic && (
              <ButtonsWrap>
                {!isAdmin &&
                  (isLoggedInUserFollowing ? (
                    <FollowWrap
                      onClick={unfollowCollectiveHandler}
                      onMouseEnter={() => setIsFollowingButtonHovered(true)}
                      onMouseLeave={() => setIsFollowingButtonHovered(false)}
                    >
                      {followLoading ? (
                        <SmallSpinner />
                      ) : isFollowingButtonHovered ? (
                        t('unfollow')
                      ) : (
                        t('Following')
                      )}
                    </FollowWrap>
                  ) : (
                    <FollowWrap onClick={followCollectiveHandler}>
                      follow
                    </FollowWrap>
                  ))}
                <RoundedIcon onClick={handleShareCollab}>
                  <ShareUploadIcon
                    width={18}
                    height={18}
                    color={theme.palette.text.primary}
                  />
                </RoundedIcon>
              </ButtonsWrap>
            )}
          </ProfileBanneInfoDetailContainer>
        </ProfileBanneInfoContainer>
      </ProfileDetailContainer>

      <ShareHorizontalMenu
        shareAnchorEl={shareAnchorEl}
        setShareAnchorEl={setShareAnchorEl}
        url={collectiveUrl}
        subject='Team'
      />
      {/* Dialogs rendering start */}
      <CollectiveFollowListDialog
        open={currentDialog === 'collective-follow-list-dialog'}
        handleClose={() => dispatch(setCurrentDialog(''))}
        followersList={followersList}
      />
      {/* Dialogs rendering ends */}
    </>
  );
};
