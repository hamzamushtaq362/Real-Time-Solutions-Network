import { CollabEventTile } from './CollabEventTile';
import { EventsGridContainer } from './elements';

export const CollabEventsLoadingGrid = () => {
  return (
    <EventsGridContainer>
      {[...Array(12)].map((_, index) => (
        <CollabEventTile key={index} isLoading />
      ))}
    </EventsGridContainer>
  );
};
