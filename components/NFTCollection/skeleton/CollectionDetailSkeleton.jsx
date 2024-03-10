import { Box, Skeleton } from '@mui/material';
import { Spacer } from 'components/Spacer';
import { SkeletonContainer } from 'components/UserProfile/elements';
import React from 'react';

export default function CollectionDetailSkeleton() {
  return (
    <SkeletonContainer>
      <div style={{ display: 'flex', gap: '2rem', padding: '2rem' }}>
        <Skeleton width="50%" variant="rounded" height={420} />
        <div style={{ minWidth: '50%' }}>
          <Skeleton width="40%" variant="rounded" height={80} />
          <Spacer value={32} />
          <Skeleton width="100%" variant="rounded" height={150} />
          <Spacer value={32} />
          <Skeleton width="70%" variant="rounded" height={50} />
        </div>
      </div>
      <Spacer value={32} />

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
}
