import { styled, Box, Typography, Select, MenuItem } from '@mui/material';

export const SortBySelect = styled(Select)({
  '& .MuiOutlinedInput-root': {
    border: 'none',
  },
});

export const SortByMenuItem = styled(MenuItem)({});

export const BodyCellContainer = styled(Box)({
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  columnGap: '12px',
});

export const CuratorName = styled(Typography)(({ theme }) => ({
  ...theme.typography.h7,
  color: theme.palette.text.primary,
}));

export const CuratorSubText = styled(Typography)(({ theme }) => ({
  ...theme.typography.body6,
  color: theme.palette.grey.common,
}));

export const CuratorFeeText = styled(Typography)(({ theme }) => ({
  ...theme.typography.body4,
  color: theme.palette.text.primary,
}));

export const CuratorFeeNote = styled(Typography)(({ theme }) => ({
  ...theme.typography.body5,
  color: theme.palette.text.primary,
}));

export const CuratorsActionsCellContainer = styled(Box)({
  width: '100%',
  display: 'flex',
});

export const CuratorMessageSubCell = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '120px',
  flex: 1,
  borderRight: `1px solid ${theme.palette.dividerSecondary}`,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const CuratorNegotiateSubCell = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '120px',
  flex: 2,
  borderRight: `1px solid ${theme.palette.dividerSecondary}`,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const CuratorAcceptDenySubCell = styled(Box)(() => ({
  width: '100%',
  height: '120px',
  flex: 4,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  columnGap: '10px',
}));
