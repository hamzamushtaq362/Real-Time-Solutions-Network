import { useTranslation } from 'react-i18next';
import { MainLayout, AuthLayout } from '~/layouts';
import React from 'react';
import CreateCollectiveProject from 'components/Collective/CreateCollectiveProject/CreateCollectiveProject';
import { useRouter } from 'next/router';
import nookies from 'nookies';
import { APP_URL } from '~/apis';

export default function CreateCollectiveProjectPage() {
  const router = useRouter();
  const { collectiveLink } = router.query;
  return <CreateCollectiveProject collectiveLink={collectiveLink} />;
}

CreateCollectiveProjectPage.getLayout = function getLayout(page) {
  const { t } = useTranslation();

  return (
    <MainLayout title={t('Create Collab for Team')}>
      <AuthLayout>{page}</AuthLayout>
    </MainLayout>
  );
};
export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  const user = cookies.user;

  if (!user) {
    const referrer = context.req.headers.referer;
    if (referrer) {
      const referrerUrl = referrer.replace(APP_URL, '')
      return {
        redirect: {
          destination: referrerUrl,
          permanent: false,
        },
      };
    }
    // No referrer, so redirect to `/`
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return { props: {} };
}