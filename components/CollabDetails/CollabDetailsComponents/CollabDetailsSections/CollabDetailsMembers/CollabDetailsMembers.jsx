import { useTranslation } from 'react-i18next';
import React, { useContext, useState, useEffect } from 'react';
import {
  OutlinedButton,
  PrimaryButton,
  User,
  AddCollaboratorDrawer,
  CollabDetailsSuggestionsGrid,
  SmallSpinner,
} from '~/components';
import {
  AddMoreText,
  CollabOverviewTitle,
  MemberWrap,
  SubHeading,
  BackText,
  NavigateBack,
} from 'components/CollabDetails/CollabDetailsLayouts/elements';
import { PlusIconWrap } from 'components/Button/NavButtonGroup/elements';
import { Box, Grid } from '@mui/material';
import { LoaderWrap, LoadingMoreText } from 'components/Spinner/elements';
import axios from 'axios';
import { BASE_URL, fetchRefreshToken } from '~/apis';
import { reFetchTokenExpire } from '~/redux';
import { useNotistack } from '~/hooks';
import { useRouter } from 'next/router';
import { isConverversationExistsWithUser } from '~/apis';
import AppContext from 'context/AppContext';
import CollabInvitesTable from '../CollabDetailsInvites&Suggestions/CollabInvitesTable';

export const CollabDetailsMembers = ({
  membersLoading,
  setMembersLoading,
  members,
  setMembers,
  collabDetails,
  setInvitesLoading,
  setInvites,
  setSuggestionsLoading,
  suggestionsLoading,
  suggestedUsers,
  setSuggestedUsers,
  invites,
  invitesLoading,
  loadingAccept,
  loadingReject,
  acceptOrRejectNegotiation,
  control,
  watch,
  setValue,
  onBack,
}) => {
  const { t } = useTranslation();
  const { user } = useContext(AppContext);
  const [dialogOpen, setDialogOpen] = useState(false);
  const generateSnackbar = useNotistack();
  const router = useRouter();
  const collabId = collabDetails?._id;
  const [messageButtonLoading, setMessageButtonLoading] = useState(false);
  const [backHovered, setBackHovered] = useState(false);

  const getJoinedMembers = async () => {
    try {
      setMembersLoading(true);
      const f1 = async () => {
        return await axios.post(`${BASE_URL}/api/v1/collabmember/all`, {
          status: 'ACCEPTED',
          collabId,
        });
      };
      const res = await reFetchTokenExpire(f1, fetchRefreshToken);
      if (res) {
        setMembers(res.data.data.members);
      }
      setMembersLoading(false);
    } catch (err) {
      setMembersLoading(false);
      generateSnackbar('Something went wrong!', 'error');
    }
  };

  const getSentInvites = async (type, id) => {
    try {
      setInvitesLoading(true);
      const f1 = async () => {
        let obj = { collabId: id, status: 'PENDING' };
        if (type === 'sent') {
          obj['senderId'] = user.userId;
        } else {
          obj['receiverId'] = user.userId;
        }
        const res = await axios.post(`${BASE_URL}/api/v1/collabmember/all`, {
          ...obj,
          isInvite: true,
        });
        if (res) return res;
      };
      const res = await reFetchTokenExpire(f1, fetchRefreshToken);

      if (res.data.status === 'success') {
        setInvites(res.data.data.members);
        setInvitesLoading(false);
      }
    } catch (err) {
      //
    }
  };
  // // suggest Users based on collab
  const suggestUserForCollab = async (id) => {
    try {
      setSuggestionsLoading(true);
      const f1 = async () => {
        return await axios.get(`${BASE_URL}/creator/suggestUser/${id}`);
      };
      const res = await reFetchTokenExpire(f1, fetchRefreshToken);
      if (res.data.status === 'success') {
        setSuggestedUsers(res.data.data);
      }
      setSuggestionsLoading(false);
    } catch (err) {
      setSuggestedUsers(false);
    }
  };

  useEffect(() => {
    getSentInvites('sent', collabId);
    getJoinedMembers();
    suggestUserForCollab(collabId);
  }, []);

  const toggleDialog = () => {
    setDialogOpen(!dialogOpen);
  };

  const messageButtonClickHandler = async (userId) => {
    try {
      setMessageButtonLoading(true);
      const res = await isConverversationExistsWithUser(userId);
      const isConversationExist = res?.data?.conversationExist;
      if (isConversationExist) {
        const conversationId = res?.data?.conversationId;
        router.push(`/inbox?conversation=${conversationId}`);
      } else {
        router.push(`/inbox?user=${userId}`);
      }
      setMessageButtonLoading(true);
    } catch {
      setMessageButtonLoading(false);
      generateSnackbar('Something went wrong!', 'error');
    }
  };

  return (
    <Box p={4} pt={0}>
      {onBack && (
        <Box width="100%" mt={2}>
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

      <CollabOverviewTitle>{t('Members')}</CollabOverviewTitle>
      <Grid container mb={2} mt={6}>
        <Grid item lg={3} xs={12}>
          <SubHeading>{t('Author (You)')}</SubHeading>
        </Grid>
        <Grid item lg={9} xs={12}>
          <User
            imageUrl={collabDetails?.creatorId?.imageUrl}
            fullName={collabDetails?.creatorId?.fullName}
            username={collabDetails?.creatorId?.username}
            totalCollabs={collabDetails?.creatorId?.totalCollabs}
            connections={collabDetails.creatorId?.connections}
          />
        </Grid>
      </Grid>

      {invites && invites.length > 0 && (
        <Grid container mb={2} mt={6}>
          {
            <Grid item lg={3} xs={12}>
              <SubHeading>{t('Sent')}</SubHeading>
            </Grid>
          }
          <Grid item lg={9} xs={12}>
            <CollabInvitesTable
              loading={invitesLoading}
              invites={invites}
              loadingAccept={loadingAccept}
              loadingReject={loadingReject}
              acceptOrRejectNegotiation={acceptOrRejectNegotiation}
              collabType={collabDetails?.source}
            />
          </Grid>
        </Grid>
      )}

      {members?.length > 0 && (
        <Grid container mb={6}>
          <Grid item lg={3} xs={12}>
            <SubHeading mt={4}>{t('Co-creators')}</SubHeading>
          </Grid>

          <Grid item lg={9} xs={12}>
            {members.map((member, index) => (
              <MemberWrap key={index}>
                <User
                  imageUrl={member?.userId?.imageUrl}
                  fullName={member?.userId?.fullName}
                  username={member?.userId?.username}
                  totalCollabs={member?.userId?.totalCollabs}
                  connections={member?.userId?.connections}
                />

                <OutlinedButton
                  width="120px"
                  disabled={messageButtonLoading}
                  onClick={() => messageButtonClickHandler(member?.userId?._id)}
                >
                  {t('Message')}
                </OutlinedButton>
              </MemberWrap>
            ))}
          </Grid>
        </Grid>
      )}
      {membersLoading && (
        <LoaderWrap mt={3}>
          <LoadingMoreText>
            <SmallSpinner />
          </LoadingMoreText>
        </LoaderWrap>
      )}
      <>
        {!membersLoading && (
          <Grid container mb={6}>
            <Grid item lg={3} xs={12} />
            <Grid item lg={9} xs={12}>
              <Box display="flex" justifyContent="space-between">
                <AddMoreText>
                  {t('You can add more co-creators to your collab.')}
                </AddMoreText>
                <PrimaryButton width={150} onClick={toggleDialog}>
                  {t('Add')}
                </PrimaryButton>
              </Box>
            </Grid>
          </Grid>
        )}

        <AddCollaboratorDrawer
          dialogOpen={dialogOpen}
          toggleDialog={toggleDialog}
          collabDetails={collabDetails}
        />
      </>

      <>
        <Grid container mb={2} mt={6}>
          <Grid item lg={3} xs={12}>
            <SubHeading>{t('Suggestions')}</SubHeading>
          </Grid>
          <Grid item lg={9} xs={12}>
            <CollabDetailsSuggestionsGrid
              limitSuggestions={8}
              {...{
                collabDetails,
                suggestedUsers,
                suggestionsLoading,
                control,
                watch,
                setValue,
                invites,
                setInvites,
                setSuggestedUsers,
              }}
            />
          </Grid>
        </Grid>
      </>
    </Box>
  );
};
