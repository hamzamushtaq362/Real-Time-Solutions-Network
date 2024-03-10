import { React } from 'react';
import { Skeleton } from '@mui/material';
import { Spacer } from '../Spacer';
import { NameAvatarContainer } from './elements';

export const NameAvatarDescriptionSkeleton = () => {
  return (
    <NameAvatarContainer>
      <Skeleton variant="circular" width={50} height={50} />
      <Spacer value={10} type="horizontal" />
      <Skeleton variant="rounded" width={160} height={46} />
    </NameAvatarContainer>
  );
};
