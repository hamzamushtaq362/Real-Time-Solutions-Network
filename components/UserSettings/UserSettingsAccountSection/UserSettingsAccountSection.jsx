import React, { useContext, useEffect, useState } from 'react';
import {
  AccountContentContainer,
  DropDownWithStatus,
  InputWithStatus,
  InputWithStatusContainer,
} from './elements';
import {
  SettingsHeader,
  RowContainer,
  RowLabelHeaderContainer,
  RowLabelHeader,
  InputLabel,
  RowContentContainer,
  ContentSubContainer,
  SpinnerContainer,
} from '../elements';

import {
  StyledInput,
  Spacer,
  OutlinedButton,
  Spinner,
  // UserCuratorBanner,
  ImageIcon,
  DisconnectSocialAccountDialog,
  SocialConnectDropdown,
} from '~/components';

import { DiscordIcon, DribbbleIcon, MetaMaskIcon } from '~/assets';

import { Box, useTheme } from '@mui/material';
import { useIsMobileView } from 'utils/utils';
import { SectionTitle } from '../elements';
import { SaveCancelButtonGroup } from '../SaveCancelButtonGroup';
import { useForm } from 'react-hook-form';
import { BASE_URL, APP_URL, checkUniquenessUserName } from '~/apis';
import { fetchRefreshToken, reFetchTokenExpire } from '~/redux';
import axios from 'axios';
import { useNotistack } from '~/hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Dropdown } from 'components/Dropdown/Dropdown';
import { CheckRounded, Close } from '@mui/icons-material';
import AppContext from 'context/AppContext';
import { useTranslation } from 'react-i18next';
import { UilTwitter } from '@iconscout/react-unicons';
import { useRouter } from 'next/router';
import { useDebounce } from 'react-use';

import { getSessionData } from '~/utils';
import SensitiveInfoBox from 'components/Input/SensitiveInfoBox';
import { EmailUpdateDialog } from 'components/Dialog/EmailUpdateDialog';
import { DribbbleImportDialog } from 'components/UserSettings/UserSettingsAccountSection/DribbbleImportDialog';
import { LeftHeaderComp } from 'components/CollabCreate/LeftHeaderComp';
import { SelectPrimaryWalletBoxOption } from '../UserSettingsWalletSection/elements';
import Image from 'next/image';
import TickIcon from '../../Icons/TickIcon';
import { AccountTypes } from '~/constants';

export const BoxWithStatus = ({
  children,
  loading,
  userNameAvailable,
  userNameNotAvailable,
}) => {
  return (
    <InputWithStatusContainer>
      {children}
      <InputWithStatus>
        {userNameAvailable && (
          <CheckRounded sx={{ color: 'green', marginBottom: 1 }} />
        )}
        {userNameNotAvailable && (
          <Close sx={{ color: '#f00', marginBottom: '2px' }} />
        )}
        {loading && <Spinner size={20} />}
      </InputWithStatus>
    </InputWithStatusContainer>
  );
};

export const DropdownWithStatus = ({ children, index, saveStatus }) => {
  return (
    <InputWithStatusContainer>
      {children}
      <DropDownWithStatus>
        {saveStatus[index] === 'wait' && <Spinner size={20} />}
        {saveStatus[index] === 'success' && (
          <CheckRounded sx={{ color: 'green' }} />
        )}
        {saveStatus[index] === 'fail' && <Close sx={{ color: '#f00' }} />}
      </DropDownWithStatus>
    </InputWithStatusContainer>
  );
};

export const UserSettingsAccountSection = () => {
  const isMobileView = useIsMobileView();
  const { t, i18n } = useTranslation();
  const [, setIsEmailVerified] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [saveStatus, setSaveStatus] = useState(new Array(4).fill(null));
  const [discordDisconnectLoading, setDiscordDisconnectLoading] =
    useState(false);
  const [twitterDisconnectLoading, setTwitterDisconnectLoading] =
    useState(false);
  const [, setDiscordConnectLoading] = useState(false);
  const [, setTwitterConnectLoading] = useState(false);
  const [dribbbleUser, setDribbbleUser] = useState(null);
  const [usernameString, setUserNameString] = useState('');
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [debouncedUserNameString, setDebouncedUserNameString] = useState('');
  const [userNameCheckLoading, setUserNameCheckLoading] = useState(false);
  const [userNameAvailableMessage, setUserNameAvailableMessage] = useState('');
  const [userNameNotAvailableMessage, setUserNameNotAvailableMessage] =
    useState('');
  const [isUserNameTouched, setIsUserNameTouched] = useState(false);

  const [disconnectDiscordDialogOpen, setDisconnectDiscordDialogOpen] =
    useState(false);
  const [disconnectTwitterDialogOpen, setDisconnectTwitterDialogOpen] =
    useState(false);
  const [disconnectUserTwitterId, setDisconnectUserTwitterId] = useState(null);
  const [dribbbleDialogOpen, setDribbbleDialogOpen] = useState(false);

  const generateSnackbar = useNotistack();
  const { user, setUser } = useContext(AppContext);
  const theme = useTheme();
  const router = useRouter();

  function getDefLang() {
    const lang = user?.languageType;
    if (lang === 'en') {
      return 'English';
    } else if (lang === 'fr') {
      return 'French';
    } else if (lang === 'ko') {
      return 'Korean';
    } else if (lang === 'de') {
      return 'German';
    } else {
      return 'English';
    }
  }
  const getUserDetails = async () => {
    try {
      setLoading(true);
      const f1 = async () => {
        return await axios.get(`${BASE_URL}/user`);
      };

      const res = await reFetchTokenExpire(f1, fetchRefreshToken);

      if (res.data.status === 'success') {
        setLoading(false);

        const userData = res.data.data;

        let userDetails = {};

        userDetails.username = userData?.username || '';
        userDetails.email = userData?.email || '';
        userDetails.accountType = userData?.accountType || '';

        if (userData?.userDiscord) {
          userDetails.userDiscord = userData?.userDiscord;
        }

        if (userData?.userTwitter && userData?.userTwitter.length !== 0) {
          userDetails.userTwitter = userData?.userTwitter;
        }

        setUserDetails(userDetails);
      }
    } catch (err) {
      setLoading(false);
    }
  };

  const getDribbbleUser = async () => {
    try {
      setLoading(true);
      const f1 = async () => {
        return await axios.get(`${BASE_URL}/api/v1/dribbble/user`);
      };

      const res = await reFetchTokenExpire(f1, fetchRefreshToken);

      if (res.data.status === 'success') {
        setDribbbleUser(res.data.user);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email'),
  });

  const {
    handleSubmit,
    watch,
    getValues,
    reset,
    setValue,
    formState: { isDirty },
  } = useForm({
    defaultValues: {
      username: userDetails?.username ?? '',
      email: userDetails?.email ?? '',
      accountType: userDetails?.accountType ?? [],
    },
    resolver: yupResolver(validationSchema),
  });
  const email = watch('email');
  const username = watch('username');

  useEffect(() => {
    setUserNameString(username);
  }, [username]);

  useEffect(() => {
    if (userDetails) {
      setValue('username', userDetails?.username);
      setValue('email', userDetails?.email);
      setValue('accountType', userDetails?.accountType);
      setValue('languageType', getDefLang());
    }
  }, [userDetails]);

  useEffect(() => {
    getUserDetails();
    getDribbbleUser();
  }, []);

  useEffect(() => {
    if (userDetails?.email !== email) {
      setIsEmailVerified(false);
    } else {
      setIsEmailVerified(true);
    }
  }, [email]);

  useEffect(() => {
    setTimeout(() => {
      setSaveStatus(new Array(4).fill(false));
    }, 5000);
  }, saveStatus);

  const accountType = watch('accountType');
  const languageType = watch('languageType');

  const onSaveDetails = async () => {
    try {
      setSaving(true);
      const { username, email, accountType, languageType } = getValues();

      const f1 = async () => {
        return await axios.patch(`${BASE_URL}/user`, {
          username,
          email,
          accountType,
          languageType,
        });
      };
      const res = await reFetchTokenExpire(f1, fetchRefreshToken);
      if (res) {
        setSaving(false);
        setUserDetails({
          ...userDetails,
          username,
          email,
          accountType,
          languageType,
          referralCode: username,
        });
        setUser({
          ...user,
          username,
          email,
          accountType,
          languageType,
          referralCode: username,
        });
        setIsEditingUsername(false);
        setIsUserNameTouched(false);
        generateSnackbar('Your changes have been saved!', 'success');
        reset(getValues());
      }
    } catch (err) {
      setSaving(false);
      generateSnackbar(
        err?.response?.data?.message ??
          'Oops! Something went wrong. Please try again.',
        'error',
      );
    }
  };

  const handleDiscordAuthorizeClick = async () => {
    try {
      const { username, email, accountType } = getValues();
      setDiscordConnectLoading(true);
      const response = await axios.get(`${BASE_URL}/discord/authorize`);
      const url = response.data.redirectUrl;
      const popup = window.open(url);

      const interval = setInterval(() => {
        if (popup.closed) {
          clearInterval(interval);
          if (!userDetails?.userDiscord) {
            generateSnackbar('Failed to connect discord account', 'error');
            setDiscordConnectLoading(false);
          }
        }
        popup.postMessage('', APP_URL);
      }, 500);

      window.addEventListener(
        'message',
        async (event) => {
          if (event.data.userDiscord) {
            clearInterval(interval);
            setUserDetails({
              ...userDetails,
              username,
              email,
              accountType,
              userDiscord: event.data.userDiscord,
            });
            generateSnackbar(
              'Successfully connected discord account',
              'success',
            );
            setDiscordConnectLoading(false);
          }
        },
        false,
      );
    } catch (error) {
      setDiscordConnectLoading(false);
      console.error('Error initiating Discord authorization:', error);
    }
  };

  const disconnectDiscord = async () => {
    try {
      setDiscordDisconnectLoading(true);
      const f1 = async () => {
        return await axios.delete(`${BASE_URL}/discord/disconnect`);
      };
      const res = await reFetchTokenExpire(f1, fetchRefreshToken);
      if (res) {
        setUserDetails({
          ...userDetails,
          userDiscord: null,
        });
      }
      generateSnackbar(
        t('Successfully disconnected twitter account'),
        'success',
      );
      setDisconnectDiscordDialogOpen(false);
      setDiscordDisconnectLoading(false);
    } catch {
      generateSnackbar(t('Something went wrong!'), t('error'));
      setDisconnectTwitterDialogOpen(false);
      setDiscordDisconnectLoading(false);
    }
  };

  const disconnectTwitter = async () => {
    try {
      setTwitterDisconnectLoading(true);
      const f1 = async () => {
        return await axios.delete(
          `${BASE_URL}/api/v1/twitter/disconnect/${disconnectUserTwitterId}`,
        );
      };
      const res = await reFetchTokenExpire(f1, fetchRefreshToken);
      if (res) {
        setUserDetails((prevUserDetails) => ({
          ...prevUserDetails,
          userTwitter: prevUserDetails.userTwitter.filter(
            (item) => item._id !== disconnectUserTwitterId,
          ),
        }));
      }
      generateSnackbar(
        t('Successfully disconnected twitter account'),
        'success',
      );
      setDisconnectTwitterDialogOpen(false);
      setTwitterDisconnectLoading(false);
    } catch {
      generateSnackbar(t('Something went wrong!'), t('error'));
      setDisconnectTwitterDialogOpen(false);
      setTwitterDisconnectLoading(false);
    }
  };

  const handleTwitterAuthorizeClick = async () => {
    try {
      setTwitterConnectLoading(true);
      const currentUrl = window.location.href;
      const response = await axios.get(`${BASE_URL}/api/v1/twitter/authorize`, {
        params: { returnUrl: currentUrl }, // Pass the current URL as a query parameter
      });
      const url = response.data.redirectUrl;

      // window.open(url);
      window.location.href = url;
      setTwitterConnectLoading(false);
    } catch (error) {
      setTwitterConnectLoading(false);
    }
  };

  const twitterCallbackApi = async (oauthToken, oauthVerifier) => {
    try {
      const f1 = async () => {
        return await axios.get(`${BASE_URL}/api/v1/twitter/callback`, {
          params: {
            oauth_token: oauthToken,
            oauth_verifier: oauthVerifier,
          },
        });
      };
      const response = await reFetchTokenExpire(f1, fetchRefreshToken);
      generateSnackbar('Successfully connected twitter account', 'success');
      const { username, email, accountType } = getValues();

      setUserDetails((prevDetails) => ({
        ...prevDetails,
        username,
        email,
        accountType,
        userTwitter:
          prevDetails?.userTwitter?.length > 0
            ? [...prevDetails.userTwitter, response.data.twitterUserDetails]
            : [response.data.twitterUserDetails],
      }));

      const twitterPostRedirectionRoute = getSessionData(
        'twitter-post-redirection',
      );

      if (twitterPostRedirectionRoute) {
        router.push(twitterPostRedirectionRoute);
      }
    } catch (error) {
      if (error.response.data.message) {
        generateSnackbar(error.response.data.message, 'error');
      }
    }
  };

  useEffect(() => {
    // For Twitter Authorization
    const urlSearchParams = new URLSearchParams(window.location.search);
    const oauthToken = urlSearchParams.get('oauth_token');
    const oauthVerifier = urlSearchParams.get('oauth_verifier');
    const callTwitterAuth = urlSearchParams.get('callTwitterAuth');

    // Check if both oauth_token and oauth_verifier are present
    if (oauthToken && oauthVerifier) {
      // Perform your desired actions here
      twitterCallbackApi(oauthToken, oauthVerifier);
    }

    if (callTwitterAuth === 'true') {
      handleTwitterAuthorizeClick();
    }
  }, []);

  const updateLanguage = () => {
    if (languageType === 'English') {
      i18n.changeLanguage('en');
      setUser({ ...user, languageType: 'en' });
    } else if (languageType === 'French') {
      i18n.changeLanguage('fr');
      setUser({ ...user, languageType: 'fr' });
    } else if (languageType === 'Korean') {
      i18n.changeLanguage('ko');
      setUser({ ...user, languageType: 'ko' });
    } else if (languageType === 'German') {
      i18n.changeLanguage('de');
      setUser({ ...user, languageType: 'de' });
    } else {
      i18n.changeLanguage('en');
      setUser({ ...user, languageType: 'en' });
    }
  };

  const isUserNameUnique = async (shouldDirty) => {
    try {
      setUserNameCheckLoading(true);
      const response = await checkUniquenessUserName(debouncedUserNameString);

      if (response?.data?.status === 'success') {
        const isUnique = response?.data?.isUnique;

        if (isUnique) {
          setUserNameAvailableMessage('Username is available');
          setUserNameNotAvailableMessage('');
          setValue('username', debouncedUserNameString, { shouldDirty });
        } else {
          setUserNameAvailableMessage('');
          setUserNameNotAvailableMessage('Username is not available');
        }
      }

      setUserNameCheckLoading(false);
    } catch {
      setUserNameCheckLoading(false);
    }
  };

  const DEBOUNCE_DELAY = 500; // 500 ms

  useDebounce(
    () => {
      setDebouncedUserNameString(usernameString);
    },
    DEBOUNCE_DELAY,
    [usernameString],
  );

  useEffect(() => {
    if (debouncedUserNameString) {
      isUserNameUnique(isUserNameTouched);
    } else {
      setUserNameAvailableMessage('');
      setUserNameNotAvailableMessage('');
    }
  }, [debouncedUserNameString]);

  const handleEmailUpdateSuccess = (email) => {
    setValue('email', email);
    setUserDetails({
      ...userDetails,
      email,
    });
    setUser({
      ...user,
      email,
    });
  };

  return (
    <>
      {/* Dialog Rendering Start */}
      <DisconnectSocialAccountDialog
        onDisconnect={disconnectDiscord}
        disconnectLoading={discordDisconnectLoading}
        open={disconnectDiscordDialogOpen}
        handleClose={() => setDisconnectDiscordDialogOpen(false)}
        socialAccountTitle="Discord"
      />

      <DisconnectSocialAccountDialog
        onDisconnect={disconnectTwitter}
        disconnectLoading={twitterDisconnectLoading}
        open={disconnectTwitterDialogOpen}
        handleClose={() => setDisconnectTwitterDialogOpen(false)}
        socialAccountTitle="Twitter"
      />

      {/* Dialog Rendering Ends */}

      <form onSubmit={handleSubmit(onSaveDetails)}>
        <SettingsHeader>
          <SectionTitle>{t('My Details')}</SectionTitle>
          {!isMobileView && isDirty && (
            <SaveCancelButtonGroup
              disabled={!!userNameNotAvailableMessage}
              saving={saving}
              loading={loading}
            />
          )}
        </SettingsHeader>

        {!loading ? (
          <AccountContentContainer>
            {/* Username & Email Section */}
            <RowContainer>
              <RowLabelHeaderContainer>
                <LeftHeaderComp
                  headerText={'Username & Email'}
                  subheader={'Username & Email'}
                />
              </RowLabelHeaderContainer>
              <RowContentContainer>
                <ContentSubContainer>
                  <BoxWithStatus
                    loading={userNameCheckLoading}
                    userNameAvailable={
                      isUserNameTouched && userNameAvailableMessage
                    }
                    userNameNotAvailable={
                      isUserNameTouched && userNameNotAvailableMessage
                    }
                  >
                    {isEditingUsername ? (
                      <StyledInput
                        onChange={(event) => {
                          setUserNameString(event.target.value);
                          setIsUserNameTouched(true);
                        }}
                        value={usernameString}
                        onBlur={() =>
                          userDetails?.username === usernameString &&
                          !isUserNameTouched &&
                          setIsEditingUsername(false)
                        }
                      />
                    ) : (
                      <SensitiveInfoBox
                        value={usernameString}
                        placeholder="Username"
                        onEdit={() => setIsEditingUsername(true)}
                      />
                    )}
                  </BoxWithStatus>

                  {isUserNameTouched && userNameAvailableMessage && (
                    <>
                      <Spacer value={10} />
                      <InputLabel>{userNameAvailableMessage}</InputLabel>
                    </>
                  )}

                  {userNameNotAvailableMessage && (
                    <>
                      <Spacer value={10} />
                      <InputLabel type="error">
                        {userNameNotAvailableMessage}
                      </InputLabel>
                    </>
                  )}
                </ContentSubContainer>
                <ContentSubContainer>
                  <SensitiveInfoBox
                    value={email}
                    placeholder="Email"
                    onEdit={() => setEmailDialogOpen(true)}
                  />
                </ContentSubContainer>
              </RowContentContainer>
            </RowContainer>

            <Spacer value={50} />

            {/* Account Type Section */}
            <RowContainer>
              <RowLabelHeaderContainer>
                <LeftHeaderComp
                  headerText={t('Account Type')}
                  subheader={t('Type')}
                />
              </RowLabelHeaderContainer>
              <RowContentContainer>
                <ContentSubContainer>
                  <DropdownWithStatus index={2} saveStatus={saveStatus}>
                    <Dropdown
                      selectedItem={accountType}
                      setSelectedItem={(value) => {
                        setValue('accountType', value, { shouldDirty: true });
                      }}
                      options={Object.values(AccountTypes)}
                      width="100%"
                      multiple
                    />
                  </DropdownWithStatus>
                </ContentSubContainer>
              </RowContentContainer>
            </RowContainer>

            <Spacer value={50} />

            <RowContainer>
              <RowLabelHeaderContainer>
                <RowLabelHeader>{t('External Accounts')}</RowLabelHeader>
              </RowLabelHeaderContainer>
              <RowContentContainer>
                {userDetails?.userDiscord && (
                  <OutlinedButton
                    width="240px"
                    height={34}
                    onClick={() => setDisconnectDiscordDialogOpen(true)}
                    textTransform="none"
                  >
                    <ImageIcon
                      size="24px"
                      marginRight="10px"
                      src={DiscordIcon}
                    />
                    {`${userDetails?.userDiscord?.username}#${userDetails?.userDiscord?.discriminator}`}
                  </OutlinedButton>
                )}

                {dribbbleUser && (
                  <OutlinedButton
                    width="240px"
                    height={34}
                    onClick={() => setDribbbleDialogOpen(true)}
                    textTransform="none"
                  >
                    <ImageIcon
                      size="20px"
                      marginRight="10px"
                      src={DribbbleIcon}
                    />
                    {`@${dribbbleUser?.login}`}
                  </OutlinedButton>
                )}

                {userDetails?.userTwitter?.length > 0 && (
                  <>
                    {userDetails?.userTwitter?.map((details, index) => (
                      <OutlinedButton
                        key={index}
                        width="240px"
                        height={34}
                        onClick={() => {
                          setDisconnectTwitterDialogOpen(true);
                          setDisconnectUserTwitterId(details?._id);
                        }}
                        textTransform="none"
                      >
                        <Box sx={{ marginRight: '6px', marginTop: '4px' }}>
                          <UilTwitter
                            size="24"
                            color={theme.palette.blue.blue00ACEE}
                          />
                        </Box>
                        {'@' + details?.screenName}
                      </OutlinedButton>
                    ))}
                  </>
                )}

                <SocialConnectDropdown
                  discordConnected={!!userDetails?.userDiscord}
                  dribbbleConnected={!!dribbbleUser}
                  onDiscordClick={handleDiscordAuthorizeClick}
                  onTwitterClick={handleTwitterAuthorizeClick}
                  onDribbbleClick={() => setDribbbleDialogOpen(true)}
                />
              </RowContentContainer>
            </RowContainer>

            <Spacer value={50} />

            {/* Curator Section */}
            {/* <RowContainer>
              <RowLabelHeaderContainer>
                <RowLabelHeader>{t('Curator')}</RowLabelHeader>
              </RowLabelHeaderContainer>
              <RowContentContainer>
                <Box>
                  <UserCuratorBanner />
                </Box>
              </RowContentContainer>
            </RowContainer>

            <Spacer value={50} /> */}

            {/* Language Section */}
            <RowContainer>
              <RowLabelHeaderContainer>
                <RowLabelHeader>{t('Select Language')}</RowLabelHeader>
              </RowLabelHeaderContainer>
              <RowContentContainer>
                <ContentSubContainer>
                  {/* <InputLabel>{t('Type')}</InputLabel> */}
                  <Spacer value={20} />
                  <Dropdown
                    selectedItem={
                      languageType ? languageType.toLowerCase() : ''
                    }
                    setSelectedItem={(value) => {
                      setValue('languageType', value, { shouldDirty: true });
                    }}
                    onBlurCapture={updateLanguage}
                    options={[
                      t('English'),
                      t('French'),
                      t('Korean'),
                      t('German'),
                    ]}
                    width="100%"
                  />
                </ContentSubContainer>
              </RowContentContainer>
            </RowContainer>

            <Spacer value={50} />
          </AccountContentContainer>
        ) : (
          <SpinnerContainer>
            <Spinner size={30} />
          </SpinnerContainer>
        )}

        <SettingsHeader>
          {isMobileView && (
            <SaveCancelButtonGroup saving={saving} loading={loading} />
          )}
        </SettingsHeader>
      </form>
      <EmailUpdateDialog
        open={emailDialogOpen}
        onClose={() => setEmailDialogOpen(false)}
        onSuccess={handleEmailUpdateSuccess}
        currentEmail={userDetails?.email}
      />
      <DribbbleImportDialog
        open={dribbbleDialogOpen}
        onClose={() => setDribbbleDialogOpen(false)}
        dribbbleUser={dribbbleUser}
        getDribbbleUser={getDribbbleUser}
      />
    </>
  );
};
