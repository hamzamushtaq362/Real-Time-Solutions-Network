import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import {
  Spacer,
  Divider,
  Avatar,
  NormalInput,
  Menu,
  MenuItem,
  PrimaryButton,
} from '~/components';
import {
  ApplyCollabContentContainer,
  CollabText,
  CollabSubText,
  AvatarHeaderText,
} from './elements';
import { DialogHeaderText, DialogSubHeaderText, Dialog } from '../elements';
import { Box } from '@mui/material';
import { AvatarSampleImage2 } from '~/assets';
import { useDispatch } from 'react-redux';
import {
  setCurrentDialog,
  fetchRefreshToken,
  reFetchTokenExpire,
} from '~/redux';
import { BASE_URL } from '~/apis';
import axios from 'axios';
import { useNotistack } from '~/hooks';
import { trackMixPanel } from '~/utils';
import { roles } from '~/constants';

export const ApplyOutsideProjectDialog = ({
  open,
  handleClose,
  collab,
  setCollabAssociationDetails,
}) => {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [personalNote, setPersonalNote] = useState('');

  const dispatch = useDispatch();
  const generateSnackbar = useNotistack();

  const requestToJoinCollab = async () => {
    try {
      setLoading(true);

      const f1 = async () => {
        const res = await axios.post(
          `${BASE_URL}/api/v1/collabmember?source=external`,
          {
            collabId: collab?._id,
            memberRole: selectedRole,
            personalNote,
          },
        );
        if (res) return res;
      };
      const res = await reFetchTokenExpire(f1, fetchRefreshToken);
      if (res.data.status === 'fail-discord') {
        alert(res.data.message);
      }
      if (res.data.status === 'success') {
        dispatch(setCurrentDialog(''));
        setCollabAssociationDetails(res.data.data.collabMember);
        trackMixPanel('Apply_Collab');
      }
      setLoading(false);
    } catch (err) {
      const { message } = err?.response?.data || {};
      generateSnackbar(message || 'Something went wrong!', 'error');
      setLoading(false);
      dispatch(setCurrentDialog(''));
    }
  };

  return (
    (<Dialog open={open} onClose={handleClose} width="550px">
      <ApplyCollabContentContainer>
        <DialogHeaderText>{t("Apply to Collab")}</DialogHeaderText>
        <Spacer value={16} />
        <DialogSubHeaderText>{t("Please confirm the details to Apply to the Collab")}</DialogSubHeaderText>
        <Spacer value={32} />
        <Divider />
        <Spacer value={32} />

        <CollabSubText>{t("Collab :")}</CollabSubText>
        <Spacer value={5} />
        <CollabText>
          {collab.title ? collab.title : 'Phantom Galaxies Planet'}
        </CollabText>

        <Spacer value={64} />

        <CollabSubText>{t("Created By:")}</CollabSubText>
        <Spacer value={5} />
        <Box sx={{ width: '100%', display: 'flex' }}>
          <Avatar
            size="44px"
            avatar={
              collab && collab.creatorId && collab.creatorId.imageUrl
                ? collab.creatorId.imageUrl
                : AvatarSampleImage2
            }
          />
          <Box sx={{ marginLeft: '12px' }}>
            <AvatarHeaderText>
              {collab && collab.creatorId
                ? collab.creatorId.username
                : 'Thomas L. Fletcher'}
            </AvatarHeaderText>
            <Spacer value={4} />
            <CollabSubText>
              {" "}
              {collab && collab.creatorId && collab.creatorId.skills
                ? collab.creatorId.skills[0]
                : 'Product Designer'}
            </CollabSubText>
          </Box>
        </Box>

        <Spacer value={32} />
        <Divider />
        <Spacer value={32} />

        <AvatarHeaderText>{t("Role")}</AvatarHeaderText>
        <Spacer value={24} />

        <Menu
          type="contained"
          borderRadius="10px"
          value={selectedRole}
          placeholder={t("Select Role")}
          setValue={(value) => setSelectedRole(value)}
        >
          {roles.map((skill) => (
            <MenuItem key={skill} value={skill}>
              {skill}
            </MenuItem>
          ))}
        </Menu>

        <Spacer value={32} />

        {selectedRole && (
          <>
            <Divider />
            <Spacer value={32} />
            <AvatarHeaderText
              value={personalNote}
              onChange={(e) => setPersonalNote(e.target.value)}
            >{t("Add Personal Note")}</AvatarHeaderText>
            <Spacer value={32} />
            <NormalInput
              borderRadius="8px"
              padding="15px"
              multiline
              rows={4}
              placeholder={t("Add personal note")}
              name={'personalNote'}
              value={personalNote}
              handleChange={(e) => setPersonalNote(e.target.value)}
            />
          </>
        )}

        <Spacer value={32} />
        <Box sx={{ width: '100%' }}>
          <PrimaryButton
            disabled={!selectedRole || loading}
            onClick={() => {
              requestToJoinCollab();
            }}
          >
            {loading ? 'Applying...' : 'Apply to Collab'}
          </PrimaryButton>
        </Box>
        <Spacer value={8} />
      </ApplyCollabContentContainer>
    </Dialog>)
  );
};
