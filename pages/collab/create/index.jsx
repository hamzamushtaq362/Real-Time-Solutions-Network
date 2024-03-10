import { MainLayout, AuthLayout } from 'layouts';
import { CollabCreate } from '~/components';
import nookies from 'nookies';
import { APP_URL } from '~/apis';

export default function CreateCollabPage() {
  return <CollabCreate />;
}

CreateCollabPage.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      <AuthLayout>{page}</AuthLayout>
    </MainLayout>
  );
};
export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  const userStr = cookies.user;
  const user = userStr ? JSON.parse(userStr) : null;

  if (!user) {
    const referrer = context.req.headers.referer;
    if (referrer) {
      const referrerUrl = referrer.replace(APP_URL, '');

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
  if (!user.isProfileComplete) {
    return {
      redirect: {
        destination: `/settings`,
        permanent: false,
      },
    };
  }
  return { props: {} };
}
