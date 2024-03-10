import { Box, IconButton } from '@mui/material';
import { InvitationHeaderContainer } from './elements';
import { ExploreCollabButtonGroup, Tooltip, Iconify } from '~/components';
import { useTheme } from '@mui/material';

export const InvitationsHeader = ({
  activeTab,
  setActiveTab,
  buttonsData,
  loading,
  refreshHandler,
}) => {
  const theme = useTheme();
  return (
    <InvitationHeaderContainer>
      <ExploreCollabButtonGroup
        width={'300px'}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        buttonsData={buttonsData}
        loading={loading}
      />

      <Box>
        <Tooltip title="Refresh" placement="left" disabled={loading}>
          <IconButton disabled={loading} size="large" onClick={refreshHandler}>
            <Iconify
              icon="bx:refresh"
              color={
                !loading
                  ? theme.palette.grey.common
                  : theme.palette.grey.greyD3
              }
              width="22px"
              height="22px"
            />
          </IconButton>
        </Tooltip>
      </Box>
    </InvitationHeaderContainer>
  );
};
