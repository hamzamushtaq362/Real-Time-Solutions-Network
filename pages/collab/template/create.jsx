import { MainLayout, AuthLayout } from 'layouts';
import { CollabTemplateCreate } from '~/components';
import nookies from 'nookies';
import { APP_URL } from '~/apis';

export default function CreateCollabTemplatePage() {
  return <CollabTemplateCreate />;
}

CreateCollabTemplatePage.getLayout = function getLayout(page) {
  return (
    <MainLayout>
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
  return { props: {} };
}
