import React from 'react';
import { Box } from '@mui/material';
import { DotWrap, FlexContainer, RoleText } from 'components/CollabCommon/CollabTile/elements';
import { useHideDot } from 'hooks/useHideDot';

const Tags = ({tags, isHovered}) => {
  const { containerRef } = useHideDot(tags)
  return (
    <FlexContainer ref={containerRef}>
      {tags &&
        tags.slice(0, 6).map((tag, index) => (
          <Box key={index} display="flex" alignItems="center">
            <RoleText hovered={isHovered}>
              {tag}
            </RoleText>
            {index !== tags.length - 1 && (
              <DotWrap hovered={isHovered}>
                •
              </DotWrap>
            )}
          </Box>
        ))}
    </FlexContainer>
  );
};

export default Tags;