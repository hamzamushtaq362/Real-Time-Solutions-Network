import { MainLayout, AuthLayout } from 'layouts';
import { CollabEdit } from '~/components';
import nookies from 'nookies';
import { APP_URL } from '~/apis';

export default function EditCollabPage({ collabId }) {
  return <CollabEdit collabId={collabId} />;
}

EditCollabPage.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      <AuthLayout>{page}</AuthLayout>
    </MainLayout>
  );
};


export async function getServerSideProps(context) {
  const { collabId } = context.params;
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

  return {
    props: {
      collabId,
    },
  };
}
