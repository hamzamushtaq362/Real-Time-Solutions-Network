import { useTranslation } from 'react-i18next';
import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Spacer } from '../../Spacer';
import { InputHeader, SuccessPopupClose } from './elements';
import { PrimaryButton } from '../../Button';
import { ImageIconElement } from '../../Iconify/element';

import CloseIcon from './../../../assets/png/Settings/close.png';
import Metamask from '../../../assets/png/Settings/metamask.png';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
  borderRadius: 1,
};

export const WalletSuccessDialog = (props) => {
  const { t } = useTranslation();

  return (
    (<div>
      <Modal
        className='mui-custom-modal'
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} style={{ width: props.width, height: props.height }}>
          <SuccessPopupClose>
            <ImageIconElement
              src={CloseIcon}
              width="30px"
              height="30px"
              onClick={() => {
                props.handleClose();
              }}
            />
          </SuccessPopupClose>
          <ImageIconElement
            src={Metamask}
            width="104px"
            height="104px"
            marginLeft="159px"
            marginTop="30px"
          />
          <Spacer value={24} />
          <InputHeader
            fontSize="26px"
            fontWeight="500"
            lineHeight="40px"
            textAlign="center"
          >{t("Wallet Successfully Connected")}</InputHeader>
          <Spacer value={32} />

          <PrimaryButton
            onClick={() =>
              props.addWalletToProfile(props.setWallets, props.OpenSuccessModal)
            }
            width="240px"
            height="48px"
            marginTop="30px"
            marginLeft="100px"
          >{t("Connect Another Wallet")}</PrimaryButton>
        </Box>
      </Modal>
    </div>)
  );
};
