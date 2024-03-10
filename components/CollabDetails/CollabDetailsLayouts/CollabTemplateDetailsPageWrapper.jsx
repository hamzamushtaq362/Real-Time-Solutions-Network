import { useEffect, useState } from 'react';
import { TopNavbar } from '~/components';
import { CollabTemplateDetails } from '../CollabDetailsComponents';
import { useRouter } from 'next/router';
import { AuthLayout } from 'layouts';

export const CollabTemplateDetailsPageWrapper = ({collabTemplate}) => {
  const [loading, setLoading] = useState(true);
  const [collabTemplateId, setCollabTemplateId] = useState('');
  const [isAuth, setIsAuth] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('auth'));
    if (user) {
      setIsAuth(true);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (router.query.templateId) {
      setCollabTemplateId(router.query.templateId);
    }
  }, [router]);

  return (
    <>
      {!loading && collabTemplateId ? (
        <>
          {isAuth ? (
            <>
              <AuthLayout>
                <CollabTemplateDetails collabTemplate={collabTemplate} />
              </AuthLayout>
            </>
          ) : (
            <>
              <TopNavbar />
              <CollabTemplateDetails collabTemplate={collabTemplate} />
            </>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
};
