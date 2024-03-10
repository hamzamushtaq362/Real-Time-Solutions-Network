import React from 'react';
import { ProfileTopSectionContainer } from './elements';
import { Spacer } from '~/components';
import { Skeleton, Box } from '@mui/material';

export const CreatorProfileCardSkeleton = ({ sx }) => {
  return (
    <Box sx={sx} width={300} height={300}>
      <ProfileTopSectionContainer>
        <Skeleton variant="rectangular" width="100%" height={230} />

        <Spacer value={16} />

        <Skeleton variant="rounded" width={150} height={30} />
        <Spacer value={8} />
        <Skeleton variant="rounded" width={100} height={20} />
      </ProfileTopSectionContainer>
    </Box>
  );
};
