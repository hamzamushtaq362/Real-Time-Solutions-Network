import { DividingHeaderRow } from './DividingHeaderRow';
import { Spacer } from '~/components';
import { Box } from '@mui/material';
import { BTSSection } from '../BTSSection';

export const LaunchpadBTSSection = ({ collabId, collabIdentifier }) => {
  return (
    <>
      <DividingHeaderRow title="BTS" />
      <Spacer value={30} />

      <Box px={3}>
        <BTSSection
          hideAddWorkPlaceholder
          collabId={collabId}
          collabIdentifier={collabIdentifier}
        />
      </Box>
    </>
  );
};
