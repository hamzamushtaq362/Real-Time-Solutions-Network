import React from 'react';
import { Box, useTheme } from '@mui/material';
import { Avatar } from '~/components';
import {
  UserFullName,
  RenderItemText,
} from 'components/CollabCreate/AddProject/elements';
import { AvatarSampleImage2 } from '~/assets';
import { RenderItemContainer } from 'components/Collective/CollectiveCreate/elements';
import { FlexBox } from 'components/common/elements';
import DropdownEmailAvatar from 'components/Dropdown/DropdownEmailAvatar';

export const DropdownUser = ({ props, option, twitterDropdown }) => {
  const [hovered, setHovered] = React.useState(false);
  const theme = useTheme();

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);

  const renderTwitterDropdown = () => (
    <>
      <FlexBox mr={1} justifyContent="center" alignItems={'center'} gap="7px">
        <Avatar
          size={28}
          avatar={!option.input && (option.image || AvatarSampleImage2.src)}
          filledColor={
            !option.input
              ? 'transparent'
              : hovered
              ? theme.palette.background.paper
              : theme.palette.background.inverse
          }
          ringColor={option.input && 'transparent'}
        />
        <UserFullName>{option.fullName}</UserFullName>
        <RenderItemText>@{option.twitter}</RenderItemText>
      </FlexBox>
    </>
  );

  const renderDefaultDropdown = () => (
    <>
      <FlexBox mr={1} justifyContent="center">
        <Avatar
          size={28}
          avatar={
            !option.input ? (
              option.image || AvatarSampleImage2.src
            ) : (
              <DropdownEmailAvatar />
            )
          }
          showRing={true}
          filledColor={
            !option.input
              ? 'transparent'
              : hovered
              ? theme.palette.background.paper
              : theme.palette.background.inverse
          }
          ringColor={option.input && 'transparent'}
        />
      </FlexBox>
      <Box display="flex" flexDirection="column">
        <UserFullName>{option.fullName}</UserFullName>
        <RenderItemText>{option.label || option}</RenderItemText>
      </Box>
    </>
  );

  return (
    <RenderItemContainer
      {...props}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {twitterDropdown ? renderTwitterDropdown() : renderDefaultDropdown()}
    </RenderItemContainer>
  );
};
