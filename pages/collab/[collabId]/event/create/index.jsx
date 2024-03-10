import { MainLayout } from 'layouts';
import { CollabEventCreate } from '~/components';

export default function CreateEventPage() {
  return <CollabEventCreate />;
}

CreateEventPage.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      {page}
    </MainLayout>
  );
};
