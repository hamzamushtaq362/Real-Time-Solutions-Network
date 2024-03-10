import { MainLayout, AuthLayout } from 'layouts';
import { CollabTemplatesExplore } from '~/components';

export default function CollabTemplatesExplorePage() {
  return <CollabTemplatesExplore />;
}

CollabTemplatesExplorePage.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      <AuthLayout>{page}</AuthLayout>
    </MainLayout>
  );
};
