import { useEffect, useState } from 'react';
import { CenterFlex } from './elements';
import { PublicInfoBox } from '~/components';
import CollabDetails from './CollabDetails';
import CollagDetailsPublic from './CollabDetailsPublic';
import { AuthLayout } from 'layouts';
import { useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const CollabDetailsPageWrapper = ({ collabResponse }) => {
  const [isAuth, setIsAuth] = useState(false);
  const theme = useTheme();
  const { t } = useTranslation();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('auth'));
    if (user) {
      setIsAuth(true);
    }
  }, []);

  return (
    <>
      {collabResponse?.data?.collab ? (
        <>
          <AuthLayout>
            {isAuth ? (
              <CollabDetails
                collabId={collabResponse?.data?.collab?._id}
                collab={collabResponse?.data?.collab}
              />
            ) : (
              <CollagDetailsPublic
                collabResponse={collabResponse?.data?.collab}
              />
            )}
          </AuthLayout>
        </>
      ) : (
        <AuthLayout>
          <CenterFlex>
            <PublicInfoBox
              color={theme.palette.red.main}
              backgroundColor={theme.palette.grey.normal2}
              message={
                collabResponse?.data?.message ||
                t('Oops! Something went wrong or collab not found.')
              }
            />
          </CenterFlex>
        </AuthLayout>
      )}
    </>
  );
};
