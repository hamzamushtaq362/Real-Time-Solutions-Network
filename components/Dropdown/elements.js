import {
  Box,
  styled,
  Typography,
  MenuItem,
  Menu,
  Button,
  Switch,
} from '@mui/material';
import { ScrollStyles } from '../Scroll';

export const MessageMenuItemContainer = styled(MenuItem)(
  ({ width, theme }) => ({
    width: width ? width : '94%',
    margin: 'auto',
    display: 'flex',
    padding: '18px 14px',
    alignItems: 'center',
    maxHeight: '80px',
    height: '100%',
    borderRadius: '8px',
    backgroundColor: theme.palette.background.paper,
  }),
);

export const MessageHeaderContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.inverse,
}));

export const MessageText = styled(Typography)(({ theme }) => ({
  ...theme.typography.body4,
  color: theme.palette.grey.common,
}));

export const NotificationDropdownHeader = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '8px 18px',
  backgroundColor: theme.palette.background.paper,
  borderRadius: '10px 10px 0 0',
}));

export const DropdownHeaderText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 300,
  fontSize: 32,
  letterSpacing: '0.01em',
}));

export const NotificationDropdownFilter = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  backgroundColor: theme.palette.background.paper,
  borderTop: '1px solid',
  borderBottom: '1px solid',
  borderColor: theme.palette.grey[300],
}));

export const DropdownFilterText = styled(Typography)(({ theme }) => ({
  ...theme.typography.subTitle3,
  color: theme.palette.grey[500],
  padding: '10px 28px',
  display: 'flex',
  alignItems: 'center',
  fontWeight: 300,
  cursor: 'pointer',

  '&#active': {
    fontWeight: 400,
    color: theme.palette.background.paper,
    backgroundColor: theme.palette.background.inverse,
  },
}));

export const DropdownFilterTextSmall = styled(Typography)(({ theme }) => ({
  ...theme.typography.subTitle6,
  borderRadius: '30px',
  border: '1px solid',
  borderColor: theme.palette.grey[400],
  marginLeft: '10px',
  padding: '0 10px',
  textAlign: 'center',
}));

export const NotificationMenuItemContainer = styled(MenuItem)(({ theme }) => ({
  width: '94%',
  margin: 'auto',
  display: 'flex',
  padding: '18px 0',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  minHeight: '74px',
  overflow: 'hidden',
  borderBottom: '1px solid',
  borderColor: theme.palette.grey?.[300],
  whiteSpace: 'unset',
}));

export const NotificationAvatarContainer = styled(Box)({
  width: '100%',
  display: 'flex',
});
export const ArrowWrap = styled(Box)(({ theme }) => ({
  background: theme.palette.background.paper,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '50%',
  padding: 2,
  transform: 'rotate(45deg)',
  position: 'absolute',
  right: -8,
  bottom: -1,
}));

export const TimeStampText = styled(Typography)(({ theme }) => ({
  ...theme.typography.body6,
  color: theme.palette.grey.commonSecondary,
  display: 'flex',
  alignItems: 'flex-end',
  width: 100,
  justifyContent: 'flex-end',
  fontSize: 12,
  position: 'absolute',
  right: 0,
  top: 0,
}));

export const NotificationTextContainer = styled(Box)({
  marginLeft: 16,
  alignSelf: 'center',
  width: '100%',
  // maxWidth: '100%',
});

export const UserText = styled(Typography)(({ theme }) => ({
  letterSpacing: '0.1px',
  color: theme.palette.text.primary,
  fontSize: '16px',
  fontWeight: 400,
}));

export const NotificationLightText = styled(Box)(({ theme }) => ({
  ...theme.typography.body5,
  color: theme.palette.text.subText,
  letterSpacing: '0.1px',
  fontSize: '16px',
}));

export const SingleNotificationContainer = styled(Box)({
  display: 'flex',
  padding: 0,
  width: '100%',
  justifyContent: 'space-between',
});

export const SingleMessageContainer = styled(Box)({
  display: 'flex',
  padding: 0,
  width: '100%',
  justifyContent: 'space-between',
});

export const NormalMenuItemContainer = styled(MenuItem)(
  ({ color, hoverColor, theme }) => ({
    width: '94%',
    margin: 'auto',
    minHeight: '48px',
    display: 'flex',
    alignItems: 'center',
    padding: '10px 14px',

    ...theme.typography.body4,

    color: color ? color : theme.palette.grey.common,
    borderRadius: '11px',
    marginBottom: '6px',

    '& #item-1-dark': {
      display: 'none',
    },

    '& #item-2-dark': {
      display: 'none',
    },

    '& #item-3-dark': {
      display: 'none',
    },

    '& #support-dark': {
      display: 'none',
    },

    '&:hover': {
      backgroundColor: theme.palette.grey.normal1,
      color: hoverColor ? hoverColor : theme.palette.grey.common,

      '& #item-1': {
        display: 'none',
      },

      '& #item-2': {
        display: 'none',
      },

      '& #item-3': {
        display: 'none',
      },

      '& #support-light': {
        display: 'none',
      },

      '& #item-1-dark': {
        display: 'block',
      },

      '& #item-2-dark': {
        display: 'block',
      },

      '& #item-3-dark': {
        display: 'block',
      },

      '& #support-dark': {
        display: 'block',
      },
    },
  }),
);

export const CollectiveMenuItemContainer = styled(MenuItem)(
  ({ color, theme }) => ({
    width: '96%',
    margin: 'auto',
    minHeight: '36px',
    display: 'flex',
    alignItems: 'center',
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '132%',
    alignSelf: 'center',

    color: color ? color : theme.palette.grey.common,
    backgroundColor: theme.palette.getContrastText(
      theme.palette.background.paper,
    ),
    borderRadius: '6px',
    marginBottom: '6px',

    '& #item-1-dark': {
      display: 'none',
    },

    '& #item-2-dark': {
      display: 'none',
    },

    '& #item-3-dark': {
      display: 'none',
    },

    '& #support-dark': {
      display: 'none',
    },
  }),
);

export const CollectiveWalletMenuItemContainer = styled(MenuItem)(
  ({ color, theme }) => ({
    width: '96%',
    margin: 'auto',
    minHeight: '36px',
    display: 'flex',
    alignItems: 'center',
    // padding: '10px 14px',

    // ...theme.typography.body4,
    font: theme.typography.fontFamilyNeue,
    fontWeight: '500',
    fontSize: '12px',
    lineHeight: '132%',
    alignSelf: 'center',

    color: color ? color : theme.palette.grey.common,
    backgroundColor: theme.palette.getContrastText(
      theme.palette.background.paper,
    ),
    borderRadius: '6px',
    marginBottom: '6px',

    '&:hover': {
      backgroundColor: theme.palette.grey.normal8,
    },
  }),
);

export const RoundedBorderedContainer = styled(Box)(
  ({ theme, background, borderColor, boxShadow }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: background ?? theme.palette.white.main,
    boxShadow: boxShadow ?? theme.palette.boxShadow,
    width: 40,
    height: 40,
    border: `1px solid ${borderColor ?? 'transparent'}`,
    borderRadius: '50%',
    cursor: 'pointer',
    transition: 'all 100ms',
    '&:hover': {
      borderColor: theme.palette.black.main,
      boxShadow: `${theme.palette.boxShadow}, inset 0px 0px 0px 2px ${theme.palette.black.main}`,
    },
  }),
);

export const MessagesDropdownHeader = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '12px 28px',
  backgroundColor: theme.palette.background.inverse,
}));

export const DropdownActionButton = styled(Button)(({ theme }) => ({
  width: '344px',
  padding: '11px 14px',
  backgroundColor: theme.palette.background.inverse,
  boxShadow: 'none',
  margin: 'auto',
  textTransform: 'none',
  borderRadius: '10px',

  ...theme.typography.button4,
  color: theme.palette.background.paper,

  '&:hover': {
    boxShadow: 'none',
    backgroundColor: theme.palette.background.inverse,
    opacity: 0.9,
  },
}));

export const InputHeaderText = styled(Typography)(({ theme }) => ({
  ...theme.typography.body5,
  color: theme.palette.text.primary,
}));

export const ORText = styled(Typography)(({ theme }) => ({
  ...theme.typography.subTitle4,
}));

export const MessagesScrollContainer = styled(Box)(({ theme }) => ({
  overflowY: 'scroll',
  maxHeight: '400px',
  backgroundColor: theme.palette.background.paper,
  height: '400px',
  ...ScrollStyles(theme),
}));

export const NoNewNotificationsContainer = styled(Box)({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

export const NotificationItemSkeletonContainer = styled(Box)({
  width: '100%',
  display: 'flex',
});

export const NotificationsListScrollContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export const MessagesListScrollContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  maxHeight: '480px',
  overflowY: 'scroll',
  backgroundColor: theme.palette.background.paper,
  ...ScrollStyles(theme),
}));

export const NoConversationsExistsContainer = styled(Box)({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

export const NoConversationText = styled(Typography)(({ theme }) => ({
  ...theme.typography.body8,
  color: theme.palette.grey.common,
}));

export const SearchDropdownContainer = styled(Box)(({ theme, open }) => ({
  backgroundColor: theme.palette.background.paper,
  position: 'absolute',
  width: 'calc(100% + 4px)',
  height: open ? 'auto' : 0,
  opacity: open ? 1 : 0,
  maxHeight: '600px',
  overflowY: 'scroll',
  overflowX: 'hidden',
  padding: open ? '16px 0' : 0,
  borderBottomRightRadius: theme.spacing(0.5),
  borderBottomLeftRadius: theme.spacing(0.5),
  top: 57,
  left: -2,
  zIndex: 2,
  border: open ? `0.6px solid ${theme.palette.borderLight}` : 'none',
  ...ScrollStyles(theme),
  transition: 'height 100ms cubic-bezier(0,1.18,1,.99), opacity 100ms ease-out',
}));

export const SearchItemContainer = styled(MenuItem)(({ width, theme }) => ({
  width: width ? width : '100%',
  margin: 'auto',
  display: 'flex',
  padding: '18px 20px',
  alignItems: 'center',
  maxHeight: '50px',
  height: '100%',
  borderRadius: 0,
  backgroundColor: theme.palette.background.paper,
  transition: 'background-color 100ms ease-out',
  border: 'none',

  '&:hover': {
    backgroundColor: theme.palette.background.inverse,
    '& p': {
      color: theme.palette.text.inverse,
    },
  },
}));

export const SearchSectionHeader = styled(Typography)(({ theme }) => ({
  ...theme.typography.subTitle5,
  color: theme.palette.grey.common,
  padding: '0 20px',
}));

export const SearchUserItemText = styled('p')(({ theme }) => ({
  ...theme.typography.subTitle4,
  color: theme.palette.text.primary,
  width: '100%',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  marginTop: -5,
}));

export const SearchUserItemSubText = styled('p')(({ theme }) => ({
  ...theme.typography.body5,
  color: theme.palette.grey.common,
  width: '100%',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  marginTop: -10,
}));

export const ProfileInfoIconContainer = styled(Box)({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  columnGap: '10px',
  cursor: 'pointer',
});

export const ProfileNameText = styled(Typography)(({ theme, hovered }) => ({
  ...theme.typography.h6,
  color: theme.palette.text.primary,
  fontSize: 22,
  letterSpacing: '0.01em',
  fontWeight: 300,
  position: 'relative',
  '&::after': {
    content: "''",
    position: 'absolute',
    zIndex: 1,
    left: hovered ? 0 : 'unset',
    right: hovered ? 'auto' : 0,
    width: hovered ? '100%' : 0,
    bottom: 1,
    backgroundColor: theme.palette.text.primary,
    height: 1.5,
    transitionProperty: 'width',
    transitionDuration: '50ms',
    transitionTimingFunction: 'ease-out',
  },
  '&:hover::after, &:focus::after, &:active::after': {
    left: 0,
    right: 'auto',
    width: '100%',
  },
}));

export const ProfileSubText = styled(Typography)(({ theme }) => ({
  ...theme.typography.h6,
  fontSize: 14,
  color: theme.palette.text.secondary,
  opacity: 0.5,
  fontWeight: 300,
  letterSpacing: '0.01em',
}));

export const NavItemText = styled('a')(({ theme, logout }) => ({
  ...theme.typography.h6,
  color: logout ? theme.palette.text.secondary : theme.palette.text.primary,
  fontSize: 16,
  cursor: 'pointer',
  padding: '10px 24px',
  transition: 'all 100ms ease-out',
  textDecoration: 'none',
  display: 'block',
  letterSpacing: '0.01em',

  '&:hover': {
    backgroundColor: theme.palette.radio.boxShadow10,
  },
}));
export const StyledMenu = styled(Menu)(({ theme, width, padding }) => ({
  '& .MuiPaper-root': {
    padding: padding ? padding : theme.spacing(2, 0, 0, 0),
    borderRadius: 8,
    width: width ? width : '100%',
  },
}));

export const NavItemWrap = styled(Box)(({ theme }) => ({
  ...theme.typography.h6,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 24px',
  color: theme.palette.text.primary,
  fontSize: 16,
  cursor: 'pointer',
  letterSpacing: '0.01em',

  '&:hover': {
    backgroundColor: theme.palette.radio.boxShadow10,
  },
}));

export const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 34,
  height: 21,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    '&.Mui-checked': {
      transform: 'translateX(13px)',
      color: theme.palette.background.paper,
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.background.inverse,
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        backgroundColor: theme.palette.radio.boxShadow05,
      },
    },
  },
  '& .Mui-disabled .MuiSwitch-thumb': {
    boxShadow: 'none',
    filter: 'none',
    border: 'none',
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 17,
    height: 17,
    backgroundColor: '#fff',
    boxShadow: '0px 1px 2px 1px rgba(18, 18, 18, 0.15) inset',
    filter: 'drop-shadow(0px 1px 2px rgba(18, 18, 18, 0.20))',
    border: '1.2px solid #fff',
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: `${theme.palette.background.switch} !important`,
    opacity: 1,
    boxShadow: '0px 1px 2px 0px rgba(18, 18, 18, 0.15) inset',
  },
}));

export const SocialMenuItemContainer = styled(MenuItem)(({ theme }) => ({
  display: 'flex',

  ...theme.typography.h6,
  color: theme.palette.text.primary,
  fontSize: 16,
  cursor: 'pointer',
  padding: '12px 10px',
  transition: 'all 100ms ease-out',
  textDecoration: 'none',

  '&:hover': {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.secondary,
  },
}));

export const LocationItemContainer = styled(SearchItemContainer)({
  columnGap: '4px',
  alignItems: 'center',
  padding: '10px 20px',
});

export const LocationItemText = styled(Typography)(({ theme }) => ({
  ...theme.typography.h6,
  color: theme.palette.text.primary,
  fontSize: 14,
  fontWeight: 400,
  width: '100%',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
}));

export const DropdownTextSmall = styled(Typography)(({ theme }) => ({
  ...theme.typography.subTitle6,
  borderRadius: '30px',
  border: '1px solid',
  borderColor: theme.palette.grey[400],
  marginLeft: '10px',
  padding: '0 10px',
  textAlign: 'center',
  lineHeight: '140%',
}));

export const ConversationDropdownItemContainer = styled(Box)({
  width: '100%',
  display: 'flex',
  columnGap: '10px',
});
