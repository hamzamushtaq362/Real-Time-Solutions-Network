import { useTranslation } from 'react-i18next';
import { CreateBadge } from 'components/CreateBadge';
import { MainLayout, AuthLayout } from 'layouts';

export default function CreateBadgePage() {
  return <CreateBadge />;
}

CreateBadgePage.getLayout = function getLayout(page) {
  const { t } = useTranslation();

  return (
    (<MainLayout title={t("Create Badge")}>
      <AuthLayout>{page}</AuthLayout>
    </MainLayout>)
  );
};
