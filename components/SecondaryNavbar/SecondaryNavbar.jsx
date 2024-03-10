import React from 'react';
import { SecondarybarHeader } from './elements';
import { SectionTitle } from 'components/UserSettings/elements';
import { NavButtonGroup } from '~/components';

export const SecondaryNavbar = ({
  title,
  tabsData,
  activeTab,
  setActiveTab,
  rightButtonText,
  onClickRightButton,
  subview,
  showRightButton,
  buttonWidth,
}) => {
  return (
    <>
      <SecondarybarHeader>
        <SectionTitle>{title}</SectionTitle>
        <NavButtonGroup
          buttonsData={tabsData}
          activeButton={activeTab}
          setActiveButton={activeTab ? setActiveTab : null}
          showRightButton={showRightButton}
          rightButtonText={rightButtonText}
          onClickRightButton={onClickRightButton}
          subview={subview}
          buttonWidth={buttonWidth}
        />
      </SecondarybarHeader>
    </>
  );
};
