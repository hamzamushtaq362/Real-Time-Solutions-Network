import React, { useContext, useState, useEffect } from 'react';
import {
  CollabDetailsDefaultUserContainer,
  CollabWithCreatorDetailsContentContainer,
  CollabDetailsContainer,
} from '../elements';

import { ApplyCollabDialog, NegotiateCollabDialog } from '~/components';
import { setCurrentDialog } from '~/redux';
import { useSelector, useDispatch } from 'react-redux';

import { useRouter } from 'next/router';
import AppContext from 'context/AppContext';
import { LaunchpadLanding } from '../../CollabDetailsComponents/CollabDetailsSections/CollabDetailsLaunchpad/LaunchpadLanding';
import { DefaultUserOverview } from './DefaultUserOverview';

export const CollabDetailsDefaultUser = ({
  collabDetails,
  setCollabDetails,
  collabAssociationDetails,
  setCollabAssociationDetails,
  isLoginUserCoCreatorOfCollab,
  setIsLoginUserCoCreatorOfCollab,
  isCollabBelongsToLoginUser,
  collabEventParticipationDetails,
  setCollabEventParticipationDetails,
  collabLiked,
  addLikeDislike,
  handleShareCollab,
  loading,
  userActionsLoading,
  collabEventsExists,
  collabWorksExists,
  collabMissionsExists,
  collabBTSExists,
}) => {
  const router = useRouter();

  const { currentDialog } = useSelector((state) => state.dialog);
  const [selectedWalletForCollab, setSelectedWalletForCollab] = useState('');
  const { user } = useContext(AppContext);
  const [acceptedMembers, setAcceptedMembers] = useState(
    collabDetails?.members?.filter(({ status }) => status === 'ACCEPTED'),
  );

  const dispatch = useDispatch();

  const [currentActiveTab, setCurrentActiveTab] = useState(
    router.query && router.query.view,
  );

  useEffect(() => {
    if (router.query && router.query.view) {
      if (!currentActiveTab) {
        setCurrentActiveTab('applicants');
      }
      setCurrentActiveTab(router.query.view);
    }
  }, [router.query]);

  const collabDefaultOverviewProps = {
    collabDetails,
    handleShareCollab,
    selectedWalletForCollab,
    setSelectedWalletForCollab,
    isLoginUserCoCreatorOfCollab,
    setIsLoginUserCoCreatorOfCollab,
    collabAssociationDetails,
    setCollabAssociationDetails,
    collabEventParticipationDetails,
    setCollabEventParticipationDetails,
    isCollabBelongsToLoginUser,
  };

  useEffect(() => {
    if (user?.notificationData) {
      setAcceptedMembers([...acceptedMembers, user?.notificationData]);
    }
  }, [user?.notificationData]);

  const getCurrentTabContent = () => {
    switch (currentActiveTab) {
      case 'overview':
        return (
          <DefaultUserOverview
            {...collabDefaultOverviewProps}
            addLikeDislike={addLikeDislike}
            collabLiked={collabLiked}
            loading={loading}
            userActionsLoading={userActionsLoading}
          />
        );
      case 'launchpad':
        return (
          <>
            <>
              <LaunchpadLanding
                loading={loading}
                collabIdentifier={collabDetails?.identifier}
                collabDetails={collabDetails}
                setCollabDetails={setCollabDetails}
                showNavigateBack
                onBack={() => setCurrentActiveTab('')}
                isLoginUserCoCreatorOfCollab={isLoginUserCoCreatorOfCollab}
                isCollabBelongsToLoginUser={false}
                collabEventsExists={collabEventsExists}
                collabWorksExists={collabWorksExists}
                collabBTSExists={collabBTSExists}
                collabMissionsExists={collabMissionsExists}
                isArchive={collabDetails?.isArchive}
                collaboratorsProps={{
                  acceptedMembers,
                  admin: collabDetails?.creatorId,
                  loading,
                  isCollabBelongsToLoginUser,
                  adminCollaboratorRole: collabDetails?.collabCreatorRole,
                  collabId: collabDetails?._id,
                  isLoginUserAdmin: isCollabBelongsToLoginUser,
                }}
              />
            </>
          </>
        );
      default:
        return (
          <DefaultUserOverview
            {...collabDefaultOverviewProps}
            addLikeDislike={addLikeDislike}
            collabLiked={collabLiked}
            loading={loading}
            userActionsLoading={userActionsLoading}
          />
        );
    }
  };

  return (
    <>
      {collabDetails && (
        <ApplyCollabDialog
          open={currentDialog === 'apply-collab-dialog'}
          handleClose={() => dispatch(setCurrentDialog(''))}
          collab={collabDetails}
          setCollabAssociationDetails={setCollabAssociationDetails}
          selectedWalletForCollab={selectedWalletForCollab}
          setSelectedWalletForCollab={setSelectedWalletForCollab}
          user={user}
        />
      )}

      {collabAssociationDetails && (
        <NegotiateCollabDialog
          id={collabAssociationDetails?._id}
          open={currentDialog === 'negotiate-collab-dialog'}
          handleClose={() => dispatch(setCurrentDialog(''))}
          memberRoleDetails={
            collabAssociationDetails?.memberNegotiation
              ? collabAssociationDetails?.memberNegotiation
              : collabAssociationDetails?.memberRole || null
          }
          setCollabAssociationDetails={setCollabAssociationDetails}
          selectedWalletForCollab={selectedWalletForCollab}
        />
      )}

      {/* Dialogs End */}

      <CollabDetailsContainer>
        <CollabDetailsDefaultUserContainer>
          <CollabWithCreatorDetailsContentContainer>
            {getCurrentTabContent()}
          </CollabWithCreatorDetailsContentContainer>
        </CollabDetailsDefaultUserContainer>
      </CollabDetailsContainer>
    </>
  );
};
