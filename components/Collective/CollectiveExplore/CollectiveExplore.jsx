import { useTranslation } from 'react-i18next';
import { getCollectiveExploreSubNav } from 'constants/navSections';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { TileAddPlaceholder, CollectiveCard } from '~/components';
import { CollectiveExplorePageContainer } from './elements';
import { setNavActions } from '~/redux';
import { getCollectivesByType } from 'apis/collective';
import { useRouter } from 'next/router';
import { NavButtonGroup } from '~/components';
import { GridContainer } from 'components/common/elements';
import { SectionTitle } from 'components/UserSettings/elements';
import { SecondarybarHeader } from 'components/SecondaryNavbar/elements';
import { useProtectedAction } from '~/hooks';

const buttonsData = [
  {
    text: 'All',
    value: 'all',
  },
  {
    text: 'Created',
    value: 'created',
  },
  {
    text: 'Joined',
    value: 'joined',
  },
  {
    text: 'Invites',
    value: 'pending',
  },
];

export const CollectiveExplore = () => {
  const router = useRouter(); // Dynamic routes
  const { t } = useTranslation();

  const loggedInUser = JSON.parse(localStorage.getItem('auth'));
  const [activeCollectives, setActiveCollectives] = useState([]);
  const [showSkeleton, setShowSkeleton] = useState(false);

  /*-------------Setting current tab code-------------*/
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    dispatch(setNavActions(getCollectiveExploreSubNav().actions));
    if (router?.query?.view) {
      setActiveTab(router?.query?.view);
    }
  }, [router?.query]);

  const getData = async () => {
    setShowSkeleton(true);
    const collectives = await getCollectivesByType(
      loggedInUser?.userId,
      activeTab,
    );

    if (collectives) {
      setActiveCollectives(collectives);
    }
    setShowSkeleton(false);
  };

  useEffect(() => {
    getData();
  }, [activeTab]);

  const handleAddTeamTile = useProtectedAction(() => {
    router.push('/team/create');
  });

  return (
    <>
      <SecondarybarHeader>
        <SectionTitle>{t('Teams')}</SectionTitle>
        <NavButtonGroup
          buttonsData={buttonsData}
          activeButton={activeTab}
          setActiveButton={setActiveTab}
          showRightButton
          rightButtonText={t('Create Team')}
          onClickRightButton={handleAddTeamTile}
          buttonWidth={95}
        />
      </SecondarybarHeader>
      <CollectiveExplorePageContainer>
        {!showSkeleton ? (
          <>
            <GridContainer>
              <TileAddPlaceholder
                onClick={handleAddTeamTile}
                cardTitle={t('Add Team')}
                sx={{ width: '100% !important', margin: '0 !important' }}
                minHeight={550}
              />
              {activeCollectives &&
                activeCollectives.map((collective, index) => (
                  <CollectiveCard
                    key={index}
                    collective={collective}
                    projectCount={collective.projects.length}
                  />
                ))}
            </GridContainer>
          </>
        ) : (
          <GridContainer>
            {[...Array(8)].map((index) => (
              <CollectiveCard key={index} skeleton={true} />
            ))}
          </GridContainer>
        )}
      </CollectiveExplorePageContainer>
    </>
  );
};
