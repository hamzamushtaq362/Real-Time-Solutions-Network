import React from 'react';
import { CollabTile } from '~/components';
import { GridContainer } from 'components/common/elements';

export const CollabsLoadingGrid = () => {
  return (
    <GridContainer>
      {[...Array(40)].map((index) => (
        <CollabTile key={index} isLoading={true} sx={{ width: '100%' }} />
      ))}
    </GridContainer>
  );
};
