import { LaunchpadLandingHeader } from './LaunchpadLandingHeader';
import {
  CollabDetailsMembers,
  CollabDetailsApplicants,
  Spacer,
  Spinner,
} from '~/components';
import { SpinnerContainer } from './elements';

// Sections Imports
import { LaunchpadSuggestedSection } from './LaunchpadSuggestedSection';
import { LaunchpadAddToCollabSection } from './LaunchpadAddToCollabSection';
import { LaunchpadMembersSection } from './LaunchpadMembersSection';
import { LaunchpadEventsSection } from './LaunchpadEventsSection';
import { LaunchpadWorksSection } from './LaunchpadWorksSection';
import { LaunchpadMissionSection } from './LaunchpadMissionSection';
import { CollabAdminSettings } from '../../CollabAdminSettings';
import { MissionSection } from '../MissionSection';

import { useState, useEffect } from 'react';
import { LaunchpadBTSSection } from './LaunchpadBTSSection';
import { LaunchpadSocialHighlightsSection } from './LaunchpadSocialHighlightsSection';
import { useRouter } from 'next/router';

export const LaunchpadLanding = ({
  isCollabBelongsToLoginUser,
  isLoginUserCoCreatorOfCollab,
  inviteMemberProps,
  manageApplicantsProps,
  collaboratorsProps,
  pendingApplicants,
  collabEventsExists,
  collabWorksExists,
  collabBTSExists,
  collabMissionsExists,
  collabDetails,
  setCollabDetails,
  collabMissionsInstancesExists,
  loading,
  onBack,
  isArchive,
}) => {
  const [currentView, setCurrentView] = useState('landing');
  const router = useRouter();

  useEffect(() => {
    if (
      !loading &&
      !isCollabBelongsToLoginUser &&
      !isLoginUserCoCreatorOfCollab
    ) {
      router.push(`/dashboard`);
    }
  }, [loading, isCollabBelongsToLoginUser, isLoginUserCoCreatorOfCollab]);

  useEffect(() => {
    // Add event listener for the popstate event
    window.addEventListener('popstate', function () {
      // Handle the back button click
      onBack();
    });

    // Add event listener for the beforeunload event
    window.addEventListener('beforeunload', function () {
      // Remove the popstate event listener to avoid duplicate calls
      window.removeEventListener('popstate', function () {
        // Handle the back button click
        onBack();
      });
    });
  }, []);

  return (
    <>
      {!loading &&
      (isCollabBelongsToLoginUser || isLoginUserCoCreatorOfCollab) ? (
        <>
          <LaunchpadLandingHeader
            isCollabBelongsToLoginUser={isCollabBelongsToLoginUser}
            isLoginUserCoCreatorOfCollab={isLoginUserCoCreatorOfCollab}
            collabIdentifier={collabDetails?.identifier}
            setCurrentView={setCurrentView}
            loading={loading}
            onBack={onBack}
            isArchive={isArchive}
          />

          <Spacer value={100} />

          {currentView === 'landing' && (
            <>
              <LaunchpadSuggestedSection
                setCurrentView={setCurrentView}
                isCollabBelongsToLoginUser={isCollabBelongsToLoginUser}
                isLoginUserCoCreatorOfCollab={isLoginUserCoCreatorOfCollab}
                pendingApplicants={pendingApplicants}
                collabDetails={collabDetails}
                collabMissionsExists={collabMissionsExists}
                collabMissionsInstancesExists={collabMissionsInstancesExists}
                isArchive={isArchive}
              />

              {isCollabBelongsToLoginUser && !loading && (
                <>
                  <Spacer value={60} />
                  <LaunchpadAddToCollabSection
                    collabDetails={collabDetails}
                    setCollabDetails={setCollabDetails}
                  />
                </>
              )}

              <>
                <Spacer value={60} />
                <LaunchpadMembersSection
                  collaboratorsProps={collaboratorsProps}
                  collabDetails={collabDetails}
                  loading={loading}
                  isCollabBelongsToLoginUser={isCollabBelongsToLoginUser}
                  isLoginUserCoCreatorOfCollab={isLoginUserCoCreatorOfCollab}
                  isArchive={isArchive}
                />
              </>

              {collabEventsExists && (
                <>
                  <LaunchpadEventsSection
                    collabIdentifier={collabDetails?.identifier}
                    collabId={collabDetails?._id}
                    isCollabBelongsToLoginUser={isCollabBelongsToLoginUser}
                  />
                  <Spacer value={30} />
                </>
              )}

              {collabWorksExists && (
                <>
                  <Spacer value={30} />
                  <LaunchpadWorksSection
                    collabIdentifier={collabDetails?.identifier}
                    collabId={collabDetails?._id}
                  />
                  <Spacer value={30} />
                </>
              )}

              {collabBTSExists && (
                <>
                  <Spacer value={30} />
                  <LaunchpadBTSSection
                    collabIdentifier={collabDetails?.identifier}
                    collabId={collabDetails?._id}
                  />
                  <Spacer value={30} />
                </>
              )}
              {collabDetails?.socialHighlights?.length > 0 && (
                <>
                  <Spacer value={30} />
                  <LaunchpadSocialHighlightsSection
                    collabDetails={collabDetails}
                  />
                  <Spacer value={30} />
                </>
              )}

              {collabMissionsExists && isCollabBelongsToLoginUser && (
                <>
                  <Spacer value={30} />
                  <LaunchpadMissionSection
                    setCurrentView={setCurrentView}
                    collabId={collabDetails?._id}
                  />
                  <Spacer value={30} />
                </>
              )}
            </>
          )}

          {/* Full View Sections */}

          {currentView === 'invite-members' && (
            <CollabDetailsMembers
              {...inviteMemberProps}
              onBack={() => setCurrentView('landing')}
            />
          )}

          {currentView === 'manage-applicants' && pendingApplicants && (
            <CollabDetailsApplicants
              {...manageApplicantsProps}
              onBack={() => setCurrentView('landing')}
            />
          )}

          {currentView === 'mission-section' && isCollabBelongsToLoginUser && (
            <MissionSection
              collabId={collabDetails?._id}
              onBack={() => setCurrentView('landing')}
            />
          )}

          {currentView === 'settings' && isCollabBelongsToLoginUser && (
            <CollabAdminSettings
              onBack={() => setCurrentView('landing')}
              collabDetails={collabDetails}
              setCollabDetails={setCollabDetails}
            />
          )}
        </>
      ) : (
        <SpinnerContainer>
          <Spinner size={20} />
        </SpinnerContainer>
      )}
    </>
  );
};
