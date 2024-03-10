import { DividingHeaderRow } from './DividingHeaderRow';
import { WorksSection } from '../WorksSection/WorksSection';
import { Spacer } from '~/components';
import { Box } from '@mui/material';

export const LaunchpadWorksSection = ({ collabId, collabIdentifier }) => {
  return (
    <>
      <DividingHeaderRow title="Works" />
      <Spacer value={30} />

      <Box px={3}>
        <WorksSection
          hideAddWorkPlaceholder
          collabId={collabId}
          collabIdentifier={collabIdentifier}
        />
      </Box>
    </>
  );
};
