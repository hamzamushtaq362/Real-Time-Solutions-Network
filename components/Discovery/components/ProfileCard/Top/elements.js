import { styled, Box } from '@mui/material';

export const ProfileTopContainer = styled(Box)(() => ({
  height: '12rem',
  width: '100%',
  position: 'relative',
}));

export const CoverImage = styled('img')({
  height: '100%',
  width: '100%',
  objectFit: 'cover',
});

export const ProfilePic = styled('img')({
  height: '8rem',
  width: '8rem',
  borderRadius: '50%',
  position: 'absolute',
  left: '2rem',
  bottom: '-4.9rem',
  objectFit: 'cover',
});
