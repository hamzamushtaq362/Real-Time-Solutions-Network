import { MainLayout } from '~/layouts';
import { CollabTemplateDetailsPageWrapper } from '~/components';
import { fetchCollabTemplateDetails } from '~/apis';

export default function CollabTemplateDetailsPage({collabTemplate}) {
  return <CollabTemplateDetailsPageWrapper collabTemplate={collabTemplate} />;
}

CollabTemplateDetailsPage.getLayout = function getLayout(page) {
  return (
    <MainLayout title={page?.props?.title}>
      {page}
    </MainLayout>
  );
};
export async function getServerSideProps(context) {
  const { res } = context;
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59',
  );
  const { templateId } = context.params;
  const { collabTemplate } = await fetchCollabTemplateDetails(templateId);
  const templateTitle = collabTemplate?.title;
  return {
    props: {
      collabTemplate,
      title: templateTitle || 'Collab Template',
    },
  };
}
