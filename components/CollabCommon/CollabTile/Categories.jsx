import React from 'react';
import { Box } from '@mui/material';
import { DotWrap, FlexContainer, RoleText } from 'components/CollabCommon/CollabTile/elements';
import { useHideDot } from 'hooks/useHideDot';

const Categories = ({platformType, isHovered}) => {
  const { containerRef } = useHideDot(platformType)
  return (
    <FlexContainer ref={containerRef}>
      {platformType &&
        platformType.slice(0, 6).map((category, index) => (
          <Box key={index} display="flex" alignItems="center">
            <RoleText hovered={isHovered}>
              {category}
            </RoleText>
            {index !== platformType.length - 1 && (
              <DotWrap hovered={isHovered}>
                •
              </DotWrap>
            )}
          </Box>
        ))}
    </FlexContainer>
  );
};

export default Categories;