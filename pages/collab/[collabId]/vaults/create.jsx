import { useTranslation } from 'react-i18next';
import React from 'react';
import { MainLayout, AuthLayout } from '~/layouts';
import { CreateVault } from 'components/Vault/CreateVault';

export default function CreateVaultPage() {
  return <CreateVault />;
}

CreateVaultPage.getLayout = function getLayout(page) {
  const { t } = useTranslation();

  return (
    (<MainLayout title={t("Create Vault")}>
      <AuthLayout>{page}</AuthLayout>
    </MainLayout>)
  );
};
