import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { Dialog, DialogHeaderText, DialogSubHeaderText } from '../elements';
import { InviteCollaboratorContainer } from './elements';
import {
  Spacer,
  PrimaryButton,
  Avatar,
  BadgeLabel,
  SearchSelectAutocomplete,
} from '~/components';
import { useNotistack } from '~/hooks';
import { setCurrentDialog } from '~/redux';

import { useDispatch } from 'react-redux';
import { Box, Grid, useTheme } from '@mui/material';
import { sendCollectiveInvite } from 'apis/collective';
import ThreeDots from 'components/Onboard/common/ThreeDots/ThreeDots';
import { SuccessDialogNew } from '~/components';
import { Controller } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { isValidEmail } from 'utils/utils';
import useSearch from 'hooks/useSearch';
import { DropdownUser } from 'components/Dropdown/DropdownUser';
import { StyledChip } from 'components/Chip';
import { FlexBox } from 'components/common/elements';
import DropdownEmailAvatar from 'components/Dropdown/DropdownEmailAvatar';
import { UilTimes } from '@iconscout/react-unicons';

export const CollectiveInviteDialog = ({ open, handleClose, collectiveId }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { control, watch } = useForm({
    defaultValues: {
      selectedCoCreators: [],
    },
  });
  const selectedCoCreators = watch('selectedCoCreators');

  const [internalUsers, setInternalUsers] = useState([]);
  const [externalUsers, setExternalUsers] = useState([]);

  const [sentInviteLoading, setSentInviteLoading] = useState(false);

  const [openDialog, setopenDialog] = useState(false);
  const handleCloseSuccessDialog = () => {
    setopenDialog(false);
    setInternalUsers([]);
    setExternalUsers([]);
    setSearchString('');
  };
  const dispatch = useDispatch();
  const generateSnackbar = useNotistack();
  const { userSearchItems, setSearchString } = useSearch();

  const deleteCoCreators = (indexValue, type) => {
    if (type == 'internalUser') {
      let temp = internalUsers.filter((user, index) => {
        if (index !== indexValue) {
          return user;
        }
      });
      setInternalUsers(temp);
    } else if (type == 'externalUser') {
      let temp = externalUsers.filter((user, index) => {
        if (index !== indexValue) {
          return user;
        }
      });
      setExternalUsers(temp);
    }
  };

  const handleChangeCoCreators = async (_, updated, onChange) => {
    const newValue = updated.map((option) =>
      option.input
        ? option.label.replace('Enter to add "', '').replace('"', '')
        : option,
    );

    const lastValue = newValue[newValue.length - 1];

    if (typeof lastValue === 'string') {
      if (isValidEmail(lastValue)) {
        onChange(newValue);
      } else {
        newValue.pop();
        generateSnackbar(
          'Enter a valid email or select from dropdown',
          'error',
        );
        onChange(newValue);
      }
    } else {
      onChange(newValue);
    }

    setSearchString('');
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} width="800px">
        <InviteCollaboratorContainer>
          <DialogHeaderText>{t('Send Invite')}</DialogHeaderText>
          <Spacer value={24} />
          <DialogSubHeaderText>
            {t('Invite Member to Team')}
          </DialogSubHeaderText>
          <Spacer value={24} />

          <Grid item lg={6} xs={12}>
            <Controller
              name="selectedCoCreators"
              control={control}
              render={({ field: { value, onChange } }) => (
                <SearchSelectAutocomplete
                  freeSolo
                  value={value}
                  options={userSearchItems}
                  getOptionLabel={(option) => option.label}
                  onChange={(e, value) =>
                    handleChangeCoCreators(e, value, onChange)
                  }
                  onInputChange={(event) => setSearchString(event.target.value)}
                  placeholder={t('Add collaborators')}
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
                          <UilTimes
                            color={theme.palette.text.label}
                            size="22"
                          />
                        }
                        {...getTagProps({ index })}
                      />
                    ))
                  }
                  listItemPadding="28px 16px"
                />
              )}
            />
          </Grid>
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '1rem',
              padding: '3rem 20rem',
            }}
          >
            <>
              {internalUsers &&
                internalUsers.map((user, index) => {
                  return (
                    <BadgeLabel
                      sx={{ marginTop: '6px' }}
                      key={index}
                      crossable
                      image={user.image}
                      text={user.label}
                      onCross={() => deleteCoCreators(index, 'internalUser')}
                    />
                  );
                })}
            </>
            <>
              {externalUsers &&
                externalUsers.map((user, index) => {
                  return (
                    <BadgeLabel
                      sx={{ marginTop: '6px' }}
                      key={index}
                      crossable
                      text={user.label}
                      onCross={() => deleteCoCreators(index, 'externalUser')}
                    />
                  );
                })}
            </>
          </div>
          <Spacer value={32} />
          <Box
            sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}
          >
            <Box>
              <PrimaryButton
                disabled={selectedCoCreators?.length === 0}
                onClick={async () => {
                  setSentInviteLoading(true);

                  const inviteArray = selectedCoCreators.map((user) => {
                    if (typeof user === 'string') {
                      return {
                        type: 'external',
                        label: user,
                      };
                    } else {
                      return {
                        type: 'internal',
                        ...user,
                      };
                    }
                  });
                  const res = await sendCollectiveInvite(
                    inviteArray,
                    collectiveId,
                  );

                  if (res && res?.status === 'success') {
                    generateSnackbar('Invitation send successfully');
                    setSentInviteLoading(false);
                    dispatch(setCurrentDialog(''));
                    setopenDialog(true);
                  }
                  setSentInviteLoading(false);
                }}
                width="140px"
              >
                {sentInviteLoading ? (
                  <ThreeDots color={theme.palette.background.default} />
                ) : (
                  <>{t('Send Invitation')}</>
                )}
              </PrimaryButton>
            </Box>
          </Box>
        </InviteCollaboratorContainer>
      </Dialog>
      <SuccessDialogNew
        open={openDialog}
        handleClose={handleCloseSuccessDialog}
        successDialogType={'collectiveInvite'}
      />
    </>
  );
};
