import { Box, styled, Typography } from '@mui/material';

export const MainContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1rem 2rem',
  margin: '0rem 2rem',

  '& .MuiSkeleton-rounded': {
    borderRadius: '12px',
  },
  '& .tabfontSize': {
    fontSize: '16px !important',
    padding: '.2rem !important',
  },

  '& .MuiTabs-scroller': {
    overflow: 'hidden',
    marginBottom: '0px',
    backgroundColor: '#f7f7f7 !important',
    padding: '1rem 2rem',
  },

  '& .tabActive': {
    backgroundColor: '#000 !important',
    color: 'white !important',
  },

  '& .tabInActive': {
    backgroundColor: '#f7f7f7 !important',
    color: 'black !important',
  },

  '& .header': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '2rem',
    gap: '0 2rem',
  },
  '& .padding': {
    margin: '0rem 3rem',
  },
});

export const SectionHeaderText = styled(Typography)(({ theme }) => ({
  ...theme.typography.h4,
  color: theme.palette.text.primary,
}));

export const ProfileBottom = styled(Box)(({ sideNavBarOpen }) => ({
  boxSizing: 'border-box',
  paddingLeft: '5rem',
  width: `${!sideNavBarOpen && 'calc(100% - 5rem)'}`,
}));

export const ParentCont = styled(Box)(({ sideNavBarOpen }) => ({
  width: `${sideNavBarOpen ? 'calc(100% - 8rem)' : '100%'}`,

  '& .css-llao36-MuiPaper-root-MuiDialog-paper': {
    borderRadius: '4rem !important',
  },
}));

export const Btn = styled(Box)({
  marginTop: '10px',
  width: '200px',
  display: 'flex',
  alignItems: 'center',
  padding: '1rem',
  borderRadius: '10px',
  backgroundColor: '#f7f7f7',
  marginRight: '1rem',
  fontSize: '16px',
  color: '#808191',
  cursor: 'pointer',
  ':hover': '#EE4B2B',

  '& span': {
    marginLeft: '5px',
  },
});

export const AddImageContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
});

export const DialogTitleContainer = styled(Typography)(({ theme }) => ({
  fontStyle: 'normal',
  fontWeight: '700',
  fontSize: '20px',
  lineHeight: '26px',
  color: theme.palette.text.primary,
}));

export const DialogDescriptionText = styled(Typography)(({ theme }) => ({
  fontStyle: 'normal',
  fontWeight: '400',
  fontSize: '12px',
  lineHeight: '18px',
  color: theme.palette.grey.common,
}));

export const ChooseAddressTitle = styled(Typography)(({ theme }) => ({
  alignSelf: 'flex-start',
  fontStyle: 'normal',
  fontWeight: '400',
  fontSize: '14px',
  lineHeight: '20px',
  color: theme.palette.text.primary,
}));

export const ChooseRadioContainer = styled(Box)(({ theme }) => ({
  alignSelf: 'flex-start',
  fontStyle: 'normal',
  fontWeight: '500',
  fontSize: '14px',
  lineHeight: '24px',
  color: theme.palette.text.primary,
}));

export const ModalTopBar = styled(Box)(() => ({
  padding: '0px 12px',
  margin: '-30px 0 0 0',

  '& .css-1aquho2-MuiTabs-indicator': {
    backgroundColor: '#000000 !important',
  },
}));

export const ModalDescription = styled(Box)(({ isMargin = true }) => ({
  margin: isMargin && '6px 0 30px 0',
  width: '300px',
  color: '#808191',
  fontSize: '14px',
  lineHeight: 1.5,
}));

export const ModalAddressTitle = styled(Box)({
  fontSize: '20px',
  fontWeight: 'bold',
  padding: '0 0 .9rem 0',
});

export const ModalAddressCard = styled(Box)(() => ({
  background: 'rgba(216, 218, 230, 0.2)',
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  gap: '1rem 2rem',
  padding: '10px 15px',
  fontSize: '14px',

  '& .img': {
    width: '15px',
    height: '15px',
    cursor: 'pointer',
  },
}));

export const ModalAddressGrid = styled(Box)(() => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '2rem 2rem',
  alignItems: 'center',
}));

export const NoInsightsCont = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  width: '100%',
  flexDirection: 'column',
  gap: '2rem',

  '& .text': {
    color: '#171725',
    fontSize: '14px',
    margin: '26px 0',
  },
});

export const NoInsightsText = styled(Typography)(({ theme }) => ({
  ...theme.typography.h9,
  color: theme.palette.text.primary,
}));
