import React, { useState, useEffect, useContext } from 'react';
import { CollabsExploreContainer } from './elements';
import { CollabInvites, SelectCollabType } from '~/components';
import { trackMixPanel } from '~/utils';

import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import {
  ExploreAllCollabs,
  ExploreMyCollabs,
  ExploreJoinedCollabs,
  ExploreArchivedCollabs,
  ExploreAllCollabsWithCollaborators,
} from './CollabsExploreSection';

import { CreatorProfileFavouriteCollabsSection } from './CreatorProfileFavouriteCollabsSection';
import { setCurrentDialog } from '~/redux';
import AppContext from 'context/AppContext';
import { SecondaryNavbar } from 'components/SecondaryNavbar';
import useFetchArchivedCollabs from '../../hooks/useFetchArchivedCollabs';

export const CollabExplore = () => {
  const router = useRouter(); // Dynamic routes
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const archivedCollabsProps = useFetchArchivedCollabs();

  const [activeTab, setActiveTab] = useState('all');
  const { user } = useContext(AppContext);
  const isProfileComplete = user?.isProfileComplete;

  useEffect(() => {
    trackMixPanel('Collabs_Explore_Page');
  }, [router?.query]);

  useEffect(() => {
    if (!router?.query?.view) {
      setActiveTab('all');
    }
  }, [router]);

  const buttonsData = [
    {
      text: t('All'),
      value: 'all',
      hide: !user,
    },
    {
      text: t('Created'),
      value: 'created',
      hide: !user,
    },
    {
      text: t('Joined'),
      value: 'joined',
      hide: !user,
    },
    // {
    //   text: 'Invites',
    //   value: 'invites',
    // },
    {
      text: 'Archive',
      value: 'archive',
      hide: archivedCollabsProps?.collabs?.length === 0 || !user,
    },
    {
      text: t('Liked'),
      value: 'liked',
      hide: !user,
    },
    // {
    //   text: 'With Collaborators',
    //   value: 'with-collaborators',
    // },
  ];

  return (
    <>
      <SecondaryNavbar
        title={t('Collabs')}
        tabsData={buttonsData}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        showRightButton={!!user}
        rightButtonText={t('Create Collab')}
        onClickRightButton={() =>
          dispatch(setCurrentDialog('select-collab-type-dialog'))
        }
        buttonWidth={100}
      />
      <CollabsExploreContainer
        sx={{ padding: isProfileComplete ? '0 30px' : '0 30px 50px' }}
      >
        {/* Main Content Starts */}

        {activeTab === 'all' && <ExploreAllCollabs />}

        {activeTab === 'created' && user && <ExploreMyCollabs />}

        {activeTab === 'joined' && user && (
          <ExploreJoinedCollabs setActiveTab={setActiveTab} />
        )}

        {activeTab === 'invites' && user && <CollabInvites explore />}

        {activeTab === 'archive' && user && (
          <ExploreArchivedCollabs {...archivedCollabsProps} />
        )}

        {activeTab === 'liked' && user && (
          <CreatorProfileFavouriteCollabsSection setActiveTab={setActiveTab} />
        )}

        {activeTab === 'with-collaborators' && (
          <ExploreAllCollabsWithCollaborators />
        )}

        {/* Main Content Ends */}
        <SelectCollabType />
      </CollabsExploreContainer>
    </>
  );
};
