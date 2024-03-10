import { MainLayout, AuthLayout } from 'layouts';
import { CollabsByCreator } from '~/components';
import { getExploreCollabsMetaInformation } from '~/utils';

export default function ExplorePage() {
  return <CollabsByCreator />;
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
