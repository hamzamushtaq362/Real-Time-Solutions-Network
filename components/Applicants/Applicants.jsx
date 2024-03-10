import React, { useContext, useState } from 'react';
import { CollabsExploreContainer } from './elements';
import { CollabInvites, NavButtonGroup, SelectCollabType } from '~/components';
import { CollabExploreTopSection } from './CollabExploreTopSection';
import {
  ExploreAllCollabs,
  ExploreMyCollabs,
  ExploreJoinedCollabs,
  ExploreArchivedCollabs,
  ExploreAllCollabsWithCollaborators,
} from './CollabsExploreSection';

import { CreatorProfileFavouriteCollabsSection } from './CreatorProfileFavouriteCollabsSection';
import AppContext from 'context/AppContext';

export const Applicants = () => {
  const [activeTab, setActiveTab] = useState('applicants');

  const { user } = useContext(AppContext);
  const isProfileComplete = user.isProfileComplete;

  const buttonsData = [
    {
      text: 'Applicants',
      value: 'applicants',
    },
    {
      text: 'Curators',
      value: 'curators',
    },
    {
      text: 'Members',
      value: 'members',
    },
    {
      text: 'Invites',
      value: 'invites',
    },
  ];

  return (
    <>
      <CollabExploreTopSection />

      <NavButtonGroup
        buttonsData={buttonsData}
        activeButton={activeTab}
        setActiveButton={setActiveTab}
        sx={{padding: '25px 30px'}}
      />

      <CollabsExploreContainer
        sx={{ padding: isProfileComplete ? '0 30px' : '0 30px 50px' }}
      >
        {/* Main Content Starts */}

        {activeTab === 'all' && <ExploreAllCollabs />}

        {activeTab === 'created' && <ExploreMyCollabs />}

        {activeTab === 'joined' && <ExploreJoinedCollabs />}

        {activeTab === 'invites' && <CollabInvites explore />}

        {activeTab === 'archive' && <ExploreArchivedCollabs />}

        {activeTab === 'liked' && <CreatorProfileFavouriteCollabsSection />}

        {activeTab === 'with-collaborators' && (
          <ExploreAllCollabsWithCollaborators />
        )}

        {/* Main Content Ends */}
        <SelectCollabType />
      </CollabsExploreContainer>
    </>
  );
};
