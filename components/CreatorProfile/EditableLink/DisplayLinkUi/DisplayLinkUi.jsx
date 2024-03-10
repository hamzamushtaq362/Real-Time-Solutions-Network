import React from 'react';
import { Box, Grid } from '@mui/material';
import { LinkText } from 'components/UserSettings/UserSettingsProfileSection/elements';
import { PrimaryButton } from '~/components';
import { useTranslation } from 'react-i18next';
import { getRefinedValue, truncateString } from '~/utils';
import { getSocialIcon, socialsLinks } from '../../utils';

export const DisplayLinkUi = ({
  isHovered,
  index,
  toggleEdit,
  metaTitle,
  link,
}) => {
  const { t } = useTranslation();


  return (
    <>
      <Grid item xs={6} lg={9} sx={{marginBottom: 2}}>
        {_renderSocialLink(metaTitle, link)}
      </Grid>

      <Grid item xs={6} lg={3}>
        <PrimaryButton
          onClick={() => toggleEdit(index)}
          style={{ visibility: isHovered ? 'visible' : 'hidden' }}
        >
          {t('Edit')}
        </PrimaryButton>
      </Grid>
    </>
  );
};

export const _renderSocialLink = (metaTitle, link) => {
  const handleLinkClick = () => {
    if (typeof window !== 'undefined') {
      window.open(link);
    }
  };

  const checkMetadataValidity = () => {
    return metaTitle && socialsLinks.some(social => metaTitle?.toLowerCase()?.includes(social?.toLowerCase())) && metaTitle.includes(' ');
  }
  return (
    <LinkText
      onClick={handleLinkClick}
    >
      {socialsLinks.some(social => link?.toLowerCase()?.includes(social?.toLowerCase())) ?
        <>
          {getSocialIcon(link)}
          <Box ml='5px'>{checkMetadataValidity() ? truncateString(metaTitle, 30) : getRefinedValue(link)}</Box>
        </> :
        truncateString(metaTitle || link, 30)
      }
      <Box component='span'>
        {' '} ↗
      </Box>
    </LinkText>
  )
}
