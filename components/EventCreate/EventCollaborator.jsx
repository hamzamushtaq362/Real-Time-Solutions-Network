import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, useTheme } from '@mui/material';
import { Dropdown } from 'components/Dropdown/Dropdown';
import { StyledInput, Avatar, SearchSelectAutocomplete, PrimaryButton } from '~/components';
import {
  CollaboratorEmailContainer,
  CollaboratorEmailText,
  CollaboratorRoleText,
  CollaboratorRecordInfo, InformationDescription, AddCollaboratorText,
} from './elements';
import DropdownEmailAvatar from 'components/Dropdown/DropdownEmailAvatar';
import { UilTimes } from '@iconscout/react-unicons';
import useSearch from 'hooks/useSearch';
import { DropdownUser } from 'components/Dropdown/DropdownUser';
import { StyledChip } from 'components/Chip';
import { FlexBox } from 'components/common/elements';
import { Box } from '@mui/material';
import { useFormContext } from 'react-hook-form';

export const EventCollaboratorInput = ({
  currentParticipantDetails,
  userAutocompleteValue,
  setUserAutocompleteValue,
}) => {
  const { t } = useTranslation();
  const { setValue, getValues, trigger, formState: { errors } } = useFormContext();

  const [showAddCollaborator, setShowAddCollaborator] = useState(false);
  const { userSearchItems, setSearchString, loading } = useSearch();

  const theme = useTheme();

  const handleChangeCoCreators = (_, updated) => {
    setUserAutocompleteValue(updated);
    setValue('currentParticipantDetails', { ...currentParticipantDetails, user: updated });
  };

  const saveParticipant = () => {
    const { type, email, role } = currentParticipantDetails;
    if (type === 'email') {
      const newParticipant = {
        email,
        role,
        userType: 'email',
      };
      setValue('participants', [...getValues().participants, newParticipant]);
    } else if (type === 'user') {
      const newParticipant = {
        email: '',
        role,
        userType: 'user',
        user: currentParticipantDetails.user,
      };
      setValue('participants', [...getValues().participants, newParticipant]);
      setUserAutocompleteValue(null);
    }
    setValue('currentParticipantDetails', null);
    setShowAddCollaborator(true);

  };
  const addParticipant = async () => {
    setValue('currentParticipantDetails', {
      type: 'user',
      email: '',
      role: '',
      user: null,
    });
    setShowAddCollaborator(false)
  }

  const saveDisabled = !currentParticipantDetails?.role || (currentParticipantDetails?.type === 'email' && !currentParticipantDetails?.email) || (currentParticipantDetails?.type === 'user' && !currentParticipantDetails?.user);

  return (
    <>
      {currentParticipantDetails &&
        <Grid container columnGap={1}>
          <Grid flex={1}>
            <Dropdown
              selectedItem={currentParticipantDetails?.type}
              setSelectedItem={(value) => {
                setValue('currentParticipantDetails', { ...currentParticipantDetails, type: value });
              }}
              options={['email', 'user']}
              width="100%"
            />
          </Grid>
          <Grid flex={2}>
            {currentParticipantDetails?.type === 'email' ? (
              <StyledInput
                height={52}
                fullWidth
                placeholder="johndoe@gmail.com"
                value={currentParticipantDetails?.email}
                onChange={(event) => {
                  setValue('currentParticipantDetails', { ...currentParticipantDetails, email: event.target.value });
                }}
              />
            ) : (
              <SearchSelectAutocomplete
                isSingleSelect
                freeSolo
                onChange={(_, value) => handleChangeCoCreators(_, value)}
                loading={loading}
                value={userAutocompleteValue}
                options={userSearchItems}
                getOptionLabel={(option) => {
                  return option?.fullName ? option.fullName : option?.label;
                }}
                onInputChange={(event) => {
                  setSearchString(event?.target?.value);
                }}
                placeholder={t('Search to add')}
                noOptionsText={t('No Results')}
                renderOption={(props, option) => (
                  <DropdownUser props={props} option={option} />
                )}
                renderTags={(creators, getTagProps) =>
                  creators.map((creator, index) => (
                    <StyledChip
                      key={index}
                      variant="outlined"
                      label={
                        <FlexBox>
                          <Avatar
                            size={22}
                            avatar={
                              creator.image || (
                                <DropdownEmailAvatar size={22} />
                              )
                            }
                            withBorder={true}
                            borderColor={theme.palette.grey.common}
                          />
                          <Box ml={1}>{creator.fullName || creator}</Box>
                        </FlexBox>
                      }
                      size="small"
                      deleteIcon={
                        <UilTimes color={theme.palette.text.label} size="22" />
                      }
                      {...getTagProps({ index })}
                    />
                  ))
                }
                listItemPadding="28px 16px"
              />
            )}
          </Grid>
          <Grid flex={1}>
            <StyledInput
              height={52}
              fullWidth
              placeholder={t('Enter Role')}
              value={currentParticipantDetails?.role}
              onChange={async (event) => {
                setValue('currentParticipantDetails', { ...currentParticipantDetails, role: event.target.value });
                await trigger('currentParticipantDetails');
              }}
            />
            {errors && errors.currentParticipantDetails && (
              <InformationDescription type="error" my={1}>
                {errors.currentParticipantDetails?.role.message}
              </InformationDescription>
            )}
          </Grid>
          <Grid flex={1}>
            <PrimaryButton
              disabled={saveDisabled}
              width="120px"
              sx={{ marginLeft: '12px' }}
              onClick={saveParticipant}
            >
              Save
            </PrimaryButton>
          </Grid>
        </Grid>
      }
      {showAddCollaborator && <AddCollaboratorText
        mt={2}
        onClick={addParticipant}
      >
        {t('+ Add Collaborator')}
      </AddCollaboratorText>}
    </>
  );
};

export const EventCollaborator = ({
  participant: { email, role, userType, user },
  removeParticipant,
}) => {
  const { t } = useTranslation();

  const theme = useTheme();
  return (
    <Grid display="flex" columnGap={1} alignItems="center" mb={1}>
      <Grid flex={2}>
        <CollaboratorEmailContainer>
          <Avatar
            size={24}
            avatar={userType === 'user' ? user?.image : <DropdownEmailAvatar />}
            showRing={true}
            filledColor={theme.palette.background.inverse}
            ringColor={'transparent'}
          />

          <CollaboratorEmailText>
            {userType === 'user' ? user?.fullName : email}
          </CollaboratorEmailText>
        </CollaboratorEmailContainer>
      </Grid>
      <Grid flex={1}>
        <CollaboratorRoleText>{role}</CollaboratorRoleText>
      </Grid>
      <Grid flex={1}>
        <CollaboratorRecordInfo>{t('Will be invited')}</CollaboratorRecordInfo>
      </Grid>
      <Grid
        flex={1}
        sx={{ display: 'flex', justifyContent: 'flex-end', cursor: 'pointer' }}
      >
        <UilTimes
          color={theme.palette.grey.common}
          size="18"
          onClick={removeParticipant}
        />
      </Grid>
    </Grid>
  );
};
