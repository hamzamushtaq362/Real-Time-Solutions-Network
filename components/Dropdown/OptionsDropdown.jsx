import { useTranslation } from 'react-i18next';
import * as React from 'react';

import { NormalMenuItemContainer } from './elements';

import {
  MoreVerticalIcon,
  CheckboxIcon,
  // EditIcon,
  ArchiveIcon,
  CheckboxDarkIcon,
  // EditDarkIcon,
  ArchiveDarkIcon,
} from '~/assets';

import { ImageIcon, OptionsButton, Tooltip } from '~/components';
import { BASE_URL } from '~/apis';
import { fetchRefreshToken, reFetchTokenExpire } from '~/redux';

import { Box, Menu } from '@mui/material';
import axios from 'axios';
import { useNotistack } from 'hooks/useNotistack';

export const OptionsDropdown = ({
  setTempOpen,
  isAdminSelectedWalletForCollab,
  isNFtReadyForMint,
  updateCollabMemberState,
  collabId,
}) => {
  const { t } = useTranslation();

  const generateSnackbar = useNotistack();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const setArchive = async () => {
    try {
      const f1 = async () => {
        const res = await axios.patch(`${BASE_URL}/api/v1/collab`, {
          id: collabId,
          status: 'INACTIVE',
        });
        return res;
      };
      const res = await reFetchTokenExpire(f1, fetchRefreshToken);
      if (res) {
        // router.push('/collab/explore');
        generateSnackbar('Collab Archieved Successfully', 'success');
      }
    } catch (err) {
      //
    }
  };

  return (
    (<React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Options">
          <OptionsButton onClick={handleClick}>
            <ImageIcon icon={MoreVerticalIcon} />
          </OptionsButton>
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
            maxWidth: '182px',
            maxHeight: '170px',
            width: '100%',
            height: 'auto',
            boxShadow:
              '0px -9px 20px rgba(0, 0, 0, 0.02), 0px 24px 24px rgba(16, 20, 34, 0.09)',
            borderRadius: '10px',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            padding: '8px 6px',
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {/* <NormalMenuItemContainer>
          {' '}
          <ImageIcon
            id="item-1"
            icon={EditIcon}
            size={'18px'}
            marginRight="13px"
          />{' '}
          <ImageIcon
            id="item-1-dark"
            icon={EditDarkIcon}
            size={'18px'}
            marginRight="13px"
          />{' '}
          Edit
        </NormalMenuItemContainer> */}
        <NormalMenuItemContainer onClick={() => setArchive()}>
          <ImageIcon
            id="item-2"
            icon={ArchiveIcon}
            size={'20px'}
            marginRight="13px"
          />
          <ImageIcon
            id="item-2-dark"
            icon={ArchiveDarkIcon}
            size={'20px'}
            marginRight="13px"
          />{t("Archive")}</NormalMenuItemContainer>

        {!isNFtReadyForMint && (
          <NormalMenuItemContainer
            onClick={() => {
              if (!isAdminSelectedWalletForCollab) {
                setTempOpen(true);
              } else {
                updateCollabMemberState();
              }
            }}
          >
            <ImageIcon
              id="item-3"
              icon={CheckboxIcon}
              size={'17px'}
              marginRight="13px"
            />
            <ImageIcon
              id="item-3-dark"
              icon={CheckboxDarkIcon}
              size={'17px'}
              marginRight="13px"
            />{t("Publish")}</NormalMenuItemContainer>
        )}
      </Menu>
    </React.Fragment>)
  );
};
