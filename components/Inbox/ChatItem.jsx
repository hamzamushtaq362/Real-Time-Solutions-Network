import {
  ChatBubble,
  ChatBubbleText,
  NameTimeStampText,
  ChatItemContainer,
  ChatItemRowContainer,
  NotifierItemRowContainer,
  NotifierContainer,
  NotifierItemText,
  ChatBubbleHeader,
  ChatItemMainContainer,
  ChatItemRowInnerContainer,
} from './elements';
import { Avatar, Tooltip } from '~/components';

import { capitalizeWord, convertTimestampToFullDate, getDateLabel, getDateLabelWithTime } from '~/utils';
import Markdown from 'markdown-to-jsx';
import { Box, useTheme } from '@mui/material';

export const ChatItem = ({
  isSender,
  itemType,
  userImage,
  userName,
  fullName,
  timeStamp,
  message,
  shouldShowTimeStamp,
  shouldShowUserDetails,
  index
}) => {
  const theme = useTheme();

  switch (itemType) {
    case 'text':
      return (
        <ChatItemContainer isSender={isSender} key={timeStamp + index} mt={(shouldShowUserDetails || shouldShowTimeStamp) && 2}>
          {shouldShowTimeStamp && (
            <NameTimeStampText
              sx={{
                textAlign: 'center',
              }}
            >
              {getDateLabel(timeStamp)}
            </NameTimeStampText>
          )}

          {(shouldShowUserDetails || shouldShowTimeStamp) && (
            <ChatItemMainContainer>
              <Avatar
                onClick={() => {
                  window.open(`/@${userName}`, '_blank');
                }}
                sx={{ alignSelf: 'flex-start', cursor: 'pointer' }}
                size="35px"
                avatar={userImage}
              />
              <ChatItemRowContainer isSender={isSender}>
                <ChatItemRowInnerContainer>
                  <ChatBubbleHeader>
                    {capitalizeWord(fullName)}
                  </ChatBubbleHeader>
                </ChatItemRowInnerContainer>
              </ChatItemRowContainer>
            </ChatItemMainContainer>
          )}

          <ChatItemRowContainer isSender={isSender} ml={5}>
            <ChatBubble isSender={isSender}>
              <Tooltip title={getDateLabelWithTime(timeStamp)} placement='top'>
                <ChatBubbleText> {message}</ChatBubbleText>
              </Tooltip>
            </ChatBubble>
          </ChatItemRowContainer>
        </ChatItemContainer>
      );
    case 'notifier':
      return (
        <NotifierContainer>
          <NotifierItemRowContainer>
            <NotifierItemText>
              <Markdown>{message || ''}</Markdown>
            </NotifierItemText>
          </NotifierItemRowContainer>
        </NotifierContainer>
      );

    case 'collab-request':
      return (
        <ChatItemContainer isSender={isSender}>
          {shouldShowTimeStamp && (
            <NameTimeStampText
              sx={{
                marginLeft: '2px',
                marginBottom: '4px',
                textAlign: 'center',
              }}
            >
              {convertTimestampToFullDate(timeStamp)}
            </NameTimeStampText>
          )}

          {shouldShowUserDetails && (
            <ChatItemMainContainer>
              <Avatar
                onClick={() => {
                  window.open(`/@${userName}`, '_blank');
                }}
                sx={{ alignSelf: 'flex-start', cursor: 'pointer' }}
                size="35px"
                avatar={userImage}
              />
              <ChatItemRowContainer isSender={isSender}>
                <ChatItemRowInnerContainer>
                  <ChatBubbleHeader>
                    {capitalizeWord(fullName)}
                  </ChatBubbleHeader>
                </ChatItemRowInnerContainer>
              </ChatItemRowContainer>
            </ChatItemMainContainer>
          )}

          <ChatItemMainContainer>
            <Box sx={{ width: '35px' }}></Box>
            <ChatItemRowContainer isSender={isSender}>
              <ChatBubble isSender={isSender}>
                <Box sx={{ color: theme.palette.text.primary }}>
                  <Markdown>{message}</Markdown>
                </Box>
              </ChatBubble>
            </ChatItemRowContainer>
          </ChatItemMainContainer>
        </ChatItemContainer>
      );

    default:
      return 'Message Type not found';
  }
};
