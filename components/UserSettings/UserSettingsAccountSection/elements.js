import { Box, styled, Typography, TableCell } from '@mui/material';
import { useIsMobileView } from 'utils/utils';

export const AccountContentContainer = styled(Box)({
  width: '100%',
  padding: '2rem',
});

export const FlexBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  gap: '1rem',
});

export const RowContainer = styled(Box)(() => {
  const isMobileView = useIsMobileView();
  return {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: isMobileView ? 'column' : 'row',
  };
});

export const RowLabelHeaderContainer = styled(Box)({
  width: '100%',
  flex: 1,
  marginBottom: '1rem',
});

export const RowLabelHeader = styled(Typography)(({ theme }) => ({
  ...theme.typography.body4,
  lineHeight: '130%',
  letter: '-2%',
  color: theme.palette.text.primary,
}));

export const InputLabel = styled(Typography)(({ theme, type }) => ({
  ...theme.typography.h9,
  color: type === 'error' ? 'red' : theme.palette.text.label,
}));

export const RowContentContainer = styled(Box)(() => {
  const isMobileView = useIsMobileView();
  return {
    width: '100%',
    flex: 4,
    display: 'flex',
    columnGap: '20px',
    height: '100px',
    flexDirection: isMobileView ? 'column' : 'row',
  };
});

export const ContentSubContainer = styled(Box)({
  width: '31%',
  height: '100%',
  marginBottom: '1rem',

  '@media (max-width: 600px)': {
    width: '100%',
  },
});

export const InputWithStatusContainer = styled(Box)({
  position: 'relative',
  width: '100%',
});

export const InputWithStatus = styled(Box)({
  position: 'absolute',
  top: 0,
  right: 0,
  margin: '20px',
});

export const DropDownWithStatus = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
});

export const DialogHeaderWrap = styled(Box)({
  padding: '28px 74px',
  background: '#FAFAFA',
  borderBottom: '1px solid #D9D9D9',
});

export const DribbbleHeading = styled(Box)({
  fontSize: 22,
  fontWeight: 500,
  lineHeight: '20px',
  fontFamily: 'system-ui',
});

export const DribbbleSubText = styled(Box)({
  fontSize: 14,
  fontWeight: 300,
  lineHeight: '20px',
  fontFamily: 'system-ui',
});


export const DialogContentWrap = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  padding: '28px 74px',
  justifyContent: 'center',
  alignItems: 'center',
});
export const LogosWrap = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

export const RTSNText = styled(Box)(({ theme }) => ({
  lineHeight: '32.41px',
  letterSpacing: '0.3px',
  color: theme.palette.text.primary,
  fontFamily: theme.typography.fontFamilyFreight,
  fontWeight: 700,
  cursor: 'pointer',
  fontSize: 28,
}));

export const InstructionHeader = styled(Box)({
  fontSize: 16,
  fontWeight: 600,
  lineHeight: '20px',
  fontFamily: 'system-ui',
  color: '#5F5F5F',
  marginBottom: 20
});
export const InstructionContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start'
})
export const InstructionStep = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 20,
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    left: 12,
    top: -20,
    height: 21,
    width: 1,
    backgroundColor: 'rgba(160, 158, 158, 0.66)',
  },
  '&:first-of-type::before': {
    display: 'none',
  },
});

export const NumberCount = styled(Box)({
  width: 24,
  height: 24,
  borderRadius: '50%',
  color: '#A09E9E',
  background: '#F8F8F8',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 11,
  lineHeight: '20px'
});

export const StepText = styled(Box)({
  fontSize: 16,
  fontWeight: 300,
  lineHeight: 0,
  fontFamily: 'system-ui',
  color: '#A7A3A3',
  marginLeft: 8
});

export const ConnectText = styled(Box)({
  fontSize: 16,
  fontWeight: 400,
  lineHeight: '20px',
  fontFamily: 'system-ui',
  color: '#5F5F5F',
  textAlign: 'center',
  marginBottom: 20,
  marginTop: 20
});
export const StyledHeadCell = styled(TableCell)(({ theme }) => ({
  fontFamily: 'system-ui',
  fontWeight: 300,
  lineHeight: '20px',
  fontSize: 14,
  color: '#717179'
}))

export const StyledCell = styled(TableCell)(({ theme }) => ({
  fontFamily: 'system-ui',
  fontWeight: 400,
  lineHeight: '20px',
  fontSize: 14,
  color: theme.palette.text.primary,
  paddingLeft: 0
}))
export const LiveText = styled(Box)(({ theme }) => ({
  fontFamily: 'system-ui',
  fontWeight: 300,
  lineHeight: '20px',
  fontSize: 14,
  color: theme.palette.text.primary,
  marginLeft: 8
}))

export const AccountTypeOption = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  cursor: 'pointer',
  color: theme.palette.text.inverse,
  width: '100%',
  flexGrow: 1,
  '&:hover div, svg': {
    color: theme.palette.text.primary,
  }
}))