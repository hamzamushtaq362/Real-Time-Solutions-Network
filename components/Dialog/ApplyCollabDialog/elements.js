import { Box, styled, Typography } from '@mui/material';

export const ApplyCollabContentContainer = styled(Box)(({ theme }) => ({
  background: theme.palette.background.paper,
  padding: theme.spacing(2.5, 4),
}));

export const CollabText = styled(Typography)(({ theme }) => ({
  ...theme.typography.body2,
  fontWeight: 400,
  color: theme.palette.text.primary,
}));

export const ApplyCollabMainHeader = styled(Typography)(({ color, theme }) => ({
  ...theme.typography.h1,
  color: color ? color : theme.palette.grey.common,
  display: 'inline-block',

  alignItems: 'center',
}));
export const ApplyCollabTitleHeader = styled('span')(
  ({ color, theme }) => ({
    ...theme.typography.h1,
    color: color ? color : theme.palette.text.primary,
    marginLeft: theme.spacing(1),
  }),
);

export const AvatarHeaderText = styled(Typography)(({ color, theme }) => ({
  ...theme.typography.body4,
  color: color ? color : theme.palette.grey.normal6,
}));
export const DialogLabelText = styled(Typography)(({ theme }) => ({
  ...theme.typography.h9,
  color: theme.palette.text.label,
}));
export const ApplyCollabContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  height: '100%',
});