import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import { Dialog, DialogHeaderText, DialogSubHeaderText } from '../elements';
import { InviteCollaboratorContainer } from './elements';
import { Spacer, PrimaryButton } from '~/components';
import { BASE_URL } from '~/apis';
import axios from 'axios';
import { useNotistack } from '~/hooks';
import {
  setCurrentDialog,
  fetchRefreshToken,
  reFetchTokenExpire,
  setSelectedUser as setSelectedUserRedux,
} from '~/redux';
import { isValidEmail, trackMixPanel } from '~/utils';
import { useDispatch } from 'react-redux';
import { Box } from '@mui/material';
import InviteCoCreators from 'components/Collective/CollectiveCreate/InviteCoCreators/InviteCoCreators';
import { Controller } from 'react-hook-form';
import { Dropdown } from 'components/Dropdown/Dropdown';

export const InviteCollaboratorDialog = ({
  open,
  handleClose,
  collabRoles,
  collabId,
  control,
  setValue,
  watch,
  collabSource,
  selectedUserData,
  invites,
  setInvites,
  suggestedUsers,
  setSuggestedUsers,
}) => {
  const { t } = useTranslation();

  const [sentInviteLoading, setSentInviteLoading] = useState(false);

  const [selectedRoleDetails, setSelectedRoleDetails] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const dispatch = useDispatch();
  const generateSnackbar = useNotistack();
  const selectedUser = watch('selectedCoCreators');

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('auth'));
    setLoggedInUser(loggedInUser);
  }, []);

  const sendInvite = async () => {
    try {
      setSentInviteLoading(true);
      const selectedUser = selectedUserData ?? selectedUser;

      const isEmail = isValidEmail(selectedUser[0]);
      const f1 = async () => {
        const res = await axios.post(
          `${BASE_URL}/api/v1/collabmember?source=${collabSource}`,
          {
            collabId,
            senderId: loggedInUser.userId,
            receiverId: selectedUser[0]._id,
            email: isEmail && !selectedUserData ? selectedUser[0] : null,
            isInvite: true,
            memberRole: selectedRoleDetails,
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
            suggestedUsers.filter((user) => user._id !== selectedUser[0]._id),
          );

          const selectedUserDetails = selectedUser[0];

          setInvites([
            ...invites,
            {
              memberRole: selectedRoleDetails,
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
        dispatch(setSelectedUserRedux(null));
        setSentInviteLoading(false);
        dispatch(setCurrentDialog(''));
        trackMixPanel('Collab_Success_Suggestions_Invite');
        handleClose();
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
  const getInviteDisableStatus = () => {
    if (selectedUserData) return false;
    return !selectedUserData || !selectedUser || selectedUser.length === 0;
  };

  useEffect(() => {
    if (collabRoles) {
      if (collabRoles.length > 0) {
        setValue('selectedRole', collabRoles[0].skill);
        setSelectedRoleDetails(collabRoles[0]);
      }
    }
  }, [collabRoles]);

  const singleInvitation = true;
  return (
    <Dialog open={open} onClose={handleClose} width="600px">
      <InviteCollaboratorContainer>
        <DialogHeaderText>{t('Send Invite')}</DialogHeaderText>

        <Spacer value={24} />

        {!selectedUserData && (
          <InviteCoCreators {...{ control, watch, singleInvitation }} />
        )}

        <Spacer value={32} />
        <DialogSubHeaderText>{t('Select Role')}</DialogSubHeaderText>
        <Spacer value={24} />

        <Controller
          name="selectedRole"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Dropdown
              selectedItem={value}
              setSelectedItem={(value) => {
                const roleItem = collabRoles.find(
                  (collabRole) => collabRole.skill === value,
                );
                setSelectedRoleDetails(roleItem);
                onChange(roleItem.skill);
              }}
              options={collabRoles.map(({ skill }) => skill)}
              width="100%"
            />
          )}
        />

        <Spacer value={32} />
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <Box>
            <PrimaryButton
              onClick={sendInvite}
              disabled={getInviteDisableStatus() || sentInviteLoading}
              width="140px"
            >
              {sentInviteLoading ? 'Sending ...' : 'Send Invitation'}
            </PrimaryButton>
          </Box>
        </Box>
      </InviteCollaboratorContainer>
    </Dialog>
  );
};
