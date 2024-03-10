import { styled, Box, Typography, Button } from '@mui/material';

export const GraphContainer = styled(Box)(({ theme }) => ({
  // padding: '1rem 4rem',
  padding: '1rem 2rem',
  border: theme.palette.mode === "dark" ? "1px solid #F1F1F1" : `1px solid ${theme.palette.background.inverse}`,
  borderRadius: '4px',
}));

export const GraphBoxTopContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '.5rem 0',
  alignItems: 'center',
});

export const GraphTopTitleText = styled(Typography)(({ theme }) => ({
  fontSize: '30px',
  fontWeight: '300',
  color: theme.palette.text.primary,
}));

export const GraphTopTextWrapper = styled(Box)(() => ({
  display: 'flex',
  'align-items': 'center',
  gap: '0 1rem',
  'grid-gap': '0 1rem',
}));

export const GraphHr = styled(Box)({
  border: 'solid 1px rgba(207, 219, 213, 0.6)',
  margin: '2rem 0',
});

export const GraphChartContainer = styled(Box)(({ theme }) => ({
  // padding: '3rem',
  // border: `1px solid ${theme.palette.background.inverse}`,
  marginTop: '1.5rem',
}));

export const GraphChartContainerHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '3rem',
}));

export const GraphChartContainerButton = styled(Typography)(({ theme }) => ({
  padding: '1rem 2rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.default,
  color: theme.palette.background.inverse,
  border: `1px solid ${theme.palette.background.inverse}`,
  borderRadius: '50px',
  fontSize: '1rem',
  marginRight: '1rem',

  '&:hover': {
    backgroundColor: theme.palette.background.inverse,
    color: theme.palette.background.default,
  },

  '&#active': {
    backgroundColor: theme.palette.background.inverse,
    color: theme.palette.background.default,
  }

}));

export const GraphChartContainerSelect = styled('select')(({ theme }) => ({
  padding: '1rem 2rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.default,
  color: theme.palette.background.inverse,
  border: `1px solid ${theme.palette.background.inverse}`,
  borderRadius: '50px',
}));

export const GraphTopDurationButtonText = styled(Box)(({ isBold, theme }) => ({
  color: isBold ? theme.palette.text.primary : '#5d5d5b',
  'font-size': '14px',
  cursor: 'pointer',
  fontWeight: isBold ? 'bold' : 'normal',
}));

// export const Button = styled(Box)(
//   ({
//     isActive,
//     isRightBorder,
//     theme,
//     flatRightBorderRadius,
//     flatLeftBorderRadius,
//   }) => ({
//     backgroundColor: isActive
//       ? theme.palette.grey.normal1
//       : theme.palette.background.default,
//     padding: '7px 13px',
//     fontSize: '13px',
//     fontWeight: 500,
//     lineHeight: 1.67,
//     // color: '#344054',
//     color: theme.palette.text.primary,
//     borderRight: isRightBorder ? '.7px solid rgba(0,0,0,0.3)' : '',
//     cursor: 'pointer',
//     borderTopLeftRadius: flatLeftBorderRadius ? '8px' : '',
//     borderBottomLeftRadius: flatLeftBorderRadius ? '8px' : '',
//     borderTopRightRadius: flatRightBorderRadius ? '8px' : '',
//     borderBottomRightRadius: flatRightBorderRadius ? '8px' : '',
//   }),
// );
export const GraphButton = styled(Button)(
  ({
    isActive,
    isRightBorder,
    theme,
    flatRightBorderRadius,
    flatLeftBorderRadius,
  }) => ({
    backgroundColor: isActive
      ? theme.palette.grey.normal1
      : theme.palette.background.default,
    padding: '7px 13px',
    fontSize: '13px',
    fontWeight: 500,
    lineHeight: 1.67,
    // color: '#344054',
    color: theme.palette.text.primary,
    borderRight: isRightBorder ? '.7px solid rgba(0,0,0,0.3)' : '',
    cursor: 'pointer',
    borderTopLeftRadius: flatLeftBorderRadius ? '8px' : '',
    borderBottomLeftRadius: flatLeftBorderRadius ? '8px' : '',
    borderTopRightRadius: flatRightBorderRadius ? '8px' : '',
    borderBottomRightRadius: flatRightBorderRadius ? '8px' : '',
  }),
);

export const GraphBtnCont = styled(Box)(({ theme }) => ({
  border: `0.15rem solid ${theme.palette.background.border}`,
  // padding: '0 .4rem',
  borderRadius: '9px',
  display: 'flex',
  alignItems: 'center',
}));
