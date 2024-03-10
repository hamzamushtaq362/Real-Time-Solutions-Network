import { useTranslation } from 'react-i18next';
import React, { useContext, useState } from 'react';
import { DrawerWrapContainer } from '../elements';
import {
  CrossWrap,
  DialogTitle,
} from 'components/CollabDetails/CollabDetailsComponents/CollabDetailsSections/CollabDetailsMembers/elements';
import { RoundedBorderedContainer } from 'components/Dropdown/elements';
import CloseIcon from 'components/Icons/CloseIcon';
import {
  Divider,
  RightDrawer, StyledInput, PrimaryButton,
} from '~/components';
import { Box, useTheme } from '@mui/material';

import AppContext from 'context/AppContext';
import { useNotistack } from '~/hooks';
import { updateCollab } from '~/apis';
import {
  getSocialEmbed
} from '../../CollabDetails/CollabDetailsComponents/CollabDetailsSections/CollabDetailsLaunchpad/utils';
import { isValidURL } from '~/utils';

export const AddSocialHighlightsDrawer = ({
  open,
  toggleDrawer,
  collabDetails,
  setCollabDetails
}) => {
  const { t } = useTranslation();
  const generateSnackbar = useNotistack();

  const theme = useTheme();
  const [url, setUrl] = useState('');

  const handleSaveSocial = async () => {
    if (isValidURL(url)){
      const existingHighlights = collabDetails?.socialHighlights || [];
      const updatedCollab = await updateCollab({
        id: collabDetails?.id,
        socialHighlights: [...existingHighlights, { url }]
      })
      setCollabDetails(updatedCollab?.data?.collab);
      setUrl('');
      toggleDrawer();
    }else {
      generateSnackbar('Invalid URL', 'error');
    }
  }


  return (
    <RightDrawer open={open} handleClose={toggleDrawer}>
      <DrawerWrapContainer>
        <CrossWrap>
          <RoundedBorderedContainer
            onClick={toggleDrawer}
            borderColor={theme.palette.borderLightInverse}
            boxShadow="none"
            background="transparent"
          >
            <CloseIcon
              width={20}
              height={20}
              color={theme.palette.text.inverse}
            />
          </RoundedBorderedContainer>
        </CrossWrap>
        <DialogTitle>{t('Add Social Highlight')}</DialogTitle>

        <Divider color={theme.palette.borderLightInverse} margin="32px 0" />

        <Box>
          <StyledInput
            fullWidth
            value={url}
            placeholder={t('Paste URL')}
            onChange={(e) => setUrl(e.target.value)}
            inverse
          />

          {isValidURL(url) && <Box my={2}>
            {getSocialEmbed(url)}
          </Box>}

          <PrimaryButton
            width="100px"
            variant="contained"
            onClick={handleSaveSocial}
            inverse
            marginTop='20px'
            restrictHoverStyles
          >
            Save
          </PrimaryButton>
        </Box>

      </DrawerWrapContainer>
    </RightDrawer>
  );
};
