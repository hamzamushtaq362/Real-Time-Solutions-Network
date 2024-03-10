import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { Menu as MenuIcon } from '@mui/icons-material';
import { Menu, useTheme, Divider } from '@mui/material';
import { RoundedBorderedContainer, NormalMenuItemContainer } from './elements';
import {
  getRightButtonIcon,
  getSectionIcon,
  topNavSections,
} from '../../constants/navSections';
import { useRouter } from 'next/router';
import { setCurrentQueryPath } from '~/redux';
import { useDispatch, useSelector } from 'react-redux';
import { SectionText, StyledTooltip } from '../Navbar/DashboardNavbar/elements';
import { profileDropdownPaperProps } from './DropdownPaperProps';
import Link from 'next/link';
import { RightButtonText } from '../SecondaryNavbar/elements';

const ActionContent = ({ action }) => {

  const theme = useTheme();
  const { title, icon, active } = action || {};
  return (
    <RightButtonText display="flex" alignItems="center">
      {icon && (
        <RightButtonText>
          {getRightButtonIcon(icon, theme.palette.grey.common, active)}
        </RightButtonText>
      )}
      <RightButtonText ml={1}>{title}</RightButtonText>
    </RightButtonText>
  );
};

const ProfileDropdownMobile = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const theme = useTheme();
  const currentPath = router.asPath;
  const dispatch = useDispatch();
  const { navActions } = useSelector(({ route }) => route);
  const { t } = useTranslation();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavClick = (path, defaultQueryPath) => {
    router.push(path);
    dispatch(setCurrentQueryPath(defaultQueryPath));
    setAnchorEl(null);
  };

  return (<>
    <RoundedBorderedContainer onClick={handleMenuOpen} ml={2}>
      <MenuIcon
        fontSize="large"
        sx={{ fill: theme.palette.text.primary }}
      />
    </RoundedBorderedContainer>
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleMenuClose}
      disableScrollLock={false}
      PaperProps={profileDropdownPaperProps}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      {topNavSections.map(({ title, path, hidden, defaultQueryPath }) => {
        if (hidden) return;
        const isActive = currentPath === path;
        const color = isActive
          ? theme.palette.grey.greyHeavy
          : theme.palette.grey.greyLight;
        const strokeWidth = isActive ? '1.1' : '0.6';
        const isComingSoon = path === 'coming soon';
        return isComingSoon ? (
          <StyledTooltip title={t("Coming Soon")} placement="top">
            <NormalMenuItemContainer>
              {getSectionIcon(title, path, color, strokeWidth)}
              <SectionText isActive={isActive}>{title}</SectionText>
            </NormalMenuItemContainer>
          </StyledTooltip>
        ) : (
          <NormalMenuItemContainer
            onClick={() => handleNavClick(path, defaultQueryPath)}
          >
            {getSectionIcon(title, path, color, strokeWidth)}
            <SectionText isActive={isActive}>{title}</SectionText>
          </NormalMenuItemContainer>
        );
      })}
      {navActions && navActions.length !== 0 && (
        <>
          <Divider />
          {navActions.map((action, index) => (
            <NormalMenuItemContainer
              key={index}
              onClick={(event) =>
                action?.type === 'function' && action?.fnHandler(event)
              }
            >
              {action?.type === 'function' ? (
                <ActionContent action={action} />
              ) : (
                <Link
                  href={action?.path}
                  style={{ color: theme.palette.grey.common }}
                >
                  <ActionContent action={action} />
                </Link>
              )}
            </NormalMenuItemContainer>
          ))}
        </>
      )}
    </Menu>
  </>);
};

export default ProfileDropdownMobile;
