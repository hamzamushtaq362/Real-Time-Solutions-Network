import { Skeleton } from '@mui/material';
import {
  SkeletonContainer,
  AvatarSkeleton,
  SkeletonIntroContainer,
} from './elements';
import { Spacer } from '~/components';
import { CollabTileSkeleton } from 'components/CollabCommon/CollabTile/CollabTileSkeleton';
import React from 'react';
import { FlexBox, GridContainer } from 'components/common/elements';

export const CreatorProfilePageSkeleton = () => {
  return (
    <SkeletonContainer>
      <Skeleton width="100%" variant="rounded" height={240} />
      <AvatarSkeleton variant="circular" width={200} height={200} />
      <SkeletonIntroContainer>
        <Skeleton variant="text" width={170} height={40} />
        <Skeleton variant="text" width={140} height={20} />
        <Skeleton variant="text" width={130} height={20} />
        <FlexBox mt={1}>
          <Skeleton variant="rounded" width={90} height={40} sx={{borderRadius: 100, marginRight: 1}} />
          <Skeleton variant="rounded" width={120} height={40} sx={{borderRadius: 100, marginRight: 1}} />
          <Skeleton variant="circular" width={40} height={40} sx={{marginRight: 1}} />
          <Skeleton variant="circular" width={40} height={40} sx={{marginRight: 1}} />
        </FlexBox>
      </SkeletonIntroContainer>

      <Skeleton width="100%" height={120} />
      <GridContainer sx={{ padding: '32px' }}>
        <CollabTileSkeleton sx={{ width: '100%' }} />
        <CollabTileSkeleton sx={{ width: '100%' }} />
        <CollabTileSkeleton sx={{ width: '100%' }} />
        <CollabTileSkeleton sx={{ width: '100%' }} />
      </GridContainer>
    </SkeletonContainer>
  );
};
