import {
  MissionItem as MissionItemStyled,
  MissionAction,
  MissionText,
  ArrowRightUpLongIconStyled,
  InfoSection,
  InfoTitle,
  InfoItemWrap,
  InfoValue,
} from './elements';
import React, { useEffect, useState } from 'react';
import { Box, useTheme } from '@mui/material';
import { useNotistack } from '~/hooks';
import {
  fetchCollabMissions,
  isUserDiscordConnected,
  isUserTwitterConnected,
  beginMission,
  verifyMission,
} from '~/apis';
import {
  Spinner,
  SmallSpinner,
  JoinDiscordDialog,
  PostTweetDialog,
  RetweetTweetDialog,
  LikeTweetDialog,
  AddTwitterBioDialog,
  MissionsIcon,
} from '~/components';
import { useRouter } from 'next/router';
import { getSessionData, removeSessionData, setSessionData } from '~/utils';

export const MissionItem = ({
  mission,
  index,
  setMissions,
  isAMember,
  isCollabBelongsToLoginUser,
  missionStarted,
}) => {
  const [isHovered, setIsHovered] = useState('');
  const [startMissionLoading, setStartMissionLoading] = useState(false);
  const [submitMissionLoading, setSubmitMissionLoading] = useState(false);
  const generateSnackbar = useNotistack();
  const router = useRouter();
  const [missionStartDialog, setMissionStartDialog] = useState(null); // missionId
  const [isTwitterConnected, setIsTwitterConnected] = useState(false); // missionId

  const getMissionStatusTextFromStatus = (status) => {
    switch (status) {
      case 'approved':
        return 'Approved';
      case 'rejected':
        return 'Rejected';
      case 'not-started':
        return 'Start';
      case 'completed':
        return 'Submitted';
    }
  };

  const theme = useTheme();

  const onStartMission = async () => {
    if (mission.status === 'not-started') {
      if (mission?.platform === 'discord') {
        try {
          setStartMissionLoading(true);
          const response = await isUserDiscordConnected();
          if (response.data.status === 'success') {
            if (response.data.discordConnected) {
              // dispatch(setCurrentDialog('join-discord-dialog'));
              setMissionStartDialog(mission._id);
            } else {
              generateSnackbar(
                'Please connect your discord account before starting the mission!',
                'error',
              );
              router.push('/settings?view=account');
            }
          }
          setStartMissionLoading(false);
        } catch (err) {
          setStartMissionLoading(false);
          generateSnackbar('Something went wrong!', 'error');
        }
      } else if (mission?.platform === 'twitter') {
        const response = await isUserTwitterConnected();

        if (response.data.status === 'success') {
          setMissionStartDialog(mission._id);

          if (response.data.twitterConnected) {
            setIsTwitterConnected(true);
            // switch (mission?.missionType) {
            //   case 'post-tweet':
            //     dispatch(setCurrentDialog('post-tweet-dialog'));
            //     break;
            //   case 'add-twitter-bio':
            //     dispatch(setCurrentDialog('add-twitter-bio-dialog'));
            //     break;
            //   case 'retweet-tweet':
            //     dispatch(setCurrentDialog('retweet-tweet-dialog'));
            //     break;
            //   case 'like-tweet':
            //     dispatch(setCurrentDialog('like-tweet-dialog'));
            //     break;
            //   default:
            //     break;
            // }
          } else {
            setIsTwitterConnected(false);
          }
        }
      }
    }
  };

  const onSubmitMission = async (metadata = {}) => {
    // Create mission instance
    // Verfiy mission instance

    try {
      setSubmitMissionLoading(true);
      const response = await beginMission(mission._id, metadata);

      if (response.data.status === 'success') {
        if (mission?.platform === 'discord') {
          const verifyResponse = await verifyMission(
            response.data.missionInstance._id,
          );

          if (verifyResponse.data.status === 'success') {
            generateSnackbar('Mission submitted successfully!', 'success');
            let status = 'completed';
            const isRejected = verifyResponse.data.isRejected;
            const isVerified = verifyResponse.data.isVerified;

            if (isRejected) {
              status = 'rejected';
            } else if (isVerified) {
              status = 'approved';
            }

            setMissions((prevMissions) => {
              const newMissions = [...prevMissions];
              newMissions[index].status = status;
              return newMissions;
            });
          }
        } else if (mission?.platform === 'twitter') {
          generateSnackbar('Mission submitted successfully!', 'success');
          // In the case of manual approval we will mark the mission as completed
          setMissions((prevMissions) => {
            const newMissions = [...prevMissions];
            newMissions[index].status = 'completed';
            return newMissions;
          });
        }
      }

      setMissionStartDialog(null);
      setSubmitMissionLoading(false);
    } catch (err) {
      setSubmitMissionLoading(false);
      generateSnackbar(
        err?.response?.data?.message || 'Something went wrong!',
        'error',
      );
    }
  };

  const ERROR = 'error';
  const SUCCESS = 'success';
  const TWITTER_POST_REDIRECTION = 'twitter-post-redirection';
  const SESSION_MISSION_ID = 'mission-id';
  const handleTwitterConnection = () => {
    setSessionData(TWITTER_POST_REDIRECTION, `/collab/${mission?.collab}`);
    setSessionData(SESSION_MISSION_ID, mission._id);
    generateSnackbar(
      'Please connect your twitter account before starting the mission!',
      ERROR,
    );
    router.push('/settings?view=account&callTwitterAuth=true');
  };

  const checkIfUserTriedConnectingToTwitter = async () => {
    if (missionStarted !== mission._id) return;

    const twitterPostRedirectionRoute = await getSessionData(
      TWITTER_POST_REDIRECTION,
    );
    if (!twitterPostRedirectionRoute) return;

    try {
      const {
        data: { status, twitterConnected },
      } = await isUserTwitterConnected();

      if (status === SUCCESS && twitterConnected) {
        setMissionStartDialog(mission._id);
        setIsTwitterConnected(true);
      }
    } catch (error) {
      console.error('Error checking Twitter connection:', error);
    } finally {
      removeSessionData(TWITTER_POST_REDIRECTION);
      removeSessionData(SESSION_MISSION_ID);
    }
  };

  useEffect(() => {
    checkIfUserTriedConnectingToTwitter();
  }, []);

  return (
    <>
      {/* Mission Dialog Templates rendering start */}

      {mission?.missionType === 'join-discord-server' && (
        <JoinDiscordDialog
          missionDetails={mission}
          submitMissionLoading={submitMissionLoading}
          onSubmit={onSubmitMission}
          open={missionStartDialog === mission._id}
          setOpen={setMissionStartDialog}
        />
      )}

      {mission?.missionType === 'add-twitter-bio' && (
        <AddTwitterBioDialog
          missionDetails={mission}
          submitMissionLoading={submitMissionLoading}
          onSubmit={onSubmitMission}
          open={missionStartDialog === mission._id}
          setOpen={setMissionStartDialog}
        />
      )}

      {mission?.missionType === 'post-tweet' && (
        <PostTweetDialog
          missionDetails={mission}
          submitMissionLoading={submitMissionLoading}
          onSubmit={onSubmitMission}
          open={missionStartDialog === mission._id}
          setOpen={setMissionStartDialog}
          isCollabBelongsToLoginUser={isCollabBelongsToLoginUser}
          isAMember={isAMember}
          isUserTwitterConnected={isTwitterConnected}
          handleTwitterConnection={handleTwitterConnection}
        />
      )}

      {mission?.missionType === 'retweet-tweet' && (
        <RetweetTweetDialog
          missionDetails={mission}
          submitMissionLoading={submitMissionLoading}
          onSubmit={onSubmitMission}
          open={missionStartDialog === mission._id}
          setOpen={setMissionStartDialog}
          isUserTwitterConnected={isTwitterConnected}
          handleTwitterConnection={handleTwitterConnection}
        />
      )}

      {mission?.missionType === 'like-tweet' && (
        <LikeTweetDialog
          missionDetails={mission}
          submitMissionLoading={submitMissionLoading}
          onSubmit={onSubmitMission}
          open={missionStartDialog === mission._id}
          setOpen={setMissionStartDialog}
          isUserTwitterConnected={isTwitterConnected}
          handleTwitterConnection={handleTwitterConnection}
        />
      )}

      {/* Mission Dialog Templates rendering end */}

      <MissionItemStyled key={index}>
        <InfoValue>{mission?.title}</InfoValue>

        <MissionAction
          onClick={onStartMission}
          status={mission?.status}
          hovered={isHovered}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {!(isAMember || isCollabBelongsToLoginUser) && (
            <>
              <MissionText>
                {getMissionStatusTextFromStatus(mission?.status)}
              </MissionText>
              <Box display="flex" component="span" ml={0.5}>
                {!startMissionLoading ? (
                  <>
                    {mission?.status === 'not-started' && (
                      <ArrowRightUpLongIconStyled
                        color={theme.palette.text.primary}
                        width={15}
                        height={15}
                        hovered={isHovered}
                      />
                    )}
                  </>
                ) : (
                  <Spinner size={10} />
                )}
              </Box>
            </>
          )}
        </MissionAction>
      </MissionItemStyled>
    </>
  );
};

export const Missions = ({
  collabId,
  isAMember,
  isCollabBelongsToLoginUser,
}) => {
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noMissionsFound, setNoMissionsFound] = useState(true);
  const [missionStarted, setMissionStarted] = useState(null);
  const theme = useTheme();

  const getMissions = async () => {
    try {
      setLoading(true);
      const res = await fetchCollabMissions(collabId);

      if (res.data.status === 'success') {
        setMissions(res.data.missions);
        if (res.data.missions.length === 0) {
          setNoMissionsFound(true);
        } else {
          setNoMissionsFound(false);
        }
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMissions();
  }, []);
  const SESSION_MISSION_ID = 'mission-id';
  useEffect(() => {
    const checkIfMissionStartedFromSession = async () => {
      try {
        const missionId = await getSessionData(SESSION_MISSION_ID);

        if (missionId) {
          setMissionStarted(missionId);
        }
      } catch (error) {
        console.error('Error checking if mission started from session:', error);
      }
    };

    checkIfMissionStartedFromSession();
  }, []);

  return (
    <>
      {!loading ? (
        <>
          {!noMissionsFound && (
            <>
              {missions?.length !== 0 && (
                <>
                  <InfoSection>
                    <MissionsIcon
                      width={24}
                      height={24}
                      color={theme.palette.text.primary}
                    />
                    <InfoTitle>Missions</InfoTitle>
                  </InfoSection>
                  {missions.map((mission, index) => (
                    <InfoItemWrap
                      padding={theme.spacing(2, 5, 2, 5)}
                      key={index}
                    >
                      <MissionItem
                        mission={mission}
                        key={index}
                        index={index}
                        setMissions={setMissions}
                        isAMember={isAMember}
                        isCollabBelongsToLoginUser={isCollabBelongsToLoginUser}
                        missionStarted={missionStarted}
                      />
                    </InfoItemWrap>
                  ))}
                </>
              )}
            </>
          )}
        </>
      ) : (
        <SmallSpinner />
      )}
    </>
  );
};
