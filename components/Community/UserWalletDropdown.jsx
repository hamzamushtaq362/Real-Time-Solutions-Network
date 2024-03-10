import { useTranslation } from 'react-i18next';
import React from 'react';
import {
  DropdownPaperPropsCommunity,
} from '../Dropdown/DropdownPaperProps';
import { NormalMenuItemContainer } from '../Dropdown/elements';
import { getSmallAddress } from '~/utils';
import { Menu } from '@mui/material';

const UserWalletDropdown = ({
  anchorEl,
  setAnchorEl,
  data,
  selectedWalletAddress,
  setSelectedWalletAddress,
}) => {
  const open = Boolean(anchorEl);
  const { t } = useTranslation();

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (<>
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      disableScrollLock={false}
      onClose={handleClose}
      onClick={handleClose}
      PaperProps={DropdownPaperPropsCommunity}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <div
        style={{
          padding: '2rem',
          fontSize: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div>{t("Own Wallets")}</div>
        {/* <PrimaryButton style={{"maxWidth": "12rem"}} onClick={btnClick}>
          {btnText}
        </PrimaryButton> */}
      </div>
      {data?.map((item, index) => (
        <NormalMenuItemContainer
          key={index}
          selected={item.walletAddress === selectedWalletAddress}
          onClick={() => {
            setSelectedWalletAddress(item.walletAddress);
          }}
        >
          {item?.walletNickname ? item.walletNickname : ''}{" "}
          {getSmallAddress(item.walletAddress)}
        </NormalMenuItemContainer>
      ))}
    </Menu>
  </>);
};

export default UserWalletDropdown;
