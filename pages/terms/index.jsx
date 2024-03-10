import { MainLayout } from 'layouts';
import React  from 'react';
import Terms from 'components/Terms/Terms';

export default function TermsPage() {
  return <Terms />;
}

TermsPage.getLayout = function getLayout(page) {

  return (
    <MainLayout>
      {page}
    </MainLayout>
  );
};
