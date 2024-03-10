import { styled, Typography, Box } from '@mui/material';

export const InputHeader = styled(Typography)(
  ({ color, fontWeight, fontSize, lineHeight, theme }) => ({
    color: color ? color : theme.palette.grey.common,
    fontSize: fontSize ? fontSize : '15px',
    fontWeight: fontWeight ? fontWeight : 400,
    fontFamily: 'inherit',
    lineHeight: lineHeight ? lineHeight : '24px',
  }),
);

export const SuccessPopupClose = styled(Box)({
  width: '10%',
  display: 'flex',
  float: 'right',
  padding: '6px',
  // justifyContent: 'space-between',
});
