export const ScrollStyles = (theme) => {
  return {
    '&::-webkit-scrollbar-thumb': {
      backgroundColor:
        theme.palette.mode === 'dark'
          ? theme.palette.grey.commonText
          : theme.palette.grey.normal5,
      border: '4px solid transparent',
      borderRadius: '8px',
      backgroundClip: 'padding-box',
    },

    '&::-webkit-scrollbar': {
      width: '16px',
    },
  };
};
