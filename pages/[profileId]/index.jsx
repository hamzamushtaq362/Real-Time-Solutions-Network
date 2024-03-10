import { AuthLayout, MainLayout } from 'layouts';
import { CreatorProfileWrapper } from '~/components';
import { getUserProfileMetaInformation } from '~/utils';
import { ethers } from 'ethers';
import { getPublicUserDetails } from '~/apis';
import CollectorMain from 'components/Collector/CollectorMain';

export default function UserProfile(page) {
  return (
    <>
      {page.profileType === 'user' ? (
        <CreatorProfileWrapper user={page?.userDetails} />
      ) : (
        <AuthLayout>
          <CollectorMain address={page?.profileId} />
        </AuthLayout>
      )}
    </>
  );
}

UserProfile.getLayout = function getLayout(page) {
  const props = page.props;

  const { title, description, image, keywords } = getUserProfileMetaInformation(
    props?.userDetails,
  );

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
  const { profileId } = context.params;

  let userDetails = null;
  let profileType = 'user'; // user, collective

  if (profileId) {
    if (profileId[0] === '@') {
      const userIdentifier = profileId.substring(1, profileId.length);
      const isUserIdetifierWalletAddress =
        ethers.utils.isAddress(userIdentifier);

      if (isUserIdetifierWalletAddress) {
        profileType = 'collective';
      } else {
        userDetails = await getPublicUserDetails(userIdentifier);
      }
    } else {
      const isUserIdetifierWalletAddress = ethers.utils.isAddress(profileId);

      if (isUserIdetifierWalletAddress) {
        profileType = 'collective';
      } else {
        const userResponse = await getPublicUserDetails(profileId);

        if (userResponse) {
          userDetails = userResponse;
          return {
            redirect: {
              permanent: false,
              destination: `/profile/@${profileId}`,
            },
            props: {},
          };
        }
      }
    }
  }

  return {
    props: {
      userDetails,
      profileType,
      profileId,
    },
  };
}
