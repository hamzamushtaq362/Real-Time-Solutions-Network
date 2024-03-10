import { useTranslation } from 'react-i18next';
import * as React from 'react';
import { Box, Menu } from '@mui/material';
import { NormalMenuItemContainer } from './elements';
import { EditIcon } from '~/assets';
import CloseIcon from '../../assets/png/Settings/close.png';
import axios from 'axios';
import { BASE_URL } from '~/apis';
import { fetchRefreshToken, reFetchTokenExpire } from '~/redux';
import { useNotistack } from '~/hooks';
import { Spinner, ImageIcon, Tooltip } from '~/components';
import { optionsDropdownAddWalletPaperProps } from './DropdownPaperProps';
import { UilEllipsisH } from '@iconscout/react-unicons';
import { useTheme, IconButton } from '@mui/material';

export const OptionDropdownAddWallet = (props) => {
  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const open = Boolean(anchorEl);

  const generateSnackbar = useNotistack();
  const theme = useTheme();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const removeWalletAddress = async () => {
    try {
      setLoading(true);
      const f1 = async () => {
        const res = await axios.delete(
          `${BASE_URL}/api/v1/wallets/${props.walletId}`,
        );
        return res;
      };
      const res = await reFetchTokenExpire(f1, fetchRefreshToken);
      if (res) {
        setLoading(false);
        props.setWallets(res?.data?.data?.wallets);
        props.handleClose();
      }
    } catch (err) {
      generateSnackbar(err?.response?.data?.message, 'error');
      setLoading(false);
    }
  };

  if (loading) {
    return <Spinner fullHeight />;
  }

  return (
    (<React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Options">
          <IconButton onClick={handleClick} sx={{ marginRight: '10px' }}>
            <UilEllipsisH color={theme.palette.grey.common} />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        disableScrollLock={false}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={optionsDropdownAddWalletPaperProps}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <NormalMenuItemContainer
          onClick={() => {
            props.setOpen(true);
            props.setSelectedEditWalletDetails({
              username: props.walletNickName,
              color: props.walletColor,
            });
          }}
        >
          <ImageIcon
            id="item-1"
            icon={EditIcon.src}
            size={'18px'}
            marginRight="13px"
          />{" "}
          <ImageIcon
            id="item-1-dark"
            icon={EditIcon.src}
            size={'18px'}
            marginRight="13px"
          />{" "}{t("Edit")}</NormalMenuItemContainer>
        <NormalMenuItemContainer onClick={() => removeWalletAddress()}>
          <ImageIcon
            id="item-2"
            icon={CloseIcon.src}
            size={'20px'}
            marginRight="13px"
          />
          <ImageIcon
            id="item-2-dark"
            icon={CloseIcon.src}
            size={'20px'}
            marginRight="13px"
          />{t("Disconnect")}</NormalMenuItemContainer>
      </Menu>
    </React.Fragment>)
  );
};
