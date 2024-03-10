import { Box, styled, Typography, Avatar, Button } from '@mui/material';

export const ProfileCoverImage = styled(Avatar)(
  ({ isGradient }) => ({
    width: '100%',
    borderRadius: '0rem',
    height: 250,
    objectFit: 'cover',
    background: isGradient ? 'linear-gradient(to right, #dc2424, #4a569d)' : '',

    '& .MuiSvgIcon-root': {
      display: 'none',
    },
    '@media (max-width: 600px)': {
      height: '150px',
    },
  }),
);
export const CoverContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  position: 'relative'
});
export const RepositionWrap = styled(Box)(({ hovered }) => ({
  position: 'absolute',
  right: 20,
  bottom: 20,
  opacity: hovered ? 1: 0,
  transition: 'opacity 150ms ease-out',
  display: 'flex',
  alignItems: 'center',

}));

export const BlurredSide = styled(Box)(({ src }) => ({
  height: '240px',
  background: `url(${src}) center/cover no-repeat`,
  filter: 'blur(40px)',
  flexGrow: 1
}));


export const CoverImageContainer = styled(Box)({
  position: 'relative',
});

export const CircleImagesContainer = styled(Box)({
  position: 'absolute',
  top: 100,
  right: 0,
});

Avatar.defaultProps = {
  variant: 'square',
};

export const ProfileBioNew = styled(Typography)(({ theme }) => ({
  ...theme.typography.h10,
  color: theme.palette.text.primary,
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '20.8px',
  marginTop: -4,
  width: 600,
  textAlign: 'center',

  '@media (max-width: 600px)': {
    fontSize: 14,
    marginTop: 0,
    width: '100%',
  },
}));

export const ProfileDetailContainer = styled(Box)(({ theme, mt }) => ({
  padding: theme.spacing(5, 0, 0),
  marginTop: theme.spacing(mt?? -5),
  '@media (max-width: 600px)': {
    padding: theme.spacing(5, 2, 0),
  },
}));

export const ProfileBanneInfoContainer = styled(Box)(({ theme, padding }) => ({
  ...theme.typography.h5,
  color: theme.palette.text.primary,
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: -112,
  padding: padding ? padding : 0,
  paddingLeft: '20px',

  '@media (max-width: 600px)': {
    padding: '20px 0',
    display: 'block',
  },
}));
export const ProfileBanneInfoDetailContainer = styled(Box)(({ theme }) => ({
  ...theme.typography.h5,
  color: theme.palette.text.primary,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
  '@media (max-width: 600px)': {
    width: '100%',
    marginLeft: 0,
  },
}));
export const ProfileBanneInfoRightDataContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: theme.spacing(1),
  minWidth: '320px',

  '@media (max-width: 600px)': {
    justifyContent: 'flex-start',
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(4),
  },
}));
export const ProfileBanneInfoSubText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  ...theme.typography.body4,
  lineHeight: '130%',
  display: 'flex',
  alignItems: 'center',
  letterSpacing: '-0.01em',
  textTransform: 'lowercase',

  '@media (max-width: 600px)': {
    fontSize: 14,
    marginBottom: theme.spacing(1),
  },
}));

export const ProfileBanneInfoTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: '28px',
  lineHeight: '130%',
  fontWeight: '400',
  display: 'flex',
  alignItems: 'center',
  letterSpacing: '-0.01em',
  marginTop: 8,

  '@media (max-width: 600px)': {
    fontSize: 24,
  },
}));

export const NameWrap = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  width: '100%',
}));
export const CommunityContributed = styled(Typography)(
  ({ theme }) => ({
    fontSize: 14,
    lineHeight: '20px',
    letterSpacing: '-0.14px',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    color: theme.palette.text.label,


  }),
);

export const ProfileStatWrap = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary66,
  fontSize: '14px',
  fontWeight: 300,
  lineHeight: '20.8px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 2,
}))

export const DotWrap = styled(Box)(({ theme }) => ({
  borderRadius: 50,
  margin: '0 8px',
}));

export const ButtonsWrap = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 10,
}))

export const FollowWrap = styled(Button)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontWeight: 400,
  color: theme.palette.text.primary88,
  border: `1px solid ${theme.palette.text.primary}`,
  padding: theme.spacing(0.6, 2.5),
  borderRadius: 50,
  margin: theme.spacing(0, 0.5),
  letterSpacing: '0.02em',
  cursor: 'pointer',
  textTransform: 'lowercase',
  fontSize: 18,
  '&:hover': {
    backgroundColor: theme.palette.background.card,
  }

}))
export const RoundedIcon = styled(Button)(({ theme, width, height }) => ({
  border: `1px solid ${theme.palette.border2}`,
  backgroundColor: theme.palette.background.landing,
  borderRadius: '50%',
  width: width ?? 42,
  height: height ?? 42,
  minWidth: 'unset',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'all 100ms ease-in',
  margin: theme.spacing(0, 0.5),

  '&:hover': {
    backgroundColor: theme.palette.background.card,
  },
}));