import React, { useState } from 'react';
import { Dialog } from '~/components';
import {
  DialogHeaderWrap,
  DribbbleHeading,
  DribbbleSubText,
} from 'components/UserSettings/UserSettingsAccountSection/elements';
import DribbbleAuthenticate from 'components/UserSettings/UserSettingsAccountSection/DribbbleAuthenticate';
import DribbbleShotsTable from 'components/UserSettings/UserSettingsAccountSection/DribbbleShotsTable';
import axios from 'axios';
import { BASE_URL } from '~/apis';
import { isValidEmail } from '~/utils';
import { useNotistack } from '~/hooks';

export const DribbbleImportDialog = ({open, onClose, dribbbleUser, getDribbbleUser}) => {
  const [shots, setShots] = useState(null);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const generateSnackbar = useNotistack();

  const fetchDribbbleShots = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/api/v1/dribbble/get-shots`);
      const shots = response?.data?.shots;
      setShots(shots);
      const rows = shots?.map(shot => ({
        id: shot.id,
        collabName: shot.title,
        members: shot?.members.map(member => ({
          _id: member?.user?._id,
          image: member?.user?.imageUrl,
          label: member?.user?.username,
          connections: member?.user?.connections,
          totalCollabs: member?.user?.totalCollabs,
          value: member?.user?.username,
          skill: member?.user?.skills?.[0],
          type: 'internalUser',
          fullName: member?.user?.fullName,
          isInvited: member?.user?.isInvited,
        })) || [],
        image: shot?.images?.teaser || shot?.images?.normal,
        draft: false,
        selected: true,
        tags: shot?.tags || [],
        isImported: shot.isImported,
      }))
      setRows(rows)
      setLoading(false);
    } catch (error) {
      console.error('Error fetching Dribbble shots:', error);
    }
  };
  const updateCollaborators = (shotId, newCollaborators) => {
    const updatedCollaborators = newCollaborators.map((option) =>
      option.input
        ? option.label.replace('Enter to add "', '').replace('"', '')
        : option,
    );
    const lastValue = updatedCollaborators[updatedCollaborators.length - 1];

    if (typeof lastValue === 'string') {
      if (isValidEmail(lastValue)) {
        setRows((prevRows) =>
          prevRows.map((row) =>
            row.id === shotId ? { ...row, members: updatedCollaborators } : row
          )
        );
      } else {
        updatedCollaborators.pop();
        generateSnackbar(
          'Enter a valid email or select from dropdown',
          'error',
        );
        setRows((prevRows) =>
          prevRows.map((row) =>
            row.id === shotId ? { ...row, members: updatedCollaborators } : row
          )
        );
      }
    } else {
      setRows((prevRows) =>
        prevRows.map((row) =>
          row.id === shotId ? { ...row, members: updatedCollaborators } : row
        )
      );
    }
  };

  const updateDraftStatus = (shotId) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === shotId ? { ...row, draft: !row.draft } : row
      )
    );
  }

  return (
    <Dialog
      open={open}
      onClose={() => {
        onClose();
        setTimeout(() => {
          setShots(null)
          setRows([]);
        }, 1000)
      }}
      width='800px'
    >
      <DialogHeaderWrap>
        <DribbbleHeading>
          Import from Dribbble
        </DribbbleHeading>
        <DribbbleSubText>
          Import your Dribbble Shots as Collabs on RTSN.
        </DribbbleSubText>
      </DialogHeaderWrap>
      {rows?.length === 0 ?
        <DribbbleAuthenticate {...{getDribbbleUser, fetchDribbbleShots, dribbbleUser, loading}} /> :
        <DribbbleShotsTable {...{shots, setShots, rows, setRows, onClose, updateDraftStatus, updateCollaborators}} />
      }
    </Dialog>
  );
};
