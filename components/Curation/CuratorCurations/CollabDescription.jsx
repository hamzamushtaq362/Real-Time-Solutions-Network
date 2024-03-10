import { Box } from '@mui/material';
import {
  CollabDescriptionContainer,
  CollabDescriptionSubContainer,
  CollabTitle,
  CollabDescriptionText,
} from './elements';
import { Avatar, Tooltip } from '~/components';
import { truncateString } from '~/utils';
import { useRouter } from 'next/router';
import { COLLAB_DEFAULT_IMAGE } from '~/constants';

export const CollabDescription = ({ collabDetails }) => {
  const router = useRouter();

  return (
    <CollabDescriptionContainer>
      <Avatar
        avatar={collabDetails?.image || COLLAB_DEFAULT_IMAGE}
        size="56px"
        sx={{ cursor: 'pointer' }}
        onClick={() => router.push(`/collab/${collabDetails?.identifier}`)}
      />

      <CollabDescriptionSubContainer>
        <CollabTitle>{collabDetails?.title}</CollabTitle>

        <Tooltip title={collabDetails?.description}>
          <Box>
            <CollabDescriptionText>
              {truncateString(collabDetails?.description, 150)}
            </CollabDescriptionText>
          </Box>
        </Tooltip>
      </CollabDescriptionSubContainer>
    </CollabDescriptionContainer>
  );
};
