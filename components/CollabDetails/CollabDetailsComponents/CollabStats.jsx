import React from 'react';
import { StatsLabel, StatsValue, StatsWrap } from './elements';
import { Box } from '@mui/material';
import { timeConverter } from '~/utils';
import { useTranslation } from 'react-i18next';

const CollabStats = ({ createdAt }) => {
  const { t } = useTranslation();
  return (
    <StatsWrap>
      <Box display="flex">
        <StatsLabel>{t('Posted')}</StatsLabel>
        <StatsValue>{timeConverter(createdAt || '', true)}</StatsValue>
      </Box>

      {/*<Circle />*/}

      {/*<Box display='flex'>*/}
      {/*  <StatsLabel>*/}
      {/*    Views*/}
      {/*  </StatsLabel>*/}
      {/*  <StatsValue>*/}
      {/*    1031*/}
      {/*  </StatsValue>*/}
      {/*</Box>*/}
      {/*<Circle />*/}

      {/*<Box display='flex'>*/}
      {/*  <StatsLabel>*/}
      {/*    Responded*/}
      {/*  </StatsLabel>*/}
      {/*  <StatsValue>*/}
      {/*    324*/}
      {/*  </StatsValue>*/}
      {/*</Box>*/}
    </StatsWrap>
  );
};

export default CollabStats;
