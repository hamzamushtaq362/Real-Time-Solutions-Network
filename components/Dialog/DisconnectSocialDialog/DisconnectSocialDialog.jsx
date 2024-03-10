import { useTranslation } from 'react-i18next';
import React from 'react';
import { Box, useTheme } from '@mui/material';

import { Dialog, Spacer, PrimaryButton, Spinner } from '~/components';
import {
  DisconnectSocialAccountDialogContainer,
  DisconnectDiscordHeader,
  DisconnectDiscordLabel,
} from './elements';

export const DisconnectSocialAccountDialog = ({
  onDisconnect,
  disconnectLoading,
  open,
  socialAccountTitle,
  handleClose,
}) => {
  const { t } = useTranslation();

  const theme = useTheme();
  return (
    <Dialog open={open} onClose={handleClose} width="30rem">
      <DisconnectSocialAccountDialogContainer>
        <DisconnectDiscordHeader>
          {t(`Disconnect `) + socialAccountTitle}
        </DisconnectDiscordHeader>

        <Spacer value={20} />

        <DisconnectDiscordLabel>
          {t('Are you sure you want to disconnect your ') +
            socialAccountTitle +
            ' ' +
            t('account') +
            '?'}
        </DisconnectDiscordLabel>

        <Spacer value={20} />

        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <PrimaryButton
            restrictHoverStyles
            width="120px"
            onClick={onDisconnect}
            disabled={disconnectLoading}
          >
            {!disconnectLoading ? (
              'Disconnect'
            ) : (
              <Spinner color={theme.palette.background.default} size={14} />
            )}
          </PrimaryButton>
        </Box>
      </DisconnectSocialAccountDialogContainer>
    </Dialog>
  );
};
