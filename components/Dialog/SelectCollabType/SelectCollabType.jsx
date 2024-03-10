import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentDialog } from 'redux/dialogSlice';

import { Dialog } from '~/components';
import {
  SelectCollabTypeContainer,
  ProjectContainer,
  SelectCollabTypeSubHeader,
  CollabDescription, CollabSectionWrap, OrText, OrWrap,
} from './elements';
import { Box, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import VerticalDivider from 'components/Divider/VerticalDivider';
import { useProtectedAction } from '~/hooks';

export const SelectCollabType = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const theme = useTheme();
  const { currentDialog } = useSelector((state) => state.dialog);
  const dispatch = useDispatch();

  const startCollab = useProtectedAction(
    (data) => {
      router.push(data);
    }
  );
  const startExistingCollab = useProtectedAction(
    (data) => {
      router.push(data);
    }
  );
  return (
    <Dialog
      open={currentDialog === 'select-collab-type-dialog'}
      onClose={() => dispatch(setCurrentDialog(''))}
      height='500px'
      borderRadius={0}
    >
      <SelectCollabTypeContainer>
        <ProjectContainer
          onClick={() => {
            dispatch(setCurrentDialog(''));
            startCollab('/collab/create', true);
          }}
        >
          <CollabSectionWrap>
            <SelectCollabTypeSubHeader>
              {t('Start Collab')}
            </SelectCollabTypeSubHeader>
            <CollabDescription>
              {t('start a new collab to find collaborators to work with on your Idea.',)}
            </CollabDescription>
          </CollabSectionWrap>
        </ProjectContainer>
        <OrWrap>
          <Box flex={1}><VerticalDivider color={theme.palette.text.inverse} height='100%' /></Box>
          <OrText>or</OrText>
          <Box flex={1}><VerticalDivider color={theme.palette.text.inverse} height='100%' /></Box>
        </OrWrap>
        <ProjectContainer
          onClick={() => {
            dispatch(setCurrentDialog(''));
            startExistingCollab('/collab/existing/create', true);
          }}
        >
          <CollabSectionWrap>
            <SelectCollabTypeSubHeader>
              {t('Add Work')}
            </SelectCollabTypeSubHeader>
            <CollabDescription>
              {t(
                'Add Past Works and Collaborators You’ve Worked with to Stand Out.',
              )}
            </CollabDescription>
          </CollabSectionWrap>
        </ProjectContainer>
      </SelectCollabTypeContainer>
    </Dialog>
  );
};
