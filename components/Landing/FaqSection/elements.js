import { Box, styled, Accordion as MuiAccordion, AccordionDetails as MuiAccordionDetails, AccordionSummary as MuiAccordionSummary } from '@mui/material';

export const FAQTitle = styled(Box)(({ theme }) => ({
  ...theme.typography.h6,
  display: 'flex',
  alignItems: 'flex-start',
  color: theme.palette.text.primary,
  fontSize: 30,
  flex: 1.63,

  '@media (max-width: 500px)': {
    fontSize: 20,
  },
  '@media (min-width: 1500px)': {
    flex: 1.45,
  },
  '@media (min-width: 1900px)': {
    flex: 1.4,
  }
}));
export const FAQNumber = styled(Box)(({ theme }) => ({
  ...theme.typography.h6,
  display: 'flex',
  alignItems: 'flex-start',
  color: theme.palette.text.primary,
  fontSize: 30,

  '@media (max-width: 500px)': {
    fontSize: 20,
  }
}));
export const PlusIconWrap = styled(Box)(({ theme, isRotated }) => ({
  transform: isRotated ? 'rotate(135deg)' : 'rotate(0deg)',
  transition: 'transform 400ms ease-in',
}));

export const FAQDescription = styled(Box)(({ theme }) => ({
  ...theme.typography.h6,
  color: theme.palette.text.primary,
  fontSize: 24,
  display: 'flex',
  alignItems: 'flex-start',
  flex: 1,
  paddingLeft: theme.spacing(2.5),

  '@media (max-width: 500px)': {
    fontSize: 16,
    paddingLeft: theme.spacing(1),
  }
}));
export const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  borderWidth: '0 0 1px 0',
  borderStyle: 'solid',
  borderColor: theme.palette.border2,
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
  backgroundColor: theme.palette.background.paperLanding,
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    margin: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
  },
}));

export const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paperLanding,
  borderWidth: '1px 0 0 0',
  borderStyle: 'solid',
  borderColor: theme.palette.border2,
}));
