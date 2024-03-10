import React, { Fragment } from 'react';
import { ImagePanelCardContainer } from './elements';
import { Spacer } from '~/components';
import { Skeleton, Box } from '@mui/material';

export const ImagePanelCardSkeleton = ({ key }) => (
  <ImagePanelCardContainer key={key}>
    <Skeleton variant="rectangular" width="100%" height={310} />
    <Spacer value={8} />
    <Skeleton variant="rectangular" width="90%" height={30} />
    <Spacer value={8} />
    <Box sx={{ display: 'flex', width: '90%' }}>
      {[...Array(3)].map((index) => (
        <Fragment key={index}>
          <Skeleton variant="circular" width={40} height={40} />
          <Spacer value={10} type="horizontal" />
        </Fragment>
      ))}
    </Box>
  </ImagePanelCardContainer>
);
export const ImagePanelWorkCardSkeleton = ({ key }) => (
  <ImagePanelCardContainer key={key}>
    <Skeleton variant="rectangular" width="100%" height={280} />
    {/* <Spacer value={8} /> */}
    {/* <Skeleton variant="rectangular" width="90%" height={20} />
    <Spacer value={8} />
    <Skeleton variant="rectangular" width="90%" height={40} />
    <Spacer value={8} />
    <Skeleton variant="rectangular" width="90%" height={50} />
    <Spacer value={8} />
    <Box sx={{ display: 'flex', width: '90%' }}>
      {[...Array(3)].map((index) => (
        <Fragment key={index}>
          <Skeleton variant="circular" width={40} height={40} />
          <Spacer value={10} type="horizontal" />
        </Fragment>
      ))}
    </Box> */}
  </ImagePanelCardContainer>
);

export const CollaboratorsCardSkeleton = ({ key }) => (
  <ImagePanelCardContainer key={key}>
    <Skeleton variant="rectangular" width="100%" height={270} />
    <Spacer value={8} />
    <Box sx={{width: '98%'}}>
      <Skeleton variant="rounded" width="90%" height={30} />
      <Spacer value={8} />
      <Skeleton variant="rounded" width="60%" height={20} />
    </Box>
  </ImagePanelCardContainer>
);
