import { useTranslation } from 'react-i18next';
import React from 'react';
import {
  DropdownPaperPropsCommunity,
} from '../Dropdown/DropdownPaperProps';
import { NormalMenuItemContainer } from '../Dropdown/elements';
import { getSmallAddress } from '~/utils';
import { PrimaryButton } from '~/components';
import { Menu } from '@mui/material';

const WalletDropdown = ({
  anchorEl,
  setAnchorEl,
  data,
  selectedWalletAddress,
  setSelectedWalletAddress,
  btnClick,
  btnText,
  setSelectedWalletIndex,setIsFirstMountDone
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
        <div>{t("Select Creator")}</div>
        <PrimaryButton style={{"maxWidth": "12rem"}} onClick={btnClick}>
          {btnText}
        </PrimaryButton>
      </div>
      {data?.map((item, index) => (
        <NormalMenuItemContainer
          key={index}
          selected={item.walletAddress === selectedWalletAddress}
          onClick={() => {
            setIsFirstMountDone(true)
            setSelectedWalletIndex(index);
            setSelectedWalletAddress(item.walletAddress);
          }}
        >
          {getSmallAddress(item.walletAddress)}
        </NormalMenuItemContainer>
      ))}
    </Menu>
  </>);
};

export default WalletDropdown;
