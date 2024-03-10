import { PREVIEW_BRAND_LOGO } from '~/constants';

export const getCollabDetailsMetaInfomation = (collabDetails) => {
  let title = 'Join RSTN';
  let description = 'Find exciting Metaverse opportunities & discover co-creators to publish NFT with. Collab with Metaverse Creators on RTSN.';
  let keywords = '';
  let image = PREVIEW_BRAND_LOGO;
  if (collabDetails) {
    if (collabDetails?.title) {
      title = `Join ${collabDetails?.title} on RTSN`;
      if (collabDetails?.isContributedCollab || collabDetails.source === 'collective' || collabDetails.source === 'external') {
        title = collabDetails?.title;
      }
      keywords += `${collabDetails?.title}, `;
    }
    if (collabDetails?.description) {
      description = collabDetails.description;
    }

    if (collabDetails?.images?.[0]) {
      image = collabDetails?.images[0];
    }

    if (collabDetails?.tags?.length > 0) {
      keywords += collabDetails?.tags?.join(', ');
    }

    if (collabDetails?.roles?.length > 0) {
      const rolesTags = collabDetails?.roles?.map(({ skill }) => skill);
      keywords += rolesTags.join(', ');
    }
  }

  return {
    title,
    description,
    image,
    keywords,
  };
};

export const getExploreCollabsMetaInformation = () => {
  let title =
    'Discover exciting Metaverse opportunities on RTSN & collab with creators';
  let description =
    'Build Virtual worlds, Avatars, Wearables & Create Metaverse Universes on RTSN.';
  let image = PREVIEW_BRAND_LOGO;
  let keywords =
    'RTSN, Metaverse, Decentraland, Sandbox, NFT, Avatars, Wearables';

  return {
    title,
    description,
    image,
    keywords,
  };
};

export const getIndividualNFTMetaInformation = (nftDetails) => {
  const title = nftDetails?.name;
  const description = nftDetails?.description;
  const image = nftDetails?.image_url;
  const keywords =
    'RTSN, Metaverse, Decentraland, Sandbox, NFT, Avatars, Wearables';

  return {
    title,
    description,
    image,
    keywords,
  };
};

export const getNFTCollectionMetaInformation = (contractDetails) => {
  const title = contractDetails?.collection?.name || contractDetails?.name;
  const description = contractDetails?.description;
  const image = contractDetails?.collection?.banner_image_url;
  const keywords =
    'RTSN, Metaverse, Decentraland, Sandbox, NFT, Avatars, Wearables';

  return {
    title,
    description,
    image,
    keywords,
  };
};
export const getUserProfileMetaInformation = (userDetails) => {
  let title =
    'Discover exciting Metaverse opportunities on RTSN & collab with creators';

  let description =
    'Join to discover exciting Metaverse Creators to Collaborate and launch NFTs. Find opportunities to Build exciting Virtual worlds, Avatars, Wearables.';

  let image = PREVIEW_BRAND_LOGO;
  let keywords =
    'RTSN, Metaverse, Decentraland, Sandbox, NFT, Avatars, Wearables';

  if (userDetails) {
    if (userDetails?.fullName || userDetails?.username) {
      const name = userDetails?.fullName
        ? userDetails?.fullName
        : userDetails?.username;

      title = name;
      description =
        `${name} is on RTSN building for the Metaverse. ` + description;
    }

    if (userDetails?.imageUrl) {
      image = userDetails?.imageUrl;
    }
  }

  return {
    title,
    description,
    image,
    keywords,
  };
};
