import {
  Box,
  MenuItem,
  Typography,
  styled,
  Avatar,
  Button,
} from '@mui/material';
import { ScrollStyles } from '~/components';

export const InboxLayoutContainer = styled(Box)({
  width: '100%',
  // padding: '16px 34px',
  overflowY: 'hidden',
});

export const StarterBubble = styled(Box)(({ theme }) => ({
  margin: theme.spacing(1),
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(1),
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  border: `2px solid ${theme.palette.divider}`,
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.background.default,
  },
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  maxWidth: 'fit-content',
}));

export const InboxHeader = styled(Typography)(({ theme }) => ({
  ...theme.typography.subTitle2,
  color: theme.palette.text.primary,
}));

export const InboxContentContainer = styled(Box)({
  width: '100%',
  display: 'flex',
  height: 'calc(100vh - 70px)',
});

export const InboxNavigationContainer = styled(Box)(({ theme }) => ({
  width: '27%',
  border: `0.15rem solid ${theme.palette.background.border}`,
  borderRight: 'none',
  borderLeft: 'none',
  borderTop: 'none',
  borderBottom: `1px solid ${theme.palette.borderLight}`,
}));

export const NavigationInputContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const NavigationButtonGroupContainer = styled(Box)({
  width: '100%',
  padding: '17.3px',
});

export const NavigationHeaderContainer = styled(Box)({
  height: '62px',
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  padding: '20.2px 17.3px',
  paddingTop: '17.2px',
});

export const InboxNavigationContentContainer = styled(Box)({
  height: '100%',
});

export const MessageMenuItemContainer = styled(MenuItem)(
  ({ width, active, theme, padding }) => ({
    width: width ? width : '94%',
    margin: 'auto',
    display: 'flex',
    // padding: '52px 14px',
    padding: `52px 14px 52px ${padding / 3 - 5}px`,
    alignItems: 'center',
    maxHeight: '80px',
    height: '100%',
    borderRadius: '8px',
    backgroundColor: active ? theme.palette.grey.normal1 : '',

    '&:hover': {
      backgroundColor: theme.palette.grey.normal1,
    },
  }),
);

export const MessageHeaderContainer = styled(Box)({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
});

export const MessageText = styled(Typography)(({ theme }) => ({
  ...theme.typography.body4,
  color: theme.palette.grey.common,
}));

export const TimeStampText = styled(Typography)(({ theme }) => ({
  ...theme.typography.body8,
  align: 'right',
  color: theme.palette.grey.commonSecondary,
}));

export const UserText = styled(Typography)(({ theme }) => ({
  ...theme.typography.h7,
  letterSpacing: '0.1px',
  color: theme.palette.text.primary,
  display: 'block',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  width: '160px',

  '@media (min-width : 1600px)': {
    width: '220px',
  },

  '@media (min-width : 1800px)': {
    width: '280px',
  },
}));

export const ChatBoxContainer = styled(Box)(({ theme }) => ({
  width: '73%',
  height: '100%',
  border: `1px solid ${theme.palette.borderLight}`,
  borderTop: 'none',
}));

export const ChatboxHeaderContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '66px',
  borderBottom: `1px solid ${theme.palette.borderLight}`,
  backgroundColor: theme.palette.background.paper,
  display: 'flex',
  justifyContent: 'space-between',
  padding: '20px',
}));

export const MessageNavigationsContainer = styled(Box)(({ theme }) => ({
  ...ScrollStyles(theme),
  height: 'calc(100% - 04.7rem)',
  overflowY: 'scroll',
  overflowX: 'hidden',
}));

export const MessageNavigationsContainerSkeleton = styled(Box)(({ theme }) => ({
  ...ScrollStyles(theme),
  height: 'calc(100% - 10.5rem)',
  overflowY: 'hidden',
  overflowX: 'hidden',
  padding: '0 20%',
}));

export const ChatboxDetailsHeaderText = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  fontSize: '18px',
  lineHeight: '26px',
  color: theme.palette.text.primary,
}));

export const ChatboxDetailsSubText = styled(Typography)(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '20px',
  color: theme.palette.text.primary,
  width: '250px',
}));

export const ChatboxDetailsHeaderStatusText = styled(Typography)(
  ({ theme }) => ({
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '24px',
    color: theme.palette.grey.common,
  }),
);

export const ChatBoxMessageContainer = styled(Box)(({ theme, height }) => ({
  ...ScrollStyles(theme),
  width: '100%',
  display: 'flex',
  flexDirection: 'column-reverse',
  overflowY: 'scroll',
  height: height ? height : 'calc(100% - 9.8rem)',
  padding: '0 20%',
  margin: 'auto',
}));

export const ChatBoxConversationStarterContainer = styled(
  ChatBoxMessageContainer,
)({
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
});

export const ChatBoxInputContainer = styled(Box)({
  width: '100%',
  height: '7rem',
  // padding: '4px 20px',
  padding: '0 20%',
  display: 'flex',
  columnGap: '10px',
  alignItems: 'center',
  // paddingRight: '50px',
});

export const ChatItemContainer = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-start',
  flexDirection: 'column',
}));

export const ChatItemMainContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  columnGap: '5px',
  alignItems: 'center',
}));

export const ChatItemRowContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'flex-start',
  flexDirection: 'column',
  columnGap: '5px',
}));

export const ChatItemRowInnerContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  columnGap: '5px',
}));

export const NotifierContainer = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
}));

export const NotifierItemRowContainer = styled(Box)(({ theme }) => ({
  maxWidth: '500px',
  margin: '10px 0',
  textAlign: 'center',
  padding: '5.5px 14px',
  borderRadius: '7px',
  backgroundColor: theme.palette.grey.normal2,
}));

export const NotifierItemText = styled(Typography)(({ theme }) => ({
  ...theme.typography.body8,
  color: theme.palette.grey.commonSecondary,
}));

export const ChatItemTextContainer = styled(Box)({
  diplay: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  margin: '0 8px',
});

export const ChatBubble = styled(Box)(({ theme }) => ({
  maxWidth: '1000px',
  borderRadius: '10px',
  display: 'flex',
  alignItems: 'center',
}));

export const ChatBubbleText = styled(Typography)(({ theme }) => ({
  fontFamily: 'inherit',
  fontSize: '16px',
  lineHeight: 1.5,
  fontWeight: 300,
  color: theme.palette.text.primary,
}));

export const ChatBubbleHeader = styled(Typography)(({ theme }) => ({
  fontFamily: 'inherit',
  fontSize: '16px',
  lineHeight: 1.5,
  fontWeight: 'bold',
  color: theme.palette.text.primary,
}));

export const TimeBubbleHeader = styled(Typography)(({ theme }) => ({
  fontFamily: 'inherit',
  fontSize: '11.44px',
  lineHeight: 1.5,
  fontWeight: '400',
  color: theme.palette.text.primary,
}));

export const ChatButtonNotch = styled(Box)({
  position: 'absolute',
  width: '16.5px',
  height: '17px',
  transform: 'matrix(-1, 0, 0, 1, 0, 0)',
});

export const NameTimeStampText = styled(Typography)(({ theme }) => ({
  fontFamily: 'inherit',
  fontWeight: 400,
  fontSize: '12px',
  lineHeight: '14px',
  textAlign: 'end',
  color: theme.palette.grey.common,
}));

export const InputBoxContainer = styled(Box)(
  ({ theme, inverse, isFocused }) => ({
    width: '100%',
    // padding: '5px',
    // backgroundColor: theme.palette.grey.normal1,
    border: `${isFocused ? '2px' : '1px'} solid ${
      inverse ? theme.palette.borderLightInverse66 : theme.palette.borderLight66
    }`,
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    maxHeight: '90px',
    marginBottom: '10px',
    transition: 'border 0.3s',
  }),
);

export const ImageBlock = styled(Avatar)(({ rotate }) => ({
  position: 'absolute',

  width: '105px',
  height: '140px',
  borderRadius: '9.5px',
  transform: `rotate(${rotate}deg)`,
}));

export const ConversationsSubHeader = styled(Typography)(({ theme }) => ({
  ...theme.typography.h9,
  lineHeight: '14px',
  color: theme.palette.grey.common,
}));

export const ConversationSubHeaderLink = styled(ConversationsSubHeader)(
  ({ theme }) => ({
    color: theme.palette.blue.main,
    cursor: 'pointer',
  }),
);

export const ConversationText = styled(NameTimeStampText)({
  // fontSize: '18px',
  // fontWeight: '400',
  // letterSpacing: '0.02em',
});

export const NoConversationLandingContainer = styled(Box)({
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
});

export const NoConversationLandingText = styled(Typography)(({ theme }) => ({
  ...theme.typography.body6,
  color: theme.palette.grey.common,
}));

export const HeaderText = styled(Typography)(({ theme }) => ({
  ...theme.typography.h6,
  letterSpacing: '0.1px',
  color: theme.palette.text.primary,
  display: 'block',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  width: '160px',
  paddingTop: '5px',
  fontWeight: '500',

  '@media (min-width : 1600px)': {
    width: '220px',
  },

  '@media (min-width : 1800px)': {
    width: '280px',
  },
}));

export const ProfileWrap = styled(Button)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontWeight: 400,
  color: theme.palette.text.primary88,
  border: `1px solid ${theme.palette.text.primary}`,
  padding: '8.8px, 17.78px, 8.8px, 17.98px',
  borderRadius: 30,
  margin: theme.spacing(0, 0.5),
  // letterSpacing: '0.02em',
  cursor: 'pointer',
  textTransform: 'none',
  fontSize: 12,
  '&:hover': {
    backgroundColor: theme.palette.background.card,
  },
}));

export const NoChatSelectedContainer = styled(Box)({
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const NoChatSelectedContentContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

export const NoChatSelectedText = styled(Typography)(({ theme }) => ({
  ...theme.typography.body6,
  color: theme.palette.grey.common,
}));
