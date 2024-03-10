import { styled, Box } from '@mui/material';

export const Spacer = styled(Box)(({ value, type, theme }) => {
  const spacingValue = theme.spacing(value/8).replace('px', '');
  if (type === 'horizontal') {
    return {
      maxHeight: '1px',
      marginLeft:  spacingValue / 2,
      marginRight: spacingValue / 2,
    };
  } else {
    return {
      marginTop: spacingValue / 2,
      marginBottom: spacingValue / 2,
    };
  }
});
