import * as React from 'react';
import { Box, useTheme } from '@mui/material';
import { IOSSwitch, NavItemText, NavItemWrap, StyledMenu } from './elements';
import { Avatar, Divider, Tooltip } from '~/components';
import { useRouter } from 'next/router';
import { clearSessionData, openLinkInNewTab, captilalizeString } from '~/utils';
import { ProfileInfoItem } from './DropdownComponents';
import { userLogout } from '~/apis';
import { useLocalStorage } from '~/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentQueryPath, setCurrentThemeMode } from '~/redux';
import { useContext, useState } from 'react';
import AppContext from '../../context/AppContext';
import { useIntercom } from 'react-use-intercom';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { getDropdownPaperProps } from 'components/Dropdown/DropdownPaperProps';
import nookies from 'nookies';

export const ProfileDropdown = ({
  userProfileImage,
  userFullName,
  isVerified,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const { themeMode } = useSelector((state) => state.settings);
  const [, setAlertMissingInfo] = useLocalStorage('alertMissingInfo');
  const { user, setUser } = useContext(AppContext);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const { boot, show, hide } = useIntercom();
  // const [auth] = useLocalStorage('auth');
  const theme = useTheme();
  const { t } = useTranslation();

  const router = useRouter();

  const themeSwitchHandler = () => {
    dispatch(
      setCurrentThemeMode({
        mode: themeMode === 'dark' ? 'light' : 'dark',
        setLocalStorage: true,
      }),
    );
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    hide();
  };

  const logoutHandler = async () => {
    if (logoutLoading) return;
    setLogoutLoading(true);
    await userLogout();
    localStorage.removeItem('auth');
    nookies.destroy(null, 'user', { path: '/' });
    setUser(null);
    // Clearing session storage
    clearSessionData();
    setAlertMissingInfo(true);
    setLogoutLoading(false);
    router.push('/');
  };

  const featureRequestHandler = () => {
    boot();
    show();
  };

  const discordHandler = () => {
    openLinkInNewTab('https://discord.gg/rtsn');
    handleClose();
  };
  const handleSettingsClick = () => {
    dispatch(setCurrentQueryPath('profile'));
    handleClose();
  };

  const showDashboard = router.pathname === '/';

  return (
    <>
      <Box onClick={handleClick} sx={{ cursor: 'pointer' }}>
        <Tooltip title={t('Account settings')}>
          <Avatar
            marginRight="10px"
            avatar={userProfileImage}
            showRing
            statusIcon={isVerified ? 'verified' : ''}
            statusIconSize="16px"
            size={32}
            filledColor={theme.palette.background.paper}
          />
        </Tooltip>
      </Box>
      <StyledMenu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        disableScrollLock={false}
        PaperProps={getDropdownPaperProps(theme)}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Link href={`/@${user?.username}`}>
          <ProfileInfoItem
            onClick={handleClose}
            avatar={userProfileImage}
            name={captilalizeString(userFullName || 'No Name')}
            subText={`@${user?.username}`}
            mb={4}
            mx={3}
          />
        </Link>
        {showDashboard && (
          <NavItemText onClick={() => router.push('/dashboard')}>
            {t('Dashboard')}
          </NavItemText>
        )}

        <Box my={1}>
          <Divider color={theme.palette.borderLight} />
        </Box>

        <Link href="/team/explore">
          <NavItemText onClick={handleClose}>{t('Teams')}</NavItemText>
        </Link>

        {/* {auth?.isCurator && (
          <Link href="/curations">
            <NavItemText onClick={handleClose}>{t('Curations')}</NavItemText>
          </Link>
      )} */}

        <Box my={1}>
          <Divider color={theme.palette.borderLight} />
        </Box>

        <Link href="https://discord.gg/rtsn">
          <NavItemText onClick={discordHandler}>
            {t('Join Discord')}
          </NavItemText>
        </Link>
        <NavItemText onClick={featureRequestHandler}>
          {t('Live Support')}
        </NavItemText>
        <Box my={1}>
          <Divider color={theme.palette.borderLight} />
        </Box>

        <NavItemWrap>
          <Box>{t('Dark Mode')}</Box>
          <IOSSwitch
            checked={themeMode !== 'light'}
            onChange={() => themeSwitchHandler()}
          />
        </NavItemWrap>

        <Link href="/settings">
          <NavItemText onClick={handleSettingsClick}>
            {t('Settings')}
          </NavItemText>
        </Link>
        <Box my={1}>
          <Divider color={theme.palette.borderLight} />
        </Box>
        <NavItemText onClick={logoutHandler} logout>
          {t('Logout')}
        </NavItemText>
      </StyledMenu>
    </>
  );
};
