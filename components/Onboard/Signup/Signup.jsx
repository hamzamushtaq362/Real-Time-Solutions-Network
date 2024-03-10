import React, { useContext, useState } from 'react';
import WalletConnect from '~/assets/png/Walletconnect.png';
import Metamask from '~/assets/png/Metamask.png';
import { magicSocialLinkLogin } from '../LoginProviders/magicLink';
import { metamaskLogin } from '../LoginProviders/metamask';
import { walletConnectLogin } from '../LoginProviders/walletconnect';
import { useLocalStorage, useNotistack } from '~/hooks';
import { Avatar, SmallSpinner } from '~/components';
import { capitalizeWord, generateUsername, getRandomAvatar } from '~/utils';
import nookies from 'nookies';

import {
  LoadingContainer,
  LoadingText,
  OnBoardRightImageContainer,
  OnBoardRightProviderButton,
  OnBoardRightProviderContent,
  OnBoardRightSignUpLabel,
  TermsAndConditionLink,
} from './elements';

import { Box } from '@mui/material';
import { onboardPersonalize } from '~/apis';
import AppContext from '../../../context/AppContext';
import { GoogleIcon } from 'assets/svg';
import { FlexBox } from 'components/common/elements';
import { useTranslation } from 'react-i18next';

export const TermsConditions = () => {
  const { t } = useTranslation();
  return (
    <OnBoardRightSignUpLabel>
      {t('By register or Login with rtsn you agree to the')}
      <TermsAndConditionLink target="_blank" href="https://rtsn.xyz/terms">
        {' '}
        {t('Terms & Conditions')}
      </TermsAndConditionLink>{' '}
      {t('and')}
      <TermsAndConditionLink target="_blank" href="https://rtsn.xyz/privacy">
        {' '}
        {t('Privacy Policy')}
      </TermsAndConditionLink>
    </OnBoardRightSignUpLabel>
  );
};

export const WalletConnectComponent = (props) => {
  const generateSnackbar = useNotistack();
  const { referralCode, onSignup } = props;
  const [, setAuth] = useLocalStorage('auth');
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const { setUser } = useContext(AppContext);
  const handleWalletConnectLogin = async () => {
    try {
      setLoading(true);
      const updatedUser = await walletConnectLogin(
        referralCode,
        generateSnackbar,
        setUser,
      );
      setAuth(updatedUser);
      nookies.set(null, 'user', JSON.stringify(updatedUser), {
        path: '/',
        maxAge: 10 * 365 * 24 * 60 * 60, // 10 years in seconds
      });
      if (!updatedUser.username) {
        const username = generateUsername();
        const avatarUrl = getRandomAvatar(username);
        const fullName = capitalizeWord(username);
        const firstName = capitalizeWord(username);

        await onboardPersonalize({
          username: username,
          imageUrl: avatarUrl,
          fullName,
          firstName,
        });
        updatedUser.username = username;
        updatedUser.imageUrl = avatarUrl;
        updatedUser.fullName = fullName;
        updatedUser.firstName = firstName;
        setUser(updatedUser);
      }

      generateSnackbar('Wallet Connected', 'success');

      onSignup();
    } catch (err) {
      if (err.message && err.message.length < 40) {
        generateSnackbar(err.message, 'error');
      } else {
        generateSnackbar('Something went wrong... try again', 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <OnBoardRightProviderButton
      onClick={handleWalletConnectLogin}
      disabled={loading}
      width={180}
    >
      <OnBoardRightImageContainer>
        <Avatar
          size={20}
          alt={t('Wallet connect logo')}
          avatar={WalletConnect.src}
          disableHover={true}
        />
      </OnBoardRightImageContainer>
      <OnBoardRightProviderContent width={loading ? '100%' : 'unset'}>
        {loading ? (
          <Box mr="30%">
            <FlexBox justifyContent="center">
              <SmallSpinner color="#FFF" />
            </FlexBox>
          </Box>
        ) : (
          <>{t('WalletConnect')}</>
        )}
      </OnBoardRightProviderContent>
    </OnBoardRightProviderButton>
  );
};

export const MetamaskComponent = (props) => {
  const generateSnackbar = useNotistack();
  const { referralCode, onSignup } = props;
  const [, setAuth] = useLocalStorage('auth');
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(AppContext);
  const { t } = useTranslation();

  const handleMetamaskClick = async () => {
    try {
      setLoading(true);
      if (!window.ethereum || !window.ethereum.isMetaMask) {
        generateSnackbar('No metamask found', 'error');

        return;
      }
      const updatedUser = await metamaskLogin(
        referralCode,
        generateSnackbar,
        setUser,
      );
      nookies.set(null, 'user', JSON.stringify(updatedUser), {
        path: '/',
        maxAge: 10 * 365 * 24 * 60 * 60, // 10 years in seconds
      });
      setAuth(updatedUser);

      if (!updatedUser.username) {
        const username = generateUsername();
        const avatarUrl = getRandomAvatar(username);
        const fullName = capitalizeWord(username);
        const firstName = capitalizeWord(username);

        await onboardPersonalize({
          username: username,
          imageUrl: avatarUrl,
          fullName,
          firstName,
        });
        updatedUser.username = username;
        updatedUser.imageUrl = avatarUrl;
        updatedUser.fullName = fullName;
        updatedUser.firstName = firstName;
        setUser(updatedUser);
        setAuth(updatedUser);
      }

      generateSnackbar('Wallet Connected', 'success');

      onSignup();
    } catch (err) {
      if (err.message && err.message.length < 40) {
        generateSnackbar(err.message, 'error');
      } else {
        generateSnackbar('Something went wrong... try again', 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <OnBoardRightProviderButton
      onClick={handleMetamaskClick}
      disabled={loading}
      width={150}
    >
      <OnBoardRightImageContainer>
        <Avatar
          size={21}
          alt={t('Metamask logo')}
          avatar={Metamask.src}
          disableHover={true}
        />
      </OnBoardRightImageContainer>
      <OnBoardRightProviderContent width={loading ? '100%' : 'unset'}>
        {loading ? (
          <Box mr="30%">
            <FlexBox justifyContent="center">
              <SmallSpinner color="#FFF" />
            </FlexBox>
          </Box>
        ) : (
          <>{t('Metamask')}</>
        )}
      </OnBoardRightProviderContent>
    </OnBoardRightProviderButton>
  );
};
export const GoogleLoginComponent = ({ loginLoading }) => {
  const generateSnackbar = useNotistack();
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);

  const handleGoogleLoginClick = async () => {
    try {
      setLoading(true);
      await magicSocialLinkLogin();
      setLoading(false);
    } catch (err) {
      if (err.message && err.message.length < 40) {
        generateSnackbar(err.message, 'error');
      } else {
        generateSnackbar('Something went wrong... try again', 'error');
      }
    } finally {
      setLoading(false);
    }
  };
  const isLoading = loginLoading ?? loading;

  return (
    <OnBoardRightProviderButton
      onClick={handleGoogleLoginClick}
      disabled={isLoading}
      width={isLoading ? 130 : 110}
    >
      <OnBoardRightImageContainer>
        <Avatar
          size={16}
          alt={t('Google logo')}
          avatar={GoogleIcon.src}
          disableHover={true}
        />
      </OnBoardRightImageContainer>
      <OnBoardRightProviderContent width={isLoading ? '100%' : 'unset'}>
        {isLoading ? (
          <Box sx={{ display: 'flex' }}>
            <LoadingContainer>
              <LoadingText>{t('Loading . . .')}</LoadingText>
            </LoadingContainer>
          </Box>
        ) : (
          <>{t('Google')}</>
        )}
      </OnBoardRightProviderContent>
    </OnBoardRightProviderButton>
  );
};
