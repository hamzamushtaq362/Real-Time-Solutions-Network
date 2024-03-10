import { Box, styled } from '@mui/material';

export const MainCont = styled(Box)({
  padding: '2rem',
});

export const Heading2 = styled(Box)({
  fontSize: '3rem',
  padding: '2rem 0',
  fontWeight: '600',
});

export const EnsName = styled(Box)({
  padding: '.4rem 0',
  fontSize: "2rem",
  fontWeight: "600",
  cursor: 'pointer',
  width: "fit-content"
});


export const H4 = styled(Box)({
  fontSize: "2rem",
  fontWeight: "600",
})

export const BannerGradient = styled(Box)(({ background }) => ({
  background: background || '',
  width: '100%',
  borderRadius: '1.5rem',
  height: '240px',
  objectFit: 'cover',
}));
export const RoundedGradient = styled(Box)(({ background, position=true,width,height }) => ({
  background: background || '',
  borderRadius: '20%',
  boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
  width: width || '14rem',
  height: height || '14rem',
  marginTop: position ? '-7rem' : "0",
  padding: "4rem",
  marginLeft: position ? '4rem' : "0",
  position: position ? "absolute" : "",
  border: "6px solid rgb(255, 255, 255)"
}));
