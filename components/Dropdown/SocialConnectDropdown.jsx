import * as React from 'react';
import { Box } from '@mui/material';
import { StyledMenu, SocialMenuItemContainer } from './elements';
import { ImageIcon, SecondaryLevelButton } from '~/components';

import { getDropdownPaperProps } from './DropdownPaperProps';
import { useIntercom } from 'react-use-intercom';
import { DiscordIcon } from '~/assets';
import { UilTwitter, UilDribbble, UilPlus } from '@iconscout/react-unicons';
import { useTheme } from '@mui/material';

export const SocialConnectDropdown = ({
  discordConnected,
  dribbbleConnected,
  onDiscordClick,
  onTwitterClick,
  onDribbbleClick,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const { hide } = useIntercom();
  const theme = useTheme();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    hide();
  };

  const handleItemClick = (platform) => {
    switch (platform) {
      case 'twitter':
        onTwitterClick();
        break;
      case 'discord':
        onDiscordClick();
        break;
      case 'dribbble':
        onDribbbleClick();
        break;
      default:
        break;
    }
    handleClose();
  };

  return (
    <React.Fragment>
      <Box onClick={handleClick} sx={{ cursor: 'pointer' }}>
        <SecondaryLevelButton>
          <UilPlus size={16} />
          <span style={{ marginTop: '2px' }}>Connect Additional Accounts </span>
        </SecondaryLevelButton>
      </Box>
      <StyledMenu
        width="240px"
        padding="0px"
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        disableScrollLock={false}
        PaperProps={getDropdownPaperProps(theme)}
        transformOrigin={{ horizontal: 'bottom', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'bottom', vertical: 'bottom' }}
      >
        <SocialMenuItemContainer onClick={() => handleItemClick('twitter')}>
          <UilTwitter color={theme.palette.logos.twitter} />
          <Box ml={1}>Twitter</Box>
        </SocialMenuItemContainer>

        {!discordConnected && (
          <SocialMenuItemContainer onClick={() => handleItemClick('discord')}>
            <ImageIcon
              size="20px"
              marginRight="4px"
              src={DiscordIcon}
              disabled={false}
            />
            <Box ml={1}>Discord</Box>
          </SocialMenuItemContainer>
        )}

        {!dribbbleConnected && (
          <SocialMenuItemContainer onClick={() => handleItemClick('dribbble')}>
            <UilDribbble marginLeft={-1} color={theme.palette.logos.dribbble} />
            <Box ml={1}>Dribbble</Box>
          </SocialMenuItemContainer>
        )}
      </StyledMenu>
    </React.Fragment>
  );
};
