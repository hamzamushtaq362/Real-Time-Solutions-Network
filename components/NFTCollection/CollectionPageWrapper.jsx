import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { Collection } from './Collection';
import { TopNavbar, PublicInfoBox, Spacer } from '~/components';
import { AuthLayout } from '~/layouts';
import { CenterFlex } from './element';

export const CollectionPageWrapper = (props) => {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(true);

  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('auth'));
    if (user) {
      setIsAuth(true);
    }
    setLoading(false);
  }, []);

  return (<>
    {!loading ? (
      <>
        {!isAuth ? (
          <>
            {" "}
            <TopNavbar />
            <Spacer value={1} />
            <CenterFlex>
              <PublicInfoBox
                message={t("Join RTSN to collaborate with Creators")}
                buttonText={t("Join RTSN")}
                navigateLink="/"
              />
            </CenterFlex>
            <Spacer value={30} />
            <Collection {...props} />{" "}
          </>
        ) : (
          <AuthLayout>
            {" "}
            <Collection {...props} />
          </AuthLayout>
        )}
      </>
    ) : (
      <></>
    )}
  </>);
};
