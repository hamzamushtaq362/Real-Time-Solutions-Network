import { Box, styled } from '@mui/material';

export const MainContainer = styled(Box)({});

export const DetailCont = styled(Box)({
  display: 'grid',
  width: '100%',
  gridTemplateColumns: 'repeat(4, 1fr)',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '6rem 4rem',
  marginBottom: '5rem',
  // marginLeft: "2rem",
  paddingLeft: '4rem',
});

export const GraphCont = styled(Box)({
  '& .lg': {
    border: 'solid 1px rgba(207, 219, 213, 0.6)',
    'border-radius': '16px',
    margin: '4rem 2rem',
  },

  '& .grid': {
    display: 'grid',
    gridTemplateColumns: '65% 1fr',
  },

  '& .grid2': {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
  },

  '& .grid1': {
    padding: '4rem',
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gap: '0 4rem',
  },

  '& .graphGap': {
    padding: '1rem 2rem',
  },
  // gap: "0 1rem",
});

export const Button = styled(Box)(({ isActive, index }) => ({
  backgroundColor: isActive ? '#F9FAFB' : '#FFFFFF',
  padding: '6px 13px',
  fontSize: '15px',
  border: '.7px solid rgba(0,0,0,0.3)',
  borderRight: index === 0 ? '0px' : '',
  cursor: 'pointer',
  borderTopLeftRadius: index === 0 ? '1rem' : '0',
  borderTopRightRadius: index === 0 ? '' : '1rem',
  borderBottomLeftRadius: index === 0 ? '1rem' : '0',
  borderBottomRightRadius: index === 0 ? '' : '1rem',
}));

export const Flex = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
