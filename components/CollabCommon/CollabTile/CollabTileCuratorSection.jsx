import React, { useState } from 'react';
import {
  StarButton,
  CurationIcon,
  Tooltip,
  CurateCollabDialog,
} from '~/components';
import { isCurationByLoggedInUserExists } from '~/apis';

import { useTheme, Box } from '@mui/material';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const CollabTileCuratorSection = ({ collab }) => {
  const [, setLoading] = useState(true);
  const [isCurationExists, setIsCurationExists] = useState(false);
  const [curationStatus, setCurationStatus] = useState('');
  const [curateCollabDialogOpen, setCurateCollabDialogOpen] = useState(false);

  const theme = useTheme();
  const { t } = useTranslation();

  const fetchCurationStatus = async () => {
    try {
      setLoading(true);
      const response = await isCurationByLoggedInUserExists(collab?._id);

      if (response.status === 'success') {
        if (response.isCurationExists) {
          setIsCurationExists(true);
          setCurationStatus(response?.isCurationExists?.status);
        } else {
          setIsCurationExists(false);
        }
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurationStatus();
  }, []);

  return (<>
    {/* Dialogs rendering start */}
    <CurateCollabDialog
      open={curateCollabDialogOpen}
      collab={collab}
      handleClose={() => setCurateCollabDialogOpen(false)}
    />
    {/* Dialogs rendering ends */}
    {!isCurationExists ? (
      <StarButton
        onClick={(event) => {
          event.preventDefault();
          return setCurateCollabDialogOpen(true);
        }}
      />
    ) : (
      <>
        {curationStatus === 'ACCEPTED' ? (
          <Tooltip title={t('You are Curator of this Collabs')}>
            <Box sx={{ marginTop: '4px', marginLeft: '2px' }}>
              <CurationIcon
                height="20"
                width="20"
                color={theme.palette.grey.common}
              />
            </Box>
          </Tooltip>
        ) : (
          <></>
        )}{" "}
        {curationStatus === 'REJECTED' ? (
          <Tooltip title={t('Your curation request has been rejected')}>
            <Box>
              <CurationIcon
                height="20"
                width="20"
                color={theme.palette.grey.common}
              />
            </Box>
          </Tooltip>
        ) : (
          <></>
        )}
        {curationStatus === 'PENDING' ? (
          <Tooltip title={t('Your curation request is in pending')}>
            <Box sx={{ marginTop: '3px', marginLeft: '2px' }}>
              <CurationIcon
                height="20"
                width="20"
                color={theme.palette.grey.common}
              />
            </Box>
          </Tooltip>
        ) : (
          <></>
        )}
      </>
    )}
  </>);
};
