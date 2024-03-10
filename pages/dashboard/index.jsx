import { MainLayout, AuthLayout } from 'layouts';
import { DashboardHome } from '~/components';
import nookies from 'nookies';

export default function DashboardPage() {
  return <DashboardHome />;
}

DashboardPage.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      <AuthLayout>{page}</AuthLayout>
    </MainLayout>
  );
};
export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  const userData = cookies.user ? JSON.parse(cookies.user) : null;
  if (!userData) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return { props: {} };
}
