import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { MenuContainer, MenuText } from './elements';
import { HamburgerIcon } from '~/components';
import { NormalMenuItemContainer, RoundedBorderedContainer } from '../../Dropdown/elements';
import { useIsMobileView } from '~/utils';
import { profileDropdownPaperProps } from '../../Dropdown/DropdownPaperProps';
import { SectionText } from '../../Navbar/DashboardNavbar/elements';
import { Divider, Menu, useTheme } from '@mui/material';
import { setCurrentDialog } from '~/redux';
import { useDispatch } from 'react-redux';

const sections = [
  {
    title: 'About',
    id: 'about',
  },
  {
    title: 'Benefits',
    id: 'benefits',
  },
  {
    title: 'How it Works',
    id: 'how-it-works',
  },
  {
    title: 'Metaverse Portfolio',
    id: 'creative',
  },
  {
    title: 'Badges',
    id: 'badges',
  }
]
const MobileMenu = () => {
  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const isMobileView = useIsMobileView()
  const theme = useTheme();
  const dispatch = useDispatch();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavClick = (id) => {
    setAnchorEl(null);
    const section = document.querySelector(`#${id}`);
    if (section) {
      window.scrollTo({ top: section.offsetTop, behavior: 'smooth' });
    }
  };


  return (
    (<MenuContainer isMobileView={isMobileView}>
      <MenuText>{t("Menu")}</MenuText>
      <RoundedBorderedContainer onClick={handleMenuOpen} ml={2} backgroundColor={t("unset !important")} boxShadow={t("none !important")}>
        <HamburgerIcon width={26} height={26} color={theme.palette.text.primary} sx={{cursor: 'pointer'}} />
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
        {sections.map(({ title, id }) =>
          <NormalMenuItemContainer onClick={() => handleNavClick(id)} key={title}>
            <SectionText>{title}</SectionText>
          </NormalMenuItemContainer>
        )}
        <Divider />
        <NormalMenuItemContainer onClick={() => {
          setAnchorEl(null);
          dispatch(setCurrentDialog('signup-open-dialog'));
        }}>
          <SectionText>{t("Collaborate Now")}</SectionText>
        </NormalMenuItemContainer>
      </Menu>
    </MenuContainer>)
  );
};

export default MobileMenu;