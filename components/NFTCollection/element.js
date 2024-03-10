import { styled, Box, Typography, Tab } from '@mui/material';
import { Avatar } from 'components/Avatar';
import { useIsMobileView } from 'utils/utils';

export const CollectionTopContainer = styled(Box)(({ bgImage }) => ({
  position: 'relative',
  height: 'auto',
  backgroundImage: `url(${bgImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  '&::before': {
    content: '"."',
    background: 'rgba(0,0,0,0.6)',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
}));

export const CollectionProfileCard = styled(Box)(() => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  zIndex: 2,
}));

export const CollectionTopImageContainer = styled(Box)({
  width: '100%',
  objectFit: 'cover',
  zIndex: 2,
});

export const CollectionTopBelowContainer = styled(Box)(({theme}) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
  height: 'calc(550px - 161px - 92.4px - 64px)',
  position: 'relative',
  padding: theme.spacing(4, 5),
  zIndex: 2,
}));

export const CollectionContainerTop = styled(Box)(({theme}) => ({
  position: 'relative',
  width: '100%',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  padding: theme.spacing(4, 5),
  zIndex: 2,
}));

export const CollectionTopBelowContainerCenter = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  // gap: '1rem',
  // rowGap: '1rem',
  padding: '25px 0px',
  zIndex: 2,
});

export const ProfileImage = styled('img')(({ theme }) => ({
  height: 50,
  width: 50,
  borderRadius: '50%',
  border: `1px solid ${theme.palette.grey[500]}`,
  padding: '5px',
  zIndex: 2,
}));

export const CollectionTopBelowProfileImage = styled(Avatar)(({ theme }) => ({
  width: '176px',
  height: '176px',
  padding: '0.8rem',
  borderRadius: '5px',
  backgroundColor: theme.palette.background.default,
  zIndex: 2,
}));

export const CollectionTopBelowImageHeading = styled(Typography)(
  ({ theme }) => ({
    fontSize: '32px',
    fontWeight: 400,
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(0),
    color:
      theme.palette.mode === 'dark'
        ? theme.palette.text.primary
        : theme.palette.background.default,
    zIndex: 2,
  }),
);

export const ProfileTextPrimary = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  fontWeight: 400,
  color:
    theme.palette.mode === 'dark'
      ? theme.palette.text.primary
      : theme.palette.background.default,
  zIndex: 2,
}));

export const ProfileTextSecondary = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  color:
    theme.palette.mode === 'dark'
      ? theme.palette.text.secondary
      : theme.palette.background.secondary,
  zIndex: 2,
  fontWeight: 400,
}));

export const CollectionTopBelowImageLinks = styled(Box)({
  margin: '0 2rem',
  gap: '1rem',
  rowGap: '1rem',
  display: 'flex',
  alignItems: 'center',
  zIndex: 2,
});

export const ContainerCenterEmptyBox = styled(Box)({
  minWidth: '165px'
});

export const NavTopContainer = styled(Box)({
  margin: '0 0 2rem 0'
});

export const CollectionTopBelowImageLink = styled(Box)(({ theme }) => ({
  color: theme.palette.text.primary,
  zIndex: 10,
  cursor: 'pointer'
}));

export const CollectionTopBelowStatusGrid = styled(Box)(({ theme }) => {
  const isMobileView = useIsMobileView();
  return {
    margin: theme.spacing(4, 5),
    display: 'flex',
    flexDirection: isMobileView ? 'column' : 'row',
    gap: '1rem',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 2,
    paddingBottom: '1rem',
  };
});

export const CollectionTopBelowStatusGridSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: '1rem',
  border: `1px solid ${
    theme.palette.mode === 'dark'
      ? theme.palette.text.primary
      : theme.palette.background.default
  }`,
  padding: '0.7rem 0',
  alignItems: 'center',
  zIndex: 2,
}));

export const CollectionStatusLabel = styled(Box)(({ theme }) => ({
  ...theme.typography.numberLabel,
  color:
    theme.palette.mode === 'dark'
      ? theme.palette.text.primary
      : theme.palette.background.default,
  fontSize: 14,
  textAlign : 'center',
}));

export const CollectionStatusValue = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  color:
    theme.palette.mode === 'dark'
      ? theme.palette.text.primary
      : theme.palette.background.default,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  marginBottom: '0.35rem',
  gap: '0 0.5rem',
  fontSize: 30,
  fontWeight: 400,
}));

export const MarginContainer = styled(Box)(({ theme }) => ({
  margin: theme.spacing(1, 5),
}));

export const CollectionBottomTabs = styled(Tab)(({ theme }) => ({
  fontSize: '16px !important',
  color: theme.palette.text.primary,
}));

export const CollectionNftsGrid = styled(Box)({
  display: 'grid',
  'grid-template-columns': 'repeat(3, 1fr)',
  'justify-content': 'center',
  'align-items': 'center',
  gap: '6rem 2rem',
  'grid-auto-rows': 'minmax(100px, auto)',
});

export const CenterFlex = styled(Box)({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
});
