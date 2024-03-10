import { styled, Box, Typography } from '@mui/material';

export const RoleMenuRowContainer = styled(Box)({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  '@media (max-width: 900px)': {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
});

export const RolesLabel = styled(Typography)(({ theme }) => ({
  ...theme.typography.body5,
  color: theme.palette.grey.commonSecondary,
}));
