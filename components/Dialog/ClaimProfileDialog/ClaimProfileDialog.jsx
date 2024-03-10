import { useTranslation } from 'react-i18next';
import {
  Avatar,
  Divider,
  OutlinedButton,
  PrimaryButton,
  Spinner,
  ThreeDots,
  Tooltip,
} from '~/components';
import { Box, Grid, useTheme } from '@mui/material';
import { Dialog } from '../elements';
import {
  ClaimProfileDialogContainer,
  HeaderRow,
  ConfirmButton,
  DashboardDescription,
  DashboardTitle,
  CircleComponent,
  FlexBox,
  LottieContainer,
  LottieContent,
  CongratsHeading,
  CongratsText,
  YelloBox,
} from './elements';
import { useState, useEffect, useContext } from 'react';
import { UilTwitter } from '@iconscout/react-unicons';

import { UilCheck, UilArrowRight } from '@iconscout/react-unicons';

import { SearchSelectAutocomplete } from '~/components';
import useSearch from 'hooks/useSearch';
import { DropdownUser } from 'components/Dropdown/DropdownUser';
import { setSessionData } from 'utils/session';
import { useRouter } from 'next/router';
import { claimProfileApiCall } from 'apis/claimProfile';
import axios from 'axios';
import { BASE_URL, reFetchTokenExpire, fetchRefreshToken } from '~/apis';

import { useNotistack } from 'hooks/useNotistack';
import AppContext from 'context/AppContext';
import { AvatarSampleImage2 } from 'assets/png';

export const ClaimProfileDialog = ({
  open,
  handleClose,
  dialogHeight,
  dialogWidth,
  preSelectedProfile,
  userName,
  onComplete,
  claimingFromUserProfile,
  collabMembers,
}) => {
  const { user } = useContext(AppContext);
  const loggedInUser = user?.username;

  const generateSnackbar = useNotistack();
  const { t } = useTranslation();

  const isContributedProfiles = true;
  const [twitterLoading, setTwitterLoading] = useState(false);
  const [autocompleteValue, setAutocompleteValue] = useState(null);
  const [isTwitterConnected, setIsTwitterConnected] = useState(false);
  const [userTwitterDetails, setUserTwitterDetails] = useState([]);
  const [selectedTwitterAccount, setSelectedTwitterAccount] = useState(null);
  const { userSearchItems, setSearchString, loading } = useSearch(
    isContributedProfiles,
  );

  const [finalDropDownUsers, setFinalDropDownUsers] = useState([]); // This will be the final array that will be used for the dropdown

  const [IsUserHaveClaimedTwitterId, setIsUserHaveClaimedTwitterId] =
    useState(true);
  const router = useRouter();

  const handleSelectingClaimProfile = (_, updated) => {
    if (updated?.fullName && updated?._id) {
      setAutocompleteValue(updated);
    } else {
      setAutocompleteValue(null);
    }
  };

  const theme = useTheme();

  useEffect(() => {
    if (!claimingFromUserProfile && collabMembers) {
      const collabMemberUserId = new Set(
        collabMembers.map((member) => member?.user?._id),
      );

      const filteredUserSearchItems = userSearchItems.filter((item) =>
        collabMemberUserId.has(item?._id),
      );

      setFinalDropDownUsers(filteredUserSearchItems);
    }
  }, [userSearchItems, claimingFromUserProfile, collabMembers]);

  useEffect(() => {
    if (preSelectedProfile) {
      setAutocompleteValue(preSelectedProfile);
      setSelectedTwitterAccount(preSelectedProfile?.twitter);
    }
  }, [preSelectedProfile]);

  useEffect(() => {
    const isValidTwitterId = userTwitterDetails?.some((item) => {
      if (
        item.screenName?.toLowerCase() ===
        autocompleteValue?.twitter?.toLowerCase()
      ) {
        setSelectedTwitterAccount(item);
        return true;
      } else {
        return false;
      }
    });

    setIsUserHaveClaimedTwitterId(isValidTwitterId);

    if (isValidTwitterId) {
      setIsTwitterConnected(true);
    } else {
      setIsTwitterConnected(false);
    }
  }, [autocompleteValue, userTwitterDetails]);

  const connectWithTwitter = () => {
    setSessionData('twitter-post-redirection', `/@${userName}?claim=true`);
    setSessionData('claim-profile-autocomplete', autocompleteValue);
    router.push('/settings?view=account&callTwitterAuth=true');
  };

  const getUserDetails = async () => {
    try {
      setTwitterLoading(true);
      const f1 = async () => {
        return await axios.get(`${BASE_URL}/user`);
      };

      const res = await reFetchTokenExpire(f1, fetchRefreshToken);

      if (res.data.status === 'success') {
        setTwitterLoading(false);

        const userData = res.data.data;

        if (userData?.userTwitter && userData?.userTwitter.length !== 0) {
          setUserTwitterDetails(userData?.userTwitter);
        }
      }
    } catch (err) {
      setTwitterLoading(false);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const handleClaimProfileClick = async () => {
    setClaimerLoading(true);
    const contributeProfileId = autocompleteValue?._id;
    const res = await claimProfileApiCall(
      contributeProfileId,
      selectedTwitterAccount?.screenName,
    );

    if (res?.status == 'success') {
      setPage(2);
    }

    if (res?.status == 'failed') {
      generateSnackbar(res?.message, 'error');
    }

    setClaimerLoading(false);
  };

  const [page, setPage] = useState(1);
  const [claimerLoading, setClaimerLoading] = useState(false);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      height={dialogHeight ? dialogHeight : '745px'}
      width={dialogWidth ? dialogWidth : '801px'}
    >
      <LottieContainer>
        {/*<Lottie*/}
        {/*  options={defaultOptions}*/}
        {/*  height={685}*/}
        {/*  width={801}*/}
        {/*  isStopped={page === 1}*/}
        {/*  isPaused={page === 1}*/}
        {/*/>*/}

        <LottieContent>
          {page == 1 && (
            <ClaimProfileDialogContainer>
              <HeaderRow>
                <DashboardTitle>{t('Claim Your Profile')}</DashboardTitle>
                <DashboardDescription>
                  {t(
                    'Verify your Identity via Twitter to add yourself as a Collaborator to the Collab.',
                  )}
                </DashboardDescription>
              </HeaderRow>
              <Divider />
              <HeaderRow>
                <FlexBox>
                  <CircleComponent>
                    {autocompleteValue ? <UilCheck /> : 1}
                  </CircleComponent>
                  <DashboardTitle fontSize={'h4'}>
                    {t('Select Your Profile')}
                  </DashboardTitle>
                </FlexBox>
                {!claimingFromUserProfile && (
                  <DashboardDescription>
                    {t('Select the collaborator profile that represents you.')}
                  </DashboardDescription>
                )}

                <Box width={'100%'}>
                  <Grid item lg={6} xs={12}>
                    {claimingFromUserProfile ? (
                      <Box
                        display={'flex'}
                        alignItems={'center'}
                        border={`1px solid ${theme.palette.border2}`}
                        borderRadius={'20px'}
                        padding={'10px'}
                        width={'30%'}
                      >
                        <Avatar
                          size={40}
                          avatar={
                            preSelectedProfile
                              ? preSelectedProfile.image
                              : AvatarSampleImage2
                          }
                        />
                        <Box sx={{ marginLeft: '10px' }}>
                          {preSelectedProfile?.fullName}
                        </Box>
                        <Box sx={{ marginLeft: '10px' }}>
                          @{preSelectedProfile?.twitter}
                        </Box>
                      </Box>
                    ) : (
                      <SearchSelectAutocomplete
                        freeSolo
                        isSingleSelect={true}
                        onChange={(e, value) => {
                          handleSelectingClaimProfile(e, value);
                        }}
                        loading={loading}
                        value={autocompleteValue}
                        options={finalDropDownUsers} // Use the provided array
                        getOptionLabel={(option) => option.fullName} // Display the name property
                        onInputChange={(event) => {
                          setSearchString(event?.target?.value);
                        }}
                        placeholder={t('Search contributed profiles')}
                        noOptionsText={t('No Results')}
                        renderOption={(props, option) => (
                          <DropdownUser
                            props={props}
                            option={option}
                            twitterDropdown={true}
                          />
                        )}
                        listItemPadding="28px 16px"
                      />
                    )}
                  </Grid>
                </Box>
              </HeaderRow>
              <Divider />
              <HeaderRow>
                <FlexBox>
                  <CircleComponent>
                    {isTwitterConnected ? <UilCheck /> : 2}
                  </CircleComponent>

                  <DashboardTitle fontSize={'h4'}>
                    {t(
                      isTwitterConnected
                        ? 'Identity Verified'
                        : 'Verify Identity',
                    )}
                  </DashboardTitle>
                </FlexBox>
                {autocompleteValue &&
                !isTwitterConnected &&
                !IsUserHaveClaimedTwitterId ? (
                  <YelloBox>
                    {t(
                      `Your currently connected Twitter account${
                        userTwitterDetails.length > 1 ? 's' : ''
                      } (${
                        userTwitterDetails[0]?.screenName
                      }) ) does not correspond with the account linked to the community-contributed profile you wish to claim. To successfully claim ownership, please connect with the specified Twitter account:  (@${
                        autocompleteValue?.twitter
                      }) ID`,
                    )}
                  </YelloBox>
                ) : (
                  <DashboardDescription>
                    {t(`Twitter Connected, succesfully verified your identity`)}
                  </DashboardDescription>
                )}

                {!isTwitterConnected ? (
                  <Tooltip
                    disabled={autocompleteValue ? true : false}
                    title={'Please Select Profile first to claim'}
                  >
                    <Box width={'40%'}>
                      <OutlinedButton
                        borderRadius={'10px'}
                        disabled={twitterLoading || !autocompleteValue}
                        onClick={connectWithTwitter}
                      >
                        {twitterLoading ? (
                          <Spinner size={15} />
                        ) : (
                          <>
                            <Box sx={{ marginRight: '6px', marginTop: '4px' }}>
                              <UilTwitter
                                size="24"
                                color={theme.palette.blue.blue00ACEE}
                              />
                            </Box>
                            {t('Connect with Twitter')}
                          </>
                        )}
                      </OutlinedButton>
                    </Box>
                  </Tooltip>
                ) : (
                  <OutlinedButton
                    textTransform="none"
                    disabled
                    width={'40%'}
                    borderRadius={'10px'}
                  >
                    <>
                      <Box sx={{ marginRight: '6px', marginTop: '4px' }}>
                        <UilTwitter
                          size="24"
                          color={theme.palette.blue.blue00ACEE}
                        />
                      </Box>
                      @{selectedTwitterAccount?.screenName}
                    </>
                  </OutlinedButton>
                )}
              </HeaderRow>
              <Divider />

              <ConfirmButton
                height="40px"
                disabled={!autocompleteValue || !isTwitterConnected}
                onClick={handleClaimProfileClick}
              >
                {claimerLoading ? (
                  <ThreeDots color={theme.palette.background.default} />
                ) : (
                  'Claim Profile'
                )}
              </ConfirmButton>
            </ClaimProfileDialogContainer>
          )}

          {page == 2 && (
            <ClaimProfileDialogContainer>
              <FlexBox
                changeDirection
                justifyContent={'center'}
                sx={{ marginTop: '10rem' }}
                gap={'20px'}
              >
                <CircleComponent huge dark>
                  {<UilCheck size={40} />}
                </CircleComponent>
                <CongratsHeading> {t('Congrats!')}</CongratsHeading>
                <Box textAlign={'center'} width={'70%'}>
                  <CongratsText>
                    {t(
                      'Your Collaborator profile has been successfully claimed',
                    )}
                  </CongratsText>
                </Box>

                <PrimaryButton
                  width="35%"
                  borderRadius="50"
                  onClick={() => {
                    onComplete();
                    claimingFromUserProfile &&
                      router.push(`/profile/@${loggedInUser}`);
                  }}
                >
                  {t('Go to collab')}
                  <Box sx={{ marginRight: '6px', marginTop: '4px' }}>
                    <UilArrowRight
                      size="24"
                      // color={theme.palette.blue.blue00ACEE}
                    />
                  </Box>
                </PrimaryButton>
              </FlexBox>
            </ClaimProfileDialogContainer>
          )}
        </LottieContent>
      </LottieContainer>
    </Dialog>
  );
};
