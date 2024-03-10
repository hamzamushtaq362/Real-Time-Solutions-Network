import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function DialogBox({
  open,
  setOpen,
  heading,
  width,
  children,
}) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      maxWidth={width || 'md'}
      fullWidth
      sx={{ borderRadius: '4rem' }}
      style={{ borderRadius: '4rem' }}
      open={open}
      onClose={handleClose}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <DialogTitle>{heading}</DialogTitle>
      </div>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}
