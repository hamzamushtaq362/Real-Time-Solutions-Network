import { useTranslation } from 'react-i18next';
import React, { useContext, useEffect, useState } from 'react';
import {
  CollabDetailsSuggestionsGrid,
  PrimaryButton,
  AddCollaboratorDrawer,
} from '~/components';
import {
  AddMoreText,
  CollabOverviewTitle,
  SubHeading,
} from 'components/CollabDetails/CollabDetailsLayouts/elements';
import { Box, Grid } from '@mui/material';
import CollabInvitesTable from 'components/CollabDetails/CollabDetailsComponents/CollabDetailsSections/CollabDetailsInvites&Suggestions/CollabInvitesTable';
import axios from 'axios';
import { BASE_URL, fetchRefreshToken } from '~/apis';
import { reFetchTokenExpire } from '~/redux';
import AppContext from 'context/AppContext';
import { FlexBox } from 'components/common/elements';
import { COLLAB_SOURCE } from 'constants/collab';

export const CollabDetailsInvitesSuggestions = ({
  collabDetails,
  suggestedUsers,
  setSuggestedUsers,
  invites,
  loadingAccept,
  loadingReject,
  acceptOrRejectNegotiation,
  suggestionsLoading,
  setSuggestionsLoading,
  invitesLoading,
  setInvitesLoading,
  setInvites,
  control,
  watch,
  setValue,
}) => {
  const { t } = useTranslation();

  const [dialogOpen, setDialogOpen] = useState(false);
  const collabId = collabDetails?._id;
  const { user } = useContext(AppContext);

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
    suggestUserForCollab(collabId);
  }, []);

  const toggleDialog = () => {
    setDialogOpen(!dialogOpen);
  };

  return (
    <Box p={4} pt={0}>
      <CollabOverviewTitle>{t('Invites')}</CollabOverviewTitle>
      {collabDetails?.source === COLLAB_SOURCE.internal && (
        <FlexBox justifyContent="flex-end" alignItems="flex-end">
          <PrimaryButton width={150} onClick={toggleDialog} marginRight={16}>
            {t('Invite')}
          </PrimaryButton>
        </FlexBox>
      )}
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
            />
            {!invitesLoading && (
              <Box display="flex" justifyContent="space-between" mt={3}>
                <AddMoreText>
                  {t('You can add more co-authors to your collab.')}
                </AddMoreText>
              </Box>
            )}
          </Grid>
        </Grid>
      )}

      {collabDetails?.source === COLLAB_SOURCE.internal && (
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
          <AddCollaboratorDrawer
            dialogOpen={dialogOpen}
            toggleDialog={toggleDialog}
            collabDetails={collabDetails}
          />
        </>
      )}
    </Box>
  );
};
