import { Skeleton } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Spacer } from '../../../../Spacer';
import { CollabTileContainer } from './elements';

const ProfileCardSkeleton = () => {
  return (
    <CollabTileContainer>
      <Spacer value={2} />
      <Box sx={{ display: 'flex', width: '100%', position: 'relative' }}>
        <Skeleton variant="rounded" width="100%" height={120} />
        <Skeleton
          variant="circular"
          sx={{
            position: 'absolute',
            left: '20px',
            bottom: '-49px',
          }}
          width={80}
          height={80}
        />
      </Box>
      <Box
        sx={{
          width: '100%',
          padding: '20px',
          marginTop: '20px',
        }}
      >
        <Spacer value={32} />
        <Skeleton variant="rounded" width="30%" height={20} />
        <Spacer value={16} />
        <Skeleton variant="rounded" width="60%" height={16} />
        <Spacer value={24} />

        <Skeleton variant="rounded" width="97%" height={16} />
        <Spacer value={16} />
        <Skeleton variant="rounded" width="90%" height={16} />
        <Spacer value={24} />
        <Skeleton variant="rounded" width="100%" height={1} />
        <Spacer value={16} />
        <Skeleton variant="rounded" padding="1rem" width="20%" height={18} />
        <Spacer value={24} />
        <Box sx={{ display: 'flex', width: '100%' }}>
          <Skeleton variant="rounded" width="30%" height={28} />
          <Skeleton
            sx={{ marginLeft: '10px' }}
            variant="rounded"
            width="30%"
            height={28}
          />
          <Skeleton
            sx={{ marginLeft: '10px' }}
            variant="rounded"
            width="30%"
            height={28}
          />
        </Box>
        <Spacer value={24} />
        <Skeleton variant="rounded" width="100%" height={1} />
        <Spacer value={32} />
        <Skeleton variant="rounded" width="100%" height={35} />
      </Box>
    </CollabTileContainer>
  );
};

export default ProfileCardSkeleton;
