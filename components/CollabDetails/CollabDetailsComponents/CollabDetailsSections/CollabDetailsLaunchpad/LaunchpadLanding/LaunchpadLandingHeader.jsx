import { useState } from 'react';
import {
  LaunchpadAddDropdown,
  ImageIcon,
  Tooltip,
  ShareHorizontalMenu,
} from '~/components';
import { Box, IconButton } from '@mui/material';
import { LaunchpadLandingHeaderContainer, LaunchpadHeader } from './elements';
import { useTheme } from '@mui/material';
import { LeftArrow } from '~/assets';
import { useCollabNavigator } from '~/hooks';
import { UilCog, UilUpload, UilShare } from '@iconscout/react-unicons';
import { constructCollabURL, openLinkInNewTab } from '~/utils';

export const LaunchpadLandingHeader = ({
  isLoginUserCoCreatorOfCollab,
  isCollabBelongsToLoginUser,
  collabIdentifier,
  setCurrentView,
  onBack,
  isArchive,
}) => {
  const addToCollabNavigator = useCollabNavigator();
  const [shareAnchorEl, setShareAnchorEl] = useState(null);

  const theme = useTheme();

  const ADD_TO_COLLAB_OPTIONS = [
    {
      label: 'Add Work',
      value: 'work',
      hidden: false,
    },
    {
      label: 'Add Event',
      value: 'event',
      hidden: isLoginUserCoCreatorOfCollab,
    },
    {
      label: 'Add Mission',
      value: 'mission',
      hidden: isLoginUserCoCreatorOfCollab,
    },
    {
      label: 'Add BTS',
      value: 'bts',
      hidden: true,
    },
  ];

  const handleShareCollab = (event) => {
    setShareAnchorEl(event.currentTarget);
  };

  return (
    <>
      <ShareHorizontalMenu
        shareAnchorEl={shareAnchorEl}
        setShareAnchorEl={setShareAnchorEl}
        url={constructCollabURL(collabIdentifier)}
      />

      <LaunchpadLandingHeaderContainer>
        <ImageIcon
          sx={{ cursor: 'pointer' }}
          onClick={onBack}
          src={LeftArrow}
          width={20}
          height={20}
        />

        <LaunchpadHeader sx={{ marginLeft: '50px' }}>LAUNCHPAD</LaunchpadHeader>

        <Box sx={{ display: 'flex', columnGap: '4px' }}>
          <LaunchpadAddDropdown
            setSelectedItem={(value) => {
              addToCollabNavigator(collabIdentifier, value);
            }}
            options={ADD_TO_COLLAB_OPTIONS.filter((option) => !option.hidden)}
            menuWidth={200}
            disabled={isArchive}
            disabledTooltip={'Please unarchive the collab to add content'}
          />

          <>
            {isCollabBelongsToLoginUser && !isLoginUserCoCreatorOfCollab && (
              <Tooltip title="Settings">
                <IconButton onClick={() => setCurrentView('settings')}>
                  <UilCog size={26} color={theme.palette.grey.common} />
                </IconButton>
              </Tooltip>
            )}

            <Tooltip title="Share">
              <IconButton onClick={handleShareCollab}>
                <UilShare size={26} color={theme.palette.grey.common} />
              </IconButton>
            </Tooltip>

            <Tooltip title="View">
              <IconButton
                onClick={() =>
                  openLinkInNewTab(constructCollabURL(collabIdentifier))
                }
              >
                <UilUpload size={26} color={theme.palette.grey.common} />
              </IconButton>
            </Tooltip>
          </>
        </Box>
      </LaunchpadLandingHeaderContainer>
    </>
  );
};
