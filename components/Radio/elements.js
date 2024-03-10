import {
  FormControlLabel,
  Box,
  styled,
} from '@mui/material';

export const RadioFormControlLabel = styled(FormControlLabel)(
  ({ theme, width, inverse }) => ({
    maxWidth: '184px',
    minWidth: 'content-fit',
    padding: '0 12px',
    paddingLeft: 6,
    width: width ? width : '',
    height: '42px',
    border: `1px solid ${theme.palette.borderLight}`,
    borderRadius: '100px',

    '& .MuiTypography-root': {
      ...theme.typography.body5,
      color: inverse ? theme.palette.text.inverse : theme.palette.text.primary,
    },
  }),
);

export const RadioContainer = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  columnGap: '10px',
}));


export const BpIcon = styled('span')(({ theme }) => ({
  borderRadius: '50%',
  width: 18,
  height: 18,
  boxShadow: `0px 0px 0px 1px ${theme.palette.radio.boxShadow10}, 0px 1px 1px 0px ${theme.palette.radio.boxShadow10}`,
  backgroundColor: 'transparent',
  backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))',
  '.Mui-focusVisible &': {
    outline: '2px auto rgba(19,124,189,.6)',
    outlineOffset: 2,
  },
  'input:hover ~ &': {
    backgroundColor: 'transparent',
    boxShadow: `0px 1px 3px 0px ${theme.palette.radio.boxShadow10}, 0px 0px 0px 1px ${theme.palette.radio.boxShadow15}, 0px 1px 1px 0px ${theme.palette.radio.boxShadow10}`
  },
  'input:active ~ &': {
    boxShadow: `0px 1px 3px 0px ${theme.palette.radio.boxShadow10}, 0px 0px 0px 1px ${theme.palette.radio.boxShadow20}, 0px 1px 1px 0px ${theme.palette.radio.boxShadow10}, 0px 0px 0px 4px ${theme.palette.radio.boxShadow10}`
  },
  'input:focus:checked ~ &': {
    background: theme.palette.radio.background,
    boxShadow: `0px 0px 0px 1px ${theme.palette.radio.border}, 0px 0px 0px 4px ${theme.palette.radio.boxShadow10}`
  },
  'input:checked ~ &': {
    boxShadow: `0px 0px 0px 1px ${theme.palette.radio.border}`,
    background: theme.palette.radio.background,
  },
  'input:disabled ~ &': {
    boxShadow: 'none',
    background: 'rgba(57,75,89,.5)',
    border: `1px solid ${theme.palette.radio.boxShadow10}`,
  },
}));

export const BpCheckedIcon = styled(BpIcon)(({ theme }) => ({
  backgroundColor: theme.palette.background.full,
  boxShadow: `0px 1px 1px 0px ${theme.palette.radio.boxShadow10}, 0px 1px 2px 1px ${theme.palette.radio.boxShadow15} inset`,
  backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
  '&:before': {
    display: 'block',
    width: 18,
    height: 18,
    backgroundImage: `radial-gradient(${theme.palette.background.fullInverse},${theme.palette.background.fullInverse} 38%,transparent 40%)`,
    content: '""',
  },
}));
