import { useTranslation } from 'react-i18next';
import React, { useState, useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { BASE_URL } from '~/apis';
import axios from 'axios';
import { useNotistack } from '~/hooks';
import { Dialog, DialogHeaderText, DialogSubHeaderText } from '../elements';
import {
  ImageIcon,
  PrimaryButton,
  OpaqueButton,
  Autocomplete as AutocompleteInput,
  Avatar,
  Divider,
  Spacer,
} from '~/components';
import { AlternateArrows } from '~/assets';
import {
  CollabsShowGroup,
  ImageAndName,
  ImagesContainer,
  OrText,
  CollabInviteContainer,
} from './elements';
import {
  setCurrentDialog,
  fetchRefreshToken,
  reFetchTokenExpire,
  setSelectedUser,
} from '~/redux';
import { Box } from '@mui/system';
import Link from 'next/link';
import { StyledTooltip } from '../../DashboardHome/elements';
import AppContext from 'context/AppContext';

export const CollabInviteDialog = ({ open, handleClose, user }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const generateSnackbar = useNotistack();
  const { user: userContext } = useContext(AppContext);
  const isProfileComplete = userContext?.isProfileComplete;

  const [selectCollab, setSelectCollab] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [creatorCollabs, setCreatorCollabs] = useState();
  const [sentInviteLoading, setSentInviteLoading] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const getCreatorCollabs = async () => {
    try {
      const f1 = async () => {
        const res = await axios.get(
          `${BASE_URL}/api/v1/collabmember/getAllMyCollabs?userId=${loggedInUser.userId}`,
        );
        return res;
      };
      const res = await reFetchTokenExpire(f1, fetchRefreshToken);

      if (res.data.status === 'success') {
        const originalCollabArray = res.data.data.collabs;
        setCreatorCollabs(originalCollabArray);
      }
    } catch (err) {
      //
    }
  };

  useEffect(() => {
    getCreatorCollabs();
  }, []);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('auth'));
    setLoggedInUser(loggedInUser);
  }, []);

  const checkIsInvited = async () => {
    try {
      const f1 = async () => {
        const res = await axios.post(
          `${BASE_URL}/api/v1/collabmember/checkIsinvited`,
          {
            collabId: selectCollab._id,
            userId: user._id,
          },
        );
        return res;
      };
      const res = await reFetchTokenExpire(f1, fetchRefreshToken);
      if (res.data.status === 'fail-discord') {
        alert(res.data.message);
      }
      if (res) {
        if (res.data.message) {
          generateSnackbar(
            res.data.message,
            res.data.status === 'fail-discord' ? 'error' : 'success',
          );
          return res.data;
        }
      }
    } catch (err) {
      //
    }
  };

  const sendInvite = async () => {
    try {
      setSentInviteLoading(true);

      const check = await checkIsInvited();
      if (check) {
        setSentInviteLoading(false);
        return;
      }

      const f1 = async () => {
        const res = await axios.post(
          `${BASE_URL}/api/v1/collabmember?source=internal`,
          {
            collabId: selectCollab.id,
            senderId: loggedInUser.userId,
            receiverId: user._id,
            isInvite: true,
            memberRole: selectedRole && selectedRole.role,
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
        dispatch(setSelectedUser(null));
        setSentInviteLoading(false);
        dispatch(setCurrentDialog(''));
      }
    } catch (err) {
      setSentInviteLoading(false);
      generateSnackbar(
        err.response.data.message || 'Something went wrong!',
        'error',
      );
      dispatch(setCurrentDialog(''));
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} width="650px">
      <CollabInviteContainer>
        <DialogHeaderText>
          {t('Collaborate with')}
          {user.username}
        </DialogHeaderText>
        <Spacer value={32} />
        <Divider />
        <Spacer value={32} />
        <ImagesContainer>
          <ImageAndName>
            <Avatar
              withBorder={true}
              size={'10rem'}
              avatar={loggedInUser?.imageUrl}
              statusIconSize="36px"
            />
            <DialogHeaderText style={{ marginTop: '15px' }}>
              {t('You')}
            </DialogHeaderText>
          </ImageAndName>

          <ImageIcon icon={AlternateArrows.src} size={30} />

          <ImageAndName>
            <Avatar
              withBorder={true}
              size={'10rem'}
              avatar={user && user.imageUrl && user.imageUrl}
              statusIconSize="36px"
            />
            <DialogHeaderText style={{ marginTop: '15px' }}>
              {user && user.username && user.username}
            </DialogHeaderText>
          </ImageAndName>
        </ImagesContainer>
        <Spacer value={32} />
        <DialogSubHeaderText>
          {t('Invite to Existing Collaboration')}
        </DialogSubHeaderText>
        <Spacer value={24} />
        <AutocompleteInput
          autoCompleteItems={
            creatorCollabs &&
            creatorCollabs.map((item) => {
              return {
                value: item.title,
                label: item.title,
                id: item._id,
                roles: item.roles,
              };
            })
          }
          placeholder={t('Select a collab')}
          padding="10px"
          onChange={(_, option) => {
            if (option) {
              setSelectCollab(option);
            } else {
              setSelectCollab('');
            }
          }}
          clearOnBlur
        />
        <Spacer value={24} />

        {selectCollab && (
          <CollabsShowGroup>
            <AutocompleteInput
              autoCompleteItems={
                selectCollab &&
                selectCollab.roles.map((item) => {
                  return { value: item.skill, label: item.skill, role: item };
                })
              }
              placeholder={t('Select role')}
              padding="10px"
              onChange={(_, option) => {
                if (option) {
                  setSelectedRole(option);
                } else {
                  setSelectedRole('');
                }
              }}
              clearOnBlur
            />

            <OpaqueButton
              height="46px"
              width="180px"
              sx={{ marginLeft: '10px' }}
              disabled={selectedRole && selectCollab ? false : true}
              onClick={() => sendInvite()}
            >
              {' '}
              {sentInviteLoading ? 'Sending ...' : 'Invite'}
            </OpaqueButton>
          </CollabsShowGroup>
        )}

        <Spacer value={32} />
        <OrText>{t('- or -')}</OrText>

        <Spacer value={32} />

        <Box sx={{ width: '100%' }}>
          <StyledTooltip
            title={
              isProfileComplete
                ? null
                : 'Complete your profile first to create/join Collabs'
            }
          >
            <span>
              <Link href={'/collab/create'}>
                <PrimaryButton height="50px" disabled={!isProfileComplete}>
                  {t('Create Collab')}
                </PrimaryButton>
              </Link>
            </span>
          </StyledTooltip>
        </Box>
      </CollabInviteContainer>
    </Dialog>
  );
};
