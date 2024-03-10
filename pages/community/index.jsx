import Community from 'components/Community/Community';
import { MainLayout, AuthLayout } from 'layouts';

export default function CommunityPage() {
  return (
    <div>
      <Community />
    </div>
  );
}

CommunityPage.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      <AuthLayout>{page}</AuthLayout>
    </MainLayout>
  );
};
