import React from 'react';
import { Skeleton, Box } from '@mui/material';
import { Spacer } from '../../Spacer';
import { CollabTileContainer } from './elements';
import { FlexBox } from 'components/common/elements';

export const CollabTileSkeleton = ({isTemplate, ...rest}) => {
  return (
    <CollabTileContainer {...rest}>
      <Spacer value={2} />
      <FlexBox alignItems='flex-start' justifyContent='space-between' width='100%'>
        <Box flex={1}>
          <Skeleton variant="text" width={60} height={30} />
          <Spacer value={8} />
          <Skeleton variant="text" width="90%" height={30} />
        </Box>
        {!isTemplate && <Skeleton variant='circular' width={30} height={30} />}
      </FlexBox>
      <Spacer value={86} />
      <Skeleton variant="text" width={60} height={30} />
      <Spacer value={8} />
      <Skeleton variant="text" width="100%" height={30} />
      <Spacer value={124} />
      {isTemplate ?
        <>
          <Skeleton variant="text" width={60} height={30} />
          <Spacer value={8} />
          <Skeleton variant="text" width="100%" height={30} />
        </> :
        <FlexBox width='100%'>
          <Skeleton variant='circular' width={40} height={40} />
          <Box ml={2}>
            <Skeleton variant='text' width={100} height={20} />
            <Spacer value={8} />
            <Skeleton variant='text' width={70} height={20} />
          </Box>
        </FlexBox>
      }
    </CollabTileContainer>
  );
};
