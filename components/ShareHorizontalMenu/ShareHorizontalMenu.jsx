import React from 'react';
import { Popover, useTheme } from '@mui/material';
import { copyToClipBoard, shareLinkHandler } from '~/utils';
import {
  FacebookFilledIcon,
  LinkedInFilledIcon,
  MailFilledIcon,
  LinkFilledIcon,
  WhatsappIcon,
  ImageIcon,
} from '~/components';
import { XLogoIcon } from '~/assets';
import { useNotistack } from '~/hooks';
import {
  HorizontalMenuWrap,
  DropdownItemWrap,
} from 'components/ShareHorizontalMenu/elements';

export const ShareHorizontalMenu = ({
  shareAnchorEl,
  setShareAnchorEl,
  url,
  subject = 'collab',
}) => {
  const open = Boolean(shareAnchorEl);
  const theme = useTheme();

  const handleClose = () => {
    setShareAnchorEl(null);
  };

  const generateSnackbar = useNotistack();

  const copyLinkHandler = () => {
    copyToClipBoard(url);
    generateSnackbar('Copied link to clipboard!', 'success');
  };

  const id = open ? 'simple-popover' : undefined;

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={shareAnchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      sx={{
        mt: 1,
        '& .MuiPopover-paper': {
          background: 'unset',
          backgroundImage: 'unset',
          borderRadius: '20px',
          boxShadow: 'none',
        },
      }}
    >
      <HorizontalMenuWrap>
        <DropdownItemWrap onClick={() => shareLinkHandler('twitter', url)}>
          <ImageIcon size="16px" src={XLogoIcon} />
        </DropdownItemWrap>
        <DropdownItemWrap onClick={() => shareLinkHandler('facebook', url)}>
          <FacebookFilledIcon
            width={20}
            height={20}
            color={theme.palette.text.primary}
          />
        </DropdownItemWrap>
        <DropdownItemWrap onClick={() => shareLinkHandler('linkedin', url)}>
          <LinkedInFilledIcon
            width={20}
            height={20}
            color={theme.palette.text.primary}
          />
        </DropdownItemWrap>

        <DropdownItemWrap
          onClick={() =>
            shareLinkHandler(
              'whatsapp',
              url,
              `Check out this amazing ${subject}`,
            )
          }
        >
          <WhatsappIcon
            color={theme.palette.text.primary}
            width={20}
            height={20}
          />
        </DropdownItemWrap>

        <DropdownItemWrap onClick={() => shareLinkHandler('gmail', url)}>
          <MailFilledIcon
            width={20}
            height={20}
            color={theme.palette.text.primary}
            inverseColor={theme.palette.text.inverse}
          />
        </DropdownItemWrap>

        <DropdownItemWrap onClick={copyLinkHandler}>
          <LinkFilledIcon
            width={20}
            height={20}
            color={theme.palette.text.primary}
          />
        </DropdownItemWrap>
      </HorizontalMenuWrap>
    </Popover>
  );
};
