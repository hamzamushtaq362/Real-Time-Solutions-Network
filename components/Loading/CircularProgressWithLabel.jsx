import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import { LoaderText } from 'components/Loading/elements';

export const CircularProgressWithLabel = (props) => {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <LoaderText>
          {`${Math.round(props.value)}%`}
        </LoaderText>
      </Box>
    </Box>
  );
}