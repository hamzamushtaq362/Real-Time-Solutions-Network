export const profileDropdownPaperProps = {
  elevation: 0,
  sx: {
    overflow: 'visible',
    mt: 2,
    ml: 1,
    maxWidth: '340px',
    width: '100%',
    boxShadow:
      '0px 40px 64px -12px rgba(0, 0, 0, 0.08), 0px 0px 14px -4px rgba(0, 0, 0, 0.05), 0px 32px 48px -8px rgba(0, 0, 0, 0.1)',
    borderRadius: '16px',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    padding: '12px 10px 0px',
    //
    // '&:before': {
    //   content: '""',
    //   display: 'block',
    //   position: 'absolute',
    //   top: 0,
    //   right: 23,
    //   width: 15,
    //   height: 15,
    //   bgcolor: 'background.paper',
    //   transform: 'translateY(-50%) rotate(45deg)',
    //   zIndex: 0,
    // },
  },
};

export const messagesDropdownPaperProps = {
  elevation: 0,
  sx: {
    overflow: 'visible',
    // filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.12))',
    mt: 2,
    ml: 9,
    maxWidth: '495px',
    maxHeight: '550px',
    width: '100%',
    height: '100%',
    boxShadow:
      '0px 39px 60px -12px rgba(0, 0, 0, 0.08), 0px 0px 14px -4px rgba(0, 0, 0, 0.05), 0px 32px 48px -8px rgba(0, 0, 0, 0.1)',
    borderRadius: '16px',
    bgcolor: 'background',
    '&::-webkit-scrollbar': {},
  },
};

export const notificationsDropdownPaperProps = {
  elevation: 0,
  sx: {
    overflow: 'visible',
    mt: 2,
    ml: 8,
    maxWidth: '466px',
    maxHeight: 600,
    height: 600,
    width: '100%',
    bgcolor: 'background',
    boxShadow:
      '0px 39px 60px -12px rgba(0, 0, 0, 0.08), 0px 0px 14px -4px rgba(0, 0, 0, 0.05), 0px 32px 48px -8px rgba(0, 0, 0, 0.1)',
    borderRadius: '16px',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
};

export const shareDropdownPaperProps = {
  elevation: 0,
  sx: {
    overflow: 'visible',
    mt: 1,
    ml: 0,
    maxWidth: '233px',
    maxHeight: '260px',
    width: '100%',
    height: '100%',
    boxShadow:
      '0px -9px 20px rgba(0, 0, 0, 0.02), 0px 24px 24px rgba(16, 20, 34, 0.09)',
    borderRadius: '10px',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    padding: '8px 6px',
  },
};
export const DropdownPaperPropsCommunity = {
  elevation: 0,
  sx: {
    mt: 1,
    ml: 0,
    maxWidth: '400px',
    maxHeight: '400px',
    width: '100%',
    height: '100%',
    overflow: 'auto',
    boxShadow:
      '0px -9px 20px rgba(0, 0, 0, 0.02), 0px 24px 24px rgba(16, 20, 34, 0.09)',
    borderRadius: '10px',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    padding: '8px 6px',
  },
};

export const optionsDropdownAddWalletPaperProps = {
  elevation: 0,
  sx: {
    overflow: 'visible',
    mt: 1,
    ml: 0,
    maxWidth: '180px',
    maxHeight: '118px',
    width: '100%',
    height: '100%',
    boxShadow:
      '0px -9px 20px rgba(0, 0, 0, 0.02), 0px 24px 24px rgba(16, 20, 34, 0.09)',
    borderRadius: '10px',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    padding: '8px 6px',
  },
};

export const curatorsFilterByDropdownPaperProps = {
  elevation: 0,
  sx: {
    overflow: 'visible',
    mt: 1,
    ml: 0,
    maxWidth: '180px',
    maxHeight: '220px',
    width: '100%',
    height: '100%',
    boxShadow:
      '0px -9px 20px rgba(0, 0, 0, 0.02), 0px 24px 24px rgba(16, 20, 34, 0.09)',
    borderRadius: '10px',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    padding: '8px 6px',
  },
};

export const collaborateDropdownPaperProps = {
  elevation: 0,
  sx: {
    overflow: 'visible',
    // filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.12))',
    mt: 2,
    ml: 8,
    maxWidth: '398px',
    maxHeight: '392px',
    width: '100%',
    height: '100%',
    padding: '16px 27px',
    boxShadow:
      '0px 39px 60px -12px rgba(0, 0, 0, 0.08), 0px 0px 14px -4px rgba(0, 0, 0, 0.05), 0px 32px 48px -8px rgba(0, 0, 0, 0.1)',
    borderRadius: '16px',
    '&::-webkit-scrollbar': {},

    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      right: 85,
      width: 15,
      height: 15,
      bgcolor: 'background.paper',
      transform: 'translateY(-50%) rotate(45deg)',
      zIndex: 0,
    },
  },
};

export const getDropdownPaperProps = (theme) => ({
  elevation: 0,
  sx: {
    overflow: 'visible',
    mt: 2,
    ml: 1,
    maxWidth: '340px',
    width: '100%',
    background: theme.palette.mode === 'dark' ? 'radial-gradient(50% 50%at 50% 50%, rgba(18, 18, 18, 0.77), rgba(18, 18, 18, 0.9))': '#fff',
    boxShadow: theme.palette.mode === 'dark' ? '0 6px 12px rgba(18, 18, 18, 0.05)' : '0px 0px 0px 1px rgba(18, 18, 18, 0.10), 0px 1px 1px 0px rgba(18, 18, 18, 0.10), 0px 6px 12px 0px rgba(18, 18, 18, 0.05)',
    backdropFilter: theme.palette.mode === 'dark' ? 'blur(16px)': 'none',
    borderRadius: '16px',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    padding: '12px 10px 4px',
  }
})