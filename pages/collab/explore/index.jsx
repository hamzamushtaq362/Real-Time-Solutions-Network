import { useEffect, useState } from 'react';
import { MainLayout, AuthLayout } from 'layouts';
import { CollabExplore, ContributedCollabExplore } from '~/components';
import { getExploreCollabsMetaInformation } from '~/utils';
import { useRouter } from 'next/router';

export default function ExplorePage() {
  const router = useRouter();
  const [isContributedExplore, setIsContributedExplore] = useState(false);

  useEffect(() => {
    setIsContributedExplore(router.query.contributed === 'true');
  }, [router]);

  return (
    <>
      {!isContributedExplore ? <CollabExplore /> : <ContributedCollabExplore />}
    </>
  );
}

ExplorePage.getLayout = function getLayout(page) {
  const { title, description, image, keywords } =
    getExploreCollabsMetaInformation();

  return (
    <MainLayout
      title={title}
      description={description}
      image={image}
      keywords={keywords}
    >
      <AuthLayout>{page}</AuthLayout>
    </MainLayout>
  );
};
