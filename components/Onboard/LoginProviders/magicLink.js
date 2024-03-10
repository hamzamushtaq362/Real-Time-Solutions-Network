import * as MagicSdk from 'magic-sdk';
import { Magic } from 'magic-sdk';
import { checkIsEmailValid, loginWithMagicWallet, loginWithMagicWalletSocial, onboardPersonalize } from '~/apis';
import { capitalizeWord, getRandomAvatar } from '~/utils';
import { OAuthExtension } from '@magic-ext/oauth';
import config from '~/config';
import nookies from 'nookies';

export const magicSocialLinkLogin = async () => {
  try {
    const magic = new Magic(process.env.REACT_APP_MAGIN_LINK_KEY, {
      extensions: [new OAuthExtension()],
    });

    await magic.oauth.loginWithRedirect({
      provider: 'google',
      redirectURI: `${config.APP_URL}`,
    });
  } catch (error) {}
};

export const getRedirectResult = async (
  referralCode,
  setUser,
  setAuth,
  callbackFunc,
) => {
  try {
    const MAGIC_API_KEY = process.env.REACT_APP_MAGIN_LINK_KEY;

    const magic = new Magic(MAGIC_API_KEY, {
      extensions: [new OAuthExtension()],
    });

    const result = await magic.oauth.getRedirectResult();

    if (result) {
      const email = result?.magic?.userMetadata?.email;
      const res = await loginWithMagicWalletSocial(
        result?.magic?.idToken,
        referralCode,
        email,
      );

      if (res.status == 'success') {
        const user = res?.user;

        setAuth(user);
        nookies.set(null, 'user', JSON.stringify(user), {
          path: '/',
          maxAge: 10 * 365 * 24 * 60 * 60,  // 10 years in seconds
        });
        if (!user?.username) {
          const fullName = result?.oauth?.userInfo?.name;
          const username = email?.substring(0, email.indexOf('@')) ?? '';
          const avatarUrl = getRandomAvatar(username);

          const response = await onboardPersonalize({
            username,
            fullName,
            imageUrl: avatarUrl,
          });
          if (response?.data?.data){
            if (!user?.username) {
              user.username = response?.data?.data?.username;
            }
          }
          if (!user?.imageUrl) {
            user.imageUrl = avatarUrl;
          }
          if (!user?.fullName) {
            user.fullName = fullName;
          }
          setAuth(user);
        }
        setUser(user);
        localStorage.setItem('addresss', JSON.stringify(user.addresses));
        callbackFunc();
      } else {
        return null;
      }
    }
  } catch (error) {
    return null;
  }
};

// Verifying the email using magic link
export const emailCheckUsingMagicAuth = async (email, setLoginBtnText) => {
  try {
    const magic = new MagicSdk.Magic(process.env.REACT_APP_MAGIN_LINK_KEY);
    await magic.auth.loginWithMagicLink({
      email,
    });

    const didToken = await magic.user.getIdToken();
    setLoginBtnText('Finished!');

    return await checkIsEmailValid(didToken, email)
  } catch (error) {
    return false;
  }
};

export const magicLinkLogin = async (email, referralCode, setUser, setAuth) => {
  const magic = new MagicSdk.Magic(process.env.REACT_APP_MAGIN_LINK_KEY);
  await magic.auth.loginWithMagicLink({
    email,
  });
  const token = await magic.user.getIdToken();
  let data = await loginWithMagicWallet(token, referralCode, email);
  setAuth(data);
  if (!data?.username) {
    const username = email?.substring(0, email.indexOf('@')) ?? '';
    const avatarUrl = getRandomAvatar(username);
    const fullName = capitalizeWord(username);
    const firstName = capitalizeWord(username);

    const response = await onboardPersonalize({
      username: username,
      fullName,
      firstName,
      imageUrl: avatarUrl,
    });
    if (response?.data?.data){
      data.username = response.data.data.username;
      data.imageUrl = avatarUrl;
      data.fullName = fullName;
      data.firstName = firstName;
    }
  }
  setUser(data);
  nookies.set(null, 'user', JSON.stringify(data), {
    path: '/',
    maxAge: 10 * 365 * 24 * 60 * 60,  // 10 years in seconds
  });
  localStorage.setItem('addresss', JSON.stringify(data.addresses));
};
