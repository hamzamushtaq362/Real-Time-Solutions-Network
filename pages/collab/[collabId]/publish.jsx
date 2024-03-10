import { MainLayout, AuthLayout } from 'layouts';
import PublishNFT from 'components/PublishNFT/PublishNFT';

export default function PublishNftPage() {
  return <PublishNFT />;
}

PublishNftPage.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      <AuthLayout>{page}</AuthLayout>
    </MainLayout>
  );
};
