import {
  styled,
  Box,
  Avatar,
  Typography,
  Accordion as MuiAccordion,
  AccordionSummary as MuiAccordionSummary,
  AccordionDetails as MuiAccordionDetails,
} from '@mui/material';

export const CreateCollabContainer = styled(Box)({
  width: '100%',
});

export const MainContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(5, 4, 3, 4),
}));

export const CreateCollabMainHeader = styled(Box)(({ theme }) => ({
  ...theme.typography.h2,
  color: theme.palette.text.primary,
}));

export const SubHeading = styled(Box)(({ theme }) => ({
  ...theme.typography.h6,
  color: theme.palette.text.primary,
}));

export const InformationDescription = styled(Box)(({ theme, type, color }) => ({
  ...theme.typography.h9,
  color: color
    ? color
    : type === 'error'
    ? theme.palette.snackbar.error.background
    : theme.palette.text.label,
}));

export const ProfilePhotoContainer = styled(Box)(({ theme }) => ({
  width: '110px',
  height: '110px',
  borderRadius: '50%',
  border: `1px solid ${theme.palette.borderLight}`,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  cursor: 'pointer',
}));

export const ProfilePhotoImage = styled(Avatar)({
  width: '88px',
  height: '88px',
  borderRadius: '50%',
});

export const SwitchLabel = styled(Typography)(({ theme }) => ({
  ...theme.typography.body8,
  color: theme.color?.text?.primary,
}));

export const SpinnerContainer = styled(Box)(() => ({
  width: '100%',
  height: '50vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  borderWidth: '0 0 1px 0',
  borderStyle: 'solid',
  borderColor: theme.palette.borderLight35,
  '&:last-child': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

export const AccordionSummary = styled((props) => (
  <MuiAccordionSummary {...props} />
))(({ theme }) => ({
  flexDirection: 'row-reverse',
  padding: 0,
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    display: 'flex',
    alignItems: 'center',
  },
}));

export const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(0),
  borderWidth: '1px 0 0 0',
  borderStyle: 'solid',
  borderColor: theme.palette.borderLight35,
}));

export const InfoLabel = styled(Box)(({ theme, width }) => ({
  fontSize: 16,
  lineHeight: '44.7px',
  letterSpacing: '-0.34px',
  color: theme.palette.text.label,
  width: width ?? 100,
}));

export const InfoValue = styled(Box)(({ theme }) => ({
  fontSize: 16,
  lineHeight: '18.2px',
  letterSpacing: '-0.14px',
  color: theme.palette.text.primary,
}));
