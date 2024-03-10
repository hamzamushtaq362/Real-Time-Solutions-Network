import { MainLayout } from 'layouts';
import { BTSCreate } from '../../../../components/BTSCreate';

export default function CreateSubCollabPage() {
  return <BTSCreate />;
}

CreateSubCollabPage.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      {page}
    </MainLayout>
  );
};
