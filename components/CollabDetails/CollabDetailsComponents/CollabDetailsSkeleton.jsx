import React from 'react';
import { Spacer } from '~/components';
import { CollabDetailsContainer } from './elements';
import { Stack, Skeleton } from '@mui/material';

export const CollabDetailsSkeleton = () => (
  <CollabDetailsContainer>
    <Stack spacing={2}>
      <Spacer value={32} />
      <Skeleton variant="rounded" width="50%" height={40} />

      <Skeleton variant="rounded" width="75%" height={300} />

      <Spacer value={24} />
      <Skeleton variant="rounded" width="50%" height={80} />

      <Stack direction="row" spacing={2}>
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="circular" width={40} height={40} />
      </Stack>

      <Skeleton variant="rounded" width="30%" height={30} />
      <Skeleton variant="rounded" width="50%" height={30} />
      <Skeleton variant="rounded" width="20%" height={30} />

      <Skeleton variant="rounded" width="60%" height={50} />

      <Skeleton variant="rounded" width="60%" height={50} />
    </Stack>
  </CollabDetailsContainer>
);
