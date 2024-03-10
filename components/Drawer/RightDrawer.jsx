import React from 'react';
import { Box, Dialog, Slide, useTheme } from '@mui/material';

const CustomTransition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export const RightDrawer = ({ open, handleClose, children }) => {
  const theme = useTheme();

  return (
    <Dialog
      open={open}
      TransitionComponent={CustomTransition}
      keepMounted
      onClose={handleClose}
      maxWidth={false}
      PaperProps={{
        style: {
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: '50%',
          height: '100%',
          maxHeight: '100%',
          borderRadius: 0,
          margin: 0,
          padding: 0,
          backgroundColor: theme.palette.background.inverse,
        },
      }}
    >
      <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
        {children}
      </Box>
    </Dialog>
  );
};