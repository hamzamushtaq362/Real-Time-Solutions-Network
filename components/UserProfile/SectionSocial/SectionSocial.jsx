import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import { Box, useTheme } from '@mui/material';
import { Iconify } from '../../Iconify';
import { useNotistack } from '~/hooks';
import { copyToClipBoard } from '~/utils';
import { UilCommentDots, UilRss, UilUsersAlt } from '@iconscout/react-unicons';
import InfoTile from '../components/InfoTile/InfoTile';
import PlatformCard from '../components/PlatformCard/PlatformCard';
import {
  CollabBtn,
  FollowBtnsGroup,
  FollowButton,
  MessageBtn,
  UnfollowButton,
} from '../SectionBanner/elements';
import {
  CountLabel,
  InfoDataContainer,
  SectionBanneInfoContainer,
  SectionBanneInfoLeftAddress,
  SectionBanneInfoLeftName,
  SectionSocialContainer,
  SectionSocialRightContainer,
} from './elements';
import axios from 'axios';
import { BASE_URL, getMarketPlaces } from '~/apis';
import { fetchRefreshToken, reFetchTokenExpire } from '~/redux';
import { useRouter } from 'next/router';
import { isConverversationExistsWithUser } from 'apis/inbox';
import SparkleIcon from '../../Icons/SparkleIcon';
import FeedIcon from '../../Icons/FeedIcon';

const SectionSocial = ({
  user,
  isLoggedInUserFollowing,
  followUser,
  unFollowUser,
  profileBelongsToLoggedInUser,
  userFollowersCount,
  handleShowFollowList,
  isPagePublic,
  setSelectedCollabuser,
}) => {
  const { t } = useTranslation();
  const generateSnackbar = useNotistack();
  const theme = useTheme();

  const adlength = (str) => {
    return str.split('').length;
  };

  const router = useRouter();

  // get user id from local storage
  const [platforms, setPlatforms] = useState([]);
  const [allPlatforms, setAllPlatforms] = useState([]);
  const [platformsLoading, setPlatformsLoading] = useState(false);

  const fetchMarketPlaces = async () => {
    await getMarketPlaces()
      .then((res) => {
        let optionArray = [];
        if (res.data.data.marketplaces.length) {
          res.data.data.marketplaces.forEach((i) => {
            optionArray.push({
              value: i.iconName,
              label: i.iconName,
              icon: i.iconUrl,
            });
          });
        }
        setAllPlatforms(optionArray);
      })
      .catch(() => {});
  };

  useEffect(() => {
    fetchMarketPlaces();
  }, []);

  //   2.] get joined members
  const getJoinedCollabs = async () => {
    try {
      setPlatformsLoading(true);
      const f1 = async () => {
        const res = await axios.post(`${BASE_URL}/api/v1/collabmember/all`, {
          status: 'ACCEPTED',
          receiverId: user?._id,
        });
        return res;
      };
      const res = await reFetchTokenExpire(f1, fetchRefreshToken);
      if (res) {
        let platforms = [];
        res.data.data.members.forEach((m) => {
          m &&
            m.collabId &&
            m.collabId.platform &&
            m.collabId.platform.forEach((p) => {
              if (!platforms.includes(p)) {
                platforms.push(p);
              }
            });
        });

        const userInterestedPlatforms = user?.interestedMetaverseWorlds;

        // Extracting the user interested platfroms from onboarding and merging it with the joined platforms
        if (userInterestedPlatforms?.length > 0) {
          userInterestedPlatforms.forEach((interestedPlatform) => {
            if (!platforms.includes(interestedPlatform)) {
              platforms.unshift(interestedPlatform);
            }
          });
        }

        setPlatforms((prev) => {
          return [...prev, ...platforms];
        });
        setPlatformsLoading(false);
      }
    } catch (err) {
      setPlatformsLoading(false);
    }
  };

  const getMyCollabs = async () => {
    try {
      const f1 = async () => {
        const res = await axios.get(
          `${BASE_URL}/api/v1/collabmember/getAllMyCollabs?userId=${user._id}`,
        );
        return res;
      };
      const res = await reFetchTokenExpire(f1, fetchRefreshToken);
      if (res) {
        let arr = [];
        res.data.data.collabs.forEach((m) => {
          m &&
            m.platform &&
            m.platform.forEach((p) => {
              if (!arr.includes(p)) {
                arr.push(p);
              }
            });
        });
        setPlatforms([...platforms, ...arr]);
      }
    } catch (err) {
      //
    }
  };

  const messageButtonClickHandler = async (userId) => {
    const res = await isConverversationExistsWithUser(userId);
    const isConversationExist = res?.data?.conversationExist;
    if (isConversationExist) {
      const conversationId = res?.data?.conversationId;
      router.push(`/inbox?conversation=${conversationId}`);
    } else {
      router.push(`/inbox?user=${userId}`);
    }
  };

  useEffect(() => {
    getJoinedCollabs();
    getMyCollabs();
  }, []);

  return (<>
    <SectionSocialContainer>
      <SectionBanneInfoContainer>
        <div>
          <SectionBanneInfoLeftName>
            {user?.fullName || 'No Name'}
          </SectionBanneInfoLeftName>

          <SectionBanneInfoLeftAddress>
            <Box sx={{ display: 'flex' }}>
              {user &&
              user.totalCollabs &&
              user.totalCollabs >= 1 ? (
                <InfoDataContainer>
                  <SparkleIcon
                    width={18}
                    height={18}
                    color={theme.palette.grey.common}
                  />
                  <CountLabel>
                    {user.totalCollabs}{t("Collabs")}</CountLabel>
                </InfoDataContainer>
              ) : (
                ''
              )}

              {user?.collabsFinalized > 0 ? (
                <InfoDataContainer>
                  <SparkleIcon
                    width={18}
                    height={18}
                    color={theme.palette.grey.common}
                  />
                  <CountLabel>{user?.collabsFinalized}{t("Nfts")}</CountLabel>
                </InfoDataContainer>
              ) : (
                ''
              )}

              {userFollowersCount && userFollowersCount >= 1 ? (
                <InfoDataContainer
                  onClick={() => handleShowFollowList('followers')}
                >
                  <FeedIcon
                    width={18}
                    height={18}
                    color={theme.palette.grey.common}
                  />
                  <CountLabel>{userFollowersCount}{t("Subscribers")}</CountLabel>
                </InfoDataContainer>
              ) : (
                ''
              )}
              {user?.connections > 0 ? (
                <InfoDataContainer>
                  <UilUsersAlt
                    size="20"
                    color={theme.palette.grey.common}
                  />
                  <CountLabel>{user?.connections}{t("Collaborators")}</CountLabel>
                </InfoDataContainer>
              ) : (
                ''
              )}
            </Box>

            <Box
              sx={{
                display: 'flex',
                cursor: 'pointer',
                alignItems: 'center',
              }}
              onClick={() => {
                copyToClipBoard(user.addresses);
                generateSnackbar('Address copied', 'success');
              }}
            >
              <Iconify
                icon="fa-brands:ethereum"
                width="16px"
                height="16px"
                color="#808191"
              />
              <CountLabel>
                {user.addresses && user.addresses[0]
                  ? user.addresses[0].slice(0, 4) +
                    '..' +
                    user.addresses[0].slice(40, adlength(user.addresses[0]))
                  : '0xeaf6c2eae09b...0bg8'}
              </CountLabel>
            </Box>
          </SectionBanneInfoLeftAddress>
          <InfoTile user={user} />
          {!isPagePublic && (
            <>
              {!profileBelongsToLoggedInUser && (
                <FollowBtnsGroup>
                  {!isLoggedInUserFollowing ? (
                    <FollowButton onClick={followUser}>
                      {/* <FeedIcon /> */}
                      <UilRss size="20" />
                      <span>{t("Subscribe")}</span>
                    </FollowButton>
                  ) : (
                    <UnfollowButton onClick={unFollowUser}>
                      <span id="following-text">{t("Subscribed")}</span>{" "}
                      <span id="unfollow-text">{t("UnSubscribe")}</span>
                    </UnfollowButton>
                  )}
                  <CollabBtn
                    onClick={() => {
                      setSelectedCollabuser();
                    }}
                  >
                    <SparkleIcon
                      width={18}
                      height={18}
                      color={theme.palette.grey.common}
                    />
                    <span>{t("Collab")}</span>
                  </CollabBtn>
                  <MessageBtn
                    onClick={() => messageButtonClickHandler(user._id)}
                  >
                    <UilCommentDots size="24" />
                  </MessageBtn>
                </FollowBtnsGroup>
              )}
            </>
          )}
        </div>

        <SectionSocialRightContainer>
          <PlatformCard
            user={user}
            platforms={platforms}
            allPlatforms={allPlatforms}
            platformsLoading={platformsLoading}
          />
        </SectionSocialRightContainer>
      </SectionBanneInfoContainer>
    </SectionSocialContainer>
  </>);
};

export default SectionSocial;
