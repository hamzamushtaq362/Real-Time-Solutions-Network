import { useTranslation } from 'react-i18next';
import { MainLayout } from '~/layouts';
import { CollectivePageWrapper } from '~/components';
import { getPublicCollabDetailsByLink } from 'apis/collective';

export default function CollabDetailsPage() {
  return <CollectivePageWrapper />;
}

CollabDetailsPage.getLayout = function getLayout(page) {
  const { t } = useTranslation();
  const collectiveTitle = page?.props?.collectiveTitle;
  return <MainLayout title={t(collectiveTitle)}>{page}</MainLayout>;
};

export async function getServerSideProps(context) {
  const { res } = context;
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59',
  );
  const { collectiveLink } = context.params;
  const collabResponse = await getPublicCollabDetailsByLink(collectiveLink);
  const collectiveTitle = collabResponse?.title;
  return {
    props: {
      collabResponse,
      collectiveTitle: collectiveTitle || 'Team',
    },
  };
}
