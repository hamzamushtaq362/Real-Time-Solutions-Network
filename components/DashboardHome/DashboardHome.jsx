import React, { useEffect, useContext } from 'react';
import { DashboardContentContainer } from './elements';
import { Welcome } from './Welcome';
import { useIntercom } from 'react-use-intercom';
import TrendingCollabs from './TrendingCollabs';
import Templates from 'components/DashboardHome/Templates';
import GetInspired from 'components/DashboardHome/GetInspired';
import AppContext from 'context/AppContext';

import SearchCollabs from 'components/DashboardHome/SearchCollabs';

export const DashboardHome = () => {
  const { update: updateIntercom } = useIntercom();
  const { user } = useContext(AppContext);

  useEffect(() => {
    if (user) {
      updateIntercom({
        name: user?.fullName || user?.username || 'No name',
        email: user?.email || 'noemailfound@email.com',
        userId: user?.userId || 'No User ID',
        avatar: { type: 'avatar', image_url: user?.imageUrl },
      });
    }
  }, [user]);

  return (
    <>
      <DashboardContentContainer>
        {user ? <Welcome /> : <SearchCollabs />}

        <TrendingCollabs />

        <GetInspired />

        <Templates />
      </DashboardContentContainer>
    </>
  );
};
