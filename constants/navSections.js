import React from 'react';
import UserIcon from 'components/Icons/UserIcon';
import UsersIcon from 'components/Icons/UsersIcon';
import ArrowRightUpIcon from '../components/Icons/ArrowRightUpIcon';
import PlusIcon from '../components/Icons/PlusIcon';
import ShareIcon from '../components/Icons/ShareIcon';
import { CurationIcon, Iconify } from '~/components';
import ApplyIcon from '../components/Icons/ApplyIcon';
import { CollabOutlined } from 'components/Icons';
import CollabFilled from 'components/Icons/CollabFilledIcon';
import CampaignOutlined from 'components/Icons/CampaignOutlinedIcon';
import { UilDocumentLayoutLeft } from '@iconscout/react-unicons';

export const topNavSections = [
  {
    title: 'collabs',
    path: '/collab/explore',
    defaultQueryPath: 'all-collabs',
  },
  {
    title: 'creators',
    path: '/discovery',
  },
  {
    title: 'templates',
    path: '/collab/template/explore',
    hidden: true,
  },
  // {
  //   title: 'Community',
  //   path: 'coming soon',
  //   // hidden: false,
  //   // defaultQueryPath: '/community',
  // },
  // {
  //   title: 'Campaigns',
  //   path: 'coming soon',
  // },
  {
    title: 'Collab',
    path: '/collab/[collabId]',
    hidden: true,
    defaultQueryPath: '/collab/[collabId]',
  },
  {
    title: 'Settings',
    path: '/settings',
    hidden: true,
    defaultQueryPath: 'account',
  },
];

export const getCollectiveSubNav = () => ({
  title: 'COLLECTIVES',
  actions: [{ title: 'CREATE COLLECTIVE', path: '/team/create' }],
});
export const getCollectiveExploreSubNav = () => ({
  title: 'COLLECTIVES',
  sections: [
    {
      title: 'All',
      queryPath: 'all-collectives',
      defaultQueryPath: 'all-collectives',
    },
    {
      title: 'Created',
      queryPath: 'my-collectives',
    },
    {
      title: 'Joined',
      queryPath: 'joined-collectives',
    },
    {
      title: 'Pending Invites',
      queryPath: 'invites',
    },
  ],
  actions: [{ title: 'CREATE COLLECTIVE', path: '/team/create' }],
});
export const getCollabsSubNav = () => ({
  title: 'Collabs',
  sections: [
    {
      title: 'All',
      queryPath: 'all-collabs',
    },
    {
      title: 'Created',
      queryPath: 'my-collabs',
    },
    {
      title: 'Joined',
      queryPath: 'joined-collabs',
    },
    {
      title: 'Invites',
      queryPath: 'invites',
    },
    {
      title: 'Archive',
      queryPath: 'archive',
    },
  ],
  actions: [{ title: 'Create Collab', icon: 'plus', path: '/collab/create' }],
});
export const getSettingsSubNav = (username) => ({
  title: 'Settings',
  sections: [
    {
      title: 'Profile',
      queryPath: 'profile',
    },
    {
      title: 'Account',
      queryPath: 'account',
    },

    {
      title: 'Referral',
      queryPath: 'referral',
    },
    {
      title: 'Wallet',
      queryPath: 'wallet',
    },
  ],
  actions: [
    {
      title: 'Public Profile',
      icon: 'up-right-arrow',
      orientation: 'right',
      target: '_blank',
      path: `/@${username}`,
    },
  ],
});

export const getSectionIcon = (title, path, color, strokeWidth, isActive) => {
  switch (title) {
    case 'collabs':
      return (
        <div style={{ paddingTop: '7px' }}>
          {isActive ? (
            <CollabFilled color={color} width={20} height={20} />
          ) : (
            <CollabOutlined color={color} width={20} height={20} />
          )}
        </div>
      );
    case 'creators':
      return (
        <div style={{ paddingTop: '2px' }}>
          <UserIcon
            color={color}
            width={19}
            height={19}
            fill={isActive ? color : ''}
            // strokeWidth={strokeWidth}
          />
        </div>
      );
    case 'Community':
      return (
        <div style={{ paddingTop: '7px' }}>
          <UsersIcon
            color={isActive ? '' : color}
            width={20}
            height={20}
            fill={isActive ? 'black' : ''}
          />
        </div>
      );
    case 'Campaigns':
      // return <CampaignIcon color={color} width={20} height={20} />;
      return (
        <div style={{ paddingTop: '5px' }}>
          <CampaignOutlined color={color} width={20} height={20} />
        </div>
      );
    case 'Templates':
      return (
        <div style={{ paddingTop: '2px' }}>
          <UilDocumentLayoutLeft color={color} width={20} height={20} />
        </div>
      );
  }
};
export const getRightButtonIcon = (icon, color, active, hoverColor) => {
  switch (icon) {
    case 'up-right-arrow':
      return (
        <ArrowRightUpIcon color={hoverColor ?? color} width={20} height={20} />
      );
    case 'plus':
      return <PlusIcon color={hoverColor ?? color} width={14} height={14} />;
    case 'share':
      return <ShareIcon color={hoverColor ?? color} width={20} height={20} />;
    case 'apply':
      return <ApplyIcon color={hoverColor ?? color} width={20} height={20} />;
    case 'curate':
      return (
        <CurationIcon width={18} height={18} color={hoverColor ?? color} />
      );
    case 'like':
      return active ? (
        <Iconify
          color={hoverColor ?? '#FF6370'}
          icon="ant-design:heart-filled"
          width={20}
          height={20}
        />
      ) : (
        <Iconify
          color={hoverColor ?? '#757D8A'}
          icon="ant-design:heart-outlined"
          width={20}
          height={20}
        />
      );
  }
};
