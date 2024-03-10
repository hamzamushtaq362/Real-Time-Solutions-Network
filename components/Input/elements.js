import { TextField as MuiTextField, Box, styled } from '@mui/material';
import { useContext } from 'react';
import { ListItemPaddingContext, ScrollStyles } from '~/components';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export const TextField = styled(MuiTextField)(
  ({
    width,
    padding,
    fontSize,
    fontWeight,
    borderRadius,
    borderOnFocus,
    theme,
    color,
    placeholderStyle,
    border,
    value,
    centeredInput,
  }) => ({
    width: width ? width : '100%',
    '& .MuiInputBase-root': {
      padding: padding ? padding : '8px',
      ...theme.typography.h7,
      fontSize: fontSize ? fontSize : '14px',
      borderRadius: borderRadius ? borderRadius : '12px',
      fontWeight: fontWeight ? fontWeight : 400,
      color: color ?? theme.palette.text.primary,

      border: borderOnFocus
        ? `1px solid ${theme.palette.borderLight} `
        : border
        ? border
        : '',

      '&.Mui-focused': {
        borderColor: theme.palette.background.default?.inverse,
      },

      '& ::placeholder': {
        color: theme.palette.grey.commonText,
      },
    },

    '& .MuiOutlinedInput-root': {
      border: border ?? `1px solid ${theme.palette.borderLight}`,
      borderRadius: borderRadius ? borderRadius : '12px',
      padding,
      fontSize: fontSize ? fontSize : '14px',

      fontWeight: 400,
      minHeight: 55,

      '&:hover': {
        border: border ?? `1.2px solid ${theme.palette.borderLight35}`,
      },
      '&.Mui-focused': {
        border: border ?? `1.5px solid ${theme.palette.borderLight66}`,
      },
    },

    '& .MuiInputBase-input': {
      padding: '0',
      ...placeholderStyle,
      maxWidth: centeredInput && (value ? 'none' : '80px'),
      textAlign: centeredInput && (value ? 'center' : 'left'),
    },

    '& fieldset': {
      border: 'none',
    },
  }),
);

export const AutocompleteStylesWrapper = styled(Box)({
  width: '100%',
  '& .MuiAutocomplete-endAdornment': {
    paddingRight: '10px',
  },
});

export const PaperComponentContainer = styled(Box)(({ theme }) => {
  const listItemPadding = useContext(ListItemPaddingContext);
  return {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    zIndex: 1,
    borderRadius: '10px',
    border: `1px solid ${theme.palette.borderLight}`,
    margin: theme.spacing(2, 0),
    '& .MuiAutocomplete-loading': {
      padding: '8px',
      fontSize: '14px',
    },
    '& .MuiAutocomplete-noOptions': {
      ...theme.typography.h6,
    },

    '& ul': {
      backgroundColor: theme.palette.background.paper,
      padding: 0,
      overflowY: 'scroll',
      ...ScrollStyles(theme),
    },

    '& li': {
      ...theme.typography.h6,
      color: theme.palette.text.primary,
      padding: listItemPadding ?? '12px 24px !important',
      transition: 'background 100ms ease-out',
      borderRadius: 0,
    },

    '& li:hover': {
      backgroundColor: `var(--colors-black-alpha-10, rgba(18, 18, 18, 0.10) !important`,
      color: `rgba(18, 18, 18, 0.10) !important`,
      '& div': {
        color: `rgba(18, 18, 18, 0.10) !important`,
      },
      '& p': {
        color: `${theme.palette.text.inverseSecondary} !important`,
      },
    },
  };
});

export const StyledInput = styled(TextField)(
  ({ theme, height, borderRadius, padding, inverse, border }) => ({
    borderRadius: 12,
    '& .MuiOutlinedInput-root': {
      ...theme.typography.h6,
      borderRadius: borderRadius ? borderRadius : '12px',
      border:
        border ??
        `1px solid ${
          inverse ? theme.palette.borderLightInverse : theme.palette.borderLight
        }`,
      padding: padding ?? theme.spacing(3, 2),
      position: 'relative',
      color: inverse ? theme.palette.text.inverse : theme.palette.text.primary,
      height: height ? height : 55,
      minHeight: height ? height : 55,

      '&:hover': {
        border:
          border ??
          `1px solid ${
            inverse
              ? theme.palette.borderLightInverse35
              : theme.palette.borderLight35
          }`,
      },
      '&.Mui-focused': {
        border:
          border ??
          `1px solid ${
            inverse
              ? theme.palette.borderLightInverse66
              : theme.palette.borderLight66
          }`,
      },
    },
    '& .MuiOutlinedInput-root.Mui-error': {
      borderColor: theme.palette.snackbar.error.background,
    },
    '& .MuiFormHelperText-root': {
      ...theme.typography.h9,
      marginTop: 8,
      marginLeft: 4,
      color: theme.palette.snackbar.error.background,
    },
  }),
);

export const StyledTextArea = styled(TextField)(({ theme, inverse }) => ({
  borderRadius: 12,
  '& .MuiOutlinedInput-root': {
    ...theme.typography.h6,
    borderRadius: 12,
    width: '100%',
    padding: theme.spacing(2),
    color: theme.palette.text.primary,
    border: `1px solid ${
      inverse ? theme.palette.borderLightInverse : theme.palette.borderLight
    }`,

    '&:hover': {
      border: `1.2px solid ${
        inverse
          ? theme.palette.borderLightInverse35
          : theme.palette.borderLight35
      }`,
    },
    '&.Mui-focused': {
      border: `1.5px solid ${
        inverse
          ? theme.palette.borderLightInverse66
          : theme.palette.borderLight66
      }`,
    },
  },
  '& .MuiOutlinedInput-root.Mui-error': {
    borderColor: theme.palette.snackbar.error.background,
  },
  '& .MuiFormHelperText-root': {
    ...theme.typography.h9,
    marginTop: 8,
    marginLeft: 0,
    color: theme.palette.snackbar.error.background,
  },
}));

StyledTextArea.defaultProps = {
  multiline: true,
};

export const StyledDatePicker = styled(DatePicker)(({ theme, height }) => ({
  width: '100%',
  height: height ? height : 60,

  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: `${theme.palette.borderLight} !important`,
    borderRadius: '12px',
    padding: '0 10px',
  },
  '& > div': {
    height: '100%',
  },

  'hover: & .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.borderLight,
  },

  '& .MuiInputBase-input': {
    ...theme.typography.h7,
    height: 17,
    width: '100%',
  },
}));

export const PlacesAutocompleteInputContainer = styled(Box)({
  width: '100%',
});

export const AddressDropdownItemsContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  border: `1px solid ${theme.palette.borderLight}`,
  borderRadius: '12px',
  padding: 0,
  zIndex: 1,
}));

export const AutocompleteLoadingText = styled(Box)(({ theme }) => ({
  ...theme.typography.body8,
  color: theme.palette.text.primary,
  margin: theme.spacing(2, 0),
}));

export const AdornedInputContainer = styled(Box)(
  ({ theme, inverse, borderRadius, height }) => ({
    display: 'flex',
    alignItems: 'center',
    borderRadius: borderRadius ? borderRadius : '12px',
    border: `1px solid ${
      inverse ? theme.palette.borderLightInverse : theme.palette.borderLight
    }`,
    height: height ? height : 55,
    '&:hover': {
      border: `1.2px solid ${
        inverse
          ? theme.palette.borderLightInverse35
          : theme.palette.borderLight35
      }`,
    },
    '&:focused': {
      border: `1.5px solid ${
        inverse
          ? theme.palette.borderLightInverse66
          : theme.palette.borderLight66
      }`,
    },
  }),
);

export const AdornmentContainer = styled(Box)(({ theme, hovered }) => ({
  color: theme.palette.grey.commonText,
  borderRight: `${hovered ? 1.2 : 1}px solid ${
    hovered ? theme.palette.borderLight35 : theme.palette.borderLight
  }`,
  height: 54,
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 2),
}));
