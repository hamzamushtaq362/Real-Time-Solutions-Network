import { Box, styled, Typography, Avatar } from '@mui/material';

export const ImagePanelCardContainer = styled(Box)(({ theme }) => ({
  padding: 0,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  width: 330,
  '@media (max-width: 600px)': {
    margin: 'auto',
  },
}));

export const PanelImage = styled(Avatar)({
  width: '100%',
  height: 300,
  margin: '18px auto 0 auto',
  borderRadius: 0,
});

export const PanelDetailsContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  alignSelf: 'flex-start',
  justifySelf: 'flex-start',
}));

export const CardTitleText = styled(Typography)(({ theme, hovered }) => ({
  ...theme.typography.h6,
  color: theme.palette.text.primary,
  fontSize: '20px',
  cursor: 'pointer',
  letterSpacing: '-0.26px',
  textDecoration: hovered ? 'underline' : 'none',
  textDecorationThickness: '1px',
  marginTop: 8
}));

export const PanelDescription = styled(Box)(({ theme }) => ({
  ...theme.typography.h6,
  color: theme.palette.text.primary,
  marginTop: theme.spacing(2),
  height: 28,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}));

export const Divider = styled(Box)({
  width: '100%',
  borderBottom: '1px solid #F2F2F2',
});

export const CreatorInfo = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  borderRadius: '15px',
}));

export const CreatorInfoData = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
}));

export const CreatorInfoName = styled(Box)(({ theme }) => ({
  textTransform: 'capitalize',
  fontSize: '16px',
  color:theme.palette.text.primary,
}));

export const MetricLabel = styled(Box)(({ theme }) => ({
  ...theme.typography.h6,
  fontSize: 14,
  color: theme.palette.text.secondary,
}));

export const GridContainer = styled(Box)(({ theme, gap }) => ({
  display: 'grid',
  gap: theme.spacing(gap ? gap : 4),
  gridAutoRows: 'minmax(0px, 1fr)',
  gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', // This will make each column take up equal width
}));

export const CardImageWrap = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',

}));
export const CreatorsWrap = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 10,
  left: 10
}))