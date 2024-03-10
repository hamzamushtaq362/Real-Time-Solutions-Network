import { Box, styled } from '@mui/material';

export const OnboardOuterContainer = styled(Box)({
  width: '100vw',
  height: '100vh',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
});

export const OnboardRightContainer = styled(Box)({
  flex: '0.5',

  '@media (max-width : 1250px)': {
    flex: 0.9,
  },
});

export const OnBoardRightCenterdContainer = styled(Box)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
});

export const OnBoardRightNotCenterdContainer = styled(Box)({
  marginTop: '5rem',
});
