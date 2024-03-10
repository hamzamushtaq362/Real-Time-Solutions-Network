import {
  Avatar,
  Tooltip,
  FollowListDialog,
  ConfirmDialog,
  BlockCreatorConfirmationDialog,
  ReportCreatorDialog,
  ClaimProfileDialog,
  ShareUploadIcon,
  CollabRequestDialog,
  ContributedProfileEditDialog,
  MailIcon,
  Spinner,
} from '~/components';
import { useTranslation } from 'react-i18next';
import {
  ProfileBioNew,
  ProfileBanneInfoContainer,
  ProfileBanneInfoDetailContainer,
  ProfileBanneInfoTitle,
  ProfileDetailContainer,
  CoverImageContainer,
  CircleImagesContainer,
  CoverContainer,
  ProfileStatWrap,
  DotWrap,
  ButtonsWrap,
  FollowWrap,
  RoundedIcon,
  CommunityContributed,
  NameWrap,
} from 'components/common/ProfileCommon/element';
import { Box, Grid, useTheme } from '@mui/material';
import AvatarLogo from '../../UserProfile/assets/Avatar.jpg';
import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import config, { UserAction } from '~/config';
import {
  captilalizeString,
  filterNullValuesFromArray,
  trackMixPanel,
  useIsMobileView,
} from 'utils/utils';
import { useNotistack, useProtectedAction } from '~/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentDialog } from '~/redux';
import { isConverversationExistsWithUser, sendMessage } from '~/apis';
import { useRouter } from 'next/router';
import { getSessionData, removeSessionData } from 'utils/session';
import { CoverImage } from '~/assets';
import CanRender from '../../CanRender';
import { PanZoomImage } from '../../Collective/CollectiveCreate/BasicInformation/PanZoomImage';
import { useForm } from 'react-hook-form';
import AppContext from '../../../context/AppContext';
import { ShareHorizontalMenu } from '../../ShareHorizontalMenu';

export const CreatorProfileTopSection = ({
  user,
  profileBelongsToLoggedInUser,
  isPublicView,
  setUser,
}) => {
  const userBadges = user?.assignedBadges || [];
  const { t } = useTranslation();

  const avatar = user?.imageUrl ? user.imageUrl : AvatarLogo;
  const avatarSrc = avatar?.src ? avatar?.src : avatar;

  const isMobileView = useIsMobileView();

  const BASE_URL = config.BASE_URL;
  const generateSnackbar = useNotistack();
  const { user: auth } = useContext(AppContext);

  const [isLoggedInUserFollowing, setIsLoggedInUserFollowing] = useState(false);
  const [userFollowersCount, setUserFollowersCount] = useState(0);
  const [followTab, setFollowTab] = useState('followers');
  const [followersList, setFollowersList] = useState([]);
  const [followingsList, setFollowingsList] = useState([]);
  const [, setFollowInfoListLoading] = useState(true);
  const [followHovered, setFollowHovered] = useState(false);
  const router = useRouter();
  const [messageButtonLoading, setMessageButtonLoading] = useState(false);
  const [profileUrl, setProfileUrl] = useState('');
  const [shareAnchorEl, setShareAnchorEl] = useState(null);
  const [preSelectedClaimProfile, setPreSelectedClaimProfile] = useState(null);
  const [requestTitle, setRequestTitle] = useState('');
  const [requestDescription, setRequestDescription] = useState('');

  const [coverRepositioning, setCoverRepositioning] = useState(false);
  const [isConversationExist, setIsConversationExist] = useState(false);
  const [isCommunicationAllowed, setIsCommunicationAllowed] = useState(false);
  const [conversationId, setConversationId] = useState(null);

  const checkIfConversationExist = async (userId) => {
    const resConversation = await isConverversationExistsWithUser(userId);

    const isConversationExist = resConversation?.data?.conversationExist;
    const conversationId = resConversation?.data?.conversationId;
    setConversationId(conversationId);

    const isCommunicationAllowed =
      resConversation?.data?.isCommunicationAllowed;
    setIsCommunicationAllowed(isCommunicationAllowed);

    if (isConversationExist) {
      setIsConversationExist(true);
    } else {
      setIsConversationExist(false);
    }
  };

  useEffect(() => {
    if (user && !isPublicView) {
      checkIfConversationExist(user?._id);
    }
  }, [user]);

  const dispatch = useDispatch();
  const { currentDialog } = useSelector((state) => state.dialog);
  const theme = useTheme();

  const { watch, setValue } = useForm({
    defaultValues: {
      coverImageUrl: user?.coverImageUrl,
      coverImageUrlCropped: user?.coverImageUrlCropped
        ? user.coverImageUrlCropped
        : CoverImage.src,
    },
  });

  const getFollowStatus = async () => {
    const { _id } = user;
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/v1/follow/is-user-followed/${_id}`,
      );
      if (data.status === 'success') {
        setIsLoggedInUserFollowing(data.isFollowed);
      }
    } catch (error) {
      //
    }
  };

  const getFollowListInformation = async () => {
    try {
      setFollowInfoListLoading(true);
      const { data: followersData } = await axios.get(
        `${BASE_URL}/api/v1/follow/get-followers/${user._id}`,
      );

      const { data: followingsData } = await axios.get(
        `${BASE_URL}/api/v1/follow/get-followings/${user._id}`,
      );

      const filteredFollowersData = filterNullValuesFromArray(
        followersData?.followers,
      );

      const filteredFollowingsData = filterNullValuesFromArray(
        followingsData?.followings,
      );

      setFollowersList(filteredFollowersData);
      setFollowingsList(filteredFollowingsData);
      setUserFollowersCount(filteredFollowersData?.length || 0);
      setFollowInfoListLoading(false);
    } catch {
      setFollowInfoListLoading(false);

      generateSnackbar(
        'Something went wrong while fetching the followers/followings list',
        'error',
      );
    }
  };

  const followUser = async () => {
    const { _id } = user;
    try {
      setFollowersList((prevList) => {
        const { userId, username, imageUrl } = auth;
        const updatedPrevList = [...prevList];
        updatedPrevList.push({
          _id: userId,
          username: username,
          skills: [],
          imageUrl,
        });
        return updatedPrevList;
      });

      setIsLoggedInUserFollowing(true);
      setUserFollowersCount((prevCount) => prevCount + 1);
      await axios.post(`${BASE_URL}/api/v1/follow/follow-user`, {
        followTo: _id,
      });
      trackMixPanel('Follow_User');
    } catch (error) {
      // TODO: Add Notification about user notification
      setUserFollowersCount((prevCount) => prevCount - 1);
      setIsLoggedInUserFollowing(false);
    }
  };

  const unFollowUser = async () => {
    const { _id } = user;
    try {
      setFollowersList((prevList) => {
        return prevList.filter(({ _id }) => {
          return _id !== auth.userId;
        });
      });
      setIsLoggedInUserFollowing(false);
      dispatch(setCurrentDialog(''));
      setUserFollowersCount((prevCount) => prevCount - 1);
      await axios.post(`${BASE_URL}/api/v1/follow/unfollow-user`, {
        unFollowTo: _id,
      });
    } catch (error) {
      // TODO: Add Notification about user notification
      dispatch(setCurrentDialog(''));
      setUserFollowersCount((prevCount) => prevCount + 1);
      setIsLoggedInUserFollowing(true);
    }
  };

  useEffect(() => {
    if (user && !isPublicView) {
      getFollowStatus();
      getFollowListInformation();
    }
  }, [user]);

  const messageButtonClickHandler = async (userId) => {
    setMessageButtonLoading(true);
    if (isConversationExist) {
      router.push(`/inbox?conversation=${conversationId}`);
    } else {
      router.push(`/inbox?user=${userId}`);
    }
    setMessageButtonLoading(false); // This will handle both cases
    return;
  };

  const sendCollabRequest = async () => {
    setMessageButtonLoading(true);
    dispatch(setCurrentDialog(''));
    const userId = user?._id;
    const firstName = user?.fullName?.split(' ')[0];
    const collabReqSubHeader = `Hi ${firstName}, I'm interested in collaborating with you on :`;
    const finalMessage = [
      collabReqSubHeader,
      '<br>\n',
      `<strong>${requestTitle}</strong><br>\n`,
      '<br>\n',
      requestDescription,
    ].join('\n');
    const res = await sendMessage(userId, finalMessage, true);

    if (res?.data?.status === 'success') {
      generateSnackbar('Collab Request sent successfully', 'success');
      setMessageButtonLoading(false);
    }
  };

  // const [wallets, setWallets] = useState([]);

  // const [currentWallet, setCurrentWallet] = useState('');

  const setUpUserWallets = async () => {
    // let currentWallet = '';
    //
    // if (user?.selectedWalletAddress) {
    //   currentWallet = user?.selectedWalletAddress;
    // } else {
    //   currentWallet = user?.addresses[0];
    // }
    // setCurrentWallet(currentWallet);
    // if (profileBelongsToLoggedInUser) {
    //   const wallets = await getUserWalletAddresses();
    //
    //   const walletAddresses = [];
    //
    //   if (wallets?.length > 0) {
    //     wallets?.forEach((wallet) => {
    //       walletAddresses.push(wallet?.walletAddress);
    //     });
    //   }
    //   setWallets(walletAddresses);
    // }
  };

  // const onNewWalletSelect = async (newWallet) => {
  //   if (newWallet !== currentWallet) {
  //     const response = await updateUserSelectedWalletAddress(newWallet);
  //
  //     if (response?.data?.status === 'success') {
  //       generateSnackbar('Successfully updated wallet', 'success');
  //
  //       setAuth({
  //         ...auth,
  //         selectedWalletAddress: newWallet,
  //       });
  //     }
  //   }
  // };

  // const onBlockUserClick = () => {
  //   dispatch(setCurrentDialog('block-creator-confirmation-dialog'));
  // };
  //
  // const onReportUserClick = () => {
  //   dispatch(setCurrentDialog('report-creator-dialog'));
  // };

  // const onClaimProfileClick = () => {
  //   if (userDetails) {
  //     const userTwitter = userDetails?.socials?.find(
  //       (social) => social?.name === 'twitter',
  //     );
  //
  //     if (!userTwitter) {
  //       generateSnackbar(
  //         'Please Refresh, Twitter handle is required to claim profile',
  //         'error',
  //       );
  //       return;
  //     }
  //
  //     setPreSelectedClaimProfile({
  //       _id: user?._id,
  //       username: user?.username,
  //       fullName: user?.fullName,
  //       image: user?.imageUrl,
  //       twitter: userTwitter?.value,
  //     });
  //     dispatch(setCurrentDialog('claim-profile-dialog'));
  //   }
  // };

  const RenderMessageIcon = () => {
    return (
      <RoundedIcon
        onClick={useProtectedAction(() => {
          if (isCommunicationAllowed) {
            messageButtonClickHandler(user?._id);
          } else {
            dispatch(setCurrentDialog('collab-request-dialog'));
          }
        })}
        disabled={messageButtonLoading}
      >
        {messageButtonLoading ? (
          <Spinner size={15} />
        ) : (
          <MailIcon
            width="18px"
            height="18px"
            color={theme.palette.text.primary}
          />
        )}
      </RoundedIcon>
    );
  };

  const handleShareCollab = (event) => {
    setShareAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    setUpUserWallets();
  }, [profileBelongsToLoggedInUser]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setProfileUrl(window.location.href);
    }
  }, [user]);

  useEffect(() => {
    // For Twitter Authorization
    const urlSearchParams = new URLSearchParams(window.location.search);
    const claim = urlSearchParams.get('claim');

    if (claim === 'true') {
      const claimProfile = JSON.parse(
        JSON.stringify(getSessionData('claim-profile-autocomplete')),
      );

      dispatch(setCurrentDialog('claim-profile-dialog'));

      if (claimProfile) {
        setPreSelectedClaimProfile(claimProfile);
        removeSessionData('claim-profile-autocomplete');
      }
    }
  }, []);
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <ContributedProfileEditDialog
        open={showDialog}
        handleClose={() => setShowDialog(false)}
        userData={user}
        setUser={setUser}
      />

      <CoverImageContainer>
        <CoverContainer>
          <PanZoomImage
            imageFile={watch('coverImageUrl')}
            setImageFile={(file) => setValue('coverImageUrl', file)}
            coverImageUrlCropped={watch('coverImageUrlCropped')}
            width="100%"
            height={250}
            uploadProgress={() => {}}
            coverRepositioning={coverRepositioning}
            setCoverRepositioning={setCoverRepositioning}
            setValue={setValue}
            creatorPage={true}
            cropData={user?.coverImageCropData}
            isAdmin={user?._id === auth?.userId}
          />
        </CoverContainer>

        <CircleImagesContainer>
          <Grid
            container
            alignSelf={'flex-start'}
            justifyContent="flex-end"
            marginTop={-11}
          >
            {userBadges &&
              userBadges.length > 0 &&
              userBadges.map((badge, index) => (
                <Grid item key={index} marginRight={1}>
                  <Avatar
                    key={index}
                    withBorder={
                      !avatarSrc?.includes('https://source.boringavatars.com/')
                    }
                    borderSize="1px"
                    size={50}
                    marginRight="10px"
                    avatar={badge?.badgeObjectId?.image}
                    statusIconSize="36px"
                    borderRadius={'50%'}
                    statusIconRightPosition={-6}
                    statusIconBottomPosition={-6}
                  />
                </Grid>
              ))}
          </Grid>
        </CircleImagesContainer>
      </CoverImageContainer>
      <ProfileDetailContainer showBorder={isPublicView}>
        <ProfileBanneInfoContainer padding="20px 0 0 20px">
          <Tooltip title={t('Profile Image')}>
            <Avatar
              withBorder={
                !avatarSrc?.includes('https://source.boringavatars.com/')
              }
              borderSize="1px"
              size={isMobileView ? 112 : 190}
              marginRight="10px"
              avatar={avatar}
              statusIconSize="36px"
              borderRadius={'50%'}
              statusIconRightPosition={-6}
              statusIconBottomPosition={-6}
              sx={{ zIndex: 10 }}
            />
          </Tooltip>

          <ProfileBanneInfoDetailContainer>
            <NameWrap>
              <ProfileBanneInfoTitle>
                {user?.fullName
                  ? user?.fullName
                  : captilalizeString(user?.username)}
              </ProfileBanneInfoTitle>
            </NameWrap>
            {user?.isContributedProfile && (
              <Tooltip title="Information about this Person has been contributed by the Community">
                <CommunityContributed>
                  Community Contributed
                </CommunityContributed>
              </Tooltip>
            )}
            <ProfileBioNew>{user?.introduction ?? user?.bio}</ProfileBioNew>
            <ProfileStatWrap>
              {user?.totalCollabs > 0 && (
                <Box>
                  {user?.totalCollabs}{' '}
                  {`collab${user?.totalCollabs > 1 ? 's' : ''}`}
                </Box>
              )}
              {user?.connections > 0 && (
                <>
                  {user?.totalCollabs > 0 && <DotWrap>•</DotWrap>}
                  <Box>
                    {user?.connections}{' '}
                    {`connection${user?.connections > 1 ? 's' : ''}`}
                  </Box>
                </>
              )}
              {userFollowersCount > 0 && (
                <>
                  <DotWrap>•</DotWrap>
                  <Box
                    sx={{ cursor: 'pointer' }}
                    onClick={() =>
                      dispatch(setCurrentDialog('follow-list-dialog'))
                    }
                  >
                    {userFollowersCount}{' '}
                    {`follower${userFollowersCount > 1 ? 's' : ''}`}
                  </Box>
                </>
              )}
            </ProfileStatWrap>

            {!isPublicView && (
              <ButtonsWrap>
                {!profileBelongsToLoggedInUser ? (
                  <>
                    {isLoggedInUserFollowing ? (
                      <FollowWrap
                        onClick={useProtectedAction(() =>
                          dispatch(setCurrentDialog('unfollow-user-dialog')),
                        )}
                        onMouseEnter={() => setFollowHovered(true)}
                        onMouseLeave={() => setFollowHovered(false)}
                      >
                        {followHovered ? t('unfollow') : t('following')}
                      </FollowWrap>
                    ) : (
                      <FollowWrap
                        onClick={useProtectedAction(() => followUser())}
                      >
                        follow
                      </FollowWrap>
                    )}
                    {auth?.username && <RenderMessageIcon />}
                    {user?.isContributedProfile && (
                      <CanRender
                        currentRole={auth?.userRole}
                        action={UserAction?.EDIT_CONTRIBUTED_PROFILE}
                        yes={() => (
                          <FollowWrap
                            onClick={useProtectedAction(() =>
                              setShowDialog(true),
                            )}
                          >
                            Edit Contribute Profile
                          </FollowWrap>
                        )}
                      />
                    )}
                  </>
                ) : (
                  <FollowWrap
                    onClick={useProtectedAction(() =>
                      router.push('/settings?view=profile'),
                    )}
                  >
                    {t('Edit Profile')}
                  </FollowWrap>
                )}
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
        <ShareHorizontalMenu
          shareAnchorEl={shareAnchorEl}
          setShareAnchorEl={setShareAnchorEl}
          url={profileUrl}
          subject="creator"
        />
      </ProfileDetailContainer>

      <ConfirmDialog
        open={currentDialog === 'unfollow-user-dialog'}
        handleClose={() => dispatch(setCurrentDialog(''))}
        onClick={unFollowUser}
        message={`Are you sure you want to unfollow ${user.username} ?`}
        buttonText="Unfollow"
      />

      <FollowListDialog
        followersList={followersList}
        followingsList={followingsList}
        followTab={followTab}
        setFollowTab={setFollowTab}
        open={currentDialog === 'follow-list-dialog'}
        handleClose={() => dispatch(setCurrentDialog(''))}
      />
      <BlockCreatorConfirmationDialog
        open={currentDialog === 'block-creator-confirmation-dialog'}
        handleClose={() => dispatch(setCurrentDialog(''))}
      />
      <ReportCreatorDialog
        open={currentDialog === 'report-creator-dialog'}
        handleClose={() => dispatch(setCurrentDialog(''))}
      />

      {preSelectedClaimProfile && (
        <ClaimProfileDialog
          preSelectedProfile={preSelectedClaimProfile}
          open={currentDialog === 'claim-profile-dialog'}
          handleClose={() => dispatch(setCurrentDialog(''))}
          userName={user?.username}
          onComplete={() => dispatch(setCurrentDialog(''))}
          claimingFromUserProfile={true}
        />
      )}

      <CollabRequestDialog
        open={currentDialog === 'collab-request-dialog'}
        handleClose={() => dispatch(setCurrentDialog(''))}
        buttonText="Send Request"
        header={`Send a collab request to ${user?.fullName || user?.username}`}
        avatar={avatar}
        requestTitle={requestTitle}
        requestDescription={requestDescription}
        setRequestTitle={setRequestTitle}
        setRequestDescription={setRequestDescription}
        sendCollabRequest={sendCollabRequest}
        user={user}
      />
    </>
  );
};
