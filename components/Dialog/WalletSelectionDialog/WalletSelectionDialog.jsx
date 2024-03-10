import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';

import { Menu, MenuItem, PrimaryButton } from '~/components';
import { BASE_URL, fetchRefreshToken, reFetchTokenExpire } from '~/apis';
import axios from 'axios';

export const WalletSelectionDialog = ({
  open,
  handleClose,
  onSubmit,
  setWalletValue,
}) => {
  const [selectWallet, setSelectedWallet] = useState('');
  const [userWallet, setUserWallets] = useState('');
  const { t } = useTranslation();

  const getUserAddress = async () => {
    try {
      const f1 = async () => {
        const res = await axios.get(`${BASE_URL}/api/v1/wallets`);
        return res;
      };
      const res = await reFetchTokenExpire(f1, fetchRefreshToken);
      if (res.data.status === 'success') {
        setUserWallets(res.data.data.wallets);
      }
    } catch (err) {
      //
    }
  };

  useEffect(() => {
    getUserAddress();
  }, []);

  useEffect(() => {
    if (userWallet?.length > 0) {
      setSelectedWallet(userWallet[0].walletAddress);
    }
  }, [userWallet]);

  return (<>
    {userWallet && (
      <Dialog
        open={open}
        onClose={() => {
          handleClose();
        }}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-discription"
      >
        <div
          style={{
            width: '60rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <DialogTitle id="dialog-title">{t("Please Select Wallet For The Collab")}</DialogTitle>
          <DialogContent>
            <DialogContentText id="dialog-descriptions">
              {/* Select This Collab */}
              <div
                style={{
                  width: 'auto',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Menu
                  value={selectWallet ? selectWallet : 'Choose Wallet'}
                  setValue={(value) => {
                    setSelectedWallet(value);
                    setWalletValue(value);
                  }}
                >
                  {userWallet?.length > 0 &&
                    userWallet.map((wallet, index) => (
                      <MenuItem key={index} value={wallet.walletAddress}>
                        {wallet.walletAddress}
                      </MenuItem>
                    ))}
                </Menu>
              </div>
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <PrimaryButton
              onClick={() => {
                onSubmit();
              }}
            >{t("Submit")}</PrimaryButton>
          </DialogActions>
        </div>
      </Dialog>
    )}
  </>);
};
