import React from 'react';
import { NFTTileContainer } from './elements';
import { Spacer } from '../Spacer';
import { Skeleton, Box } from '@mui/material';
import { FlexBox } from 'components/common/elements';

export const NFTTileSkeleton = ({ key }) => (
  <NFTTileContainer key={key} sx={{ width: '100%' }}>
    <Spacer value={20} />
    <Skeleton variant="rectangular" width="90%" height={300} />
    <Spacer value={32} />
    <FlexBox width="100%" ml={4}>
      <Skeleton variant="circular" width={40} height={40} />
      <Box ml={2}>
        <Skeleton variant="rounded" width={100} height={20} />
        <Spacer value={8} />
        <Skeleton variant="rounded" width={70} height={20} />
      </Box>
    </FlexBox>
    <Spacer value={24} />
    <Box mx={4} width="90%">
      <Skeleton variant="text" width="100%" height={20} />
      <Skeleton variant="text" width="100%" height={20} />
    </Box>
  </NFTTileContainer>
);
