import * as React from 'react';

import { CollectiveMenuItemContainer } from './elements';

import { CollectiveReportIcon } from '~/assets';

import { ImageIcon, Tooltip, MoreHorizontalIcon } from '~/components';

import { Box, Menu } from '@mui/material';

import { useTheme } from '@mui/styles';
import { useTranslation } from 'react-i18next';

export const MoreDropdownCollectiveProfile = ({
  onReportUserClick,
}) => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const theme = useTheme();

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Options">
          <MoreHorizontalIcon
            onClick={handleClick}
            color={theme.palette.background.inverse}
          />
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        disableScrollLock={false}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            mt: 1,
            ml: 0,
            maxWidth: '115px',
            maxHeight: '75px',
            width: '100%',
            height: 'auto',
            // boxShadow:
            //   '0px -9px 20px rgba(0, 0, 0, 0.02), 0px 24px 24px rgba(16, 20, 34, 0.09)',
            borderRadius: '10px',
            '&::-webkit-scrollbar': {
              display: 'none',
            },

            backgroundColor: theme.palette.background.inverse,
            color: theme.palette.grey.commonText,
          },
        }}
        transformOrigin={{ horizontal: 'center', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
      >
        {/* <CollectiveMenuItemContainer onClick={onBlockUserClick}>
          <ImageIcon
            icon={CollectiveBlockUserIcon}
            size={'14px'}
            marginRight="6px"
          />
          Block User
        </CollectiveMenuItemContainer> */}

        <CollectiveMenuItemContainer onClick={onReportUserClick}>
          <ImageIcon
            // id="item-3"
            icon={CollectiveReportIcon}
            size={'14px'}
            marginRight="6px"
          />
          {t('Report')}
        </CollectiveMenuItemContainer>
      </Menu>
    </React.Fragment>
  );
};
