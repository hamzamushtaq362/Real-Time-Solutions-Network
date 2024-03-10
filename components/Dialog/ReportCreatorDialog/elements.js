import { styled, Box } from '@mui/material';

export const ReportCreatorDialogContainer = styled(Box)(({ theme }) => ({
  padding: '30px',
  background: theme.palette.background.paper,
}));

export const ButtonsContainer = styled(Box)({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  columnGap: '10px',
});
