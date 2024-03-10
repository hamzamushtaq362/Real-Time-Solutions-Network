import React, { useContext, useState } from 'react';
import {
  ActionWrap,
  ActionText,
  ActionTitle,
  // DashboardDescription,
  DashboardTitle,
  DashboardSectionContainer,
} from './elements';
import { captilalizeString, getFirstName } from '~/utils';
import { useLocalStorage } from '~/hooks';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { Box, Grid, useTheme } from '@mui/material';
import { setCurrentDialog, setCurrentQueryPath } from '~/redux';
import { SelectCollabType } from '~/components';
import { ArrowRightUpLongIconStyled } from 'components/common/elements';
import { useTranslation } from 'react-i18next';
import CanRender from 'components/CanRender';
import { UserAction } from '~/config';
import AppContext from 'context/AppContext';

export const Welcome = () => {
  const [auth] = useLocalStorage('auth');
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState('');
  const { user } = useContext(AppContext);

  const navigationhandler = (path, queryPath) => {
    router.push(path);
    dispatch(setCurrentQueryPath(queryPath));
  };

  const actions = [
    {
      title: t('Create Portfolio'),
      id: '1',
      actionText: 'Start Now',
      actionType: UserAction.VISIT_SETTINGS,
      clickHandler: () =>
        navigationhandler('/settings?view=profile', 'profile'),
    },
    {
      title: t('Discover Opportunities'),
      id: '2',
      actionText: 'Explore More',
      actionType: UserAction.EXPLORE_COLLABS,
      clickHandler: () => navigationhandler('/collab/explore?view=all', 'all'),
    },
    {
      title: t('Create Collab'),
      id: '3',
      actionText: 'Create',
      actionType: UserAction.CREATE_COLLAB,
      clickHandler: () =>
        dispatch(setCurrentDialog('select-collab-type-dialog')),
    },
  ];

  const getWelcomeText = () => {
    if (auth?.fullName || auth?.username) {
      return `${t('Welcome')} ${
        auth?.fullName
          ? getFirstName(auth?.fullName)
          : `${captilalizeString(auth?.username || '')}`
      }`;
    } else {
      return t('Welcome');
    }
  };

  return (
    <DashboardSectionContainer px={4}>
      <DashboardTitle>{getWelcomeText()}</DashboardTitle>
      {/*<DashboardDescription>*/}
      {/*  {t('Here we show you how to get started')}*/}
      {/*</DashboardDescription>*/}

      <Grid container columnSpacing={1.5}>
        {actions.map((action) => (
          <CanRender
            key={action.id}
            currentRole={user?.userRole}
            action={action.actionType}
            yes={() => (
              <Grid key={action.key} item lg={3} md={4} sm={6} xs={12}>
                <ActionWrap
                  onMouseEnter={() => setIsHovered(action.title)}
                  onMouseLeave={() => setIsHovered('')}
                  hovered={isHovered === action.title}
                  onClick={action.clickHandler}
                >
                  <ActionTitle>{t(action.title)}</ActionTitle>
                  <ActionText hovered={isHovered === action.title}>
                    {t(action.actionText)}
                    <Box display="flex" component="span" ml={1}>
                      <ArrowRightUpLongIconStyled
                        width={20}
                        height={20}
                        color={theme.palette.text.primary}
                        hovered={isHovered === action.title}
                        strokeWidth='1'
                      />
                    </Box>
                  </ActionText>
                </ActionWrap>
              </Grid>
            )}
          />
        ))}
        <Grid item lg={3} md={0} sm={6} xs={12} />
      </Grid>
      <SelectCollabType />
    </DashboardSectionContainer>
  );
};
