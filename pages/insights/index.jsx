import Insight from 'components/Insights/Insights';
import React from 'react';
import { AuthLayout, MainLayout } from '~/layouts';

export default function InsightsPage() {
  return <Insight />;
}

InsightsPage.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      <AuthLayout>{page}</AuthLayout>
    </MainLayout>
  );
};
