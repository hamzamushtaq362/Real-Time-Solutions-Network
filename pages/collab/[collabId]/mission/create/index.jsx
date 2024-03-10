import { MainLayout, AuthLayout } from 'layouts';
import { MissionCreate } from '~/components';

export default function CreateMissionPage() {
  return <MissionCreate />;
}

CreateMissionPage.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      <AuthLayout>{page}</AuthLayout>
    </MainLayout>
  );
};
