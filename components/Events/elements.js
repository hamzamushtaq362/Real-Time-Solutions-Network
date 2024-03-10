import {
  Accordion as MuiAccordion,
  AccordionDetails as MuiAccordionDetails,
  AccordionSummary as MuiAccordionSummary,
  Box,
  styled,
} from '@mui/material';

export const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  borderWidth: '0 0 1px 0',
  borderStyle: 'solid',
  borderColor: theme.palette.borderLight,
  '&:last-child': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

export const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  flexDirection: 'row-reverse',
  marginTop: 20,
  padding: theme.spacing(0, 4),
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    display: 'flex',
    alignItems: 'flex-start',
  },
}));

export const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2, 4),
  backgroundColor: theme.palette.background.paper,
  borderWidth: '1px 0 0 0',
  borderStyle: 'solid',
  borderColor: theme.palette.borderLight,
}));


export const EventTitle = styled(Box)(({ theme }) => ({
  fontWeight: 500,
  flex: 1,
  color: theme.palette.text.primary,
  fontSize: 18,
}));
export const EventDescription = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'fle  x-start',
  fontWeight: 400,
  flex: 1,
  color: theme.palette.text.primary,
  fontSize: 18,
}));

export const EventLocation = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  fontWeight: 400,
  fontSize: 14,
  textDecoration: 'underline',
  color: theme.palette.text.blue
}));
export const EventDate = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  fontWeight: 400,
  color: theme.palette.text.label,
  fontSize: 14,
}));