import { styled, Box } from '@mui/material';

export const SubCollabHeader = styled(Box)(({ theme }) => ({
  ...theme.typography.h3,
  color: theme.palette.text.primary,
}));

export const CreateSubCollabContainer = styled(Box)({
  width: '100%',
});

export const HeaderContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1.5, 4, 1, 4),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export const MainContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1, 4, 3, 4),
}));

export const CreateMissionMainHeader = styled(Box)(({ theme }) => ({
  ...theme.typography.h2,
  color: theme.palette.text.primary,
}));

export const InformationDescription = styled(Box)(({ theme, type, color }) => ({
  ...theme.typography.h9,
  color: color
    ? color
    : type === 'error'
    ? theme.palette.red.main
    : theme.palette.text.label,
}));

export const SubHeading = styled(Box)(({ theme }) => ({
  ...theme.typography.h6,
  color: theme.palette.text.primary,
}));
