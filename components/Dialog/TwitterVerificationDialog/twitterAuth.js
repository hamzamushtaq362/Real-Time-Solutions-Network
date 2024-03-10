import { Magic } from 'magic-sdk';
import { OAuthExtension } from '@magic-ext/oauth';
import config from '~/config';

export const twitterAuthorizeHandler = async () => {
  try {
    const magic = new Magic(process.env.REACT_APP_MAGIN_LINK_KEY, {
      extensions: [new OAuthExtension()],
    });

    await magic.oauth.loginWithRedirect({
      provider: 'twitter',
      redirectURI: `${config.APP_URL}`,
    });
  } catch (error) {}
};
