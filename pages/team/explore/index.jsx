import { useTranslation } from 'react-i18next';
import { MainLayout, AuthLayout } from '~/layouts';
import React from 'react';

import { CollectiveExplore } from '~/components';

export default function CollectiveExplorePage() {
  return <CollectiveExplore />;
}

CollectiveExplorePage.getLayout = function getLayout(page) {
  const { t } = useTranslation();

  return (
    <MainLayout title={t('Team Explore')}>
      <AuthLayout>{page}</AuthLayout>
    </MainLayout>
  );
};
