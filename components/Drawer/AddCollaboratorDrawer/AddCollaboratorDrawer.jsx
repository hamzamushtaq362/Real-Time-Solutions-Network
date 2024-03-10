import { useTranslation } from 'react-i18next';
import React, { useContext, useState } from 'react';
import { DrawerWrapContainer } from '../elements';
import {
  CrossWrap,
  DialogTitle,
  NotFoundText,
  SearchedItemWrap,
  SearchInputWrap,
} from 'components/CollabDetails/CollabDetailsComponents/CollabDetailsSections/CollabDetailsMembers/elements';
import { RoundedBorderedContainer } from 'components/Dropdown/elements';
import CloseIcon from 'components/Icons/CloseIcon';
import { InformationDescription } from 'components/CollabCreate/elements';
import {
  Divider,
  OutlinedButton,
  SearchInput,
  RightDrawer,
} from '~/components';
import { User } from '~/components';
import { FlexBox } from 'components/common/elements';
import { Box, useTheme } from '@mui/material';
import { Dropdown } from 'components/Dropdown/Dropdown';
import { LoadMore, SmallSpinner } from 'components/Loading';
import { LoaderWrap, LoadingMoreText } from 'components/Spinner/elements';

import axios from 'axios';
import { BASE_URL } from '~/apis';
import { fetchRefreshToken, reFetchTokenExpire } from '~/redux';
import useSearch from 'hooks/useSearch';
import AppContext from 'context/AppContext';
import { useNotistack } from '~/hooks';
import { sendCollabInvite } from 'apis/invite';
import { isValidEmail } from 'utils/utils';

export const AddCollaboratorDrawer = ({
  dialogOpen,
  toggleDialog,
  collabDetails,
}) => {
  const { t } = useTranslation();

  const theme = useTheme();
  const { user } = useContext(AppContext);
  const [dropdownSelected, setDropdownSelected] = useState([]);

  const [customEmail, setCustomEmail] = useState(null);
  const [inviteLoading, setInviteLoading] = useState('');
  const [selectedRole, setSelectedRole] = useState(null);

  const handleCustomEmailInvite = async (customEmail) => {
    try {
      setInviteLoading('customEmail');
      const source = collabDetails.source;
      const res = await sendCollabInvite(
        customEmail.email,
        collabDetails._id,
        selectedRole?.skill ? selectedRole.skill : null,
        source,
      );

      if (res) {
        setCustomEmail(null);
        generateSnackbar(res, 'success');
      } else {
        generateSnackbar(res, 'error');
      }
      setInviteLoading('');
    } catch (err) {
      generateSnackbar(
        err?.response?.data?.message || 'Something went wrong!',
        'error',
      );
      setInviteLoading('');
    }
  };
  const {
    userSearchItems,
    searchString,
    setSearchString,
    loading,
    setUserSearchItems,
  } = useSearch(undefined, collabDetails?._id);
  const generateSnackbar = useNotistack();

  const sendInvite = async (selectedUser) => {
    try {
      setInviteLoading(selectedUser._id);

      const check = await checkIsInvited();
      if (check) {
        setInviteLoading('');
        return;
      }

      const f1 = async () => {
        const res = await axios.post(
          `${BASE_URL}/api/v1/collabmember?source=${collabDetails?.source}`,
          {
            collabId: collabDetails._id,
            senderId: user.userId,
            receiverId: selectedUser._id,
            isInvite: true,
            memberRole: selectedRole,
            collective: collabDetails.collective,
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
        setUserSearchItems((prevState) =>
          prevState.filter((item) => item._id !== selectedUser._id),
        );
        setSearchString('');
        setInviteLoading('');
      }
    } catch (err) {
      setInviteLoading('');
      generateSnackbar(
        err?.response?.data?.message || 'Something went wrong!',
        'error',
      );
    }
  };

  const checkIsInvited = async () => {
    try {
      const f1 = async () => {
        return await axios.post(
          `${BASE_URL}/api/v1/collabmember/checkIsinvited`,
          {
            collabId: collabDetails._id,
            userId: user._id,
          },
        );
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

  const handleDropdownSelect = (text, id) => {
    const dropdownSelectedClone = [...dropdownSelected];
    const index = dropdownSelectedClone.findIndex((item) => item._id === id);
    if (index !== -1) {
      dropdownSelectedClone.splice(index, 1);
      dropdownSelectedClone.push({ _id: id, text });
    } else {
      dropdownSelectedClone.push({ _id: id, text });
    }
    setDropdownSelected(dropdownSelectedClone);
  };

  const handleRoleSelect = (text) => {
    const collabRoles = collabDetails?.roles;

    collabRoles.find((item) => {
      if (item.skill === text) {
        setSelectedRole(item);
      }
    });
  };

  const handleSendInvite = async (user) => {
    if (user?.email) {
      if (isValidEmail(user?.email)) {
        await handleCustomEmailInvite(user);
      } else {
        generateSnackbar('Please enter a valid email address', 'error');
      }
    } else {
      await sendInvite(user);
    }
  };

  const members = customEmail?.email
    ? [...userSearchItems, customEmail]
    : userSearchItems;

  const getDisableStatus = (disabled, user) => {
    const isUserInvitedOrLoading =
      user?.isInvited ||
      inviteLoading === user?._id ||
      inviteLoading === 'customEmail';

    if (isUserInvitedOrLoading) return true;

    if (collabDetails?.source === 'internal') {
      return disabled || !selectedRole;
    }

    return false;
  };

  return (
    <RightDrawer open={dialogOpen} handleClose={toggleDialog}>
      <DrawerWrapContainer>
        <CrossWrap>
          <RoundedBorderedContainer
            onClick={toggleDialog}
            borderColor={theme.palette.borderLightInverse}
            boxShadow="none"
            background="transparent"
          >
            <CloseIcon
              width={20}
              height={20}
              color={theme.palette.text.inverse}
            />
          </RoundedBorderedContainer>
        </CrossWrap>
        <DialogTitle>{t('Invite Collaborator')}</DialogTitle>

        <SearchInputWrap mt={1}>
          <SearchInput
            value={searchString}
            padding="14px"
            backgroundColor="transparent"
            placeholder={t('Find User or type custom email to invite')}
            color={theme.palette.text.inverse}
            handleChange={({ target: { value } }) => {
              if (value) {
                setSearchString(value);
              } else {
                setSearchString('');
                setCustomEmail({ _id: '', email: '' });
              }
            }}
            onClick={() => {
              setCustomEmail({ _id: searchString, email: searchString });
            }}
          />
        </SearchInputWrap>

        <Divider color={theme.palette.borderLightInverse} margin="32px 0" />

        {!loading && members ? (
          <>
            {searchString && members?.length > 1 && (
              <InformationDescription>
                {t('Found')}
                <b>{userSearchItems.length}</b>
              </InformationDescription>
            )}
            {members?.length === 0 ? (
              <NotFoundText>{t('No Members Found')}</NotFoundText>
            ) : (
              <Box>
                {' '}
                {/* Wrapping the whole list in a Box */}
                {members?.length === 0 ? (
                  <NotFoundText>{t('No Members Found')}</NotFoundText>
                ) : (
                  members.map((user) => {
                    const disabled = !dropdownSelected.some(
                      (item) => item._id === user?._id,
                    );
                    return (
                      // <Slide
                      //   direction="up"
                      //   in={true}
                      //   mountOnEnter
                      //   unmountOnExit
                      //   key={user._id}
                      // >
                      // </Slide>
                      <SearchedItemWrap py={2} key={user?._id}>
                        <User
                          imageUrl={user?.image}
                          fullName={user?.fullName}
                          skill={user?.skill}
                          inverse
                          username={user?.value || user?.label}
                          totalCollabs={user?.totalCollabs}
                          connections={user?.connections}
                          customEmail={user?.email}
                        />
                        <FlexBox>
                          {collabDetails.source === 'internal' && (
                            <Box mr={4}>
                              <Dropdown
                                options={collabDetails?.roles?.map(
                                  ({ skill }) => skill,
                                )}
                                selectedItem={
                                  dropdownSelected.find(
                                    (item) => item._id === user?._id,
                                  )?.text ?? 'Choose role'
                                }
                                setSelectedItem={(text) => {
                                  handleDropdownSelect(text, user?._id);
                                  handleRoleSelect(text);
                                }}
                                width={180}
                                inverse
                              />
                            </Box>
                          )}
                          <OutlinedButton
                            width={120}
                            disabled={getDisableStatus(disabled, user)}
                            disabledBackground="#9D9D9D"
                            disabledColor={theme.palette.text.primary}
                            onClick={() => handleSendInvite(user)}
                          >
                            {inviteLoading === user?._id ||
                            inviteLoading === 'customEmail' ? (
                              <SmallSpinner inverse />
                            ) : user?.isInvited ? (
                              'Invited'
                            ) : (
                              'Invite'
                            )}
                          </OutlinedButton>
                        </FlexBox>
                      </SearchedItemWrap>
                    );
                  })
                )}
              </Box>
            )}
          </>
        ) : (
          <LoaderWrap mt={3}>
            <LoadingMoreText>{<LoadMore />}</LoadingMoreText>
          </LoaderWrap>
        )}
      </DrawerWrapContainer>
    </RightDrawer>
  );
};
