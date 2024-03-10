import { styled, Box, Typography } from '@mui/material';

export const HeaderText = styled(Box)(({ theme }) => ({
  ...theme.typography.h3,
  color: theme.palette.text.primary,
}));

export const ContentContainer = styled(Box)({
  width: '100%',
});

export const HeaderContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3, 4, 1, 4),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export const MainContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1, 4, 3, 4),
}));

export const CreateEventMainHeader = styled(Box)(({ theme }) => ({
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

export const AddCollaboratorText = styled(Typography)(
  ({ theme, disabled }) => ({
    ...theme.typography.h9,
    color: theme.palette.text.primary,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    maxWidth: 'fit-content',
  }),
);

export const CollaboratorEmailContainer = styled(Box)({
  display: 'flex',
  columnGap: '10px',
  alignItems: 'center',
});

export const CollaboratorEmailText = styled(Typography)(({ theme }) => ({
  ...theme.typography.h9,
  color: theme.palette.text.primary,
}));

export const CollaboratorRoleText = styled(CollaboratorEmailText)({});

export const CollaboratorRecordInfo = styled(Typography)(({ theme }) => ({
  ...theme.typography.h9,
  color: theme.palette.grey.common,
}));
