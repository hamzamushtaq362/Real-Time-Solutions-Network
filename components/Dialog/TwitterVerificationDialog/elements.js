import { styled, Box, Typography, Avatar } from '@mui/material';

export const DialogContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(5, 10),
  textAlign: 'center',
}));

export const DialogHeader = styled(Typography)(({ theme }) => ({
  ...theme.typography.h4,
  color: theme.palette.black.main,
  marginBottom: '0.5rem',
}));

export const SubText = styled(Typography)(({ theme, color }) => ({
  ...theme.typography.body4,
  color: color ? color : theme.palette.grey.common,
  marginBottom: '0.6rem',
}));

export const EventDetailsContainer = styled(Box)({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const DetailsTextContainer = styled(Box)(({ theme, flex }) => ({
  flex: flex ? flex : 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
}));

export const CollabPreviewContainer = styled(Box)({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
});

export const CollabPreviewImage = styled(Avatar)({});

CollabPreviewImage.defaultProps = {
  variant: 'square',
  sx: {
    width: '4rem',
    height: '4rem',
    marginRight: '1rem',
  },
};
