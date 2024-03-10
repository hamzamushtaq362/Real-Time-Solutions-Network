import { UserSettingsContainer } from './elements';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// Sections Imports
import { UserSettingsTopSection } from './UserSettingsTopSection';
import { UserSettingsAccountSection } from './UserSettingsAccountSection';
import { UserSettingsWalletSection } from './UserSettingsWalletSection';
import { UserProfileSectionEdit } from './UserSettingsProfileSection';
import { UserSettingsReferralSection } from './UserSettingsReferralSection';
import { useTranslation } from 'react-i18next';

export const UserSettings = () => {
  const [activeTab, setActiveTab] = useState('account');
  const { t } = useTranslation();
  const router = useRouter();

  const buttonsData = [
    {
      text: t('Account'),
      value: 'account',
    },
    {
      text: t('Profile'),
      value: 'profile',
    },
    {
      text: t('Wallet'),
      value: 'wallet',
    },

    {
      text: t('Referral'),
      value: 'referral',
    },
  ];

  useEffect(() => {
    const view = router.query.view;
    if (buttonsData.map((item) => item.value).includes(view)) {
      setActiveTab(view);
    } else {
      setActiveTab('account');
    }
  }, [router]);

  return (
    <>
      <UserSettingsContainer>
        {/* User Settings Top Section */}
        <UserSettingsTopSection
          buttonsData={buttonsData}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Accounts Section */}
        {activeTab === 'account' && (
          <>
            <UserSettingsAccountSection />
          </>
        )}

        {/* Profile Section */}
        {activeTab === 'profile' && (
          <>
            <UserProfileSectionEdit />
          </>
        )}

        {/* Wallet Section */}
        {activeTab === 'wallet' && (
          <>
            <UserSettingsWalletSection />
          </>
        )}

        {/* Referral Section */}
        {activeTab === 'referral' && (
          <>
            <UserSettingsReferralSection />
          </>
        )}
      </UserSettingsContainer>
    </>
  );
};
