import { Box, styled, Typography, Avatar } from '@mui/material';
import { PrimaryButton } from '../../Button';

export const ConfirmDialogContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  backgroundColor: theme.palette.background.paper,
  flexDirection: 'column',
  alignItems: 'center',
  padding: '10px',
  paddingTop: 0,
}));

export const HeaderRow = styled(Box)(({ theme }) => ({
  width: '794px',
  height: '99px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.palette.background.card,
}));

export const MessageHeader = styled(Typography)(({ theme }) => ({
  ...theme.typography.h2,
  width: '80%',
  textAlign: 'center',
  color: theme.palette.text.primary,
}));

export const AvatarRow = styled(Box)(({ theme }) => ({
  width: '794px',
  height: '99px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: '0.7px 0',
  borderColor: theme.palette.background.inverse,
  borderStyle: 'solid',
}));

export const AvatarHeader = styled(Typography)(({ theme }) => ({
  ...theme.typography.h9,
  fontWeight: 500,
  lineHeight: '20px',
  color: theme.palette.text.primary,
}));

export const AvatarContainer = styled(Box)(({ marginLeft, backgroundImage }) => ({
  height: '64px',
  width: '63px',
  marginLeft: marginLeft ? marginLeft: '',
  borderRadius: '18px',
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
}));

export const AvatarBody = styled(Typography)(({ theme }) => ({
  ...theme.typography.h9,
  fontWeight: 400,
  lineHeight: '15px',
  color: theme.palette.grey.common,
}));

export const BodyRow = styled(Box)({
  width: '66%',
  height: '420px',
  display: 'flex',
  flexDirection: 'column',
});

export const TitleRow = styled(Box)({
  width: '100%',
  minHeight: '80px',
  display: 'flex',
});

export const TitleHeader = styled(Typography)(({ theme }) => ({
  ...theme.typography.h9,
  fontWeight: 500,
  lineHeight: '20px',
  marginTop: '12px',
  color: theme.palette.text.primary,
}));

export const DescriptionRow = styled(Box)({
  width: '100%',
  minHeight: '194px',
  display: 'flex',
  flexDirection: 'column',
});

export const MessageText = styled(Typography)(({ theme }) => ({
  ...theme.typography.title3,
  fontWeight: 500,
  width: '80%',
  textAlign: 'center',
  color: theme.palette.text.primary,
}));

export const SuccessImage = styled(Avatar)({
  width: '250px',
  height: '180px',
});

export const ConfirmButtonContainer = styled(Box)({
  height: '50px',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
});

export const ConfirmButton = styled(PrimaryButton)({
  width: '232px',
  height: '32px',
  padding: '6px 12px 6px 12px',
  borderRadius: '8px',
  border: '1px solid',
  gap: '8px',
  transform: 'rotate(0deg)',
  borderImageSource: `radial-gradient(50% 93.75% at 50% 6.25%, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 100%)`,
  boxShadow: `0px 0px 0px 1px rgba(18, 18, 18, 1)`,
});
