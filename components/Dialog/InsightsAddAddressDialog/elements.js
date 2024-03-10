import { styled, Box, Tab, Typography } from '@mui/material';

export const AddAddressContentContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: '30px',
  backgroundColor: theme.palette.background.paper,
}));

export const CollectionBottomTabs = styled(Tab)(({ theme }) => ({
  fontSize: '16px !important',
  color: theme.palette.text.primary,
}));

export const ModalDescription = styled(Box)(({ isMargin = true }) => ({
  margin: isMargin && '6px 0 30px 0',
  width: '300px',
  color: '#808191',
  fontSize: '14px',
  lineHeight: 1.5,
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

export const ModalAddressTitle = styled(Box)({
  fontSize: '20px',
  fontWeight: 'bold',
  padding: '0 0 .9rem 0',
});

export const ModalAddressGrid = styled(Box)(() => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '2rem 2rem',
  alignItems: 'center',
}));

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
