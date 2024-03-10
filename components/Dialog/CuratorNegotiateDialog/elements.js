import { Box, styled, Typography } from '@mui/material';

export const CuratorNegotiateDialogContainer = styled(Box)(({ theme }) => ({
  padding: '30px',
  background: theme.palette.background.paper,
}));

export const CollabText = styled(Typography)(({ theme }) => ({
  ...theme.typography.body2,
  fontWeight: 400,
  color: theme.palette.text.primary,
}));

export const CollabSubText = styled(Typography)(({ color, theme }) => ({
  ...theme.typography.body5,
  color: color ? color : theme.palette.grey.common,
}));

export const AvatarHeaderText = styled(Typography)(({ color, theme }) => ({
  ...theme.typography.body4,
  color: color ? color : theme.palette.grey.normal6,
}));

export const HeaderLink = styled(AvatarHeaderText)(({ theme }) => ({
  color: theme.palette.blue.main,
  cursor: 'pointer',
}));

export const LabelRow = styled(Box)({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
});

export const CurationFeesContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
});

export const CurationFeeSubContainer = styled(Box)(
  ({ theme, showBorderLeft }) => ({
    width: '100%',
    height: '60px',
    flex: 1,
    paddingLeft: '10px',
    borderLeft: showBorderLeft
      ? `1px solid ${theme.palette.dividerSecondary}`
      : '',
  }),
);

export const CurationFeeLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey.common,
  ...theme.typography.body8,
}));

export const CurationFeeValue = styled(Typography)(({ theme }) => ({
  ...theme.typography.body4,
  color: theme.palette.text.primary,
}));
