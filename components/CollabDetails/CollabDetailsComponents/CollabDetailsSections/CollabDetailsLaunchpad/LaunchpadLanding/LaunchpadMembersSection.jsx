import { DividingHeaderRow } from './DividingHeaderRow';
import { ActionChipItem, Spacer, AddCollaboratorDrawer } from '~/components';
import { Box, useTheme } from '@mui/material';
import { Collaborators } from 'components/CollabDetails/CollabDetailsLayouts/Collaborators';
import { UilCommentsAlt, UilUserPlus } from '@iconscout/react-unicons';
import { useState } from 'react';
import { useRouter } from 'next/router';

export const LaunchpadMembersSection = ({
  collaboratorsProps,
  collabDetails,
  isCollabBelongsToLoginUser,
  isLoginUserCoCreatorOfCollab,
  isArchive,
}) => {
  const theme = useTheme();
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();

  const toggleDialog = () => {
    setDialogOpen(!dialogOpen);
  };

  return (
    <>
      <AddCollaboratorDrawer
        dialogOpen={dialogOpen}
        toggleDialog={toggleDialog}
        collabDetails={collabDetails}
      />

      <DividingHeaderRow title="Members">
        <Box sx={{ display: 'flex', columnGap: '3px' }}>
          {isCollabBelongsToLoginUser && !isLoginUserCoCreatorOfCollab && (
            <ActionChipItem
              disabledTooltip={
                isArchive ? 'Cannot add member to archived collab' : ''
              }
              disabled={isArchive}
              onClick={!isArchive ? () => setDialogOpen(true) : () => {}}
              actionText="Add Member"
              icon={
                <UilUserPlus size={16} color={theme.palette.text.primary} />
              }
            />
          )}
          {collaboratorsProps?.acceptedMembers?.length > 0 && (
            <ActionChipItem
              disabledTooltip={
                isArchive
                  ? 'Cannot start conversation with archived collab'
                  : ''
              }
              disabled={isArchive}
              onClick={
                !isArchive
                  ? () => router.push(`/inbox?collab=${collabDetails?._id}`)
                  : () => {}
              }
              actionText="Start Conversation"
              icon={
                <UilCommentsAlt size={16} color={theme.palette.text.primary} />
              }
            />
          )}
        </Box>
      </DividingHeaderRow>

      <Spacer value={20} />

      <Collaborators hideHeader hideDivider {...collaboratorsProps} />
    </>
  );
};
