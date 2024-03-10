import { useState } from 'react';
import { LandingCardsGrid } from './elements';
import { DividingHeaderRow } from './DividingHeaderRow';
import { LaunchpadLandingCard } from './LaunchpadLandingCard';
import {
  UilUserPlus,
  UilUsersAlt,
  UilChannel,
  UilCrosshair,
  UilShare,
} from '@iconscout/react-unicons';
import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { ShareHorizontalMenu } from '~/components';
import { constructCollabURL } from '~/utils';
import { useCollabNavigator } from '~/hooks';

export const LaunchpadSuggestedSection = ({
  setCurrentView,
  isCollabBelongsToLoginUser,
  isLoginUserCoCreatorOfCollab,
  pendingApplicants,
  collabDetails,
  collabMissionsExists,
  collabMissionsInstancesExists,
  isArchive,
}) => {
  const theme = useTheme();
  const router = useRouter();
  const [shareAnchorEl, setShareAnchorEl] = useState(null);
  const addToCollabNavigator = useCollabNavigator();

  const handleAddCollaboratorSpotClick = () => {
    const collabIdentifier = collabDetails?.identifier;
    const source = collabDetails?.source;
    const addCollaboratorStep = 3;

    if (source === 'internal') {
      router.push(
        `/collab/${collabIdentifier}/edit?source=internal&step=${addCollaboratorStep}`,
      );
    }
  };

  const handleShareCollab = (event) => {
    setShareAnchorEl(event.currentTarget);
  };

  return (
    <>
      <ShareHorizontalMenu
        shareAnchorEl={shareAnchorEl}
        setShareAnchorEl={setShareAnchorEl}
        url={constructCollabURL(collabDetails?.identifier)}
      />

      <DividingHeaderRow title="Suggested" />

      <LandingCardsGrid>
        {(isCollabBelongsToLoginUser || isLoginUserCoCreatorOfCollab) && (
          <LaunchpadLandingCard
            onClick={handleShareCollab}
            mainText="Share Collab"
            icon={<UilShare size={24} color={theme.palette.text.inverse} />}
          />
        )}

        {isCollabBelongsToLoginUser && (
          <LaunchpadLandingCard
            disabled={isArchive}
            disabledTooltip={
              isArchive ? 'Please unarchive the collab to invite members' : ''
            }
            mainText="Invite Members"
            icon={<UilUserPlus size={24} color={theme.palette.text.inverse} />}
            onClick={
              !isArchive ? () => setCurrentView('invite-members') : () => {}
            }
          />
        )}

        {isCollabBelongsToLoginUser && pendingApplicants && (
          <LaunchpadLandingCard
            disabled={isArchive}
            disabledTooltip={
              isArchive
                ? 'Please unarchive the collab to manage applicants'
                : ''
            }
            mainText="Manage Applicants"
            icon={<UilUsersAlt size={24} color={theme.palette.text.inverse} />}
            onClick={
              !isArchive ? () => setCurrentView('manage-applicants') : () => {}
            }
          />
        )}

        {isCollabBelongsToLoginUser && collabDetails?.source === 'internal' && (
          <LaunchpadLandingCard
            disabled={isArchive}
            disabledTooltip={
              isArchive
                ? 'Please unarchive the collab to add collaborator spots'
                : ''
            }
            mainText="Add Collaborator Spots"
            icon={<UilChannel size={24} color={theme.palette.text.inverse} />}
            // Here goes the code to redirect the collaborator spot to third page
            onClick={!isArchive ? handleAddCollaboratorSpotClick : () => {}}
          />
        )}

        {isCollabBelongsToLoginUser &&
          collabMissionsExists &&
          collabMissionsInstancesExists && (
            <LaunchpadLandingCard
              mainText="Review Mission Submissions"
              icon={
                <UilCrosshair size={24} color={theme.palette.text.inverse} />
              }
              onClick={() => setCurrentView('mission-section')}
            />
          )}

        {isLoginUserCoCreatorOfCollab && (
          <LaunchpadLandingCard
            onClick={() =>
              addToCollabNavigator(collabDetails?.identifier, 'work')
            }
            mainText="Add New"
            subText="Work"
          />
        )}
      </LandingCardsGrid>
    </>
  );
};
