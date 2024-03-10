import { MainLayout, AuthLayout } from 'layouts';
import { CurationsLayout } from '~/components';

export default function CuratorCurationsPage() {
  return <CurationsLayout />;
}

CuratorCurationsPage.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      <AuthLayout>{page}</AuthLayout>
    </MainLayout>
  );
};
