import React from 'react';
import { getSectionIcon, topNavSections } from 'constants/navSections';
import { SectionContainer, SectionsContainer, SectionText, StyledTooltip } from 'components/Navbar/DashboardNavbar/elements';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material';
import { setCurrentQueryPath } from '~/redux';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const TopSections = () => {
  const router = useRouter();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const currentPath = router.asPath;

  const handleNavClick = (path, defaultQueryPath) => {
    dispatch(setCurrentQueryPath(defaultQueryPath));
  }

  return (
    (<SectionsContainer>
      {topNavSections.map(({ title, path, hidden, defaultQueryPath })=> {
        if (hidden) return;
        const isActive = currentPath === path;
        const color = isActive ? theme.palette.grey.greyDark : theme.palette.grey.greyLight;
        const strokeWidth = isActive ? '1.1': '0.6';
        return (path === 'coming soon' ? <StyledTooltip
          title={t("Coming Soon")}
          placement="top"
        >
          <SectionContainer>
            {getSectionIcon(title, path, color, strokeWidth,isActive)}
            <SectionText isActive={isActive}>{t(title)}</SectionText>
          </SectionContainer>
        </StyledTooltip> : <Link key={title} href={path}>
          <SectionContainer data-tour={title.toLowerCase()} onClick={() => handleNavClick(path, defaultQueryPath)}>
            {getSectionIcon(title, path, color, strokeWidth,isActive)}
            <SectionText isActive={isActive}>{t(title)}</SectionText>
          </SectionContainer>
        </Link>);}
      )}
    </SectionsContainer>)
  );
};

export default TopSections;