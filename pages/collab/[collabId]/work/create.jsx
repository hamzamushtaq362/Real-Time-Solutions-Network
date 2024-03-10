import { MainLayout } from 'layouts';
import { SubCollabCreate } from '~/components';

export default function CreateSubCollabPage() {
  return <SubCollabCreate />;
}

CreateSubCollabPage.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      {page}
    </MainLayout>
  );
};
