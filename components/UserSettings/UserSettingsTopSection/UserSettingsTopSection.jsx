import { SectionTitle } from '../elements';
import { NavButtonGroup } from '~/components';
import { useContext } from 'react';
import AppContext from 'context/AppContext';
import { useTranslation } from 'react-i18next';
import { SecondarybarHeader } from 'components/SecondaryNavbar/elements';

export const UserSettingsTopSection = ({
  buttonsData,
  activeTab,
  setActiveTab,
}) => {
  const { user } = useContext(AppContext);
  const { t } = useTranslation();

  return (
    <SecondarybarHeader>
      <SectionTitle>{t('Settings')}</SectionTitle>

      <NavButtonGroup
        buttonsData={buttonsData}
        activeButton={activeTab}
        setActiveButton={setActiveTab}
        showRightButton
        rightButtonText={t('View Profile')}
        rightButtonIcon='arrow-right-up-long'
        onClickRightButton={() => window.open(`/@${user?.username}`, '_blank')}
      />
    </SecondarybarHeader>
  );
};
