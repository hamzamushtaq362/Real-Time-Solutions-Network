import { Box, styled } from '@mui/material';

export const ProfileGrid = styled(Box)({
//   display: 'grid',
//   gridTemplateColumns: '1fr 1fr',
  padding: '3rem 3rem',
//   gap: '2rem',
  backgroundColor: '#F3F3F3',
  minHeight: '10rem',
});

export const ProfileFlex = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '0 2rem',
});


export const ProfileStatsBox = styled(Box)(({ height,width }) => ({
    backgroundColor: '#ffffff',
    border: '1px solid #BABABA',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '2rem',
    width: width ? width : '30rem',
    padding: '2rem 2rem',
    height: height ? height : "10rem"
  }));



export const StatsChildBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem 0',
});

export const StatsTitle = styled(Box)({
  fontSize: '14px',
  color: '#636363',
});
export const StatsNum = styled(Box)({
  fontSize: '16px',
  color: '#151515',
  fontWeight: 'bold',
});
