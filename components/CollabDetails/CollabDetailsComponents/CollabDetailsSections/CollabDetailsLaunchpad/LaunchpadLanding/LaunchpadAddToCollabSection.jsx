import { LandingCardsGrid } from './elements';
import { DividingHeaderRow } from './DividingHeaderRow';
import { LaunchpadLandingCard } from './LaunchpadLandingCard';
import { useCollabNavigator } from '~/hooks';
import { AddSocialHighlightsDrawer } from '../../../../../Drawer/AddSocialHighlightDrawer';
import { useState } from 'react';

export const LaunchpadAddToCollabSection = ({
  collabDetails,
  setCollabDetails,
}) => {
  const addToCollabNavigator = useCollabNavigator();
  const [addSocialHighlightOpen, setAddSocialHighlightOpen] = useState(false);

  return (
    <>
      <DividingHeaderRow title="Add to your Collab" />

      <AddSocialHighlightsDrawer
        open={addSocialHighlightOpen}
        toggleDrawer={() =>
          setAddSocialHighlightOpen((prevState) => !prevState)
        }
        collabDetails={collabDetails}
        setCollabDetails={setCollabDetails}
      />

      <LandingCardsGrid>
        <LaunchpadLandingCard
          onClick={() =>
            addToCollabNavigator(collabDetails?.identifier, 'mission')
          }
          mainText="Add New"
          subText="MISSION"
        />

        <LaunchpadLandingCard
          // onClick={() => handleAddNewClick('event')}
          onClick={() =>
            addToCollabNavigator(collabDetails?.identifier, 'event')
          }
          mainText="Add New"
          subText="EVENT"
        />

        <LaunchpadLandingCard
          // onClick={() => handleAddNewClick('work')}
          onClick={() =>
            addToCollabNavigator(collabDetails?.identifier, 'work')
          }
          mainText="Add New"
          subText="Work"
        />

        <LaunchpadLandingCard
          // onClick={() => handleAddNewClick('bts')}
          onClick={() => addToCollabNavigator(collabDetails?.identifier, 'bts')}
          mainText="Add New"
          subText="Behind-the-Scenes"
        />

        <LaunchpadLandingCard
          onClick={() => setAddSocialHighlightOpen(true)}
          mainText="Add New"
          subText="Social-Highlight"
        />
      </LandingCardsGrid>
    </>
  );
};
