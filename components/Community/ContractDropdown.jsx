import { useTranslation } from 'react-i18next';
import React from 'react';
import {
  DropdownPaperPropsCommunity,
} from '../Dropdown/DropdownPaperProps';
import { NormalMenuItemContainer } from '../Dropdown/elements';
import { getSmallAddress } from '~/utils';
import { PrimaryButton } from '~/components';
import { Menu } from '@mui/material';

const ContractDropDown = ({
  shareAnchorEl,
  setShareAnchorEl,
  contractsData,
  btnClick,
  btnText,
  selectedContractAddress,
  setSelectedContractAddress,
  addedContractAddresses,
  selectedWalletIndex,
}) => {
  const open = Boolean(shareAnchorEl);
  const { t } = useTranslation();

  const handleClose = () => {
    setShareAnchorEl(null);
  };

  return (<>
    <Menu
      anchorEl={shareAnchorEl}
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
        <div>{t("Select Collection")}</div>
        <PrimaryButton style={{"maxWidth": "12rem"}} onClick={btnClick}>
          {btnText}
        </PrimaryButton>
      </div>
      {contractsData[selectedWalletIndex]?.contractAddresses?.map(
        (item, index) => (
          <NormalMenuItemContainer
            key={index}
            onClick={() => {
              setSelectedContractAddress(item?.address);
            }}
            selected={item?.address == selectedContractAddress}
          >
            {item && item?.name && item?.name.length > 0
              ? item?.name?.slice(0, 40)
              : ''}{" "}
            {getSmallAddress(item.address)}
          </NormalMenuItemContainer>
        ),
      )}
      {addedContractAddresses?.map(
        (item, index) => (
          <NormalMenuItemContainer
            key={index}
            onClick={() => {
              setSelectedContractAddress(item);
            }}
            selected={item == selectedContractAddress}
          >
            {getSmallAddress(item)}
          </NormalMenuItemContainer>
        ),
      )}
    </Menu>
  </>);
};

export default ContractDropDown;
