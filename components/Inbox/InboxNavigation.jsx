/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import {
  InboxNavigationContainer,
  InboxNavigationContentContainer,
  MessageNavigationsContainer,
  ConversationsSubHeader,
  NavigationHeaderContainer,
  HeaderText,
} from './elements';
import { MessageMenuItemSkeleton } from './InboxSkeletons';
import { MessageMenuItem } from './InboxComponents';
import { Divider, Spacer, ConversationsDropdown } from '~/components';

import { Box, useTheme } from '@mui/material';
import { IconButton } from '@mui/material';
import { captilalizeString } from '~/utils';
import { useTranslation } from 'react-i18next';
import MessageDropDownIcon from 'components/Icons/MessageDropDownIcon';
import { useSelector } from 'react-redux';

export const InboxNavigation = ({
  conversations,
  conversationsLoading,
  selectedOptions,
  setSelectedOptions,
  currentActiveGeneralConversationId,
  currentActiveCollabConversationId,
  conversationItemClickHandler,
  groupConversationItemClickHanlder,
  groupCollabItemClickHandler,
}) => {
  const { t } = useTranslation();
  const { pageWidth } = useSelector((state) => state.rtsnWidth);

  const theme = useTheme();

  const [filterOptions] = useState(['connections', 'collabs', 'requests']);

  return (
    <InboxNavigationContainer>
      <NavigationHeaderContainer sx={{ position: 'relative' }}>
        <HeaderText sx={{ marginLeft: `${pageWidth / 6}px` }}>Inbox</HeaderText>

        <ConversationsDropdown
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
          menuWidth={'27%'}
          options={filterOptions}
        >
          <Box>
            <IconButton
              size="small"
              sx={{ height: '40px' }}
              data-tour="messages"
              disableRipple
            >
              <MessageDropDownIcon
                fill={theme.palette.text.primary}
                width={40}
                height={40}
              />
            </IconButton>
          </Box>
        </ConversationsDropdown>
      </NavigationHeaderContainer>
      <Divider strokeWidth="0.8px" color={theme.palette.borderLight} />
      <InboxNavigationContentContainer>
        {!conversationsLoading ? (
          <MessageNavigationsContainer>
            <>
              {/* All Conversations */}
              {conversations.length > 0 ? (
                <>
                  {conversations.map((conversation) => {
                    const {
                      _id,
                      updatedAt,
                      messageType,
                      messageContent,
                      image,
                      messageHeader,
                      fullName,
                      type,
                      timeStamp,
                    } = conversation;
                    return (
                      <>
                        <MessageMenuItem
                          type={type}
                          key={_id}
                          active={
                            type === 'general'
                              ? currentActiveGeneralConversationId === _id
                              : currentActiveCollabConversationId === _id
                          }
                          timeStamp={updatedAt || timeStamp}
                          messageType={messageType}
                          messageHeader={captilalizeString(
                            fullName ? fullName : messageHeader,
                          )}
                          image={image}
                          messageText={messageContent}
                          width="100%"
                          onClick={() => {
                            if (type === 'general') {
                              conversationItemClickHandler(_id);
                            } else {
                              // If conversation is created then we will have conversation Id and collab Id
                              if (conversation?.collabConversationId !== _id) {
                                groupConversationItemClickHanlder(conversation);
                              }
                              // Else the collab Id is the conversation Id
                              else {
                                groupCollabItemClickHandler(conversation);
                              }
                            }
                          }}
                        />
                        <Divider width="95%" />
                        <Spacer value={4} />
                      </>
                    );
                  })}
                </>
              ) : (
                <>
                  <Spacer value={32} />
                  <ConversationsSubHeader>
                    {t('No Conversations found')}
                  </ConversationsSubHeader>
                  <Spacer value={32} />
                </>
              )}
            </>

            {/* {activeTab === 'requests' && (
              <>
                {conversations.filter(
                  (conversation) => conversation.collabRequest,
                ).length > 0 ? (
                  <>
                    {conversations
                      .filter((conversation) => conversation.collabRequest)
                      .map((conversation) => {
                        const {
                          _id,
                          updatedAt,
                          messageType,
                          messageContent,
                          image,
                          messageHeader,
                          fullName,
                          type,
                          timeStamp,
                        } = conversation;
                        return (
                          <>
                            <MessageMenuItem
                              type={type}
                              key={_id}
                              active={
                                type === 'general'
                                  ? currentActiveGeneralConversationId === _id
                                  : currentActiveCollabConversationId === _id
                              }
                              timeStamp={updatedAt || timeStamp}
                              messageType={messageType}
                              messageHeader={captilalizeString(
                                fullName ? fullName : messageHeader,
                              )}
                              image={image}
                              messageText={messageContent}
                              width="100%"
                              onClick={() => {
                                if (type === 'general') {
                                  conversationItemClickHandler(_id);
                                } else {
                                  groupConversationItemClickHanlder(
                                    conversation,
                                  );
                                }
                              }}
                            />

                            <Divider width="95%" />
                            <Spacer value={4} />
                          </>
                        );
                      })}
                  </>
                ) : (
                  <>
                    <Spacer value={32} />
                    <ConversationsSubHeader>
                      {t('No Requests found')}
                    </ConversationsSubHeader>
                    <Spacer value={32} />
                  </>
                )}
              </>
            )} */}
          </MessageNavigationsContainer>
        ) : (
          <MessageNavigationsContainer sx={{ marginTop: '20px' }}>
            {[...Array(12)].map((_, index) => (
              <>
                <MessageMenuItemSkeleton key={index} />
              </>
            ))}
          </MessageNavigationsContainer>
        )}
      </InboxNavigationContentContainer>
    </InboxNavigationContainer>
  );
};
