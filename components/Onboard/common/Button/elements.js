import { styled } from '@mui/material';

export const OnboardButtonStyled = styled('button')(({ theme }) => ({
  padding: '1rem',
  marginTop: '1rem',
  marginBottom: '2rem',
  fontSize: '1.4rem',
  borderRadius: '2.5rem',
  border: `0.15rem solid ${theme.palette.background.borderSecondary}`,
  textAlign: 'center',
  fontWeight: '700',
  backgroundColor: theme.palette.background.inverse,
  color: theme.palette.background.default,
  width: '15rem',

  '&:hover': {
    color: theme.palette.white.main,
    backgroundColor: theme.palette.grey.grey33,
    cursor: 'pointer',
  },
}));
