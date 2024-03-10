import { useTranslation } from 'react-i18next';
import React from 'react';
import { copyToClipBoard, shareLinkHandler } from '~/utils';
import { FilterDropdownItemWrap, ImageIcon } from '~/components';
import { FacebookIcon, LinkedInIcon, WhatAppIcon, TwitterIcon, URLIcon, GoogleIcon } from '~/assets';
import { Box, Menu, useTheme } from '@mui/material';
import { useNotistack } from '~/hooks';
import { FlexBox } from 'components/common/elements';
import Image from 'next/image';

const ShareMenu = ({ shareAnchorEl, setShareAnchorEl, url }) => {
  const open = Boolean(shareAnchorEl);
  const theme = useTheme();
  const { t } = useTranslation();

  const handleClose = () => {
    setShareAnchorEl(null);
  };

  const generateSnackbar = useNotistack();

  const copyLinkHandler = () => {
    copyToClipBoard(url);
    generateSnackbar('Copied link to clipboard!', 'success');
  };

  return (<>
    <Menu
      anchorEl={shareAnchorEl}
      id="account-menu"
      open={open}
      disableScrollLock={false}
      onClose={handleClose}
      onClick={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          mt: 1,
          ml: 0,
          maxWidth: 350,
          maxHeight: 'auto',
          width: '100%',
          height: 'auto',
          borderRadius: '10px',
          backgroundColor: theme.palette.background.inverse,
          color: theme.palette.text.inverse,
        },
      }}
    >
      <FilterDropdownItemWrap
        onClick={() => shareLinkHandler('linkedin', url)}
      >
        <FlexBox>
          <Image
            width={18}
            height={18}
            src={LinkedInIcon}
            alt='twitter'
            quality={30}
          />
          <Box ml={1}>
            {t('Share on LinkedIn')}
          </Box>
        </FlexBox>
      </FilterDropdownItemWrap>
      <FilterDropdownItemWrap
        onClick={() => shareLinkHandler('twitter', url)}
      >
        <FlexBox>
          <Image
            width={22}
            height={22}
            src={TwitterIcon}
            alt='twitter'
            quality={30}
          />
          <Box ml={1}>
            {t("Share on Twitter")}
          </Box>
        </FlexBox>
      </FilterDropdownItemWrap>
      <FilterDropdownItemWrap onClick={() => shareLinkHandler('gmail', url)}>
        <FlexBox>
          <Image
            width={22}
            height={22}
            src={GoogleIcon}
            alt='Google'
            quality={30}
          />
          <Box ml={1}>
            {t("Share on Gmail")}
          </Box>
          </FlexBox>
      </FilterDropdownItemWrap>
      <FilterDropdownItemWrap
        onClick={() => shareLinkHandler('facebook', url)}
      >
        <FlexBox>
          <ImageIcon
            size="24px"
            marginLeft="-3px"
            marginRight="10px"
            src={FacebookIcon}
          />{t("Share on Facebook")}</FlexBox>
      </FilterDropdownItemWrap>
      <FilterDropdownItemWrap
        onClick={() => shareLinkHandler('whatsapp', url, 'Take a dive into the creative mind behind these incredible works. Check out the creator\'s profile for more! Your support means the world to them')}
      >
        <FlexBox>
          <ImageIcon
            size="24px"
            marginLeft="-3px"
            marginRight="10px"
            src={WhatAppIcon}
          />{t("Share on WhatsApp")}</FlexBox>
      </FilterDropdownItemWrap>
      <FilterDropdownItemWrap onClick={copyLinkHandler}>
        <FlexBox>
          <Image
            width={18}
            height={18}
            src={URLIcon}
            alt='URL'
            quality={30}
          />
          <Box ml={1}>
            {t("Copy Link")}
          </Box>
        </FlexBox>
      </FilterDropdownItemWrap>
    </Menu>
  </>);
};

export default ShareMenu;
