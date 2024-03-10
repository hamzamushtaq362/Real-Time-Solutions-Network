import { styled, Box, Typography, Button } from '@mui/material';
import Image from 'next/image';
import { useIsMobileView } from 'utils/utils';

export const UserSettingsWalletContainer = styled(Box)({
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

export const WalletAddButton = styled(Button)(({ theme, notAllowed }) => ({
  color: theme.palette.text.primary,
  fontSize: '16px',
  fontWeight: 400,
  padding: '0.5rem 0',
  cursor: notAllowed ?? 'pointer',
  textTransform: 'none',
  marginRight: theme.spacing(2),

    '&:hover': {
      textDecoration: 'underline',
      background: 'transparent',
    },

    '@media (max-width : 500px)': {
      marginRight: theme.spacing(1),
    },

  }),
);

export const PrimaryWallet = styled(Box)(() => {
  const isMobileView = useIsMobileView();
  return {
    display: 'grid',
    gridTemplateColumns: isMobileView ? '1fr' : '1fr 4fr',
    marginBottom: '2rem',
  };
});

export const PrimaryWalletTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: '20px',
  fontWeight: 400,
  padding: '0.75rem 0',
}));

export const SelectPrimaryWallet = styled(Box)(() => {
  const isMobileView = useIsMobileView();
  return {
    position: 'relative',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    width: isMobileView ? 361 : 292,
  };
});

export const SelectPrimaryWalletTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '16px',
  fontWeight: 400,
  marginBottom: '1rem',
}));

export const SelectPrimaryWalletBox = styled(Box)(({ theme }) => {
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

export const SelectPrimaryWalletBoxOptionSelected = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
});

export const SelectPrimaryWalletBoxOptionSelectedAddress = styled(Typography)(
  ({ theme }) => ({
    color: theme.palette.text.primary,
    fontSize: '16px',
    fontWeight: 400,
    paddingLeft: '0.75rem',
  }),
);

export const SelectPrimaryWalletBoxOption = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
}));

export const Web3Container = styled(Box)(() => {
  const isMobileView = useIsMobileView();
  return {
    display: 'grid',
    gridTemplateColumns: isMobileView ? '1fr' : '1fr 4fr',
    marginBottom: '2rem',
  };
});

export const Web3Title = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: '20px',
  fontWeight: 400,
  padding: '0.5rem 0',
}));

export const ManageWallets = styled(Box)({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  flexDirection: 'column',
});

export const ManageWalletsItems = styled(Box)({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  flexDirection: 'column',
  width: '100%',
  marginBottom: '2rem',
});

export const ManageWalletsItem = styled(Box)(() => {
  const isMobileView = useIsMobileView();
  return {
    display: 'grid',
    gridTemplateColumns: isMobileView ? '1fr' : '1fr 1fr 1fr',
    width: '100%',
    padding: '0.5rem 0',
    marginBottom: isMobileView ? '2rem' : 0,
  };
});

export const WalletInfo = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  padding: '0.5rem 0',
});

export const WalletStatus = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  flexDirection: 'column',
  color: theme.palette.text.secondary,
  padding: '0.5rem 0',
}));

export const WalletActions = styled(Box)(() => {
  const isMobileView = useIsMobileView();
  return {
    display: 'flex',
    alignItems: isMobileView ? 'flex-start' : 'center',
    justifyContent: isMobileView ? 'flex-start' : 'flex-end',
    flexDirection: isMobileView ? 'column' : 'row',
    padding: '0.5rem 0',
  };
});

export const WalletInfoTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: '16px',
  fontWeight: 400,
  marginLeft: '0.75rem',
}));

export const AddMore = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: '16px',
  fontWeight: 400,
  marginRight: '1.75rem',
  padding: '1rem 0',
  cursor: 'default',
}));

export const RemoveModalHeading = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: 24,
  fontWeight: 500,
  marginBottom: '1rem',
}));

export const RemoveModalWalletContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  flexDirection: 'column',
});

export const RemoveModalWalletRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  padding: '1rem',
  borderBottom: `1px solid ${theme.palette.text.secondary}`,

  '&:hover': {
    backgroundColor: theme.palette.background.secondary,
  },
}));

export const RemoveModalWalletRowSection = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
});

export const RemoveModalWalletRowSectionImage = styled(Image)({
  marginRight: '1rem',
});

export const RemoveModalWalletRowSectionAddress = styled(Typography)(
  ({ theme }) => ({
    color: theme.palette.text.primary,
    fontSize: 18,
    fontWeight: 400,
  }),
);

export const RemoveModalWalletRowSectionButton = styled(Typography)(
  ({ theme }) => ({
    color: theme.palette.text.primary,
    fontSize: 22,
    fontWeight: 400,
    border: `1px solid ${theme.palette.text.primary}`,
    padding: '1rem',
    lineHeight: 0,
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',

    '&:hover': {
      backgroundColor: theme.palette.background.inverse,
      color: theme.palette.background.default,
    },
  }),
);
