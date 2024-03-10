import { styled, Box, Typography } from '@mui/material';

export const CurationsStatusContainer = styled(Box)({
  width: '100%',
  display: 'flex',

  '@media (max-width: 800px)': {
    flexDirection: 'column',
    marginTop: '75px',
  },
});

export const CurationsTablePadder = styled(Box)({
  width: '100%',
  padding: '30px 80px',
});

export const CollabDescriptionContainer = styled(Box)({
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  columnGap: '12px',
});

export const CollabDescriptionSubContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
});

export const CollabTitle = styled(Typography)(({ theme }) => ({
  ...theme.typography.h7,
  color: theme.palette.text.primary,
}));

export const CollabDescriptionText = styled(Typography)(({ theme }) => ({
  ...theme.typography.body6,
  color: theme.palette.grey.common,
}));

export const DesiredFeeText = styled(Typography)(({ theme }) => ({
  ...theme.typography.body4,
  color: theme.palette.text.primary,
}));

export const NoteToAdmin = styled(Typography)(({ theme }) => ({
  ...theme.typography.body5,
  color: theme.palette.text.primary,
}));

export const CurationActionCellContainer = styled(Box)({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});
