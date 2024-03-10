import React from 'react';
import { Box, useTheme } from '@mui/material';
import {
  SideDetailsLabelValueContainer,
  RoleLabel,
  RoleValue,
} from './elements';
import CanRender from 'components/CanRender';
import { UserAction } from '~/config';
import { useTranslation } from 'react-i18next';
import { OutlinedButton } from 'components';
import { useCollabEditNavigator } from 'hooks';

export const SideDetailsLabelValue = ({ label, value, variant = 'medium' }) => {
  const theme = useTheme();

  return (
    <SideDetailsLabelValueContainer>
      <Box>
        <RoleLabel variant={variant}>{label}</RoleLabel>
      </Box>
      <Box>
        <RoleValue
          color={theme.palette.text.primary}
          marginLeft={'20px'}
          variant={variant}
        >
          {value}
        </RoleValue>
      </Box>
    </SideDetailsLabelValueContainer>
  );
};

export const ContributedCollabEditOption = ({ user, collabDetails }) => {
  const { t } = useTranslation();

  const { onCollabEdit } = useCollabEditNavigator();

  return (
    <>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          padding: '4px 40px',
        }}
      >
        <CanRender
          currentRole={user?.userRole}
          action={UserAction.CREATE_CONTRIBUTE_COLLAB}
          yes={() => (
            <>
              <OutlinedButton
                height={54}
                onClick={() => onCollabEdit(collabDetails)}
              >
                {t('Edit Collab')}
              </OutlinedButton>
            </>
          )}
        />
      </Box>
    </>
  );
};
