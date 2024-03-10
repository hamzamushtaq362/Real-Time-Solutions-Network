import { MainLayout, AuthLayout } from '~/layouts';
import Discord from 'components/discord/Discord';

export default function DiscoveryPage() {
  return <Discord />;
}

DiscoveryPage.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      <AuthLayout>{page}</AuthLayout>
    </MainLayout>
  );
};