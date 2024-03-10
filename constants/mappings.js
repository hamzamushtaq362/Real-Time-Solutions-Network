import {
  DecentralandLogo,
  SandboxLogo,
  SomniumLogo,
  FoundationLogo,
  MagicedenLogo,
  OpenSeaLogo,
  PlatformIndependentLogo,
  RaribleLogo,
  SnapARLogo,
  OtherPlatformImage,
  SuperrareLogoImage,
  ThreeDSuggestionIcon,
  VirtualAvatarSuggestionIcon,
  VirtualWorldsSuggestionIcon,
  ARVRXRSuggestionIcon,
  AccessoriesSuggestionIcon,
  InstagramIcon,
  FacebookIcon,
  TwitterIcon,
  UNXDLogo,
  DissrupLogoImage,
  SpatialLogo,
  RobloxLogo,
  CryptoVoxelsLogo,
  FortniteLogo,
  HorizonWorlds,
  MonaLogo,
  ReadyPlayMeLogo,
  WhatsappInvite,
  CopyLink,
  Reddit,
  CuratorsPendingIcon,
  CuratorsApprovedIcon,
  CuratorsDeniedIcon,
  Zappar,
  EightWall,
} from '../assets';

export const getPlatformMappings = (platform) => {
  switch (platform) {
    case 'Decentraland':
      return { image: DecentralandLogo };
    case 'Platform-Independent':
      return { image: PlatformIndependentLogo };
    case 'Somnium':
      return { image: SomniumLogo };
    case 'Sandbox':
      return { image: SandboxLogo };
    case 'Snap AR Lens':
      return { image: SnapARLogo };
    case 'Snap AR':
      return { image: SnapARLogo };
    case 'Opensea':
      return { image: OpenSeaLogo };
    case 'Rarible':
      return { image: RaribleLogo };
    case 'Magiceden':
      return { image: MagicedenLogo };
    case 'Foundation':
      return { image: FoundationLogo };
    case 'Superrare':
      return { image: SuperrareLogoImage };
    case 'UNXD':
      return { image: UNXDLogo };
    case 'Dissrup':
      return { image: DissrupLogoImage };
    case 'CryptoVoxels':
      return { image: CryptoVoxelsLogo };
    case 'Fortnite':
      return { image: FortniteLogo };
    case 'Horizon Worlds':
      return { image: HorizonWorlds };
    case 'Mona':
      return { image: MonaLogo };
    case 'Ready Player Me':
      return { image: ReadyPlayMeLogo };
    case 'Spatial':
      return { image: SpatialLogo };
    case 'Roblox':
      return { image: RobloxLogo };
    case 'Zappar':
      return { image: Zappar };
    case '8th Wall':
      return { image: EightWall };
    case 'Others':
      return { image: OtherPlatformImage };
    default:
      return { image: OtherPlatformImage };
  }
};

export const getSocialMediaLogoMappings = (platform) => {
  switch (platform) {
    case 'facebook':
      return { image: FacebookIcon };
    case 'instagram':
      return {
        image: InstagramIcon,
      };
    case 'twitter':
      return {
        image: TwitterIcon,
      };
    default:
      return { image: OtherPlatformImage };
  }
};

export const missionTypeMappings = {
  'join-discord-server': {
    platform: 'discord',
    text: 'Join Discord Server',
    value: 'join-discord-server',
  },
  'post-tweet': {
    platform: 'twitter',
    text: 'Post Tweet',
    value: 'post-tweet',
  },
  'retweet-tweet': {
    platform: 'twitter',
    text: 'Retweet Tweet',
    value: 'retweet-tweet',
  },
  'like-tweet': {
    platform: 'twitter',
    text: 'Like Tweet',
    value: 'like-tweet',
  },
  'add-twitter-bio': {
    platform: 'twitter',
    text: 'Add Twitter Bio',
    value: 'add-twitter-bio',
  },
};

export const getOnBoardInviteLogoMappings = (platform) => {
  switch (platform) {
    case 'Facebook':
      return { image: FacebookIcon };
    case 'Whatsapp':
      return {
        image: WhatsappInvite,
      };
    case 'Twitter':
      return {
        image: TwitterIcon,
      };
    case 'Reddit':
      return {
        image: Reddit,
      };
    case 'Copy Link':
      return {
        image: CopyLink,
      };
    default:
      return { image: OtherPlatformImage };
  }
};

export const getCategoryMappings = (category) => {
  switch (category) {
    case '3D':
      return { image: ThreeDSuggestionIcon };
    case 'Virtual Avatar':
      return { image: VirtualAvatarSuggestionIcon };
    case 'Virtual Worlds':
      return { image: VirtualWorldsSuggestionIcon };
    case 'AR/VR/XR':
      return { image: ARVRXRSuggestionIcon };
    case 'Accessories':
      return { image: AccessoriesSuggestionIcon };
    default:
      return { image: OtherPlatformImage };
  }
};

export const getCollabMemberStatusMappings = (status) => {
  switch (status) {
    case 'PENDING':
      return 'You have successfully applied to this collab';
    case 'ACCEPTED':
      return 'Joined';
    case 'REJECTED':
      return 'Rejected';
    default:
      return '';
  }
};

export const inviteStatusMappings = {
  ACCEPTED: { text: 'Accepted', color: '#83BF6E' },
  REJECTED: { text: 'Rejected', color: '#FF754C' },
  AWAITING: { text: 'Awaiting Response', color: '#FFCE73' },
  PENDING: { text: 'Awaiting Response', color: '#FFCE73' },
  NEGOTIATED: { text: 'Member negotiated', color: '#808191' },
};

export const getApplicationStatusMappings = (status) => {
  switch (status) {
    case 'PENDING':
      return {
        icon: CuratorsPendingIcon,
        text: 'Pending',
        status: 'PENDING',
      };
    case 'ACCEPTED':
      return {
        icon: CuratorsApprovedIcon,
        text: 'Accepted',
        status: 'ACCEPTED',
      };
    case 'REJECTED':
      return {
        icon: CuratorsDeniedIcon,
        text: 'Denied',
        status: 'REJECTED',
      };
    case 'NEGOTIATED':
      return {
        icon: CuratorsDeniedIcon,
        text: 'Negotiated',
        status: 'NEGOTIATED',
      };
    default:
      return null;
  }
};

export const getBadgesMappings = (identifier) => {
  switch (identifier) {
    case 'first-collab-created':
      return {
        indetifier: 'first-collab-created',
        name: 'First Collab Created',
        description: 'Created 1st collab on RTSN',
        image:
          'https://pbs.twimg.com/profile_images/1634533204588744704/EUGvdNzF_400x400.png',
      };
    case 'early-member':
      return {
        indetifier: 'early-member',
        name: 'Early Member',
        description: 'Joined before 12.12.23',
        image:
          'https://pbs.twimg.com/profile_images/1634533204588744704/EUGvdNzF_400x400.png',
      };

    case 'curator-badge':
      return {
        indetifier: 'curator-badge',
        name: 'Curator Badge',
        description: 'Became a Curator on RTSN',
        image:
          'https://pbs.twimg.com/profile_images/1634533204588744704/EUGvdNzF_400x400.png',
      };
    case 'published-collab':
      return {
        indetifier: 'published-collab',
        name: 'Published Collab',
        description: 'First collab published on RTSN',
        image:
          'https://pbs.twimg.com/profile_images/1634533204588744704/EUGvdNzF_400x400.png',
      };
  }
};
