import { Skeleton, Box } from '@mui/material';
import { SkeletonContainer, AvatarSkeleton } from './elements';
import { Spacer } from '../../Spacer';
import { CollabsExploreContainerGrid } from 'components/CollabsExplore/elements';

export const ProfilePageSkeleton = () => {
  return (
    <SkeletonContainer>
      <Skeleton width="100%" variant="rounded" height={220} />
      <AvatarSkeleton variant="circular" width={130} height={130} />
      <Spacer value={24} />

      <Box
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box sx={{ width: '50%' }}>
          <Skeleton width="90%" height={50} />
          <Skeleton width="100%" height={40} />
        </Box>

        <Skeleton width="40%" height={200} />
      </Box>

      <Skeleton width="20%" height={30} />
      <Skeleton width="80%" height={200} />
    </SkeletonContainer>
  );
};

export const CardSkeleton = () => (
  <div>
    <Skeleton variant="rounded" width="100%" height={200} />
    <Spacer value={32} />
    <Skeleton variant="rounded" width="70%" height={50} />
    <Spacer value={32} />
    <Skeleton variant="rounded" width="100%" height={80} />
    <Spacer value={32} />
    <Skeleton variant="rounded" width="20%" height={20} />
    <Spacer value={150} />
  </div>
);

export const CollectionLoadingSkeleton = () => {
  return (
    <CollabsExploreContainerGrid>
      {[...Array(20)].map((index) => (
        <Box key={index}>
          <CardSkeleton />
        </Box>
      ))}
    </CollabsExploreContainerGrid>
  );
};
