import { useTranslation } from 'react-i18next';
import React, { useContext } from 'react';

import {
  HeaderContainer,
  CreateCollabButton,
  CollabHeaderRightButtonsContainer,
  AddIconElement,
} from './elements';

import { AddIcon } from '~/assets';
import { Iconify, Tooltip, ExploreCollabButtonGroup } from '~/components';
import { trackMixPanel } from '~/utils';

import { IconButton, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { StyledTooltip } from '../../DashboardHome/elements';
import AppContext from 'context/AppContext';

export const CollabsExploreHeader = ({
  activeTab,
  setActiveTab,
  loading,
  refreshHandler,
}) => {
  const { t } = useTranslation();
  const { user } = useContext(AppContext);
  const isProfileComplete = user?.isProfileComplete;
  const router = useRouter();
  const theme = useTheme();

  return (
    (<HeaderContainer>
      <ExploreCollabButtonGroup
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <CollabHeaderRightButtonsContainer>
        {activeTab !== 'invites' && (
          <Tooltip title="Refresh" placement="left" disabled={loading}>
            <IconButton
              disabled={loading}
              size="large"
              onClick={refreshHandler}
            >
              <Iconify
                icon="bx:refresh"
                color={
                  !loading
                    ? theme.palette.grey.common
                    : theme.palette.grey.greyD3
                }
                width="24px"
                height="24px"
              />
            </IconButton>
          </Tooltip>
        )}

        <StyledTooltip
          title={
            isProfileComplete
              ? null
              : 'Complete your profile first to create/join Collabs'
          }
        >
          <span>
            <CreateCollabButton
              disabled={!isProfileComplete}
              variant="contained"
              onClick={() => {
                router.push('/collab/create');
                trackMixPanel('Collabs_Explore_Create_Collab_Btn');
              }}
            >
              {" "}
              <AddIconElement src={AddIcon.src} alt="add-icon" />{t("Create Collab")}</CreateCollabButton>
          </span>
        </StyledTooltip>
      </CollabHeaderRightButtonsContainer>
    </HeaderContainer>)
  );
};
