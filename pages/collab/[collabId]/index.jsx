import { MainLayout } from '~/layouts';
import { getPublicCollabDetails } from '~/apis';
import { CollabDetailsPageWrapper } from '~/components';
import { getCollabDetailsMetaInfomation } from '~/utils';
import nookies from 'nookies';
import axios from 'axios';
import { BASE_URL } from 'apis/user';

export default function CollabDetailsPage(props) {
  return <CollabDetailsPageWrapper collabResponse={props.collabResponse} />;
}

CollabDetailsPage.getLayout = function getLayout(page) {
  const collabDetails = page?.props?.collabResponse?.data?.collab;

  const { title, description, image, keywords } =
    getCollabDetailsMetaInfomation(collabDetails);

  return (
    <MainLayout
      title={title}
      description={description}
      image={image}
      keywords={keywords}
    >
      {page}
    </MainLayout>
  );
};

export async function getServerSideProps(context) {
  const { collabId } = context.params;
  const cookies = nookies.get(context);

  const userData = cookies.user ? JSON.parse(cookies.user) : null;

  let collabResponse = null;

  if (userData && userData.accessToken) {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/collab/${collabId}`,
        {
          headers: {
            'x-auth-token': `Bearer ${userData.accessToken}`,
          },
        },
      );

      const { data } = response;

      collabResponse = data;
    } catch (err) {}
  } else {
    // get public collab details
    collabResponse = await getPublicCollabDetails(collabId);
  }

  // Redirect if status is 'draft'
  if (collabResponse?.data?.collab?.status === 'draft') {
    return {
      redirect: {
        destination: `/collab/${collabId}/edit?source=${collabResponse?.data?.collab?.source}`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      collabResponse,
    },
  };
}
