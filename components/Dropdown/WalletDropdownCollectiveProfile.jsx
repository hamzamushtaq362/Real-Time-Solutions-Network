import * as React from 'react';

import { CollectiveWalletMenuItemContainer } from './elements';

import CollectiveWalletDownIcon from 'components/Icons/CollectiveWalletDownIcon';

import { CollectiveShareWalletButton } from '~/components';

import { Box, Menu } from '@mui/material';

import { useTheme } from '@mui/styles';

import { getSmallAddress } from '~/utils';

export const WalletDropdownCollectiveProfile = ({
  wallets,
  currentWallet,
  setCurrentWallet,
  readOnlyDropdown,
  onNewWalletSelect,
  width
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    if (wallets?.length > 1) {
      setAnchorEl(event.currentTarget);
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const theme = useTheme();

  // const readOnlyDropdown = true;

  return (
    <React.Fragment>
      <CollectiveShareWalletButton
        onClick={handleClick}
        disabled={readOnlyDropdown}
        width={width}
      >
        <Box>{getSmallAddress(currentWallet)}</Box>

        {!readOnlyDropdown && wallets?.length > 1 && (
          <CollectiveWalletDownIcon />
        )}
      </CollectiveShareWalletButton>

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
            maxWidth: '207px',
            maxHeight: 'auto',
            width: '100%',
            height: 'auto',
            borderRadius: '10px',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            backgroundColor: theme.palette.common?.black,
            color: theme.palette.common?.white,
          },
        }}
        transformOrigin={{ horizontal: 'center', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
      >
        {wallets && wallets?.length > 0 ? (
          <>
            {wallets?.map((wallet) => (
              <CollectiveWalletMenuItemContainer
                key={wallet}
                onClick={() => {
                  onNewWalletSelect(wallet);
                  setCurrentWallet(wallet);
                }}
              >
                {getSmallAddress(wallet)}
              </CollectiveWalletMenuItemContainer>
            ))}
          </>
        ) : (
          <></>
        )}
      </Menu>
    </React.Fragment>
  );
};
