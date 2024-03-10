import { styled, Box, Typography, TableCell, TableRow } from '@mui/material';
import { PrimaryButton, SecondaryButton } from 'components/Button';

export const TableContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  border: `1px solid ${theme.palette.divider}`,
  borderBottom: 'none',
}));

export const StatsContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(4),

  '@media (max-width: 800px)': {
    flexDirection: 'column',
  },
}));

export const StatusChip = styled(Box)(({ theme, cursor }) => ({
  width: '125px',
  borderRadius: '30px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '10px',
  columnGap: '5px',
  backgroundColor: theme.palette.grey.normal9,
  ...theme.typography.body4,
  cursor: cursor ? cursor : '',
}));

export const ActionsCellContainer = styled(Box)({
  width: '100%',
  display: 'flex',
});

export const MessageSubCell = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '120px',
  flex: 1,
  borderRight: `1px solid ${theme.palette.dividerSecondary}`,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const AcceptDenySubCell = styled(Box)(() => ({
  width: '100%',
  height: '120px',
  flex: 4,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  columnGap: '10px',
}));

export const DesiredFeeText = styled(Typography)(({ theme }) => ({
  ...theme.typography.body4,
  color: theme.palette.text.primary,
}));

export const NoteToAdmin = styled(Typography)(({ theme }) => ({
  ...theme.typography.body5,
  color: theme.palette.text.primary,
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

export const LoadingContainer = styled(NoResultsFoundContainer)({});

export const TablePadder = styled(Box)({
  width: '100%',
  padding: '30px 80px',
});

export const CollabApplicantRowContainer = styled(Box)(({ theme, padder }) => ({
  width: '100%',
  overflow: 'hidden',
  border: `1px solid ${theme.palette.background.inverse}`,
  height: '180px',
  padding: padder ? '20px' : '',
}));

export const ApplicantNameAvatarContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '70px',
  borderBottom: `1px solid ${theme.palette.background.inverse}`,
  padding: '10px 14px',
  display: 'flex',
  alignItems: 'center',
  columnGap: '10px',
}));

export const ApplicantNameContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  columnGap: '15px',
});

export const ApplicantNameText = styled(Typography)(({ theme }) => ({
  ...theme.typography.h8,
  color: theme.palette.text.primary,
}));

export const NameAvatarSubText = styled(Typography)(({ theme, color }) => ({
  ...theme.typography.body8,
  color: color ? color : theme.palette.grey.common,
}));

export const NameAvatarPointer = styled(Box)(({ theme }) => ({
  width: '3px',
  height: '3px',
  borderRadius: '50%',
  backgroundColor: theme.palette.grey.common,
  marginLeft: '2px',
  marginRight: '2px',
}));

export const UserStatsContainer = styled(Box)({
  display: 'flex',
  columnGap: '3px',
  alignItems: 'center',
});

export const CollabApplicantsGrid = styled(Box)({
  width: '100%',
  justifyContent: 'center',
});

export const MemberDescriptionContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: '16px',
  borderBottom: `1px solid ${theme.palette.background.border}`,
  height: '120px',
}));

export const MemberDescriptionText = styled(Typography)(({ theme }) => ({
  ...theme.typography.body5,
  color: theme.palette.grey.common,
}));

export const ApplicantDetailsSectionContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '150px',
  borderBottom: `1px solid ${theme.palette.background.border}`,
  display: 'flex',
}));

export const ApplicantDetailsSubSectionContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  borderRight: `1px solid ${theme.palette.background.border}`,
  padding: '14px',
}));

export const ApplicantDetailsLabelText = styled(Typography)(({ theme }) => ({
  ...theme.typography.h11,
  color: theme.palette.text.primary,
}));

export const CompensationTypeLabel = styled(Typography)(({ theme }) => ({
  ...theme.typography.body8,
  color: theme.palette.grey.commonSecondary,
}));

export const CompensationValue = styled(Typography)(({ theme }) => ({
  ...theme.typography.body4,
  color: theme.palette.text.primary,
}));

export const ApplicantButtonGroupContainer = styled(Box)(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.background.inverse}`,
  borderBottom: `1px solid ${theme.palette.background.inverse}`,
  height: '6rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  width: '100%',
}));

export const AcceptApplicantButton = styled(PrimaryButton)({
  borderRadius: 0,
  height: '48px',
  width: '50%',
});

export const DenyApplicantButton = styled(SecondaryButton)({
  borderRadius: 0,
  border: 'none',
  height: '48px',
  width: '50%',
});

export const ApplicantStatusContainer = styled(Box)({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
});

export const StatusBox = styled(Box)({
  display: 'flex',
  columnGap: '4px',
  alignItems: 'center',
  marginTop: '8px',
});

export const StatusText = styled(Typography)(({ theme }) => ({
  ...theme.typography.h7,
  color: theme.palette.text.primary,
}));

export const TimeAgoText = styled(Typography)(({ theme }) => ({
  ...theme.typography.body6,
  color: theme.palette.text.primary,
}));

export const NoApplicantsFoundText = styled(Typography)(({ theme }) => ({
  ...theme.typography.h6,
  color: theme.palette.grey.common,
}));

export const HeaderTableCell = styled(TableCell)(({ theme }) => ({
  ...theme.typography.h7,
  borderBottom: 'none',
  padding: theme.spacing(1),
  color: theme.palette.text.disabled,
}));
export const StyledTableCell = styled(TableCell)(() => ({
  borderBottom: 'none',
  padding: '8px',
}));

export const RoleText = styled(Box)(({ theme }) => ({
  ...theme.typography.h6,
  color: theme.palette.text.primary,
}));

export const Commentary = styled(Box)(({ theme }) => ({
  ...theme.typography.h9,
  color: theme.palette.text.primary,
  width: '80%',
}));
export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.borderLight}`,
}));

export const CollabTableStatusText = styled(Typography)(({ theme }) => ({
  ...theme.typography.body6,
  color: theme.palette.text.primary,
}));
