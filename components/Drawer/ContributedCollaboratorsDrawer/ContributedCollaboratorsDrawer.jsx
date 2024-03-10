import { OutlinedButton } from 'components/Button';
import PlusIcon from 'components/Icons/PlusIcon';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { Box, Divider } from '@mui/material';

import { useTheme } from '@mui/material/styles';
import { DrawerWrapContainer, DialogTitle, RenderItemText } from './elements';
import { RightDrawer } from '../RightDrawer';
import { yupResolver } from '@hookform/resolvers/yup';
import { ContributedProfile } from './ContributedProfile/ContributedProfile';
import AddNewProfile from './AddNewProfile/AddNewProfile';
import { useEffect } from 'react';
import { AddExistingCollaborator } from 'components/Dialog/AddExistingCollaborator';

export const ContributedCollaboratorsDrawer = ({
  handleContributeProfiles,
  contributedProfiles,
  open,
  handleClose,
}) => {
  const [openDialog, setopenDialog] = useState(false);
  const [showAddNewProfile, setShowAddNewProfile] = useState(false);
  const [collaborators, setCollaborators] = useState(contributedProfiles || []);
  const [isCollabAuthorExists, setIsCollabAuthorExists] = useState(false);

  const [disableInput, setdisableInput] = useState(false);

  const showaddPreviouslycollaborated = () => {
    setShowAddNewProfile(true);
  };

  const checkIfCollabAuthorExists = (collaboratorsArray) => {
    return collaboratorsArray.some(
      (collaborator) => collaborator.isCollabAuthor === true,
    );
  };

  useEffect(() => {
    const exists = checkIfCollabAuthorExists(collaborators);
    setIsCollabAuthorExists(exists);
  }, [collaborators]);

  const theme = useTheme();

  const { t } = useTranslation();

  const [collabHover, setCollabHover] = useState(false);

  const handleCloseSuccessDialog = () => {
    setopenDialog(false);
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('collaboratorName is required'),
    role: Yup.string().required('collaboratorRole is required'),
    twitter: Yup.string().required('collaboratorTwitter is required'),
    image: Yup.string().required('profileImage is required'),
    isCollabAuthor: Yup.boolean(),
    isNewCollaborator: Yup.boolean(),
  });

  const {
    control,
    watch,
    getValues,
    setValue,
    formState: { errors },
    trigger,
  } = useForm({
    defaultValues: {
      name: '',
      role: '',
      twitter: '',
      image: '',
      isCollabAuthor: false,
      isNewCollaborator: true,
      userId: '',
    },
    resolver: yupResolver(validationSchema),
  });

  const addNewProfileHandler = () => {
    // check every value is not null
    // type of image should be string
    if (
      !getValues().name ||
      !getValues().role ||
      !getValues().twitter ||
      !getValues().image ||
      typeof getValues().image !== 'string'
    ) {
      return;
    }

    setCollaborators((prev) => [...prev, getValues()]);

    setValue('name', '');
    setValue('role', '');
    setValue('twitter', '');
    setValue('image', '');
    setValue('isCollabAuthor', false);
    setValue('isNewCollaborator', true);
    setdisableInput(false);
  };

  const addPreviouslyCollaboratedHandler = (user) => {
    setShowAddNewProfile(true);
    const { name, twitter, image, userId } = user;

    if (!userId) {
      return;
    }

    setValue('name', name);
    setValue('twitter', twitter);
    setValue('image', image);
    setValue('userId', userId);

    setValue('role', '');
    setValue('isCollabAuthor', false);
    setValue('isNewCollaborator', false);

    setdisableInput(true);
    setopenDialog(false);
  };

  useEffect(() => {
    handleContributeProfiles(collaborators);
  }, [collaborators]);

  return (
    <RightDrawer open={open} handleClose={handleClose}>
      <DrawerWrapContainer>
        <DialogTitle>Contribute Collaborators</DialogTitle>
        <Divider color={theme.palette.borderLightInverse} />
        <Box
          margin={'16px 0'}
          display={'flex'}
          justifyContent={'flex-start'}
          gap={2}
          alignItems={'center'}
        >
          <OutlinedButton
            onMouseEnter={() => setCollabHover(true)}
            onMouseLeave={() => setCollabHover(false)}
            onClick={showaddPreviouslycollaborated}
            width={150}
          >
            <Box display="flex" component="span" mr={0.8} mt={0.5}>
              <PlusIcon
                color={
                  collabHover
                    ? theme.palette.text.inverse
                    : theme.palette.text.primary
                }
                width={15}
                height={15}
              />
            </Box>
            {t('Add New')}
          </OutlinedButton>

          <RenderItemText inverse>Or</RenderItemText>

          <OutlinedButton
            onMouseEnter={() => setCollabHover(true)}
            onMouseLeave={() => setCollabHover(false)}
            onClick={() => {
              setopenDialog(true);
            }}
            width={150}
          >
            <Box display="flex" component="span" mr={0.8} mt={0.5}>
              <PlusIcon
                color={
                  collabHover
                    ? theme.palette.text.inverse
                    : theme.palette.text.primary
                }
                width={15}
                height={15}
              />
            </Box>
            {t('Add Existing')}
          </OutlinedButton>
        </Box>
        <Divider color={theme.palette.borderLightInverse} />

        <AddNewProfile
          {...{ control, watch, setValue, errors, trigger, getValues }}
          showAddNewProfile={showAddNewProfile}
          saveHandler={addNewProfileHandler}
          disabled={disableInput}
          isCollabAuthorExists={isCollabAuthorExists}
        />

        {collaborators &&
          collaborators.map((users, index) => {
            const { name, role, twitter, image, isCollabAuthor } = users;

            return (
              <ContributedProfile
                key={name}
                name={name}
                role={role}
                twitter={twitter}
                image={image}
                isCollabAuthor={isCollabAuthor}
                inverse={false}
                index={index}
                deleteHandler={(index) => {
                  const newCollaborators = collaborators.filter(
                    (collaborator, i) => i !== index,
                  );
                  setCollaborators(newCollaborators);
                }}
              />
            );
          })}
      </DrawerWrapContainer>

      {openDialog && (
        <AddExistingCollaborator
          open={openDialog}
          handleClose={handleCloseSuccessDialog}
          finalListOfCollaborators={collaborators}
          addPreviouslyCollaboratedHandler={addPreviouslyCollaboratedHandler}
        />
      )}
    </RightDrawer>
  );
};
