import { Avatar, Box, styled } from '@mui/material';
import { PrimaryButton, OpaqueButton } from '../../Button';

export const RightFlexContainer = styled(Box)({
  justifySelf: 'right',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  columnGap: '20px',
});

export const FollowButton = styled(PrimaryButton)(({ theme }) => ({
  marginTop: '10px',
  width: '144px',
  display: 'flex',
  alignItems: 'center',
  padding: '22px 10px',
  borderRadius: '10px',
  backgroundColor: theme.palette.blue.main,
  marginRight: '1rem',
  fontSize: '16px',

  '& span': {
    marginLeft: '4px',
  },
}));

export const CollabBtn = styled(OpaqueButton)(({ theme }) => ({
  marginTop: '10px',
  width: '144px',
  display: 'flex',
  alignItems: 'center',
  padding: '22px 10px',
  borderRadius: '10px',
  backgroundColor: theme.palette.grey.normal1,
  marginRight: '1rem',
  fontSize: '16px',
  color: theme.palette.grey.commonText,

  '& span': {
    marginLeft: '5px',
  },
}));

export const MessageBtn = styled(OpaqueButton)(({ theme }) => ({
  marginTop: '10px',
  width: '28px',
  display: 'flex',
  alignItems: 'center',
  padding: '22px 10px',
  borderRadius: '10px',
  backgroundColor: theme.palette.grey.normal1,
  marginRight: '1rem',
  fontSize: '16px',
  color: theme.palette.grey.common,
  '&:hover': {
    color: theme.palette.grey.commonSecondary,
  },
}));

export const FollowBtnsGroup = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '1rem',
});

export const UnfollowButton = styled(OpaqueButton)(({ theme }) => ({
  marginTop: '10px',
  width: '144px',
  display: 'flex',
  alignItems: 'center',
  padding: '22px 10px',
  borderRadius: '10px',
  marginRight: '1rem',
  fontSize: '16px',

  '& #unfollow-text': {
    display: 'none',
  },

  '&:hover': {
    color: theme.palette.red.red2B,

    '& #following-text': {
      display: 'none',
    },

    '& #unfollow-text': {
      display: 'block',
    },
  },
}));

export const SectionBannerContainer = styled(Box)({
  width: '100%',
  position: 'relative',
});

export const SectionBannerCoverImage = styled(Avatar)(({ src, alt, sx }) => ({
  src: src?.src,
  alt: alt?.alt,
  sx: sx?.sx,
}));
