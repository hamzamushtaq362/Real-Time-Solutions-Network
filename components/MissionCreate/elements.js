import { styled, Box, Typography } from '@mui/material';
import { ScrollStyles } from 'components';

export const CreateMissionContainer = styled(Box)({
  width: '100%',
});

export const SpinnerContainer = styled(Box)(() => ({
  width: '100%',
  height: '50vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const MainContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(5, 4, 3, 4),
}));

export const CreateMissionMainHeader = styled(Box)(({ theme }) => ({
  ...theme.typography.h2,
  color: theme.palette.text.primary,
}));

export const InformationDescription = styled(Typography)(
  ({ theme, type, color }) => ({
    ...theme.typography.h9,
    color: color
      ? color
      : type === 'error'
      ? theme.palette.red.main
      : theme.palette.text.label,
  }),
);

export const SubHeading = styled(Box)(({ theme }) => ({
  ...theme.typography.h6,
  color: theme.palette.text.primary,
}));

export const CreateNewBadgeLabel = styled(Typography)(({ theme }) => ({
  ...theme.typography.h8,
  '&:hover': {
    textDecoration: 'underline',
  },
  color: theme.palette.text.primary,
}));

export const BadgeLabelContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  columnGap: '2px',
  '&:hover': {
    cursor: 'pointer',
  },
}));

export const BadgesContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  border: `1px solid ${theme.palette.borderLight}`,
  columnGap: '4px',
  rowGap: '4px',
  padding: '10px 15px',
  borderRadius: '10px',
  display: 'flex',
  flexWrap: 'wrap',
  maxHeight: '142px',
  overflowY: 'scroll',
  ...ScrollStyles(theme),
}));
