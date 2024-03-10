import { useRouter } from 'next/router';

import { PrimaryButton } from '~/components';

import { EmptyStateContainer, EmptyStateDetailsHeader } from './elements';
import { StyledTooltip } from '../DashboardHome/elements';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setCurrentDialog } from '~/redux';
import { useContext } from 'react';
import AppContext from 'context/AppContext';

export const CardsEmptyState = ({ collabsType, setActiveTab, isInvite, emptyStateText, buttonText }) => {
  const router = useRouter();
  const { t } = useTranslation();
  const { user } = useContext(AppContext);
  const isProfileComplete = user?.isProfileComplete;
  const dispatch = useDispatch();

  return (
    <EmptyStateContainer isMyCollabs={!isInvite}>
      <EmptyStateDetailsHeader>{t(emptyStateText)}</EmptyStateDetailsHeader>

      <StyledTooltip
        title={
          isProfileComplete && (collabsType === 'created' || collabsType === 'joined')
            ? null
            : t('Complete your profile first to create/join Collabs')
        }
      >
        <span>
          <PrimaryButton
            sx={{ marginTop: '2rem' }}
            width="15rem"
            onClick={() => {
              if (collabsType === 'joined' || collabsType === 'favourite') {
                setActiveTab('all')
                router.replace('/collab/explore?view=all', undefined, {
                  shallow: true,
                });
              } else {
                dispatch(setCurrentDialog('select-collab-type-dialog'))
              }
            }}
            disabled={!isProfileComplete}
          >
            {t(buttonText ?? 'Create collab')}
          </PrimaryButton>
        </span>
      </StyledTooltip>
    </EmptyStateContainer>
  );
};
