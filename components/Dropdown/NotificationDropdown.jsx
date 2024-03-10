import React, { Fragment, useContext, useState } from 'react';
import { Box, IconButton, Menu, useTheme } from '@mui/material';
import { SmallSpinner, Spacer, Tooltip } from '~/components';
import {
  NoNewNotifications,
  NotificationMenuItem,
  NotificationMenuItemSkeleton,
} from './DropdownComponents';
import {
  DropdownFilterText,
  DropdownHeaderText,
  NotificationDropdownFilter,
  NotificationDropdownHeader,
  NotificationsListScrollContainer,
} from './elements';
import { useRouter } from 'next/router';
import { notificationsDropdownPaperProps } from './DropdownPaperProps';
import AppContext from '../../context/AppContext';
import NotificationOutlinedIcon from 'components/Icons/NotificationOutlinedIcon';
import { useDispatch, useSelector } from 'react-redux';
import {
  setBadgeImage,
  setBadgeType,
  setShowBadgeDialog,
} from 'redux/badgeSlice';
import { useTranslation } from 'react-i18next';
import { BASE_URL, fetchRefreshToken, markNotificationRead } from '~/apis';
import { useNotistack } from 'hooks/useNotistack';
import { reFetchTokenExpire } from '~/redux';
import axios from 'axios';
import { getFormattedNotifications, sortByTimestamp } from '~/utils';
import InfiniteScroll from 'react-infinite-scroll-component';
import { FlexBox } from '../common/elements';

export const NotificationDropdown = () => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const { themeMode } = useSelector((state) => state.settings);
  const open = Boolean(anchorEl);
  const { loading, setLoading, notifications, setNotifications } =
    useContext(AppContext);
  const shouldShowNotification = notifications.some(
    (notification) => !notification.isRead,
  );
  const [page, setPage] = useState(1);
  const [totalNotifications, setTotalNotifications] = useState(0);

  const generateSnackbar = useNotistack();
  const theme = useTheme();
  const router = useRouter();

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleNotificationMenuItem = (
    typeOfCollabNotification,
    notificationImage,
    badgeType,
    navigateTo,
    _id,
  ) => {
    handleCloseMenu();
    if (
      typeOfCollabNotification === 'badge-awarded' ||
      typeOfCollabNotification === 'badge-awarded-user-created'
    ) {
      dispatch(setBadgeImage(notificationImage));
      dispatch(setBadgeType(badgeType));
      dispatch(setShowBadgeDialog(true));
    }
    if (_id) {
      markAsRead(_id);
    }
    router.push(navigateTo);
  };

  const markAsRead = async (id) => {
    try {
      await markNotificationRead(id);
    } catch {
      generateSnackbar('Something went wrong while mark notification as read');
    }
  };
  const fetchNotifications = async (page) => {
    try {
      if (page === 1) {
        setLoading(true);
      }
      const f1 = async () => {
        return await axios.get(
          `${BASE_URL}/notification/getAll?limit=7&page=${page}`,
        );
      };
      const res = await reFetchTokenExpire(f1, fetchRefreshToken);
      if (res.data.status === 'success') {
        const newNotifications = res?.data?.notifications;
        const formattedNotifications = getFormattedNotifications(
          newNotifications,
          dispatch,
        );
        setTotalNotifications(res?.data?.total);
        setNotifications((prevNotifications) =>
          page === 1
            ? formattedNotifications
            : [...prevNotifications, ...formattedNotifications],
        );
        if (page === 1) {
          setLoading(false);
        }
      }
    } catch (err) {
      if (page === 1) {
        setLoading(false);
      }
    }
  };
  const handleClickNotificationIcon = async (event) => {
    setAnchorEl(event.currentTarget);
    setPage(1);
    setNotifications([]);
    await fetchNotifications(1);
  };
  const fetchNextNotifications = async () => {
    setPage(page + 1);
    await fetchNotifications(page + 1);
  };
  const [activeTab, setActiveTab] = useState('all');

  const dispatch = useDispatch();

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Notifications">
          <IconButton
            onClick={handleClickNotificationIcon}
            data-tour="notifications"
            size="medium"
            disableRipple
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            sx={{ position: 'relative' }}
          >
            {shouldShowNotification ? (
              <div
                style={{
                  backgroundColor:
                    themeMode === 'dark' && !isHovered
                      ? theme.palette.grey.common
                      : themeMode === 'dark' && isHovered
                      ? theme.palette.background.inverse
                      : themeMode === 'light' && isHovered
                      ? theme.palette.background.inverse
                      : theme.palette.grey.common,
                  height: '8px',
                  width: '8px',
                  borderRadius: '100%',
                  position: 'absolute',
                  top: '8px',
                  left: '19px',
                }}
              ></div>
            ) : (
              <></>
            )}
            <NotificationOutlinedIcon
              width={19}
              height={19}
              stroke={
                isHovered
                  ? theme.palette.background.inverse
                  : theme.palette.grey.common
              }
            />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        disableScrollLock={false}
        onClose={handleCloseMenu}
        PaperProps={notificationsDropdownPaperProps}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <NotificationDropdownHeader>
          <DropdownHeaderText>{t('Notifications')}</DropdownHeaderText>
        </NotificationDropdownHeader>
        <NotificationDropdownFilter>
          <DropdownFilterText
            id={activeTab}
            onClick={() => setActiveTab('all')}
          >
            {t('All')}
          </DropdownFilterText>

          <DropdownFilterText
            id={activeTab}
            onClick={() => setActiveTab('invites')}
          >
            {t('Invites')}
          </DropdownFilterText>
          <DropdownFilterText
            id={activeTab}
            onClick={() => setActiveTab('follows')}
          >
            {t('Follows')}
          </DropdownFilterText>
        </NotificationDropdownFilter>
        <NotificationsListScrollContainer id="scrollableDiv">
          <InfiniteScroll
            dataLength={notifications?.length || 0}
            next={fetchNextNotifications}
            hasMore={totalNotifications !== notifications.length}
            loader={
              <FlexBox width="100%" justifyContent="center">
                <SmallSpinner inverse />
              </FlexBox>
            }
            endMessage={<></>}
            style={{ overflowX: 'hidden' }}
            height={480}
            scrollableTarget="scrollableDiv"
          >
            {!loading ? (
              <>
                {notifications.length > 0 || notifications.length > 0 ? (
                  <>
                    {/* read notifications */}
                    {activeTab === 'all' &&
                      notifications
                        .sort(sortByTimestamp)
                        .filter(
                          (item) =>
                            item.typeOfCollabNotification !== 'general-message',
                        )
                        .map(
                          (
                            {
                              _id,
                              fullname,
                              username,
                              message,
                              boldMessage,
                              notificationImage,
                              navigateTo,
                              timeStamp,
                              statusIcon,
                              isRead,
                              typeOfCollabNotification,
                              badgeType,
                              showInitialName,
                              title,
                            },
                            keyIndex,
                          ) => (
                            <Fragment key={`${keyIndex}`}>
                              <NotificationMenuItem
                                onClick={() =>
                                  handleNotificationMenuItem(
                                    typeOfCollabNotification,
                                    notificationImage,
                                    badgeType,
                                    navigateTo,
                                    _id,
                                  )
                                }
                                fullname={fullname}
                                username={username}
                                message={message}
                                boldMessage={boldMessage}
                                notificationImage={notificationImage}
                                timeStamp={timeStamp}
                                statusIcon={statusIcon}
                                isRead={isRead}
                                typeOfCollabNotification={
                                  typeOfCollabNotification
                                }
                                showInitialName={showInitialName}
                                title={title}
                              />
                            </Fragment>
                          ),
                        )}

                    {activeTab === 'invites' &&
                      notifications
                        .filter(
                          (item) =>
                            item.typeOfCollabNotification === 'collab-invite',
                        )
                        .map(
                          (
                            {
                              _id,
                              fullname,
                              username,
                              message,
                              boldMessage,
                              notificationImage,
                              navigateTo,
                              timeStamp,
                              statusIcon,
                              isRead,
                              typeOfCollabNotification,
                              showInitialName,
                              title,
                            },
                            keyIndex,
                          ) => (
                            <Fragment key={`${keyIndex}`}>
                              <NotificationMenuItem
                                onClick={() => {
                                  handleCloseMenu();
                                  markAsRead(_id);
                                  router.push(navigateTo);
                                }}
                                fullname={fullname}
                                username={username}
                                message={message}
                                boldMessage={boldMessage}
                                notificationImage={notificationImage}
                                timeStamp={timeStamp}
                                statusIcon={statusIcon}
                                isRead={isRead}
                                typeOfCollabNotification={
                                  typeOfCollabNotification
                                }
                                showInitialName={showInitialName}
                                title={title}
                              />
                            </Fragment>
                          ),
                        )}
                    {activeTab === 'follows' &&
                      notifications
                        .filter(
                          (item) =>
                            item.typeOfCollabNotification ===
                            'user-started-following',
                        )
                        .map(
                          (
                            {
                              _id,
                              fullname,
                              username,
                              message,
                              boldMessage,
                              notificationImage,
                              navigateTo,
                              timeStamp,
                              statusIcon,
                              isRead,
                              typeOfCollabNotification,
                              showInitialName,
                              title,
                            },
                            keyIndex,
                          ) => (
                            <Fragment key={`${keyIndex}`}>
                              <NotificationMenuItem
                                onClick={() => {
                                  handleCloseMenu();
                                  markAsRead(_id);
                                  router.push(navigateTo);
                                }}
                                fullname={fullname}
                                username={username}
                                message={message}
                                boldMessage={boldMessage}
                                notificationImage={notificationImage}
                                timeStamp={timeStamp}
                                statusIcon={statusIcon}
                                isRead={isRead}
                                typeOfCollabNotification={
                                  typeOfCollabNotification
                                }
                                showInitialName={showInitialName}
                                title={title}
                              />
                            </Fragment>
                          ),
                        )}
                  </>
                ) : (
                  <NoNewNotifications />
                )}
              </>
            ) : (
              <>
                <Spacer value={24} />
                {[
                  ...Array(
                    notifications.length !== 0 ? notifications.length : 6,
                  ),
                ].map(() => (
                  <>
                    <NotificationMenuItemSkeleton />
                  </>
                ))}
              </>
            )}
          </InfiniteScroll>
        </NotificationsListScrollContainer>
        <Spacer value={16} />
      </Menu>
    </>
  );
};
