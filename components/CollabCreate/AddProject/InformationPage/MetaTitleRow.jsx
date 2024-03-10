import React, { useState } from 'react';
import {
  FeaturedActionsWrap,
  LinkText,
  MetaTitleRowWrap,
} from 'components/CollabCreate/AddProject/elements';
import { Box, useTheme } from '@mui/material';
import { EditIcon } from '~/components';
import CloseIcon from 'components/Icons/CloseIcon';

const MetaTitleRow = ({ metaTitle, url, watch, index, update, remove }) => {
  const theme = useTheme();
  const [hovered, setHovered] = useState('');

  const handleLinkClick = (url) => {
    if (typeof window !== 'undefined') {
      window.open(url);
    }
  };

  return (
    <MetaTitleRowWrap
      onMouseEnter={() => setHovered('row')}
      onMouseLeave={() => setHovered('')}
    >
      <LinkText ml={1} onClick={() => handleLinkClick(url)}>
        <Box>{metaTitle} ↗</Box>
      </LinkText>
      <FeaturedActionsWrap hovered={hovered}>
        <Box
          onMouseEnter={() => setHovered('edit')}
          onMouseLeave={() => setHovered('')}
          onClick={() =>
            update(index, {
              ...watch(`featuredIn[${index}]`),
              metaTitle: '',
              showAddBtn: true,
            })
          }
          mr={0.5}
          sx={{ cursor: 'pointer' }}
        >
          <EditIcon
            width={18}
            height={18}
            color={hovered === 'edit' ? theme.palette.text.primary : '#C2C2C2'}
          />
        </Box>
        <Box
          onMouseEnter={() => setHovered('close')}
          onMouseLeave={() => setHovered('')}
          onClick={() => remove(index)}
          sx={{ cursor: 'pointer' }}
        >
          <CloseIcon
            width={26}
            height={26}
            color={hovered === 'close' ? theme.palette.text.primary : '#C2C2C2'}
          />
        </Box>
      </FeaturedActionsWrap>
    </MetaTitleRowWrap>
  );
};

export default MetaTitleRow;
