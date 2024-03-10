import {
  Select as MuiSelect,
  styled,
  MenuItem as MuiMenuItem,
} from '@mui/material';

const fontStyles = {
  fontSize: '14px',
  fontFamily: 'Montreal, sans-serif',
  fontWeight: 400,
  lineHeight: '20px',
};

export const Select = styled(MuiSelect)(
  ({ width, height, borderRadius, color, theme, borderColor }) => ({
    ...fontStyles,
    width: width ?? '100%',
    height: height ?? 60,
    color: color ? color : theme.palette.text.primary,
    border: 'none',
    maxHeight: '60px',
    paddingLeft: '6px',
    paddingRight: '20px',
    boxSizing: 'border-box',
    borderRadius: borderRadius ? borderRadius : '100px',
    fontSize: 18,

    '& fieldset': {
      border: `1px solid ${
        borderColor ? borderColor : theme.palette.borderLight
      }`,
      borderRadius: borderRadius ? borderRadius : '100px',
    },
  }),
);

Select.defaultProps = {
  variant: 'outlined',
};

export const MenuItem = styled(MuiMenuItem)(({ theme }) => ({
  ...fontStyles,
  color: theme.palette.text.primary,
  width: '94%',

  borderRadius: '8px',
  padding: '10px 14px',
  margin: 'auto',
  marginTop: '2px',

  '&.MuiMenuItem-root': {
    '&.Mui-selected': {
      backgroundColor: theme.palette.grey.normal2,
      color: theme.palette.text.primary,
    },
  },

  '&:hover': {
    backgroundColor: theme.palette.grey.normal3,
    '&.MuiMenuItem-root': {
      '&.Mui-selected': {
        backgroundColor: theme.palette.grey.normal3,
      },
    },
  },
}));
