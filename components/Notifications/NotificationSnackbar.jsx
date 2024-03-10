/* eslint-disable react/display-name */
import React, { forwardRef } from 'react';
import {
  NotificationAssetText,
  NotificationAvatarContainer,
  NotificationMenuItemContainer,
  NotificationTextContainer,
  UserText,
} from './elements';
import { Avatar } from '~/components';
import { Box, useTheme } from '@mui/material';

import { getSnackbarBackgroundColor } from '~/wrappers';
import { useRouter } from 'next/router';

const NotificationSnackbar = forwardRef((props, ref) => {
  const theme = useTheme();
  const { anchorOrigin, variant } = props;
  const router = useRouter();
  const backgroundColor = getSnackbarBackgroundColor(
    variant,
    theme.palette.snackbar,
  );
  const {
    fullname,
    // username,
    message,
    boldMessage,
    notificationImage,
    statusIcon,
    navigateTo,
  } = anchorOrigin?.customData || {};

  return (
    <Box
      {...props}
      ref={ref}
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: '15px 8px 15px 16px',
        backgroundColor,
        borderRadius: '12px',
        width: '410px',
        // boxShadow: '0px 0px 0px 2px rgb(0 0 0 / 15%)',
      }}
    >
      <NotificationMenuItemContainer onClick={() => router.push(navigateTo)}>
        {/*<NotificationHeader>*/}
        {/*  <NotificationTitle>New Notification</NotificationTitle>*/}
        {/*  <IconButton>*/}
        {/*    <ImageIconElement*/}
        {/*      src={CloseIcon}*/}
        {/*      width="25px"*/}
        {/*      height="25px"*/}
        {/*      onClick={(event) => {*/}
        {/*        event.preventDefault();*/}
        {/*        action();*/}
        {/*      }}*/}
        {/*    />*/}
        {/*  </IconButton>*/}
        {/*</NotificationHeader>*/}
        <NotificationAvatarContainer>
          <Avatar
            statusIcon={statusIcon || 'verified'}
            size="50px"
            avatar={notificationImage}
            statusIconSize={22}
          />
          <NotificationTextContainer>
            <Box
              sx={{
                display: 'flex',
                padding: 0,
                width: '100%',
                justifyContent: 'space-between',
              }}
            >
              <Box sx={{ display: 'flex', padding: 0 }}>
                <UserText>{fullname}</UserText>
                {/* <NotificationLightText marginLeft="4px">
                  {username}
                </NotificationLightText> */}
              </Box>
            </Box>
            <Box>
              <NotificationAssetText>
                {message}
                <span style={{ fontWeight: 500 }}> {boldMessage} </span>
              </NotificationAssetText>
            </Box>
            {/*<Box display="flex" alignItems="center" mt={1}>*/}
            {/*  <TimeStampText>{timeStamp}</TimeStampText>*/}
            {/*</Box>*/}
          </NotificationTextContainer>
        </NotificationAvatarContainer>
      </NotificationMenuItemContainer>
    </Box>
  );
});

export default NotificationSnackbar;
