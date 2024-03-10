import { styled, Box, Skeleton } from '@mui/material';

export const ProfilePageContainer = styled(Box)(() => ({
  width: '100%',
  flex: 1,
  display: 'flex',
  flexDirection: 'column'
}));

export const CreatorProfileContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: 'calc(100vh - 55px)'
}));

export const CenterFlex = styled(Box)({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
});

export const SkeletonContainer = styled(Box)({
  width: '100%',
  position: 'relative',

  '& .MuiSkeleton-rounded': {
    borderRadius: '12px',
  },
});

export const AvatarSkeleton = styled(Skeleton)({
  margin: 'auto',
  marginTop: -104,

});
export const SkeletonIntroContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '10px',
});