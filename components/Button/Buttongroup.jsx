import React from 'react';
import {
  ButtonGroupContainer,
  ButtonGroupItem,
  ButtonGroupItemLight,
  CollectiveButtonTabBarContainer,
  CollectiveButtonTabBarItem,
  CollectiveButtonTabBarItemCounter,
  CollectiveButtonTabBarItemCounterText,
  ItemCount,
} from './elements';
import Link from 'next/link';
import { useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const ExploreCollabButtonGroup = ({
  activeTab,
  setActiveTab,
  buttonsData,
  width,
}) => {
  const { t } = useTranslation();
  const defaultData = [
    {
      id: 1,
      type: 'all-collabs',
      path: '/collab/explore?view=all-collabs',
      text: t('All Collabs'),
    },
    {
      id: 2,
      type: 'my-collabs',
      path: '/collab/explore?view=my-collabs',
      text: t('My Collabs'),
    },
    {
      id: 3,
      type: 'invites',
      path: '/collab/explore?view=invites',
      text: t('Invites'),
    },
    {
      id: 4,
      type: 'archive',
      path: '/collab/explore?view=archive',
      text: t('Archive'),
    },
  ];

  return (
    <ButtonGroupContainer width={width}>
      {!buttonsData
        ? defaultData.map((b, index) => {
            return (
              <Link key={index} href={b.path}>
                <ButtonGroupItem key={b.id} active={activeTab === b.type}>
                  {b.text}
                </ButtonGroupItem>
              </Link>
            );
          })
        : buttonsData.map((b) => {
            return (
              <ButtonGroupItem
                key={b.id}
                active={activeTab === b.type}
                onClick={() => {
                  setActiveTab(b.type);
                }}
              >
                {b.text}
              </ButtonGroupItem>
            );
          })}
    </ButtonGroupContainer>
  );
};

export const CollabDetailsButtonGroup = ({
  activeTab,
  setActiveTab,
  suggestedUsers,
  members,
  applicants,
  invites,
}) => {
  const BUTTON_WIDTH = '150px';
  const theme = useTheme();
  const { t } = useTranslation();
  return (
    <ButtonGroupContainer width="610px">
      <ButtonGroupItem
        width={BUTTON_WIDTH}
        borderActiveColor={theme.palette.blue.main}
        active={activeTab === 'suggestions'}
        onClick={() => setActiveTab('suggestions')}
      >
        {/* Suggestions{' '} */}
        {t('Suggestions')}
        <ItemCount active={activeTab === 'suggestions'}>
          {suggestedUsers && suggestedUsers.length}
        </ItemCount>
      </ButtonGroupItem>
      <ButtonGroupItem
        width={BUTTON_WIDTH}
        borderActiveColor={theme.palette.blue.main}
        active={activeTab === 'members'}
        onClick={() => setActiveTab('members')}
      >
        {/* Members{' '} */}
        {t('Members')}
        <ItemCount active={activeTab === 'members'}>
          {members && members.length}
        </ItemCount>
      </ButtonGroupItem>
      <ButtonGroupItem
        width={BUTTON_WIDTH}
        borderActiveColor={theme.palette.blue.main}
        active={activeTab === 'applicants'}
        onClick={() => setActiveTab('applicants')}
      >
        {/* Applicants{' '} */}
        {t('Applicants')}
        <ItemCount active={activeTab === 'applicants'}>
          {applicants && applicants.length}
        </ItemCount>
      </ButtonGroupItem>
      <ButtonGroupItem
        width={BUTTON_WIDTH}
        borderActiveColor={theme.palette.blue.main}
        active={activeTab === 'invites'}
        onClick={() => setActiveTab('invites')}
      >
        {/* Invites{' '} */}
        {t('Invites')}
        <ItemCount active={activeTab === 'invites'}>
          {invites && invites.length}
        </ItemCount>
      </ButtonGroupItem>
    </ButtonGroupContainer>
  );
};

export const CollabDetailsSuggestedButton = ({
  activeTab,
  setActiveTab,
  suggestedUsers,
}) => {
  const BUTTON_WIDTH = '150px';
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <ButtonGroupContainer width="185px">
      <ButtonGroupItem
        width={BUTTON_WIDTH}
        borderActiveColor={theme.palette.blue.main}
        active={activeTab === 'suggestions'}
        onClick={() => setActiveTab('suggestions')}
      >
        {/* Suggestions{' '} */}
        {t('Suggestions')}
        <ItemCount active={activeTab === 'suggestions'}>
          {suggestedUsers && suggestedUsers.length}
        </ItemCount>
      </ButtonGroupItem>
    </ButtonGroupContainer>
  );
};

export const InboxNavigationButtonGroup = ({ activeTab, setActiveTab }) => {
  const { t } = useTranslation();
  return (
    <ButtonGroupContainer height="60px" width="100%">
      <ButtonGroupItemLight
        width="98%"
        active={activeTab === 'collabs'}
        onClick={() => setActiveTab('collabs')}
      >
        {t('Collabs')}
      </ButtonGroupItemLight>
      <ButtonGroupItemLight
        width="98%"
        active={activeTab === 'general'}
        onClick={() => setActiveTab('general')}
      >
        {t('General')}
      </ButtonGroupItemLight>
    </ButtonGroupContainer>
  );
};
export const CollectiveButtonGroup = ({ activeTab, setActiveTab }) => {
  const { t } = useTranslation();
  return (
    <ButtonGroupContainer height="60px" width="100%">
      <ButtonGroupItemLight
        width="98%"
        active={activeTab === 'create-collective'}
        onClick={() => setActiveTab('create-collective')}
      >
        {t('Create Team')}
      </ButtonGroupItemLight>
      <ButtonGroupItemLight
        width="98%"
        active={activeTab === 'all-collective'}
        onClick={() => setActiveTab('all-collective')}
      >
        {t('All Team')}
      </ButtonGroupItemLight>
      <ButtonGroupItemLight
        width="98%"
        active={activeTab === 'created-by-user-collective'}
        onClick={() => setActiveTab('created-by-user-collective')}
      >
        {t('Created By Me')}
      </ButtonGroupItemLight>
    </ButtonGroupContainer>
  );
};
export const CollectiveDetailsButtonGroup = ({
  activeTab,
  setActiveTab,
  isMember,
}) => {
  const { t } = useTranslation();
  return (
    <ButtonGroupContainer height="60px" width="100%">
      <ButtonGroupItemLight
        width="98%"
        active={activeTab === 'collective-collabs'}
        onClick={() => setActiveTab('collective-collabs')}
      >
        {t('Collabs')}
      </ButtonGroupItemLight>

      <ButtonGroupItemLight
        width="98%"
        active={activeTab === 'all-members'}
        onClick={() => setActiveTab('all-members')}
      >
        {t('Members')}
      </ButtonGroupItemLight>

      {!isMember && (
        <ButtonGroupItemLight
          width="98%"
          active={activeTab === 'member-invites'}
          onClick={() => setActiveTab('member-invites')}
        >
          {t('Pending')}
        </ButtonGroupItemLight>
      )}
    </ButtonGroupContainer>
  );
};

export const CollectiveDetailsButtonGroupNew = ({
  activeTab,
  setActiveTab,
  isMember,
}) => {
  const { t } = useTranslation();
  return (
    <CollectiveButtonTabBarContainer height="40px" width="100%">
      <CollectiveButtonTabBarItem
        width="98%"
        height="35px"
        active={activeTab === 'collective-collabs'}
        onClick={() => setActiveTab('collective-collabs')}
      >
        {t('Collabs')}
      </CollectiveButtonTabBarItem>

      <CollectiveButtonTabBarItem
        width="98%"
        height="35px"
        active={activeTab === 'all-members'}
        onClick={() => setActiveTab('all-members')}
      >
        {t('Members')}
      </CollectiveButtonTabBarItem>

      {!isMember && (
        <CollectiveButtonTabBarItem
          width="98%"
          height="35px"
          active={activeTab === 'member-invites'}
          onClick={() => setActiveTab('member-invites')}
        >
          {t('Pending')}
        </CollectiveButtonTabBarItem>
      )}
    </CollectiveButtonTabBarContainer>
  );
};

export const ProfileDetailsButtonGroup = ({ activeTab, setActiveTab }) => {
  const { t } = useTranslation();
  return (
    <CollectiveButtonTabBarContainer height="40px" width="100%">
      <CollectiveButtonTabBarItem
        width="98%"
        height="35px"
        active={activeTab === 'profile-collabs'}
        onClick={() => setActiveTab('profile-collabs')}
      >
        {t('Collabs')}
        <CollectiveButtonTabBarItemCounter
          active={activeTab === 'profile-collabs'}
        >
          <CollectiveButtonTabBarItemCounterText
            active={activeTab === 'profile-collabs'}
          >
            6
          </CollectiveButtonTabBarItemCounterText>
        </CollectiveButtonTabBarItemCounter>
      </CollectiveButtonTabBarItem>

      <CollectiveButtonTabBarItem
        width="98%"
        height="35px"
        active={activeTab === 'open-collabs'}
        onClick={() => setActiveTab('open-collabs')}
      >
        {t('Open Collaborations')}
        <CollectiveButtonTabBarItemCounter
          active={activeTab === 'open-collabs'}
        >
          <CollectiveButtonTabBarItemCounterText
            active={activeTab === 'open-collabs'}
          >
            3
          </CollectiveButtonTabBarItemCounterText>
        </CollectiveButtonTabBarItemCounter>
      </CollectiveButtonTabBarItem>

      <CollectiveButtonTabBarItem
        width="98%"
        height="35px"
        active={activeTab === 'collection'}
        onClick={() => setActiveTab('collection')}
      >
        {t('Collection')}
        <CollectiveButtonTabBarItemCounter active={activeTab === 'collection'}>
          <CollectiveButtonTabBarItemCounterText
            active={activeTab === 'collection'}
          >
            4
          </CollectiveButtonTabBarItemCounterText>
        </CollectiveButtonTabBarItemCounter>
      </CollectiveButtonTabBarItem>
      <CollectiveButtonTabBarItem
        width="98%"
        height="35px"
        active={activeTab === 'favorites'}
        onClick={() => setActiveTab('favorites')}
      >
        {t('Favorites')}
        <CollectiveButtonTabBarItemCounter active={activeTab === 'favorites'}>
          <CollectiveButtonTabBarItemCounterText
            active={activeTab === 'favorites'}
          >
            8
          </CollectiveButtonTabBarItemCounterText>
        </CollectiveButtonTabBarItemCounter>
      </CollectiveButtonTabBarItem>

      {/* {!isMember && ( */}
      <CollectiveButtonTabBarItem
        width="98%"
        height="35px"
        active={activeTab === 'information'}
        onClick={() => setActiveTab('information')}
      >
        {t('Information')}
      </CollectiveButtonTabBarItem>
      {/* )} */}
    </CollectiveButtonTabBarContainer>
  );
};
