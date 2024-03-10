import { useTranslation } from 'react-i18next';
import { PublicNavbarContainer } from './elements';
import { AppLogo, PrimaryButton } from '~/components';
import { setCurrentDialog } from '~/redux';
import { useTheme } from '@mui/material';
import { useDispatch } from 'react-redux';

export const TopNavbar = ({ joinClickHandler }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const theme = useTheme();

  return (
    <PublicNavbarContainer>
      <AppLogo color={theme.palette.background.inverse} margin={'-10px'} />
      <PrimaryButton
        width="150px"
        onClick={
          joinClickHandler
            ? joinClickHandler
            : () => dispatch(setCurrentDialog('signup-open-dialog'))
        }
      >
        {t('Join RTSN.')}
      </PrimaryButton>
    </PublicNavbarContainer>
  );
};
