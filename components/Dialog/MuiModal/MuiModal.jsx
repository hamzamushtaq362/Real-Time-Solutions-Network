import React from 'react';
import { Box, Modal } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 50,
  p: 2,
  borderRadius: 1,
};

export const MuiModal = ({open, handleModal, width, height, children}) => {
  return (
    <Modal
      open={open}
      onClose={handleModal}
      className='mui-custom-modal'
    >
      <Box sx={style} style={{ width, height }}>
        {children}
      </Box>
    </Modal>
  );
};

