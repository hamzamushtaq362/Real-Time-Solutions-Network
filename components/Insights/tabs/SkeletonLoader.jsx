import { Box, Skeleton,styled } from '@mui/material';
import React from 'react';


const SkeletonContainer = styled(Box)({
  width: '100%',
  position: 'relative',
  height: '230px',
  marginTop: '40px',

  '& .MuiSkeleton-rounded': {
    borderRadius: '12px',
  },
});

export default function SkeletonLoader({ width, height, margin }) {
  return (
    <SkeletonContainer>
      <Skeleton
        style={{
          margin: margin ? margin : '4rem 0 4rem 1.5rem',
        }}
        width={width || '94%'}
        variant="rounded"
        height={height || 230}
      />
    </SkeletonContainer>
  );
}
