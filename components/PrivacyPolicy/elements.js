import { AccordionDetails as MuiAccordionDetails, Box, styled } from '@mui/material';

export const HeaderText = styled(Box)(({theme}) => ({
  ...theme.typography.h4,
  width: '100%',
  textAlign: 'center',
  color: theme.palette.text.primary
}));
export const PolicyTitle = styled(Box)(({theme}) => ({
  ...theme.typography.h4,
  display: 'flex',
  alignItems: 'flex-start',
  fontWeight: 500,
  flex: 1,
  paddingLeft: theme.spacing(1),
  color: theme.palette.text.primary,

  '@media (max-width: 500px)': {
    fontSize: 20,
    paddingLeft: 0,
  }
}));
export const DescriptionText = styled(Box)(({theme}) => ({
  ...theme.typography.h7,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(2)
}));
export const UppercaseDescription = styled(Box)(({theme}) => ({
  ...theme.typography.h7,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(2),
  fontWeight: 500,
}));

export const StyledList = styled('ul')(({theme}) => ({
  ...theme.typography.h7,
  color: theme.palette.text.primary,
  marginLeft: theme.spacing(4.5),
  marginBottom: theme.spacing(2)
}));
export const StyledListItem = styled('li')(({theme}) => ({
  ...theme.typography.h7,
  color: theme.palette.text.primary,
  paddingBottom: 8
}));
export const PrivacySubHeader = styled(Box)(({theme}) => ({
  ...theme.typography.h5,
  fontWeight: 500,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(2)
}));

export const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2, 4),
  backgroundColor: theme.palette.background.paperLanding,
  borderWidth: '1px 0 0 0',
  borderStyle: 'solid',
  borderColor: theme.palette.borderLight35,
}));
