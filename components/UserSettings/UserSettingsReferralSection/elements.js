import { styled, Box, Typography } from '@mui/material';
import { useIsMobileView } from 'utils/utils';

export const UserSettingsReferralContainer = styled(Box)({
  padding: '3rem 2rem',
});

export const Heading = styled(Typography)(({ theme }) => ({
  fontSize: '32px',
  fontWeight: 400,
  lineHeight: '41.6px',
  letterSpacing: '-1%',
  color: theme.palette.text.primary,
  marginBottom: '2rem',
}));

export const Shared = styled(Box)(() => {
  const isMobileView = useIsMobileView();
  return {
    display: 'grid',
    gridTemplateColumns: isMobileView ? '1fr' : '1fr 4fr',
    marginBottom: '2rem',
  };
});

export const SharedTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: '20px',
  fontWeight: 400,
  paddingBottom: '0.75rem',
}));

export const ReferredContainer = styled(Box)(() => {
  const isMobileView = useIsMobileView();
  return {
    display: 'grid',
    gridTemplateColumns: isMobileView ? '1fr' : '1fr 4fr',
    marginBottom: '2rem',
  };
});

export const ReferredTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: '20px',
  fontWeight: 400,
  paddingBottom: '0.5rem',
}));

export const SharedContainer = styled(Box)({
  position: 'relative',
  display: 'flex',
  alignItems: 'flex-start',
});

export const SocialLinksRow = styled(Box)({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
});

export const SharedContainerTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '16px',
  fontWeight: 400,
  marginBottom: '1rem',
}));

export const SharedContainerBox = styled(Box)(({ theme }) => {
  const isMobileView = useIsMobileView();
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    border: `1px solid ${theme.palette.grey[500]}`,
    padding: '0.75rem 1.2rem',
    borderRadius: '50px',
    width: isMobileView ? '100%' : '31%',
    zIndex: 1,
    backgroundColor: theme.palette.background.default,
  };
});

export const InputContainer = styled(Box)(()=>{
  const isMobileView = useIsMobileView();
  return {
  position: 'relative',
  width: isMobileView ? '100%' : 600,
};
});

export const InputContainerControl = styled('input')(({ theme }) => ({
  color: theme.palette.background.inverse,
  width: '100%',
  borderRadius: 50,
  padding: '0.8rem 1.2rem',
  backgroundColor: theme.palette.background.default,
  border: `1px solid ${theme.palette.background.inverse}`,
}));

export const InputContainerButton = styled('button')(({ theme }) => ()=> {
  const isMobileView = useIsMobileView();
  return {
  position: isMobileView ? 'relative' : 'absolute',
  top: 0,
  right: 0,
  border: 'none',
  backgroundColor: theme.palette.background.inverse,
  color: theme.palette.background.default,
  margin: isMobileView ? '0 0 20px 0' : 5,
  padding: isMobileView ? '0.8rem 1.2rem' : '0.5rem',
  width: isMobileView ? '100%' : 125,
  cursor: 'pointer',
  borderRadius: 50,
  '&:hover': {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.background.inverse,
    border: `1px solid ${theme.palette.background.inverse}`,
  },
};
});
