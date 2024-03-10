import { CollabDetailsMain, DerivedReimaginedCollabs } from '~/components';

import { Divider } from '~/components';

import { captilalizeString } from '~/utils';
import SimilarCollabs from '../SimilarCollabs';
import { CollabWorks } from '../CollabWorks';
import { CollabEvents } from '../CollabEvents';
import { Collaborators } from 'components/CollabDetails/CollabDetailsLayouts/Collaborators';
import React, { useContext, useEffect, useState } from 'react';
import { useTheme } from '@mui/material';
import AppContext from 'context/AppContext';

export const DefaultUserOverview = ({
  collabDetails,
  handleShareCollab,
  selectedWalletForCollab,
  setSelectedWalletForCollab,
  collabAssociationDetails,
  setCollabAssociationDetails,
  collabEventParticipationDetails,
  setCollabEventParticipationDetails,
  isLoginUserCoCreatorOfCollab,
  setIsLoginUserCoCreatorOfCollab,
  addLikeDislike,
  collabLiked,
  loading,
  userActionsLoading,
  isCollabBelongsToLoginUser,
}) => {
  const theme = useTheme();
  const { user, setUser } = useContext(AppContext);
  const [acceptedMembers, setAcceptedMembers] = useState(
    collabDetails?.members?.filter(({ status }) => status === 'ACCEPTED'),
  );
  useEffect(() => {
    if (user?.notificationData) {
      setAcceptedMembers([...acceptedMembers, user?.notificationData]);
      setUser({ ...user, notificationData: null });
    }
  }, [user?.notificationData]);

  return (
    <>
      <CollabDetailsMain
        collab={collabDetails}
        showCreatorDetails
        handleShareCollab={handleShareCollab}
        handleUpdateMember={(toBeAddedMember) =>
          setAcceptedMembers([...acceptedMembers, toBeAddedMember])
        }
        {...{
          selectedWalletForCollab,
          setSelectedWalletForCollab,
          collabAssociationDetails,
          setCollabAssociationDetails,
          collabEventParticipationDetails,
          setCollabEventParticipationDetails,
          isLoginUserCoCreatorOfCollab,
          setIsLoginUserCoCreatorOfCollab,
          handleShareCollab,
          addLikeDislike,
          collabLiked,
          userActionsLoading,
        }}
      />

      <Collaborators
        acceptedMembers={acceptedMembers}
        admin={collabDetails?.creatorId}
        loading={loading}
        isCollabBelongsToLoginUser={isCollabBelongsToLoginUser}
        adminCollaboratorRole={collabDetails?.collabCreatorRole}
        collabId={collabDetails?._id}
        isLoginUserCoCreatorOfCollab={isLoginUserCoCreatorOfCollab}
      />

      <CollabEvents collabId={collabDetails?._id} />

      <CollabWorks
        collabId={collabDetails?._id}
        isCollabCoCreators={isLoginUserCoCreatorOfCollab}
      />

      <DerivedReimaginedCollabs
        title={collabDetails?.title}
        derivedBasedOnCollabs={collabDetails?.derivedBasedOnCollabs}
      />

      <SimilarCollabs
        collabDetails={collabDetails}
        title={'Collabs you might be interested in '}
        type={'similar'}
        collabLoading={loading}
      />
      <Divider color={theme.palette.text.primary} margin={0} />
      <SimilarCollabs
        collabDetails={collabDetails}
        title={`More Collabs by ${captilalizeString(
          collabDetails?.creatorId.fullName,
        )}`}
        collabLoading={loading}
        type={'creator'}
      />
    </>
  );
};
