import { Box, styled, Typography } from '@mui/material';
import { OpaqueButton, PrimaryButton } from '../../Button';

export const InvitationHeaderContainer = styled(Box)({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
});

export const InvitationTileContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  maxHeight: '700px',
  height: '100%',
  borderRadius: '10px',
  padding: '20px 18px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  backgroundColor: theme.palette.background.paper,

  boxShadow: '1px 1px 35px 2px rgba(0,0,0,0.04)',

  '& #invite-again-button': {
    display: 'none',
  },

  '&:hover': {
    boxShadow: '1px 1px 35px 2px rgba(0,0,0,0.08)',

    '& #invite-again-button': {
      display: 'block',
    },

    '& #CollabMemberMessageButton': {
      display: 'block',
    },
  },
}));

export const InviteTileSmallText = styled(Typography)(({ theme }) => ({
  ...theme.typography.body8,
  color: theme.palette.grey.common,
}));

export const InviteTileText = styled(Typography)(
  ({ color, fontSize, theme }) => ({
      fontSize: fontSize ? fontSize : '14px',
    fontWeight: 400,
    lineHeight: '21px',
    letterSpacing: '0.1px',
    color: color ? color : theme.palette.text.primary,
  }),
);

export const CollabMemberMessageButton = styled(PrimaryButton)({
  position: 'absolute',
  bottom: 14,
  zIndex: 2,
});

export const InvitationTileHeader = styled(Box)(({ theme }) => ({
  ...theme.typography.title5,
  letterSpacing: '0.1px',
  width: '100%',
  color: theme.palette.text.primary,
}));

export const InviterProfile = styled(Box)(({ theme }) => ({
  ...theme.typography.body8,
  color: theme.palette.blue.blueFE,
  textDecoration: 'underline',
  cursor: 'pointer',
}));

export const CollabText = styled(Box)(({ theme }) => ({
  ...theme.typography.body8,
  color: theme.palette.grey.common,
}));

export const CollabName = styled(Box)(({ theme }) => ({
  ...theme.typography.h9,
  letterSpacing: '0.1px',
  color: theme.palette.blue.main,
}));

export const InviteTileBlueText = styled(Box)(({ theme }) => ({
  fontWeight: 400,
  fontSize: '14px',
  textAlign: 'right',
  color: theme.palette.blue.main,
}));

export const InviteTileTextSeperate = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
});

export const InviteAcceptButton = styled(OpaqueButton)({});
