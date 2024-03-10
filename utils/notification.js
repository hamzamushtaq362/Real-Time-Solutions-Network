import { getDateDistance } from './utils';
import { RTSNFavicon } from '~/assets';
import { updateIsNFTPublished } from '~/redux';

// TODO: Refactor function conditionals into switch statements
export const getFormattedNotifications = (notifications, dispatch) => {
  // get userId from local storage
  const username = JSON.parse(localStorage.getItem('auth'))?.username;

  const formattedNotifications = [];

  if (notifications.length > 0) {
    notifications.forEach((notification) => {
      const { typeOfCollabNotification, createdAt } = notification;

      const timeStamp = getDateDistance(createdAt);

      if (typeOfCollabNotification === 'following-created-collab') {
        const {
          message,
          metadata: {
            notificationImage,
            senderName,
            senderNickname,
            collabTitle,
            collabIdentifier,
            showInitialName,
          },
          isRead,
          typeOfCollabNotification,
          _id,
        } = notification;

        formattedNotifications.unshift({
          _id,
          fullname: senderName,
          username: `@${senderNickname}`,
          message,
          boldMessage: collabTitle,
          notificationImage,
          timeStamp,
          navigateTo: `/collab/${collabIdentifier}`,
          statusIcon: 'message',
          isRead,
          typeOfCollabNotification,
          showInitialName,
          title: 'Collab Created',
        });
      } else if (typeOfCollabNotification === 'user-started-following') {
        const {
          message,
          metadata: {
            notificationImage,
            senderName,
            senderNickname,
            showInitialName,
          },
          isRead,
          typeOfCollabNotification,
          _id,
        } = notification;

        formattedNotifications.unshift({
          _id,
          fullname: senderName,
          username: `@${senderNickname}`,
          message,
          boldMessage: '',
          notificationImage,
          timeStamp,
          navigateTo: `/@${senderNickname}`,
          statusIcon: 'checked',
          isRead,
          typeOfCollabNotification,
          showInitialName,
          title: 'New Follower',
        });
      } else if (typeOfCollabNotification === 'collab-apply') {
        const {
          message,
          metadata: {
            notificationImage,
            senderName,
            senderNickname,
            collabTitle,
            collabIdentifier,
            showInitialName,
          },
          isRead,
          typeOfCollabNotification,
          _id,
        } = notification;

        formattedNotifications.unshift({
          _id,
          fullname: senderName,
          username: `@${senderNickname}`,
          message,
          boldMessage: collabTitle,
          notificationImage,
          timeStamp,
          navigateTo: `/collab/${collabIdentifier}?view=applicants`,
          statusIcon: 'message',
          isRead,
          typeOfCollabNotification,
          showInitialName,
          title: 'New Applicant',
        });
      } else if (typeOfCollabNotification === 'collab-invite') {
        const {
          message,
          metadata: {
            notificationImage,
            senderName,
            senderNickname,
            collabTitle,
            collabIdentifier,
            showInitialName,
          },
          isRead,
          typeOfCollabNotification,
          _id,
        } = notification;

        formattedNotifications.unshift({
          _id,
          fullname: senderName,
          username: `@${senderNickname}`,
          message,
          boldMessage: collabTitle,
          notificationImage,
          timeStamp,
          navigateTo: `/collab/${collabIdentifier}`,
          statusIcon: 'message',
          isRead,
          typeOfCollabNotification,
          showInitialName,
          title: 'Collab Invite',
        });
      } else if (typeOfCollabNotification === 'collab-chat') {
        const {
          message,
          metadata: {
            notificationImage,
            senderNickname,
            collabTitle,
            collabIdentifier,
            showInitialName,
          },
          isRead,
          typeOfCollabNotification,
        } = notification;

        formattedNotifications.unshift({
          fullname: 'Join',
          username: `@${senderNickname}`,
          message,
          boldMessage: collabTitle,
          notificationImage,
          timeStamp,
          navigateTo: `/collab/${collabIdentifier}`,
          statusIcon: 'message',
          isRead,
          typeOfCollabNotification,
          showInitialName,
          title: collabTitle + ' :' + ' Join Conversation',
        });
      } else if (typeOfCollabNotification === 'checkoutNewCollab') {
        const {
          message,
          metadata: {
            collabImage,
            senderName,
            collabTitle,
            collabIdentifier,
            showInitialName,
          },
          isRead,
          typeOfCollabNotification,
        } = notification;

        const parts = message.split(' ');
        const fullname = parts[0].trim();

        const splitParts = message.split(':');

        const sentenceAfterColon = splitParts[1].trim();
        const formattedSentence = sentenceAfterColon
          .split(' ')
          .join('-')
          .toLowerCase();

        formattedNotifications.unshift({
          fullname: senderName ? senderName : fullname,
          username: senderName ? `@${senderName}` : `@${fullname}`,
          message,
          boldMessage: collabTitle ? collabTitle : '',
          notificationImage: collabImage,
          timeStamp,
          navigateTo: collabIdentifier
            ? `/collab/${collabIdentifier}`
            : `/collab/${formattedSentence}`,
          statusIcon: 'message',
          isRead,
          typeOfCollabNotification,
          showInitialName,
          title: 'New Collab',
        });
      } else if (typeOfCollabNotification === 'collab-liked') {
        const {
          message,
          metadata: {
            notificationImage,
            senderName,
            senderNickname,
            collabTitle,
            collabIdentifier,
            showInitialName,
          },
          isRead,
          typeOfCollabNotification,
          _id,
        } = notification;

        formattedNotifications.unshift({
          _id,
          fullname: senderName,
          username: `@${senderNickname}`,
          message,
          boldMessage: collabTitle,
          notificationImage,
          timeStamp,
          navigateTo: `/collab/${collabIdentifier}`,
          statusIcon: 'loved',
          isRead,
          typeOfCollabNotification,
          showInitialName,
          title: 'Collab Liked',
        });
      } else if (typeOfCollabNotification === 'collab-invite-response') {
        const {
          message,
          metadata: {
            notificationImage,
            senderName,
            senderNickname,
            collabTitle,
            collabIdentifier,
            showInitialName,
          },
          isRead,
          typeOfCollabNotification,
          _id,
        } = notification;

        formattedNotifications.unshift({
          _id,
          fullname: senderName,
          username: `@${senderNickname}`,
          message,
          boldMessage: collabTitle,
          notificationImage,
          timeStamp,
          navigateTo: `/collab/${collabIdentifier}`,
          statusIcon: 'message',
          isRead,
          typeOfCollabNotification,
          showInitialName,
          title: 'Collab Invite Response',
        });
      } else if (typeOfCollabNotification === 'collab-negotiation-response') {
        const {
          message,
          metadata: {
            notificationImage,
            senderName,
            senderNickname,
            collabTitle,
            collabIdentifier,
            showInitialName,
          },
          isRead,
          typeOfCollabNotification,
          _id,
        } = notification;

        formattedNotifications.unshift({
          _id,
          fullname: senderName,
          username: `@${senderNickname}`,
          message,
          boldMessage: collabTitle,
          notificationImage,
          timeStamp,
          navigateTo: `/collab/${collabIdentifier}`,
          statusIcon: 'message',
          isRead,
          typeOfCollabNotification,
          showInitialName,
          title: 'Collab Negotiation Response',
        });
      } else if (typeOfCollabNotification === 'collab-apply-acceptance') {
        const {
          message,
          metadata: {
            notificationImage,
            senderName,
            senderNickname,
            collabTitle,
            collabIdentifier,
            showInitialName,
          },
          isRead,
          typeOfCollabNotification,
          _id,
        } = notification;

        formattedNotifications.unshift({
          _id,
          fullname: senderName,
          username: `@${senderNickname}`,
          message,
          boldMessage: collabTitle,
          notificationImage,
          timeStamp,
          navigateTo: `/collab/${collabIdentifier}`,
          statusIcon: 'message',
          isRead,
          typeOfCollabNotification,
          showInitialName,
          title: 'Collab Apply Response',
        });
      } else if (
        typeOfCollabNotification === 'notifyMembersCollabFinalization'
      ) {
        const {
          message,
          metadata: {
            collabId,
            userImage,
            senderName,
            senderNickname,
            collabTitle,
            showInitialName,
          },
          isRead,
          typeOfCollabNotification,
          _id,
        } = notification;

        formattedNotifications.unshift({
          _id,
          fullname: senderName,
          username: `@${senderNickname}`,
          message,
          boldMessage: collabTitle,
          notificationImage: userImage,
          timeStamp,
          navigateTo: `/finalize-collab/${collabId}`,
          statusIcon: 'message',
          isRead,
          typeOfCollabNotification,
          showInitialName,
          title: 'Collab Finalization',
        });
      } else if (typeOfCollabNotification === 'notifyMembersCollabPublished') {
        const {
          message,
          metadata: { collabId, collabTitle, showInitialName },
          isRead,
          typeOfCollabNotification,
          _id,
        } = notification;

        formattedNotifications.unshift({
          _id,
          fullname: 'rtsn',
          username: '',
          message,
          boldMessage: collabTitle,
          notificationImage: RTSNFavicon,
          timeStamp,
          navigateTo: `/published-collab/${collabId}`,
          statusIcon: 'message',
          isRead,
          typeOfCollabNotification,
          showInitialName,
          title: 'Collab Published',
        });
      } else if (
        typeOfCollabNotification === 'ApproveStatus-OfMember-ForNFTPublishing'
      ) {
        const {
          message,
          metadata: {
            senderName,
            senderNickname,
            collabTitle,
            notificationImage,
            collabIdentifier,
            showInitialName,
          },
          isRead,
          typeOfCollabNotification,
          _id,
        } = notification;

        formattedNotifications.unshift({
          _id,
          fullname: senderName,
          username: `@${senderNickname}`,
          message,
          boldMessage: collabTitle,
          notificationImage,
          timeStamp,
          navigateTo: `/collab/${collabIdentifier}`,
          statusIcon: 'message',
          isRead,
          typeOfCollabNotification,
          showInitialName,
          title: 'NFT Publishing',
        });
      } else if (
        typeOfCollabNotification === 'initiating-NFTPublishing-process'
      ) {
        const {
          message,
          metadata: { NftTitle, collabIdentifier, showInitialName },
          isRead,
          typeOfCollabNotification,
          _id,
        } = notification;

        formattedNotifications.unshift({
          _id,
          fullname: 'rtsn',
          username: '',
          message,
          boldMessage: NftTitle,
          notificationImage: RTSNFavicon,
          timeStamp,
          navigateTo: `/collab/${collabIdentifier}`,
          statusIcon: 'message',
          isRead,
          typeOfCollabNotification,
          showInitialName,
          title: 'NFT Publishing',
        });
      } else if (typeOfCollabNotification === 'successfullyPublished-NFT') {
        const {
          message,
          metadata: { NftTitle, navigateTo, isNFTPublished, showInitialName },
          isRead,
          typeOfCollabNotification,
          _id,
        } = notification;
        dispatch(updateIsNFTPublished(isNFTPublished));

        formattedNotifications.unshift({
          _id,
          fullname: 'rtsn',
          message,
          boldMessage: NftTitle,
          notificationImage: RTSNFavicon,
          timeStamp,
          navigateTo,
          statusIcon: 'message',
          isRead,
          typeOfCollabNotification,
          showInitialName,
          title: 'NFT Publish Status',
        });
      } else if (typeOfCollabNotification === 'memberApproval-outsideProject') {
        const {
          message,
          metadata: {
            outsideProjectTitle,
            outsideProjectImage,
            outsideProjectIdentifier,
            showInitialName,
          },
          isRead,
          typeOfCollabNotification,
          _id,
        } = notification;

        formattedNotifications.unshift({
          _id,
          message,
          boldMessage: outsideProjectTitle,
          notificationImage: outsideProjectImage,
          timeStamp,
          navigateTo: `/collab/${outsideProjectIdentifier}`,
          statusIcon: 'message',
          isRead,
          typeOfCollabNotification,
          showInitialName,
          title: 'Project Approval',
        });
      } else if (
        typeOfCollabNotification === 'outsideproject-join-invitation-response'
      ) {
        const {
          message,
          metadata: {
            senderName,
            senderNickname,
            outsideProjectTitle,
            outsideProjectImage,
            outsideProjectIdentifier,
            showInitialName,
          },
          isRead,
          typeOfCollabNotification,
          _id,
        } = notification;

        formattedNotifications.unshift({
          _id,
          fullname: senderName,
          username: `@${senderNickname}`,
          message,
          boldMessage: outsideProjectTitle,
          notificationImage: outsideProjectImage,
          timeStamp,
          navigateTo: `/collab/${outsideProjectIdentifier}`,
          statusIcon: 'message',
          isRead,
          typeOfCollabNotification,
          showInitialName,
          title: 'Collaboration Invitation Response',
        });
      } else if (typeOfCollabNotification === 'collective-join-invitation') {
        const {
          message,
          metadata: {
            senderName,
            senderNickname,
            collectiveTitle,
            collectiveImage,
            collectiveLink,
            showInitialName,
          },
          isRead,
          typeOfCollabNotification,
          _id,
        } = notification;

        formattedNotifications.unshift({
          _id,
          fullname: senderName,
          username: `@${senderNickname}`,
          message,
          boldMessage: collectiveTitle,
          notificationImage: collectiveImage,
          timeStamp,
          navigateTo: `/team/${collectiveLink}`,
          statusIcon: 'message',
          isRead,
          typeOfCollabNotification,
          showInitialName,
          title: 'Collective Invitation',
        });
      } else if (typeOfCollabNotification === 'collective-project-invitation') {
        const {
          message,
          metadata: {
            senderName,
            senderNickname,
            collectiveTitle,
            collectiveImage,
            collabIdentifier,
            showInitialName,
          },
          isRead,
          typeOfCollabNotification,
          _id,
        } = notification;

        formattedNotifications.unshift({
          _id,
          fullname: senderName,
          username: `@${senderNickname}`,
          message,
          boldMessage: collectiveTitle,
          notificationImage: collectiveImage,
          timeStamp,
          navigateTo: `/collab/${collabIdentifier}`,
          statusIcon: 'message',
          isRead,
          typeOfCollabNotification,
          showInitialName,
          title: 'Team Collab Invitation',
        });
      } else if (
        typeOfCollabNotification === 'collective-join-invitation-response'
      ) {
        const {
          message,
          metadata: {
            senderName,
            senderNickname,
            collectiveTitle,
            collectiveImage,
            collectiveLink,
            showInitialName,
          },
          isRead,
          typeOfCollabNotification,
          _id,
        } = notification;

        formattedNotifications.unshift({
          _id,
          fullname: senderName,
          username: `@${senderNickname}`,
          message,
          boldMessage: collectiveTitle,
          notificationImage: collectiveImage,
          timeStamp,
          navigateTo: `/team/${collectiveLink}`,
          statusIcon: 'message',
          isRead,
          typeOfCollabNotification,
          showInitialName,
          title: 'Collective Invitation Response',
        });
      } else if (typeOfCollabNotification === 'collab-admin-curation-request') {
        const {
          message,
          metadata: {
            senderName,
            senderNickname,
            notificationImage,
            collabTitle,
            collabIdentifier,
            showInitialName,
          },
          isRead,
          typeOfCollabNotification,
          _id,
        } = notification;

        formattedNotifications.unshift({
          _id,
          fullname: senderName,
          username: `@${senderNickname}`,
          message,
          boldMessage: collabTitle,
          notificationImage: notificationImage,
          timeStamp,
          navigateTo: `/collab/${collabIdentifier}?view=curators`,
          statusIcon: 'message',
          isRead,
          typeOfCollabNotification,
          showInitialName,
          title: 'Curation Request',
        });
      } else if (
        typeOfCollabNotification === 'collab-admin-curation-negotiation'
      ) {
        const {
          message,
          metadata: {
            senderName,
            senderNickname,
            notificationImage,
            collabTitle,
            showInitialName,
          },
          isRead,
          typeOfCollabNotification,
          _id,
        } = notification;

        formattedNotifications.unshift({
          _id,
          fullname: senderName,
          username: `@${senderNickname}`,
          message,
          boldMessage: collabTitle,
          notificationImage: notificationImage,
          timeStamp,
          navigateTo: `/curations`,
          statusIcon: 'message',
          isRead,
          typeOfCollabNotification,
          showInitialName,
          title: 'Curation Negotiation',
        });
      } else if (
        typeOfCollabNotification ===
        'collab-curation-negotiation-decision-curator'
      ) {
        const {
          message,
          metadata: {
            senderName,
            senderNickname,
            notificationImage,
            collabTitle,
            collabIdentifier,
            showInitialName,
          },
          isRead,
          typeOfCollabNotification,
          _id,
        } = notification;

        formattedNotifications.unshift({
          _id,
          fullname: senderName,
          username: senderNickname,
          message,
          boldMessage: collabTitle,
          notificationImage: notificationImage,
          timeStamp,
          navigateTo: `/collab/${collabIdentifier}?view=curators`,
          statusIcon: 'message',
          isRead,
          typeOfCollabNotification,
          showInitialName,
          title: 'Curation Decision',
        });
      } else if (
        typeOfCollabNotification === 'collab-admin-curation-decision'
      ) {
        const {
          message,
          metadata: {
            senderName,
            senderNickname,
            notificationImage,
            collabTitle,
            showInitialName,
          },
          isRead,
          typeOfCollabNotification,
          _id,
        } = notification;

        formattedNotifications.unshift({
          _id,
          fullname: senderName,
          username: `@${senderNickname}`,
          message,
          boldMessage: collabTitle,
          notificationImage: notificationImage,
          timeStamp,
          navigateTo: `/curations`,
          statusIcon: 'message',
          isRead,
          typeOfCollabNotification,
          showInitialName,
          title: 'Curation Decision',
        });
      } else if (typeOfCollabNotification === 'collab-curated-notification') {
        const {
          message,
          metadata: {
            senderName,
            notificationImage,
            senderNickname,
            collabTitle,
            collabIdentifier,
            showInitialName,
          },
          isRead,
          typeOfCollabNotification,
          _id,
        } = notification;

        formattedNotifications.unshift({
          _id,
          fullname: senderName,
          username: `@${senderNickname}`,
          message,
          boldMessage: collabTitle,
          notificationImage: notificationImage,
          timeStamp,
          navigateTo: `/collab/${collabIdentifier}`,
          statusIcon: 'message',
          isRead,
          typeOfCollabNotification,
          showInitialName,
          title: 'Collab Curated',
        });
      } else if (typeOfCollabNotification === 'badge-awarded') {
        const {
          message,
          metadata: {
            senderName,
            senderNickname,
            image,
            badgeType,
            showInitialName,
          },
          isRead,
          typeOfCollabNotification,
          _id,
        } = notification;

        formattedNotifications.unshift({
          _id,
          fullname: senderName,
          username: `@${senderNickname}`,
          message,
          boldMessage: 'Badge Awarded',
          notificationImage: image,
          timeStamp,
          navigateTo: `/@${username}`,
          statusIcon: 'message',
          isRead,
          typeOfCollabNotification,
          showInitialName,
          badgeType: badgeType,
          title: 'Badge Awarded',
        });
      } else if (typeOfCollabNotification === 'badge-awarded-user-created') {
        const {
          message,
          metadata: {
            senderName,
            senderNickname,
            image,
            badgeType,
            showInitialName,
          },
          isRead,
          typeOfCollabNotification,
          _id,
        } = notification;

        formattedNotifications.unshift({
          _id,
          fullname: senderName,
          username: `@${senderNickname}`,
          message,
          boldMessage: 'Badge Awarded',
          notificationImage: image,
          timeStamp,
          navigateTo: `/@${username}`,
          statusIcon: 'message',
          isRead,
          typeOfCollabNotification,
          showInitialName,
          badgeType: badgeType,
          title: 'Badge Awarded',
        });
      } else if (typeOfCollabNotification === 'collab-event-invite') {
        const {
          message,
          metadata: {
            senderName,
            senderNickname,
            notificationImage,
            collabEventTitle,
            eventIdentifier,
            showInitialName,
          },
          isRead,
          typeOfCollabNotification,
          _id,
        } = notification;

        formattedNotifications.unshift({
          _id,
          fullname: senderName,
          username: `@${senderNickname}`,
          message,
          boldMessage: collabEventTitle,
          notificationImage: notificationImage,
          timeStamp,
          navigateTo: `/events/${eventIdentifier}`,
          statusIcon: 'message',
          isRead,
          typeOfCollabNotification,
          showInitialName,
          title: 'Collab Event Invitation',
        });
      } else if (typeOfCollabNotification === 'mission-approval-submission') {
        const {
          message,
          metadata: {
            senderName,
            senderNickname,
            notificationImage,
            collabIdentifier,
            showInitialName,
          },
          isRead,
          typeOfCollabNotification,
          _id,
        } = notification;

        formattedNotifications.unshift({
          _id,
          fullname: senderName,
          username: `@${senderNickname}`,
          message,
          boldMessage: '',
          notificationImage: notificationImage,
          timeStamp,
          navigateTo: `/collab/${collabIdentifier}`,
          statusIcon: 'message',
          isRead,
          typeOfCollabNotification,
          showInitialName,
          title: 'Mission Submission',
        });
      } else if (typeOfCollabNotification === 'mission-submission') {
        const {
          message,
          metadata: {
            senderName,
            senderNickname,
            notificationImage,
            collabIdentifier,
          },
          isRead,
          typeOfCollabNotification,
          _id,
        } = notification;

        formattedNotifications.unshift({
          _id,
          fullname: senderName,
          username: `@${senderNickname}`,
          message,
          boldMessage: '',
          notificationImage: notificationImage,
          timeStamp,
          navigateTo: `/collab/${collabIdentifier}?view=launchpad&subview=mission`,
          statusIcon: 'message',
          isRead,
          typeOfCollabNotification,
        });
      } else if (typeOfCollabNotification === 'general-message') {
        const {
          message,
          metadata: {
            senderName,
            senderNickname,
            notificationImage,
            conversationId,
          },
          isRead,
          typeOfCollabNotification,
          _id,
        } = notification;

        formattedNotifications.unshift({
          _id,
          fullname: senderName,
          username: `@${senderNickname}`,
          message,
          boldMessage: '',
          notificationImage: notificationImage,
          timeStamp,
          navigateTo: `/inbox?${conversationId}`,
          statusIcon: 'message',
          isRead,
          typeOfCollabNotification,
        });
      } else if (typeOfCollabNotification === 'collab-request-initiated') {
        const {
          message,
          metadata: {
            senderName,
            senderNickname,
            notificationImage,
            conversationId,
            showInitialName,
          },
          isRead,
          typeOfCollabNotification,
          _id,
        } = notification;

        formattedNotifications.unshift({
          _id,
          fullname: senderName,
          username: `@${senderNickname}`,
          message,
          boldMessage: '',
          notificationImage: notificationImage,
          timeStamp,
          navigateTo: `/inbox?conversation=${conversationId}`,
          statusIcon: 'message',
          isRead,
          typeOfCollabNotification,
          showInitialName,
        });
      } else if (typeOfCollabNotification === 'collab-request-response') {
        const {
          message,
          metadata: {
            senderName,
            senderNickname,
            notificationImage,
            conversationId,
            showInitialName,
          },
          isRead,
          typeOfCollabNotification,
          _id,
        } = notification;

        formattedNotifications.unshift({
          _id,
          fullname: senderName,
          username: `@${senderNickname}`,
          message,
          boldMessage: '',
          notificationImage: notificationImage,
          timeStamp,
          navigateTo: `/inbox?conversation=${conversationId}`,
          statusIcon: 'message',
          isRead,
          typeOfCollabNotification,
          showInitialName,
        });
      } else if (typeOfCollabNotification === 'collab-conversation-initiated') {
        const {
          message,
          metadata: {
            senderName,
            senderNickname,
            notificationImage,
            collabId,
            showInitialName,
          },
          isRead,
          typeOfCollabNotification,
          _id,
        } = notification;

        formattedNotifications.unshift({
          _id,
          fullname: senderName,
          username: `@${senderNickname}`,
          message,
          boldMessage: '',
          notificationImage: notificationImage,
          timeStamp,
          navigateTo: `/inbox?collab=${collabId}`,
          statusIcon: 'message',
          isRead,
          typeOfCollabNotification,
          showInitialName,
        });
      }
    });
    return formattedNotifications;
  } else {
    return [];
  }
};
