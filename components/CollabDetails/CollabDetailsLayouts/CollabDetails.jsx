import { useContext, useEffect, useState } from 'react';

import { JoinConsoleContainer, JoinConsoleText } from './elements';
import { CollabDetailsLoginUser } from './CollabDetailsLoginUser/CollabDetailsLoginUser';
import { CollabDetailsDefaultUser } from './CollabDetailsDefaultUser/CollabDetailsDefaultUser';

import { Iconify, Spacer } from '~/components';
import { reFetchTokenExpire } from '~/redux';
import { BASE_URL, fetchRefreshToken } from '~/apis';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Box, useTheme } from '@mui/material';
import AppContext from '../../../context/AppContext';

const CollabDetails = ({ collabId, collab }) => {
  const [collabDetails, setCollabDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isCollabBelongsToLoginUser, setIsCollabBelongsToLoginUser] =
    useState(true);
  const [isLoginUserCoCreatorOfCollab, setIsLoginUserCoCreatorOfCollab] =
    useState(false);
  const [collabAssociationDetails, setCollabAssociationDetails] =
    useState(null);
  const [collabEventParticipationDetails, setCollabEventParticipationDetails] =
    useState(null);
  const [isCollabStarred, setIsCollabStarred] = useState(false);
  const [isCollabAccessibleToUser, setIsCollabAccessibleToUser] =
    useState(false);
  const [errorText, setErrorText] = useState('');
  const [userActionsLoading, setUserActionsLoading] = useState(true);
  const { user, setUser } = useContext(AppContext);
  const [collabLiked, setCollabLiked] = useState(
    collabDetails?.collabLikes?.userId === user?.userId,
  );

  const [pendingApplicants, setPendingApplicants] = useState(false);
  const [collabEventsExists, setCollabEventsExist] = useState(false);
  const [collabWorksExists, setCollabWorksExist] = useState(false);
  const [collabBTSExists, setCollabBTSExist] = useState(false);
  const [collabMissionsExists, setCollabMissionsExist] = useState(false);
  const [collabMissionsInstancesExists, setCollabMissionsInstancesExist] =
    useState(false);

  const router = useRouter();
  const theme = useTheme();

  useEffect(() => {
    if (collab) {
      setCollabDetails(collab);
    }
  }, [collabId, collab]);

  const fetchCollaborationDetails = async (collabIdParameter) => {
    try {
      setLoading(true);
      setUserActionsLoading(true);
      const f1 = async () => {
        return await axios.get(
          `${BASE_URL}/api/v1/collab/${collabIdParameter ?? collabId}`,
        );
      };
      const res = await reFetchTokenExpire(f1, fetchRefreshToken);

      if (res.data.status === 'success') {
        const {
          collab,
          collabMember,
          collabEventParticipantInvitations,
          pendingApplicants,
          collabEventsExists,
          collabWorksExists,
          collabBTSExists,
          collabMissionsExists,
          collabMissionsInstancesExists,
        } = res.data.data;

        setIsCollabAccessibleToUser(true);
        setCollabLiked(collab?.collabLikes?.userId === user?.userId);
        setCollabDetails(collab);
        setCollabAssociationDetails(collabMember);

        setCollabEventParticipationDetails(collabEventParticipantInvitations);
        setIsCollabStarred(collab.isStarred);

        setPendingApplicants(pendingApplicants);
        setCollabEventsExist(collabEventsExists);
        setCollabWorksExist(collabWorksExists);
        setCollabBTSExist(collabBTSExists);
        setCollabMissionsExist(collabMissionsExists);

        setCollabMissionsInstancesExist(collabMissionsInstancesExists);

        if (collabMember?.status === 'ACCEPTED') {
          setIsLoginUserCoCreatorOfCollab(true);
        }
        const {
          creatorId: { _id: creatorId },
        } = collab;
        if (creatorId === user.userId) {
          setIsCollabBelongsToLoginUser(true);
        } else {
          setIsCollabBelongsToLoginUser(false);
        }
      } else if (res.data.status === 'private') {
        setIsCollabAccessibleToUser(false);
        setErrorText(res.data.message);
      }
      setLoading(false);
      setUserActionsLoading(false);
    } catch (err) {
      setUserActionsLoading(false);
      setLoading(false);
    }
  };

  const addLikeDislike = async () => {
    setCollabLiked(!collabLiked);
    try {
      await axios.post(`${BASE_URL}/api/v1/collab/addLikeDislike`, {
        collabId: collabDetails?._id,
      });
    } catch (err) {
      setCollabLiked(!!collabDetails.collabLikes);
    }
  };

  useEffect(() => {
    fetchCollaborationDetails(router.query.collabId);
  }, [router.query.collabId]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('auth'));
    setUser(user);
  }, []);

  return (
    <>
      <>
        {collabDetails && isCollabBelongsToLoginUser ? (
          <CollabDetailsLoginUser
            {...{
              collabId,
              collabDetails,
              setCollabDetails,
              isCollabStarred,
              isCollabBelongsToLoginUser,
              collabLiked,
              addLikeDislike,
              loading,
              userActionsLoading,
              pendingApplicants,
              collabEventsExists,
              collabWorksExists,
              collabBTSExists,
              collabMissionsExists,
              collabMissionsInstancesExists,
            }}
          />
        ) : (
          <>
            {isCollabAccessibleToUser && (
              <CollabDetailsDefaultUser
                {...{
                  collabId,
                  collabDetails,
                  setCollabDetails,
                  isCollabStarred,
                  collabAssociationDetails,
                  setCollabAssociationDetails,
                  collabEventParticipationDetails,
                  setCollabEventParticipationDetails,
                  isLoginUserCoCreatorOfCollab,
                  setIsLoginUserCoCreatorOfCollab,
                  isCollabBelongsToLoginUser,
                  collabLiked,
                  addLikeDislike,
                  loading,
                  userActionsLoading,
                  collabEventsExists,
                  collabWorksExists,
                  collabMissionsExists,
                  collabBTSExists,
                  collabMissionsInstancesExists,
                }}
              />
            )}
          </>
        )}
        {errorText && (
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <JoinConsoleContainer maxWidth="560px">
              {!isCollabAccessibleToUser && (
                <Iconify
                  icon="bxs:lock-open"
                  color={theme.palette.grey.common}
                  width="25px"
                  height="25px"
                  sx={{ marginRight: '6px' }}
                />
              )}{' '}
              <JoinConsoleText color={theme.palette.grey.common}>
                {errorText}
              </JoinConsoleText>
            </JoinConsoleContainer>
          </Box>
        )}
      </>

      <Spacer value={32} />
    </>
  );
};

export default CollabDetails;
