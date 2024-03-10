import { styled } from '@mui/system';

export const BadgeFrameBorderBoxInner = styled('div')(() => ({
  width: '200px',
  height: '200px',
  border: '5px solid gray',

  borderTopLeftRadius: '800px',
  borderTopRightRadius: '800px',
  borderBottomLeftRadius: '400px',
  borderBottomRightRadius: '400px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
}));

export const BadgeFrameBorderBoxOuter = styled('div')(() => ({
  width: '250px',
  height: '250px',
  border: '10px solid gray',
  borderTopLeftRadius: '800px',
  borderTopRightRadius: '800px',
  borderBottomLeftRadius: '400px',
  borderBottomRightRadius: '400px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
}));
