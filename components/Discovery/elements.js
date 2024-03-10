import { Box, styled } from '@mui/material';
import { OpaqueButton, PrimaryButton } from '../Button';

export const DiscoveryMainContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3, 4),
}));

export const DiscoveryContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
  gridGap: '3rem',
  justifyContent: 'space-between',
}));

export const DiscoveryContentContainer = styled(Box)({
  width: '100%',
  padding: '30px 0',
  paddingTop: '10px',
});

export const ProfileCardsContainer = styled(Box)({
  width: '100%',
  padding: '0 30px',
  paddingTop: '10px',
});

export const ViewButton = styled(OpaqueButton)(({ theme }) => ({
  padding: '6px 14px',
  marginRight: '1rem',
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  border: `1px solid ${
    theme.palette.mode === 'light'
      ? theme.palette.grey.normal3
      : theme.palette.grey.normal1
  }`,
  borderRadius: '6px',
  width: '120px',
  ...theme.typography.button4,

  '& span': {
    marginLeft: '5px',
  },
}));

export const CollabButton = styled(PrimaryButton)(({ theme }) => ({
  width: '80px',
  marginRight: '1rem',
  backgroundColor: theme.palette.blue.main,
  color: theme.palette.white.main,
  borderRadius: '6px',
  ...theme.typography.button4,

  '&:hover': {
    opacity: 0.9,
  },

  '& span': {
    marginLeft: '5px',
  },
}));
