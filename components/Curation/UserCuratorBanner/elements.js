import { styled, Box, Typography, Button } from '@mui/material';
import { useIsMobileView } from 'utils/utils';

export const CuratorContainer = styled(Box)(({ theme }) => {
  return {
    width: '100%',
    height: 'auto',
    backgroundColor: theme.palette.grey.normal1,
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
  };
});

export const CuratorLeftSubContainer = styled(Box)({
  display: 'flex',
});

export const CuratorRightSubContainer = styled(Box)(() => {
  const isMobileView= useIsMobileView();
  return {
  display: 'flex',
  columnGap: '10px',
  alignItems: 'center',
  padding: '10px',
  paddingBottom: '1.5rem',
  paddingTop: isMobileView ? '48px' : '10px',
};
});

export const LeftCuratorTextContainer = styled(Box)({
  padding: '4px',
  marginLeft: '10px',
  marginTop: '10px',
  width: '100%',
});

export const BecomeACuratorText = styled(Typography)(({ theme }) => ({
  ...theme.typography.title5,
  lineHeight: '26px',
  color: theme.palette.text.primary,
}));

export const BecomeACuratorSubText = styled(Typography)(({ theme }) => ({
  ...theme.typography.body5,
  lineHeight: '20px',
  color: theme.palette.grey.commonSecondary,
  width: 'calc(100% - 1.5rem)',
  height: '40px',
}));

export const BecomeCuratorButton = styled(Button)(({ theme }) => ({
  width: '194px',
  height: '48px',
  float: 'right',
  marginRight: '20px',
  alignSelf: 'center',
  borderRadius: '10px',

  zIndex: 2,
  backgroundColor: theme.palette.black.main,
  color: theme.palette.white.main,

  ...theme.typography.body3,
  fontWeight: 600,

  textTransform: 'none',

  '&:hover': {
    backgroundColor: theme.palette.black.main,
    boxShadow: 'none',
    opacity: 0.9,
  },
}));

export const UilEditContainer = styled(Box)({
  display: 'flex',
  columnGap: '8px',
  alignItems: 'center',
});

export const CurationIconContainer = styled(Box)({
  display: 'flex',
  columnGap: '5px',
  alignItems: 'center',
});
