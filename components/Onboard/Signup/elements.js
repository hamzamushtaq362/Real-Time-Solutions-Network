import { styled, Typography, Box, Input, Button } from '@mui/material';

export const OnBoardRightSignUpLabel = styled(Typography)(({ theme }) => ({
  ...theme.typography.h7,
  color: 'rgba(248, 244, 244, 0.80)',
  fontFamily: 'SF Display Pro, Inter',
  fontWeight: 200
}));

export const OnBoardRightSignUpInput = styled(Input)(({ theme }) => ({
  width: '100%',
  padding: '1.2rem 1.8rem',
  borderRadius: '2.6rem',
  border: `0.15rem solid ${theme.palette.background.borderSecondary}`,
  color: theme.palette.text.primary,
  '& .MuiInputBase-input': {
    ...theme.typography.subTitle5,
    height: 5,
  },
}));

export const OnBoardRightProviderButton = styled(Button)(({ theme, width }) => ({
  width: width ?? 'fit-content',
  fontSize: '16px',
  fontWeight: '700',
  borderRadius: '50px',
  backgroundColor: 'rgba(0, 0, 0, 0.40)',
  color: '#FFF',
  cursor: 'pointer',
  textTransform: 'none',
  display: 'flex',
  justifyContent: 'flex-start',
  marginRight: theme.spacing(2),
  padding: theme.spacing(1, 2),
  transition: 'all 100ms',
  boxShadow: 'none',
  '&:hover': {
    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
    backgroundColor: 'rgba(0, 0, 0, 1)',
    '& div': {
      color: '#FFF',
    }
  },
}));

export const OnBoardRightProviderContent = styled(Box)(({ theme }) => ({
  ...theme.typography.h6,
  color: '#F7F8F8',
  textShadow: '0px 3px 8px 0px rgba(0, 0, 0, 0.25)',
  fontFamily: 'SF Pro Display, Inter',
  fontSize: '18px',
  fontWeight: 400,
  lineHeight: '24.48px',
  marginLeft: theme.spacing(0.8),
}));
export const OnBoardRightImageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const TermsAndConditionLink = styled('a')(({ theme }) => ({
  ...theme.typography.h7,
  display: 'inline',
  cursor: 'pointer',
  color: 'rgba(248, 244, 244, 0.80)',
  fontWeight: 200,
  fontFamily: 'SF Display Pro, Inter',
}));

export const LoadingContainer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const LoadingText = styled(Typography)(({ theme }) => ({
  ...theme.typography.h7,
  color: 'rgba(248, 244, 244, 0.60)',
  textAlign: 'center',
}));
