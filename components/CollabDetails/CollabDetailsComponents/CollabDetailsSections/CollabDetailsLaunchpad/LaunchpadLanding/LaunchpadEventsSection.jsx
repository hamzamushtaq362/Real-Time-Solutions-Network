import { DividingHeaderRow } from './DividingHeaderRow';
import { EventsSection } from '../EventsSection/EventsSection';
import { Spacer } from '~/components';
import { Box } from '@mui/material';

export const LaunchpadEventsSection = ({
  collabId,
  collabIdentifier,
  isLoginUserCoCreatorOfCollab,
}) => {
  return (
    <>
      <DividingHeaderRow title="Events" />
      <Spacer value={26} />

      <Box px={3}>
        <EventsSection
          collabId={collabId}
          collabIdentifier={collabIdentifier}
          isLoginUserCoCreatorOfCollab={isLoginUserCoCreatorOfCollab}
          hideAddPlaceholder
          loadingEventsCount={3}
        />
      </Box>
    </>
  );
};
