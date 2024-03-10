import {
  Box,
  styled,
  Tab as MuiTab,
  Tabs as MuiTabs,
  Typography,
} from '@mui/material';
import { ScrollStyles } from '../../Scroll';

export const FollowListContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: '16px',
  paddingTop: '10px',
  backgroundColor: theme.palette.background.paper,
}));

export const Tab = styled(MuiTab)(({ theme }) => ({
  ...theme.typography.h9,
  color: theme.palette.blue.main,
  textTransform: 'none',

  '&.MuiButtonBase-root': {
    padding: 0,
  },
}));

export const Tabs = styled(MuiTabs)({});

export const ListContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  overflowY: 'scroll',
  padding: '0 10px',
  paddingLeft: '12px',
  ...ScrollStyles(theme),

  backgroundColor: theme.palette.background.paper,
}));

export const ListItemContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: '10px 12px',
  borderRadius: '8px',
  display: 'flex',
  cursor: 'pointer',

  '&:hover': {
    backgroundColor: theme.palette.grey.normal1,
  },
}));

export const FollowNameText = styled(Typography)(({ theme }) => ({
  ...theme.typography.h7,
  color: theme.palette.text.primary,
}));

export const FollowSubText = styled(Typography)(({ theme }) => ({
  ...theme.typography.body8,
  color: theme.palette.grey.common,
  marginTop: '-1px',
}));

export const TextBox = styled(Box)({
  marginLeft: '10px',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
});

export const NoFollowersFoundContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.palette.background.paper,
}));

export const NoFollowersText = styled(Typography)(({ theme }) => ({
  ...theme.typography.h7,
  color: theme.palette.grey.common,
}));

export const FollowListFooter = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  justifyContent: 'center',
  padding: '20px 0',
  backgroundColor: theme.palette.background.paper,
}));

export const FollowDialogHeader = styled(Typography)(({ theme }) => ({
  ...theme.typography.h6,
  color: theme.palette.text.primary,
  padding: '16px',
}));
