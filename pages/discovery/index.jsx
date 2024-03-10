import { MainLayout, AuthLayout } from '~/layouts';
import { Discovery } from '~/components';

export default function DiscoveryPage() {
  return <Discovery />;
}

DiscoveryPage.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      <AuthLayout>{page}</AuthLayout>
    </MainLayout>
  );
};
