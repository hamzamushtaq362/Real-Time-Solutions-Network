import { MainLayout } from 'layouts';
import React  from 'react';
import PrivacyPolicy from 'components/PrivacyPolicy/PrivacyPolicy';

export default function PrivacyPolicyPage() {
  return <PrivacyPolicy />;
}

PrivacyPolicyPage.getLayout = function getLayout(page) {

  return (
    <MainLayout>
      {page}
    </MainLayout>
  );
};
