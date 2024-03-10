import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { DialogHeader } from './elements';
import { Dialog } from '../elements';
import { Box, useTheme } from '@mui/material';
import axios from 'axios';
import { BASE_URL } from '~/apis';
import { fetchRefreshToken, reFetchTokenExpire } from '~/redux';
import { Spacer, PrimaryButton, StyledInput } from '~/components';
import { useNotistack } from '~/hooks';

export const EditCollaboratorRoleDialog = ({
  open,
  handleClose,
  collabId,
  currentCollaboratorRole,
  collabMemberId,
  setCollaborators,
}) => {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);
  const [collaboratorRoleValue, setCollaboratorRoleValue] = useState('');
  const generateSnackbar = useNotistack();

  const theme = useTheme();

  const updateCollaboratorRoleHandler = async () => {
    try {
      setLoading(true);

      const f1 = async () => {
        const res = await axios.patch(
          `${BASE_URL}/api/v1/collab/collaborator-role`,
          {
            collabId,
            role: collaboratorRoleValue,
            collabMemberId,
          },
        );
        return res;
      };
      const res = await reFetchTokenExpire(f1, fetchRefreshToken);

      if (res.data.status === 'success') {
        setCollaborators((prevCollaborators) => {
          const updatedCollaborators = prevCollaborators.map((collaborator) => {
            if (collabMemberId) {
              if (collaborator.memberId === collabMemberId) {
                return {
                  ...collaborator,
                  skill: collaboratorRoleValue,
                };
              } else {
                return collaborator; // If collabMemberId is present but doesn't match the current collaborator, return the original collaborator
              }
            } else if (collaborator.adminCollaboratorRole) {
              return {
                ...collaborator,
                adminCollaboratorRole: collaboratorRoleValue,
              };
            } else {
              return collaborator; // If neither collabMemberId is present nor adminCollaboratorRole is truthy, return the original collaborator
            }
          });

          return updatedCollaborators;
        });

        setLoading(false);
        handleClose();
        generateSnackbar(
          t('Collaborator role updated successfully'),
          'success',
        );
      }
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} width="400px">
      <Box
        width="400px"
        padding={'30px'}
        sx={{ backgroundColor: theme.palette.background.paper }}
      >
        <DialogHeader>{t('Edit Role')}</DialogHeader>
        <Spacer value={30} />

        <StyledInput
          onChange={(event) => setCollaboratorRoleValue(event.target.value)}
          collaboratorRoleValue={collaboratorRoleValue}
          defaultValue={currentCollaboratorRole}
          placeholder="Collaborator Role"
        />

        <Spacer value={32} />

        <PrimaryButton
          disabled={loading}
          onClick={updateCollaboratorRoleHandler}
        >
          {loading ? 'Saving...' : 'Save'}
        </PrimaryButton>
      </Box>
    </Dialog>
  );
};
