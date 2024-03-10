import { Box, styled, Typography, Avatar } from '@mui/material';
import { PrimaryButton } from '../../Button';

export const ClaimProfileDialogContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  // backgroundColor: theme.palette.background.main,
  flexDirection: 'column',
  gap: '30px',
  // justifyContent: 'space-around',
  alignItems: 'center',
  padding: '10px',
}));

export const HeaderRow = styled(Box)({
  width: '80%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  gap: '10px',
  marginTop: '20px',
});

export const MessageText = styled(Typography)(({ theme }) => ({
  ...theme.typography.title3,
  fontWeight: 400,
  width: '80%',
  textAlign: 'center',
  color: theme.palette.text.primary,
}));
export const MessageHeader = styled(Typography)(({ theme }) => ({
  ...theme.typography.title3,
  fontSize: '21px',
  fontWeight: 500,
  width: '80%',
  textAlign: 'center',
  color: theme.palette.text.primary,
}));

export const SuccessImage = styled(Avatar)({
  width: '250px',
  height: '180px',
});

export const ConfirmButton = styled(PrimaryButton)({
  height: '50px',
  width: '160px',
  borderRadius: '10px',
});

export const DashboardTitle = styled(Box)(({ theme, fontSize }) => ({
  // ...theme.typography.h2,
  ...theme.typography[fontSize || 'h2'],
  color: theme.palette.text.primary,

  '@media (max-width: 500px)': {},
}));
export const CongratsHeading = styled(Box)(({ theme, fontSize }) => ({
  // ...theme.typography.h2,
  ...theme.typography[fontSize || 'h1'],
  color: theme.palette.text.primary,

  '@media (max-width: 500px)': {},
}));

export const DashboardDescription = styled(Box)(({ theme }) => ({
  ...theme.typography.h7,
  color: theme.palette.text.secondary,

  '@media (max-width: 500px)': {},
}));
export const YelloBox = styled(Box)(({ theme }) => ({
  ...theme.typography.h7,
  padding: '10px 10px',
  borderRadius: '10px',
  color: '#020202',
  backgroundColor: '#FEDF89',
}));

export const CircleComponent = styled(Box)(({ theme, huge, dark }) => ({
  borderRadius: '100%',
  width: huge ? '50px' : '25px',
  height: huge ? '50px' : '25px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: dark ? '#000000' : '#4B4A4A',

  color: '#fff',
}));

export const FlexBox = styled(Box)(
  ({ theme, alignItems, justifyContent, changeDirection, gap }) => ({
    display: 'flex',
    alignItems: alignItems ?? 'center',
    justifyContent: justifyContent ?? 'flex-start',
    flexDirection: changeDirection ? 'column' : 'row',
    gap: gap ? gap : '10px',
  }),
);

export const UserFullName = styled(Box)(({ theme, inverse }) => ({
  ...theme.typography.h6,
  color: inverse ? theme.palette.text.inverse : theme.palette.text.primary,
}));

export const CongratsText = styled(Box)(({ theme }) => ({
  ...theme.typography.h5,
  color: theme.palette.text.primary,

  '@media (max-width: 500px)': {},
}));

export const RenderItemText = styled('p')(({ theme, inverse }) => ({
  ...theme.typography.body5,
  color: inverse
    ? theme.palette.text.inverseSecondary
    : theme.palette.text.secondary,
}));

export const LottieContainer = styled(Box)(() => ({
  position: 'relative',
  width: '100%',
  height: '100%',
}));
export const LottieContent = styled(Box)(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgba(255, 255, 255, 0.0)' /* Semi-transparent background */,
  zIndex: 2,
}));
