import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';

import {
  WalletSelectionDialog,
  OutlinedButton,
  InviteCollaboratorDialog,
  SmallSpinner,
} from '~/components';
import { setCurrentDialog, reFetchTokenExpire } from '~/redux';
import { BASE_URL, fetchRefreshToken } from '~/apis';

import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Box, Grid } from '@mui/material';
import { LoaderWrap, LoadingMoreText } from 'components/Spinner/elements';
import { User } from '~/components';
import { SuggestionWrap } from 'components/CollabDetails/CollabDetailsComponents/CollabDetailsSections/CollabDetailsInvites&Suggestions/elements';
import { useContext } from 'react';
import AppContext from 'context/AppContext';
import { useNotistack } from 'hooks/useNotistack';
import { trackMixPanel } from 'utils/utils';
import ThreeDots from 'components/Onboard/common/ThreeDots/ThreeDots';

export const CollabDetailsSuggestionsGrid = ({
  collabDetails,
  limitSuggestions,
  suggestionsLoading,
  control,
  watch,
  setValue,
  invites,
  setInvites,
  suggestedUsers,
  setSuggestedUsers,
}) => {
  const { t } = useTranslation();
  const [collabType, setCollabType] = useState('');
  const dispatch = useDispatch();
  const { currentDialog } = useSelector((state) => state.dialog);

  const [, setUserWallets] = useState([]);
  const [selectedWalletForCollab, setSelectedWalletForCollab] = useState('');
  const [showWalletComponent, setShowWalletComponent] = useState(false);
  const [selectedUserData, setSelectedUserData] = useState([]);
  const user = useContext(AppContext);
  const generateSnackbar = useNotistack();
  const [sentInviteLoading, setSentInviteLoading] = useState(null);
  const sendInviteForCollectiveOrExternal = async (selectedUser, index) => {
    try {
      setSentInviteLoading(index);
      const f1 = async () => {
        const res = await axios.post(
          `${BASE_URL}/api/v1/collabmember?source=${collabType}`,
          {
            collabId: collabDetails._id,
            senderId: user.user.userId,
            receiverId: selectedUser._id,
            isInvite: true,
            collective:
              collabType === 'collective' ? collabDetails.collective : null,
          },
        );
        if (res) return res;
      };
      const res = await reFetchTokenExpire(f1, fetchRefreshToken);
      if (res.data.status === 'fail-discord') {
        generateSnackbar(
          'Invitation Failed: fail discord on My collabs page',
          'error',
        );
      }
      if (res.data.status === 'success') {
        generateSnackbar('Invite sent successfully!', 'success');
        if (selectedUser) {
          setSuggestedUsers(
            suggestedUsers.filter((user) => user._id !== selectedUser._id),
          );

          const selectedUserDetails = selectedUser;

          setInvites([
            ...invites,
            {
              userId: {
                fullName: selectedUserDetails?.fullName,
                imageUrl: selectedUserDetails?.imageUrl,
                label: selectedUserDetails?.username,
                skill: selectedUserDetails?.skills?.[0],
                type: 'internalUser',
                value: selectedUserDetails?.username,
              },
            },
          ]);
        }
        setSentInviteLoading(false);
        trackMixPanel('Collab_Success_Suggestions_Invite');
      }
    } catch (err) {
      setSentInviteLoading(false);
      generateSnackbar(
        err?.response?.data?.message || 'Something went wrong!',
        'error',
      );
      dispatch(setCurrentDialog(''));
    }
  };
  const sendRegularCollabInvite = async (selectedUser, index) => {
    setSentInviteLoading(index);
    try {
      const f1 = async () => {
        const res = await axios.post(
          `${BASE_URL}/api/v1/collabmember?source=internal`,
          {
            collabId: collabDetails._id,
            senderId: user.user.userId,
            receiverId: selectedUser._id,
            isInvite: true,
            memberRole: collabDetails.roles[0],
          },
        );
        if (res) return res;
      };

      const res = await reFetchTokenExpire(f1, fetchRefreshToken);

      if (res.data.status === 'fail-discord') {
        generateSnackbar(
          'Invitation Failed: fail discord on My collabs page',
          'error',
        );
      }
      if (res.data.status === 'success') {
        generateSnackbar('Invite sent successfully!', 'success');
        if (selectedUserData) {
          setSuggestedUsers(
            suggestedUsers.filter((user) => user._id !== selectedUser._id),
          );

          const selectedUserDetails = selectedUser;

          setInvites([
            ...invites,
            {
              memberRole: collabDetails.roles[0],
              userId: {
                fullName: selectedUserDetails?.fullName,
                imageUrl: selectedUserDetails?.imageUrl,
                label: selectedUserDetails?.username,
                skill: selectedUserDetails?.skills?.[0],
                type: 'internalUser',
                value: selectedUserDetails?.username,
              },
            },
          ]);
        }

        setSentInviteLoading(null);

        trackMixPanel('Collab_Success_Suggestions_Invite');
      }
    } catch (error) {
      setSentInviteLoading(null);

      generateSnackbar(
        error?.response?.data?.message || 'Something went wrong!',
        'error',
      );
    }
  };
  const getUserAddress = async () => {
    try {
      const f1 = async () => {
        const res = await axios.get(`${BASE_URL}/api/v1/wallets`);
        return res;
      };
      const res = await reFetchTokenExpire(f1, fetchRefreshToken);
      if (res.data.status === 'success') {
        setUserWallets(res.data.data.wallets);
      }
    } catch (err) {
      //
    }
  };
  const selectedWalletForCollabOfAdmin = async () => {
    try {
      const f1 = async () => {
        const res = await axios.patch(`${BASE_URL}/api/v1/collab`, {
          id: collabDetails._id,
          selectedWalletForCollab: selectedWalletForCollab,
        });
        return res;
      };
      const res = await reFetchTokenExpire(f1, fetchRefreshToken);
      if (res.data.status === 'success') {
        setShowWalletComponent(false);
        dispatch(setCurrentDialog('invite-collaborator-dialog'));
      }
    } catch (err) {
      //
    }
  };

  const handleInviteClick = (selectedUser, index) => {
    setSelectedUserData([selectedUser]);
    if (collabType === 'internal') {
      if (collabDetails.roles.length === 1) {
        sendRegularCollabInvite(selectedUser, index);
      } else {
        dispatch(setCurrentDialog('invite-collaborator-dialog'));
      }
    } else {
      sendInviteForCollectiveOrExternal(selectedUser, index);
    }
  };

  useEffect(() => {
    getUserAddress();
  }, [showWalletComponent]);
  useEffect(() => {
    if (collabDetails) {
      setCollabType(collabDetails.source);
    }
  }, [collabDetails]);

  return (
    <Box>
      <WalletSelectionDialog
        open={showWalletComponent}
        handleClose={() => {
          setShowWalletComponent(false);
        }}
        setWalletValue={setSelectedWalletForCollab}
        onSubmit={selectedWalletForCollabOfAdmin}
      />
      <InviteCollaboratorDialog
        open={currentDialog === 'invite-collaborator-dialog'}
        collabRoles={collabDetails.roles || []}
        collabId={collabDetails._id}
        handleClose={() => dispatch(setCurrentDialog(''))}
        control={control}
        setValue={setValue}
        watch={watch}
        collabSource={collabDetails.source}
        selectedUserData={selectedUserData}
        invites={invites}
        setInvites={setInvites}
        suggestedUsers={suggestedUsers}
        setSuggestedUsers={setSuggestedUsers}
      />
      <Grid container columnSpacing={16}>
        {suggestedUsers &&
          !suggestionsLoading &&
          suggestedUsers
            .slice(
              0,
              limitSuggestions ? limitSuggestions : suggestedUsers.length + 1,
            )
            .map((user, index) => (
              <Grid item lg={6} xs={12} key={index}>
                <SuggestionWrap key={index}>
                  <User
                    imageUrl={user?.imageUrl}
                    fullName={user?.fullName}
                    skill={user?.skills?.[0]}
                    totalCollabs={user?.totalCollabs}
                    connections={user?.connections}
                    username={user?.username}
                  />
                  <OutlinedButton
                    width={150}
                    onClick={() => handleInviteClick(user, index)}
                    marginRight={16}
                  >
                    {sentInviteLoading === index ? <ThreeDots /> : t('Invite')}
                  </OutlinedButton>
                </SuggestionWrap>
              </Grid>
            ))}
      </Grid>
      {suggestionsLoading && (
        <LoaderWrap mt={3}>
          <LoadingMoreText>
            <SmallSpinner />
          </LoadingMoreText>
        </LoaderWrap>
      )}
    </Box>
  );
};
