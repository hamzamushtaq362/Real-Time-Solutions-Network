import { styled, Button, Typography } from '@mui/material';

export const SelectItemContainer = styled(Button)(({ active, theme }) => ({
  maxWidth: '94px',
  maxHeight: '94px',
  minWidth: '94px',
  minHeight: '94px',
  flexWrap: 'wrap',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  // backgroundColor: active ? '#EAEFFF' : '#FAFAFB',
  backgroundColor: active
    ? theme.palette.background.active
    : theme.palette.background.activeLight,
  borderRadius: '10px',
  // border: `1px solid ${active ? '#2F62FD' : '#F7F7F7'}`,
  border: `1px solid ${
    active ? theme.palette.text.blue : theme.palette.background.border
  }`,
  boxShadow: 'none',

  '&:hover': {
    // backgroundColor: active ? '#EAEFFF' : '#FAFAFB',
    backgroundColor: active
      ? theme.palette.background.active
      : theme.palette.background.activeLight,
    boxShadow: `0px 1px 4px rgba(0, 0, 0, 0.1)`,
  },
}));

export const SelectItemContainerOnBoardInvite = styled(Button)(
  ({ active, theme }) => ({
    maxWidth: '94px',
    maxHeight: '94px',
    minWidth: '94px',
    minHeight: '94px',
    flexWrap: 'wrap',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: active ? '#EAEFFF' : '#FAFAFB',
    backgroundColor:
      theme.palette.mode === 'dark'
        ? theme.palette.background.default
        : active
        ? theme.palette.background.active
        : theme.palette.background.activeLight,

    borderRadius: '10px',
    // border:
    //   theme.palette.mode === 'dark'
    //     ? `1px solid #383838`
    //     : `1px solid ${active ? '#2F62FD' : '#F7F7F7'}`,
    border: `1px solid theme.palette.background.border`,
    boxShadow: 'none',

    '&:hover': {
      backgroundColor:
        theme.palette.mode === 'dark'
          ? theme.palette.background.default
          : active
          ? theme.palette.background.active
          : theme.palette.background.activeLight,

      boxShadow: `0px 1px 4px rgba(0, 0, 0, 0.1)`,
    },
  }),
);

export const SelectItemImage = styled('img')({
  maxWidth: '70px',
  maxHeight: '70px',
  minWidth: '70px',
  minHeight: '70px',
});

export const SelectItemOnBoardInviteImage = styled('img')({
  maxWidth: '37px',
  maxHeight: '37px',
  minWidth: '37px',
  minHeight: '37px',
});

export const SelectItemText = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  textAlign: 'center',
  lineHeight: '21px',
  letterSpacing: '0.1px',
  color: theme.palette.text.primary, //'#171725',
}));
