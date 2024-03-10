import {
  Box,
  styled,
  Typography,
  MenuItem,
  IconButton,
  Avatar, AccordionDetails as MuiAccordionDetails, Accordion as MuiAccordion, AccordionSummary as MuiAccordionSummary,
} from '@mui/material';
import { useIsMobileView } from 'utils/utils';

export const CategoriesAndTagsContainer = styled(Box)(({ theme }) => ({
  width: '100%',
}));

export const AddProjectOutsideContainer = styled(Box)(({ theme }) => ({
  textAlign: 'center',
}));

export const AddProjectMainHeader = styled(Box)(({ theme }) => ({
  ...theme.typography.h3,
  color: theme.palette.text.primary,
}));

export const ProjectHeader = styled(Box)(({ theme }) => () => {
  const isMobileView = useIsMobileView();
  return {
    padding: isMobileView
      ? theme.spacing(4, 2, 3, 2)
      : theme.spacing(4, 4, 3, 4),
    borderBottom: `1px solid ${theme.palette.borderLight}`,
  };
});

export const ActionsContainer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export const WrapLeftContainer = styled(Box)({
  display: 'inline-block',
});

export const StepsWrap = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  border: `1px solid ${theme.palette.borderLight}`,
  borderRadius: 100,
  position: 'relative',
  height: 50,

  '@media (max-width: 600px)': {
    width: '100%',
  },
}));
export const StepWrap = styled(Box)(({ theme, completed, active, error }) => ({
  ...theme.typography.h7,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0 32px',
  color: error
    ? theme.palette.snackbar.error.background
    : completed
    ? theme.palette.snackbar.success.background
    : active
    ? theme.palette.text.primary
    : theme.palette.text.label,
  position: 'relative',
  cursor: 'pointer',

  '@media (max-width: 600px)': {
    width: '25%',
    fontSize: 16,
  },
}));

export const ArrowWrap = styled(Box)({
  display: 'flex',
  position: 'absolute',
  right: -14,
});

export const NumberWrap = styled(Box)(
  ({ theme, active, completed, error }) =>
    () => {
      const isMobileView = useIsMobileView();
      return {
        ...theme.typography.h7,
        width: isMobileView ? '15px' : '30px',
        height: isMobileView ? '15px' : '30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        padding: isMobileView ? '6px' : '',
        fontSize: isMobileView ? '10px' : '16px',
        lineHeight: isMobileView ? '0' : '132%;',

        border: `1.5px solid ${
          error
            ? theme.palette.snackbar.error.background
            : completed
            ? theme.palette.snackbar.success.background
            : active
            ? theme.palette.text.primary
            : theme.palette.text.label
        }`,
        marginRight: theme.spacing(1),
        color: error
          ? theme.palette.snackbar.error.background
          : completed
          ? theme.palette.snackbar.success.background
          : active
          ? theme.palette.text.primary
          : theme.palette.text.label,
      };
    },
);

export const AddProjectSubHeaderDiv = styled(Box)({
  display: 'flex',
  justifyContent: 'flexStart',
  flexDirection: 'column',
  alignItems: 'flexStart',
});
export const AddProjectSubHeader = styled(Typography)(({ theme }) => ({
  fontSize: '1.4rem',
  // fontWeight: 900,
  textAlign: 'left',
  color: '#808191',
}));

export const RenderItemContainer = styled(MenuItem)({
  width: '100%',
  borderRadius: '10px',
  display: 'flex',
  height: '44px',
  alignItems: 'center',
});

export const RenderItemText = styled('p')(({ theme, inverse }) => ({
  ...theme.typography.body5,
  color: inverse
    ? theme.palette.text.inverseSecondary
    : theme.palette.text.secondary,
}));

export const UserFullName = styled(Box)(({ theme, inverse }) => ({
  ...theme.typography.h6,
  color: inverse ? theme.palette.text.inverse : theme.palette.text.primary,
}));

export const LocationText = styled(UserFullName)({});

export const ActionsWrap = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export const UploadHeaderWrap = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(6, 4),
}));

export const UploadContentWrap = styled(Box)(({ theme }) => ({}));
export const UploaderNoContentWrap = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 'calc(100vh - 420px)',
}));
export const UploaderWrap = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: theme.spacing(0, 1),
  marginBottom: theme.spacing(2),
}));

export const IconWrap = styled(Box)(({ theme }) => ({
  width: 110,
  height: 110,
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: theme.palette.text.inverse,
  border: `1px solid ${theme.palette.borderLight}`,
  cursor: 'pointer',
  transition: 'all 100ms ease-out',
}));

export const UploadText = styled(Box)(({ theme }) => ({
  ...theme.typography.h7,
  color: theme.palette.text.primary,
  marginTop: theme.spacing(1),
}));
export const ImagesWrap = styled(Box)(({ theme }) => ({
  borderRight: `1px solid ${theme.palette.borderLight}`,
  padding: theme.spacing(4),
}));
export const ImagesContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  border: `1px solid ${theme.palette.borderLight}`,
}));
export const ImageWrap = styled(Box)(({ theme }) => ({
  position: 'relative',
  marginBottom: theme.spacing(3),
}));
export const ImagePreview = styled(Avatar)(({ theme }) => ({
  width: '100%',
  height: 800,

  '@media (max-width: 600px)': {
    height: 300,
  },
}));
export const CloseWrap = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: 10,
  right: 10,
  border: `1px solid ${theme.palette.text.inverse}`,
}));

export const MainInformationWrap = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0, 4, 3, 4),
}));
export const SubHeading = styled(Box)(({ theme }) => ({
  ...theme.typography.h6,
  color: theme.palette.text.primary,

  '@media (max-width: 600px)': {
    marginBottom: theme.spacing(2),
  },
}));
export const InformationDescription = styled(Box)(({ theme, type }) => ({
  ...theme.typography.h9,
  color: type === 'error' ? theme.palette.red.main : theme.palette.text.label,
  maxWidth: '65%',

  '@media (max-width: 600px)': {
    marginTop: theme.spacing(2),
  },
}));

export const SpinnerContainer = styled(Box)(() => ({
  width: '100%',
  height: '50vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const LinkBoxRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  border: `1px solid ${theme.palette.borderLight}`,
  borderRadius: 10,
  flex: 1,
  position: 'relative',
}));

export const LinkBoxTitle = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  width: '40%',
  borderRight: `1px solid ${theme.palette.borderLight}`,
}));

export const LinkBoxValue = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  width: '60%',
}));
export const AddUrlWrap = styled(Box)(({ theme }) => ({
  position: 'absolute',
  right: 16,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  zIndex: 1,
}));

export const LinkText = styled(Box)(({ theme, width }) => ({
  ...theme.typography.h6,
  color: theme.palette.text.primary,
  borderBottom: `0.5px solid ${theme.palette.background.full}`,
  cursor: 'pointer',
  display: 'flex',
  width: width ?? 'fit-content',
}));

export const MetaTitleRowWrap = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
}));

export const FeaturedActionsWrap = styled(Box)(({ theme, hovered }) => ({
  display: 'flex',
  alignItems: 'center',
  opacity: !hovered ? 0 : 1,
  transition: 'all 100ms ease-out',
  marginLeft: 16,
}));

export const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2, 0),
  backgroundColor: 'unset',
  borderWidth: 0,
}));

export const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: 'unset !important',
  boxShadow: 'none',
  backgroundImage: 'none',
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
  alignItems: 'center',
  fontSize: 18,
  padding: theme.spacing(0, 4),
  borderTop: `1px solid ${theme.palette.borderLight66}`,
  borderBottom: `1px solid ${theme.palette.borderLight66}`,
  margin: theme.spacing(1, -4),
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));