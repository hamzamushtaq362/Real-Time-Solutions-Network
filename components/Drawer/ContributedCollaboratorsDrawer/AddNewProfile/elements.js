import { Box, styled } from '@mui/material';

export const WrapContainer = styled(Box)(({ theme }) => ({
  margin: theme.spacing(2, 0),
}));

export const RadioChipContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  width: '190px',
  height: '54px',
  border: `1px solid ${theme.palette.borderLightInverse}`,
  borderRadius: '8px',
}));

export const BaseBox = styled(Box)(({ theme }) => ({
  width: '150px',
  height: '54px',
  border: `1px solid ${theme.palette.borderLightInverse}`,
  display: 'flex',
  alignItems: 'center',
}));

export const LeftBox = styled(BaseBox)({
  borderRight: 'none',
  paddingLeft: '10px',
  borderTopLeftRadius: '8px',
  borderBottomLeftRadius: '8px',
});

export const RightBox = styled(BaseBox)({
  borderTopRightRadius: '8px',
  borderBottomRightRadius: '8px',
});
