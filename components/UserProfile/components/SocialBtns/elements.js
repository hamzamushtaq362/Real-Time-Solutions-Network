import { styled, Typography, MenuItem } from '@mui/material';

export const LinkCounterContainer = styled(MenuItem)(({ active }) => ({
  width: '100px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  rowGap: '10px',
  cursor: active ? 'pointer' : 'default',
  borderRadius: '10px',

  '&:hover': {
    backgroundColor: active ? '#F7F7F7' : '',
  },
}));

export const Counter = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  fontWeight: 500,
  lineHeight: '18px',
  color: '#2A2C33',
}));

export const CounterText = styled(Typography)(({ active, theme }) => ({
  fontSize: '14px',
  lineHeight: '20px',
  color: '#808191',

  cursor: active ? 'pointer' : '',
}));

export const CounterInfo = ({
  count,
  label,
  onClick,
  active,
  disabled,
  disableRipple,
}) => {
  return (
    <LinkCounterContainer
      active={active}
      onClick={onClick}
      disabled={disabled}
      disableRipple={disableRipple}
    >
      <Counter>{count}</Counter>
      <CounterText>{label}</CounterText>
    </LinkCounterContainer>
  );
};
