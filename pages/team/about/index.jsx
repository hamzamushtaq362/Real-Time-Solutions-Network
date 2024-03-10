import { useTranslation } from 'react-i18next';
import { MainLayout, AuthLayout } from '~/layouts';
import React from 'react';

import { CollectiveAbout } from '~/components';

export default function CollectiveAboutPage() {
  return <CollectiveAbout />;
}

CollectiveAboutPage.getLayout = function getLayout(page) {
  const { t } = useTranslation();

  return (
    (<MainLayout title={t("Team About")}>
      <AuthLayout>{page}</AuthLayout>
    </MainLayout>)
  );
};
