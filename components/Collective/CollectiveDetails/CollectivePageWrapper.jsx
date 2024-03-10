import { AuthLayout } from 'layouts';
import { useEffect, useState } from 'react';
import { CollectiveDetails } from './CollectiveDetails';
import { useRouter } from 'next/router';
import { TopNavbar } from 'components';

export const CollectivePageWrapper = () => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const router = useRouter();
  const { collectiveLink } = router.query;

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('auth'));
    if (user) {
      setIsAuth(true);
    }
    setLoading(false);
  }, []);

  return (
    <>
      {!loading ? (
        <>
          {isAuth ? (
            <AuthLayout>
              <CollectiveDetails collectiveLink={collectiveLink} />
            </AuthLayout>
          ) : (
            <>
              <TopNavbar />
              <CollectiveDetails
                isPublic={true}
                collectiveLink={collectiveLink}
              />
            </>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
};
