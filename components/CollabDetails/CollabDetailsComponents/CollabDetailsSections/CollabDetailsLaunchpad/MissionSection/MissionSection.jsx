import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';
import {
  HeadTableCell,
  BodyTableCell,
  Tooltip,
  OutlinedButton,
  PrimaryButton,
  Spinner,
  NoResultsText,
  Spacer,
} from '~/components';
import { Table, TableHead, TableRow, TableBody, Box } from '@mui/material';
import {
  CellNormalText,
  MissionSubmissionHeader,
  SubmissionsSubHeader,
} from './elements';
import {
  truncateString,
  captilalizeString,
  getJoinedRewardableBadgesText,
} from 'utils/utils';
import {
  fetchCollabMissions,
  fetchCollabMissionSubmissions,
  deleteMission,
} from '~/apis';
import { missionTypeMappings } from '~/constants';
import { useNotistack } from '~/hooks';
import {
  JoinDiscordSubmissionTable,
  PostTweetSubmissionTable,
  TweetSubmissionTable,
} from './MissionSubmissionTable';
import { DividingHeaderRow } from '../LaunchpadLanding/DividingHeaderRow';
import {
  BackText,
  NavigateBack,
} from 'components/CollabDetails/CollabDetailsLayouts/elements';
import { PlusIconWrap } from 'components/Button/NavButtonGroup/elements';

export const MissionSection = ({ collabId, onBack }) => {
  const [missions, setMissions] = useState([]);
  const [missionsLoading, setMissionsLoading] = useState(true);
  const [missionSubmissionsLoading, setMissionSubmissionsLoading] =
    useState(false);
  const [deleteMissionLoading, setDeleteMissionLoading] = useState(false);
  const generateSnackbar = useNotistack();
  const { t } = useTranslation();

  const [currentView, setCurrentView] = useState('missions');
  const [currentMission, setCurrentMission] = useState(null);
  const [missionSubmissions, setMissionSubmissions] = useState([]);
  const [backHovered, setBackHovered] = useState(false);

  const MAX_DESCRIPTION_LENGTH = 130; // Maximum character length

  const getCollabMissions = async (collabId) => {
    try {
      setMissionsLoading(true);
      const response = await fetchCollabMissions(collabId);

      if (response.data.status === 'success') {
        const missions = response.data.missions;
        setMissions(missions);
      }
      setMissionsLoading(false);
    } catch {
      setMissionsLoading(false);
    }
  };

  const getMissionSubmissions = async (missionId) => {
    try {
      setMissionSubmissionsLoading(true);
      const response = await fetchCollabMissionSubmissions(missionId);
      if (response.data.status === 'success') {
        const submissions = response.data.missionInstances;
        setMissionSubmissions(submissions);
      }
      setMissionSubmissionsLoading(false);
    } catch (error) {
      setMissionSubmissionsLoading(false);
      if (error.response) {
        generateSnackbar(error.response.data.message, 'error');
      }
    }
  };

  const deleteMissionHandler = async (collabId, missionId) => {
    try {
      setDeleteMissionLoading(true);
      const response = await deleteMission(collabId, missionId);
      if (response.data.status === 'success') {
        generateSnackbar('Mission deleted successfully', 'success');
        getCollabMissions(collabId);
      }
      setDeleteMissionLoading(false);
    } catch (error) {
      setDeleteMissionLoading(false);
      if (error.response) {
        generateSnackbar(error.response.data.message, 'error');
      }
    }
  };

  useEffect(() => {
    if (collabId) {
      getCollabMissions(collabId);
    }
  }, [collabId]);

  useEffect(() => {
    if (currentView === 'mission-submissions' && currentMission) {
      getMissionSubmissions(currentMission._id);
    }
  }, [currentView, currentMission]);

  return (
    <>
      {onBack && (
        <Box width="100%" mt={4} ml={2}>
          <NavigateBack
            onClick={onBack}
            onMouseEnter={() => setBackHovered(true)}
            onMouseLeave={() => setBackHovered(false)}
          >
            <PlusIconWrap hovered={backHovered}>←</PlusIconWrap>
            <BackText>back</BackText>
          </NavigateBack>
        </Box>
      )}

      <Spacer value={10} />
      <DividingHeaderRow title="Missions" />

      <Box py={4} px={5}>
        {currentView === 'missions' && (
          <>
            <>
              {!missionsLoading ? (
                <Table sx={{ width: '100%' }}>
                  <TableHead>
                    <TableRow>
                      <HeadTableCell width="230px">{t('Title')}</HeadTableCell>
                      <HeadTableCell width="340px">
                        {t('Description')}
                      </HeadTableCell>
                      <HeadTableCell width="120px">
                        {t('Platform')}
                      </HeadTableCell>
                      <HeadTableCell width="150px">
                        {t('Mission Type')}
                      </HeadTableCell>
                      <HeadTableCell align="left">
                        {t('Rewardable Badges')}
                      </HeadTableCell>
                      <HeadTableCell align="left">{t('Action')}</HeadTableCell>
                      <HeadTableCell />
                    </TableRow>
                  </TableHead>
                  {missions && missions.length > 0 ? (
                    <>
                      {missions.map((mission) => (
                        <TableBody key={mission._id}>
                          <TableRow>
                            <BodyTableCell width="230px">
                              {mission.title}
                            </BodyTableCell>
                            <BodyTableCell width="340px">
                              <Tooltip
                                title={mission.description}
                                disabled={
                                  mission?.description?.length <=
                                  MAX_DESCRIPTION_LENGTH
                                }
                              >
                                <CellNormalText>
                                  {mission.description.length >
                                  MAX_DESCRIPTION_LENGTH
                                    ? truncateString(
                                        mission.description,
                                        MAX_DESCRIPTION_LENGTH - 3,
                                      )
                                    : mission.description}
                                </CellNormalText>
                              </Tooltip>
                            </BodyTableCell>
                            <BodyTableCell width="120px">
                              {captilalizeString(mission.platform)}
                            </BodyTableCell>
                            <BodyTableCell width="150px">
                              {missionTypeMappings[mission.missionType].text}
                            </BodyTableCell>
                            <BodyTableCell align="left">
                              {getJoinedRewardableBadgesText(
                                mission?.rewardableBadges || [],
                              )}
                            </BodyTableCell>
                            <BodyTableCell align="left">
                              <Box sx={{ display: 'flex', columnGap: '5px' }}>
                                <PrimaryButton
                                  width="140px"
                                  padding="6px"
                                  onClick={() => {
                                    deleteMissionHandler(collabId, mission._id);
                                  }}
                                  disabled={deleteMissionLoading}
                                >
                                  {!deleteMissionLoading ? (
                                    'Remove'
                                  ) : (
                                    <Spinner size={10} />
                                  )}
                                </PrimaryButton>
                                <OutlinedButton
                                  width="140px"
                                  padding="6px"
                                  onClick={() => {
                                    setCurrentView('mission-submissions');
                                    setCurrentMission(mission);
                                  }}
                                >
                                  {t('Submissions')}
                                </OutlinedButton>
                              </Box>
                            </BodyTableCell>
                            <BodyTableCell />
                          </TableRow>
                        </TableBody>
                      ))}
                    </>
                  ) : (
                    <></>
                  )}
                </Table>
              ) : (
                <Spinner size={16} />
              )}
            </>

            {missions && missions.length > 0 ? (
              <></>
            ) : (
              <>
                {!missionsLoading && (
                  <Box
                    mt={6}
                    sx={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <NoResultsText>{t('No results found')}</NoResultsText>
                  </Box>
                )}
              </>
            )}
          </>
        )}
        {currentView === 'mission-submissions' && currentMission && (
          <>
            <Box mt={-2}>
              <NavigateBack onNavigateBack={() => setCurrentView('missions')} />
            </Box>
            <MissionSubmissionHeader>
              {currentMission?.title}
            </MissionSubmissionHeader>

            <Spacer value={10} />

            <SubmissionsSubHeader>
              {currentMission?.description}
            </SubmissionsSubHeader>

            {/* Submissions Table Starts */}

            <>
              {!missionSubmissionsLoading ? (
                <>
                  {currentMission.missionType === 'join-discord-server' && (
                    <JoinDiscordSubmissionTable
                      missionSubmissions={missionSubmissions}
                    />
                  )}

                  {currentMission.missionType === 'post-tweet' && (
                    <PostTweetSubmissionTable
                      missionSubmissions={missionSubmissions}
                    />
                  )}

                  {currentMission.platform === 'twitter' &&
                    currentMission.missionType !== 'post-tweet' && (
                      <TweetSubmissionTable
                        missionSubmissions={missionSubmissions}
                      />
                    )}
                </>
              ) : (
                <Spinner size={16} />
              )}
            </>

            {missionSubmissions && missionSubmissions.length > 0 ? (
              <></>
            ) : (
              <>
                {!missionSubmissionsLoading && (
                  <Box
                    mt={6}
                    sx={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <NoResultsText>{t('No submissions found')}</NoResultsText>
                  </Box>
                )}
              </>
            )}
          </>
        )}
      </Box>
    </>
  );
};
