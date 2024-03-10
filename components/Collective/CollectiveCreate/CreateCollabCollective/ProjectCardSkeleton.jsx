import React from 'react';
import { Skeleton } from '@mui/material';
import { Spacer } from '~/components';
import {ProjectSkeletonContainer} from './elements'

export const ProjectCardSkeleton = ({key}) => (
  <ProjectSkeletonContainer key={key}>
    <Spacer value={16} />
    <Skeleton variant="rectangular" width="90%" height={300} />
    <Spacer value={16} />
    <Skeleton variant="rectangular" width="90%" height={20} />
    <Spacer value={16} />
    <Skeleton variant="rectangular" width="90%" height={40} />
  </ProjectSkeletonContainer>
);
