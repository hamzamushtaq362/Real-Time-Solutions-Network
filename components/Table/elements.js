import { styled, Box, Typography, TableCell } from '@mui/material';

export const HeadTableCell = styled(TableCell)(
  ({ borderRight, theme, width, fontH }) => ({
    borderRight: borderRight ? `1px solid ${theme.palette.divider}` : '',
    ...theme.typography?.[fontH || "h9"],
    borderBottom: `none`,
    color: theme.palette.grey.commonText,
    padding: '8px 10px',
    width: width ? width : '',
  }),
);

export const BodyTableCell = styled(TableCell)(
  ({ borderRight, theme, width, padding,fontH }) => ({
    borderRight: borderRight
      ? `1px solid ${theme.palette.dividerSecondary}`
      : '',
    borderBottom: `1px solid ${theme.palette.borderLight}`,
    ...theme.typography?.[fontH || "h9"],
    color: theme.palette.text.primary,
    padding: padding ? padding : '10px',
    width: width ? width : '',
    height: '100px',
  }),
);

export const TableNavbarContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
}));

export const SortByContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  marginRight: 24,
});

export const SortByText = styled(Typography)(({ theme }) => ({
  ...theme.typography.body4,
  color: theme.palette.text.primary,
}));

export const TableNavbarSearchContainer = styled(Box)(({ theme }) => ({
  width: '40%',
}));

export const UserDescriptionContainer = styled(Box)({
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  columnGap: '12px',
});

export const UserDescriptionSubContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
});

export const UserName = styled(Typography)(({ theme }) => ({
  ...theme.typography.h7,
  color: theme.palette.text.primary,
}));

export const UserSubText = styled(Typography)(({ theme }) => ({
  ...theme.typography.body6,
  color: theme.palette.grey.common,
}));

export const NoResultsFoundContainer = styled(Box)({
  width: '100%',
  height: '400px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

export const NoResultsText = styled(Typography)(({ theme }) => ({
  ...theme.typography.h6,
  color: theme.palette.grey.common,
}));
