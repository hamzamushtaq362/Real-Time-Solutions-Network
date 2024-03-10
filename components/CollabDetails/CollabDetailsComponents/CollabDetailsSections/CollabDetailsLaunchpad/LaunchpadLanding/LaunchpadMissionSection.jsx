import { DividingHeaderRow } from './DividingHeaderRow';
import { MissionCard, MissionCardSkeleton } from '../MissionSection';
import { MissionsGrid } from './elements';
import { useState, useEffect } from 'react';

import { fetchCollabMissions } from '~/apis';

export const LaunchpadMissionSection = ({ collabId, setCurrentView }) => {
  const [missions, setMissions] = useState([]);

  const [missionsLoading, setMissionsLoading] = useState(false);

  const getCollabMissions = async (collabId) => {
    try {
      setMissionsLoading(true);
      const response = await fetchCollabMissions(collabId);

      if (response.data.status === 'success') {
        const missions = response.data.missions;
        setMissions(missions);
      }
      setMissionsLoading(false);
    } catch {
      setMissionsLoading(false);
    }
  };

  useEffect(() => {
    if (collabId) {
      getCollabMissions(collabId);
    }
  }, [collabId]);

  return (
    <>
      <DividingHeaderRow title="Missions" />

      {missionsLoading ? (
        <MissionsGrid>
          <MissionCardSkeleton />
          <MissionCardSkeleton />
        </MissionsGrid>
      ) : (
        <MissionsGrid>
          {missions?.length > 0 ? (
            missions.map((mission) => (
              <MissionCard
                onClick={() => setCurrentView('mission-section')}
                key={mission._id}
                mission={mission}
              />
            ))
          ) : (
            <></>
          )}
        </MissionsGrid>
      )}
    </>
  );
};
