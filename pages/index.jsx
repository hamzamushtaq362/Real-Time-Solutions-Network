import { AuthLayout, MainLayout } from '~/layouts';
import { DashboardHome } from '~/components';
import nookies from 'nookies';

export default function LandingPage() {
  return <DashboardHome darkHeader={true} />;
}

LandingPage.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      <AuthLayout landing={true}>{page}</AuthLayout>
    </MainLayout>
  );
};

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  const userData = cookies.user ? JSON.parse(cookies.user) : null;
  if (userData) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  }
  return { props: {} };
}