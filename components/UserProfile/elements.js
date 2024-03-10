import { Box, styled, Skeleton } from '@mui/material';

export const SkeletonContainer = styled(Box)({
  width: '100%',
  position: 'relative',
  height: '230px',
  marginTop: '40px',

  '& .MuiSkeleton-rounded': {
    borderRadius: '12px',
  },
});

export const AvatarSkeleton = styled(Skeleton)({
  position: 'absolute',
  bottom: -40,
  left: 70,
});

export const ProfileBottom = styled(Box)(({ sideNavBarOpen }) => ({
  boxSizing: 'border-box',
  padding: '2rem',
  width: `${!sideNavBarOpen && 'calc(100% - 5rem)'}`,
}));

export const ProfilePageContainerOrg = styled(Box)({
  padding: '3rem',
  width: '100%',
});

export const ProfilePageContainer = styled(Box)(({ sideNavBarOpen }) => ({
  padding: '3rem',
  width: `${!sideNavBarOpen && 'calc(100% - 5rem)'}`,
}));

export const CenterFlex = styled(Box)({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
});

export const ProfilePageContainerNew = styled(Box)(() => ({
  width: '100%',
}));
