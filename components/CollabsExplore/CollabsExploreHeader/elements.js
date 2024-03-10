import { Box, Button, styled } from '@mui/material';

export const HeaderContainer = styled(Box)({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  '@media (max-width: 800px)': {
    flexDirection: 'column',
    rowGap: '20px',
    alignItems: 'flex-start',
  },
});

export const CollabHeaderRightButtonsContainer = styled(Box)({
  display: 'flex',
  columnGap: '10px',
  height: '50px',
  alignItems: 'center',
});

export const CreateCollabButton = styled(Button)(({ theme }) => ({
  width: '168px',
  height: '44px',
  backgroundColor: theme.palette.blue.main,
  borderRadius: '10px',
  ...theme.typography.button4,
  color: theme.palette.white.main,
  textTransform: 'none',

  '&:hover': {
    opacity: 0.9,
    backgroundColor: theme.palette.blue.main,
    boxShadow: 'none',
  },
}));

export const AddIconElement = styled('img')({
  width: '13px',
  height: '13px',
  marginRight: '9px',
});
