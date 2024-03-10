import { Box, Button, styled, Typography } from '@mui/material';

export const OnBoardInviteContainer = styled(Box)({
  width: '80%',
  margin: 'auto',
  textAlign: 'center',
  marginTop: '7rem',
});
export const OnBoardInviteTitle = styled(Typography)(({ theme }) => ({
  fontSize: '32px',
  fontWeight: '600',
  lineHeight: '20px',
  textAlign: 'center',
  marginBottom: '1rem',
  color: theme.palette.text.primary,
}));
export const OnBoardInviteText = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: '400',
  lineHeight: '20px',
  textAlign: 'center',
  color: theme.palette.text.primary,
}));
export const OnBoardEarnBadgeContainer = styled(Box)(({ theme }) => ({
  width: '450px',
  height: '112px',
  display: 'flex',
  backgroundColor: theme.palette.grey.normal2,
  borderRadius: '10px',
  textAlign: 'center',
  margin: 'auto',
  alignItems: 'center',
}));

export const OnBoardEarnBadgeTitle = styled(Typography)(({ theme }) => ({
  alignSelf: 'center',
  ...theme.typography.title5,
  marginBottom: '1rem',
  color: theme.palette.text.primary, //'black',
  padding: '10px 0px 0px 20px',
}));

export const OnBoardEarnBadgeDesc = styled(Typography)(({ theme }) => ({
  ...theme.typography.body8,
  lineHeight: '20px',
  marginBottom: '1rem',
  color: theme.palette.grey.commonSecondary,
  textAlign: 'center',
}));

export const OnBoardInviteShareButton = styled(Button)(({ theme }) => ({
  width: '120px',
  padding: '19px 4px',
  ...theme.typography.button3,
  textTransform: 'none',
  textAlign: 'center',
  color: theme.palette.background.default,
  backgroundColor: theme.palette.background.inverse,
  borderRadius: '10px',
  cursor: 'pointer',

  '&:hover': {
    backgroundColor: theme.palette.background.inverse,
  },
}));

export const OnBoardInviteOrText = styled(Typography)(({ theme }) => ({
  ...theme.typography.body5,
  marginBottom: '1rem',
  color: theme.palette.grey.commonSecondary,
}));

export const OnBoardInviteInputContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: 'auto',
  width: '80%',
});

export const OnBoardInviteShareContainer = styled(Box)({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  columnGap: '20px',
});

export const OnBoardInviteSkipButton = styled(Box)(({ theme }) => ({
  width: '15rem',
  padding: '1rem',
  height: '38px',
  marginTop: '1rem',
  marginBottom: '2rem',
  fontSize: '1.4rem',
  borderRadius: '2.5rem',
  border: `0.15rem solid ${theme.palette.background.borderSecondary}`,
  textAlign: 'center',
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  fontWeight: '700',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  '&: hover': {
    backgroundColor: theme.palette.grey.normal2,
  },
}));
