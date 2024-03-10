import { useTranslation } from 'react-i18next';
import { Dialog } from '../elements';
import { MessageText, DialogTitle, DrawerWrapContainer } from './elements';

import { Divider, PrimaryButton, ContributedProfile } from '~/components';

import { BtnContainer } from 'components/Dialog/BlockCreatorConfirmationDialog/elements';

import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { getUserContributedProfiles } from 'apis/user';
export const AddExistingCollaborator = ({
  open,
  handleClose,
  finalListOfCollaborators,
  addPreviouslyCollaboratedHandler,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const [existingUsers, setexistingUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const updatedFilteredUsers = existingUsers.filter((user) => {
      return !finalListOfCollaborators.some((collaborator) => {
        return collaborator.userId === user._id;
      });
    });

    setFilteredUsers(updatedFilteredUsers);
  }, [finalListOfCollaborators, existingUsers]);

  useEffect(() => {
    const getContributedProfiles = async () => {
      const res = await getUserContributedProfiles();

      if (res) {
        setexistingUsers(res.data);
      }
    };
    getContributedProfiles();
  }, []);

  return (
    <Dialog open={open} onClose={handleClose} height="850px" width="880px">
      <DrawerWrapContainer>
        <DialogTitle>Add Existing Collaborator</DialogTitle>
        <MessageText>
          Select Creators that you want to add to this Collab.
        </MessageText>
        <Divider color={theme.palette.borderLightInverse} />
        {filteredUsers &&
          filteredUsers.map((users) => {
            const { name, twitter, image, _id } = users;

            return (
              <ContributedProfile
                key={name}
                name={name}
                twitter={twitter}
                image={image}
                inverse={true}
                isAddCreatedProfiles={true}
                addPreviouslyCollaboratedHandler={
                  addPreviouslyCollaboratedHandler
                }
                userId={_id}
              />
            );
          })}
        <BtnContainer>
          <PrimaryButton width="190px" height="48px">
            {t('Done')}
          </PrimaryButton>
        </BtnContainer>
      </DrawerWrapContainer>
    </Dialog>
  );
};
