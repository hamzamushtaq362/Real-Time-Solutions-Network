import { Box, styled, Typography } from '@mui/material';
import { OutlinedButton, PrimaryButton } from 'components/Button';
import { ScrollStyles } from 'components';
import { makeStyles } from '@mui/styles';

export const MoreDetailsContainer = styled(Box)(({ theme }) => ({
  background: theme.palette.white.main,
  padding: theme.spacing(5),
  borderRadius: theme.spacing(1),
  overflowY: 'scroll',
  overflowX: 'hidden',
  ...ScrollStyles(theme),
}));

export const DialogHeader = styled(Typography)(({ theme }) => ({
  ...theme.typography.h4,
  color: theme.palette.black.main,
  fontSize: '21px',
  textAlign: 'center',
}));

export const MissionLabelKey = styled(Typography)(({ theme }) => ({
  ...theme.typography.h11,
  color: theme.palette.grey.commonText,
}));

export const MissionLabelValue = styled(Typography)(({ theme }) => ({
  ...theme.typography.h9,
  color: theme.palette.black.main,
  display: 'flex',
  columnGap: '4px',
}));

export const MissionAttributesContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
}));

export const AttributeSubContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
}));

export const TimeLineDotContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '24px',
  height: '24px',
  borderRadius: '50%',
  background: theme.palette.black.main,
  color: theme.palette.white.main,
}));

export const ButtonsContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const CancelButton = styled(OutlinedButton)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  color: theme.palette.common.black,
}));

CancelButton.defaultProps = {
  restrictHoverStyles: true,
};

export const SubmitButton = styled(PrimaryButton)(({ theme }) => ({
  backgroundColor: theme.palette.common.black,
  color: theme.palette.common.white,

  '&:hover': {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
}));

SubmitButton.defaultProps = {
  restrictHoverStyles: true,
};

export const useStyles = makeStyles((theme) => ({
  timeline: {
    '& .MuiTimelineItem-missingOppositeContent:before': {
      flex: 0,
      padding: 0,
    },
    '& .MuiTimelineSeparator-root': {
      marginRight: 'auto',
      marginLeft: 0,
      '& .MuiTimelineConnector-root': {
        marginRight: '10.5px',
        border: `1px dashed ${theme.palette.common.black}`,
        backgroundColor: theme.palette.common.white,
      },
    },
    '& .MuiTimelineConnector-root': {
      marginLeft: 'auto',
    },
  },
}));

export const CopyTextMainContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
});

export const InformationDescription = styled(Typography)(
  ({ theme, type, color }) => ({
    ...theme.typography.h9,
    color: color
      ? color
      : type === 'error'
      ? theme.palette.red.main
      : theme.palette.text.label,
  }),
);
