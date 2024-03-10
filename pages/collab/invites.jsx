import { MainLayout, AuthLayout } from 'layouts';
import { CollabInvites } from '../../components';

export default function InvitesPage() {
  return <CollabInvites />;
}

InvitesPage.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      <AuthLayout>{page}</AuthLayout>
    </MainLayout>
  );
};
