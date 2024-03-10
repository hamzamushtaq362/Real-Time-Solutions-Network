import React from 'react';
import { Box } from '@mui/material';
import { SectionContainer, SectionsContainer, SectionText } from './elements';
import { useTranslation } from 'react-i18next';

const Sections = () => {
  const { t } = useTranslation();

  const topNavSections = [
    {
      title: t('About'),
      id: 'creators',
    },
    {
      title: t('Benefits'),
      id: 'benefits',
    },
    {
      title: t('How it Works'),
      id: 'how-it-works',
    },
    {
      title: t('Metaverse Portfolio'),
      id: 'creative',
    },
  ];

  const handleNavClick = (id) => {
    const section = document.querySelector(`#${id}`);
    if (section) {
      window.scrollTo({ top: section.offsetTop, behavior: 'smooth' });
    }
  }

  return (
    <SectionsContainer>
      {topNavSections.map(({ title, id })=> {
        return (
          <Box key={title} onClick={() => handleNavClick(id)}>
            <SectionContainer>
              <SectionText>{title}</SectionText>
            </SectionContainer>
          </Box>
        )}
      )}
    </SectionsContainer>
  );
};

export default Sections;