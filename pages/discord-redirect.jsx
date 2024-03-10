import { useTranslation } from 'react-i18next';
import { MainLayout, AuthLayout } from '~/layouts';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { APP_URL, BASE_URL } from '~/apis';
import { Box } from '@mui/material';
import { FlexBox } from 'components/common/elements';

export default function DiscordRedirectPage(){
  const { t } = useTranslation();

  const router = useRouter();

  const [userDiscord, setUserDiscord] = useState(null);

  const discordAuthorizeCallBack = async (code) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/discord/authorize/callback?code=${code}`,
      );
      if (response.data.status === 'success') {
        setUserDiscord(response.data.userDiscord);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  useEffect(() => {
    const { code } = router.query;
    if (code) {
      discordAuthorizeCallBack(code);
    }
  }, [router.query]);

  useEffect(() => {
    if (userDiscord){
      window.opener.postMessage(
        {
          userDiscord,
          status: 'success',
          message: 'Authorization Successful!',
        },
        APP_URL
      );
      window.close();
    }
  }, [userDiscord])

  return (
    (<FlexBox justifyContent='center' width='100%' height='100%'>
      <Box>{t("Please wait while we redirect you to the app...")}</Box>
    </FlexBox>)
  );
}

DiscordRedirectPage.getLayout = function getLayout(page) {
  const { t } = useTranslation();

  return (
    (<MainLayout title={t("Authenticating with Discord")} description={t(
      "Please wait while we complete the authentication process. This tab will close automatically once the process is finished. Do not close this tab manually."
    )}>
      <AuthLayout>{page}</AuthLayout>
    </MainLayout>)
  );
};

