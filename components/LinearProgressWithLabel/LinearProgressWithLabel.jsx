import React from 'react';
import { Box, LinearProgress } from '@mui/material';
import { ProgressText } from './elements';

const LinearProgressWithLabel = (props) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <ProgressText>{`${Math.round(props.value)}%`}</ProgressText>
      </Box>
    </Box>
  );
};

export default LinearProgressWithLabel;