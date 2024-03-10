import { LoadingMoreContainer, LoadingMoreText } from './elements';
import { LoadMore } from '../Loading';
import { Box } from '@mui/material';

export const LoadingMore = ({ text }) => {
  return (
    <Box position='relative'>
      <LoadingMoreContainer>
        <LoadingMoreText>{text ?? <LoadMore />}</LoadingMoreText>
      </LoadingMoreContainer>
    </Box>
  );
};
