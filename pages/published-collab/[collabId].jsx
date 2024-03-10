import { useTranslation } from 'react-i18next';
import { PublishedCollab } from '~/components';
import { MainLayout, AuthLayout } from 'layouts';

export default function PublishedCollabPage() {
  return <PublishedCollab />;
}

PublishedCollabPage.getLayout = function getLayout(page) {
  const { t } = useTranslation();

  return (
    (<MainLayout title={t("RTSN - Published collab")}>
      <AuthLayout>{page}</AuthLayout>
    </MainLayout>)
  );
};
