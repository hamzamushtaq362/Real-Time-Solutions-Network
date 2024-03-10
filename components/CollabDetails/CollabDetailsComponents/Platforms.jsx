import React from 'react';
import { RightPaneLabel } from './elements';
import { Avatar, Spacer, Tooltip } from '~/components';
import { Box } from '@mui/material';
import { getPlatformMappings } from '~/constants';
import { useTranslation } from 'react-i18next';

const Platforms = ({ platforms }) => {
  const { t } = useTranslation();
  return (
    <Box>
      <RightPaneLabel>{t("Platform")}</RightPaneLabel>

      <Box sx={{ display: 'flex' }}>
        {platforms &&
          platforms.map((platform, index) => {
            return (
              <Box mr={1} key={index}>
                <Tooltip title={platform}>
                  <Box>
                    <Avatar avatar={getPlatformMappings(platform).image.src} />
                  </Box>
                </Tooltip>
                <Spacer value={2} type="horizontal" />
              </Box>
            );
          })}
      </Box>
    </Box>
  );
};

export default Platforms;
