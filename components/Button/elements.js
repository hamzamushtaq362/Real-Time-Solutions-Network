import { Button, styled, Box, Typography, MenuItem, ButtonBase } from '@mui/material';

export const DefaultButtonContainer = styled('button')({
  display: 'inline-block',
  border: 'none',
  fontSize: 'inherit',
  fontFamily: 'inherit',
  transition: 'all 0.2s',
  '&:hover': {
    opacity: 0.8,
    transform: 'translateY(0)',
  },
  '&:active': {
    opacity: 1,
    transform: 'translateY(0.2rem)',
  },
});

export const PrimaryButton = styled(Button)(
  ({
    height,
    width,
    alignSelf,
    marginRight,
    marginLeft,
    marginBottom,
    marginTop,
    fontSize,
    fontWeight,
    backgroundColor,
    border,
    notAllowed,
    theme,
    restrictHoverStyles,
    inverse,
    borderRadius,
    translate,
    letterSpacing,
    padding,
    fontFamily,
  }) => ({
    ...theme.typography.h7,
    width: width ? width : '100%',
    height: height ?? '46px',

    fontSize: fontSize ?? '16px',
    border: border ?? `1px solid ${theme.palette.background.inverse}`,
    backgroundColor:
      backgroundColor ?? inverse
        ? theme.palette.background.paper
        : theme.palette.background.inverse,
    borderRadius: borderRadius ? borderRadius : 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: padding ?? '15px 8px',
    transition: 'background-color 100ms ease-out',
    color: inverse ? theme.palette.text.primary : theme.palette.text.inverse,
    textTransform: 'capitalize',
    fontWeight: fontWeight ?? 400,
    boxShadow: 'none',
    marginRight: marginRight ?? 0,
    marginLeft,
    alignSelf: alignSelf ?? null,
    marginBottom,
    marginTop,
    cursor: notAllowed ?? 'pointer',
    opacity: 1,
    letterSpacing,
    fontFamily,

    '&:hover': {
      backgroundColor: !restrictHoverStyles
        ? inverse
          ? theme.palette.background.inverse
          : theme.palette.background.paper
        : inverse ? theme.palette.background.paper : theme.palette.background.inverse,
      color: !restrictHoverStyles
        ? inverse
          ? theme.palette.text.inverse
          : theme.palette.text.primary
        : '',
      borderColor: inverse
        ? theme.palette.border2Inverse
        : theme.palette.border2,
    },

    '@media (max-width : 500px)': {
      fontSize: '13px !important',
      marginRight: theme.spacing(1),
      padding: theme.spacing(2),
    },

    '&.Mui-disabled': {
      cursor: 'none',
      background: inverse
        ? theme.palette.background.paper
        : theme.palette.background.inverse,
      opacity: 0.35,
      color: inverse ? theme.palette.text.primary : theme.palette.text.inverse,
    },

    '&.MuiButtonBase-root:disabled': {
      cursor: 'not-allowed',
    },
    '&:active': {
      transform: translate ?? 'translateY(3px)',
    },
  }),
);

export const OutlinedButton = styled(Button)(
  ({
    height,
    width,
    minWidth,
    alignSelf,
    marginRight,
    marginLeft,
    marginBottom,
    fontSize,
    fontWeight,
    border,
    notAllowed,
    backgroundColor,
    theme,
    color,
    restrictHoverStyles,
    textTransform,
    inverse,
    borderRadius,
  }) => ({
    ...theme.typography.h7,
    width: width ?? '100%',
    height: height ?? '46px',
    minWidth: minWidth ?? '64px',

    fontSize: fontSize ?? '16px',
    border:
      border ??
      `1px solid ${
        color
          ? color
          : inverse
          ? theme.palette.border2Inverse
          : theme.palette.border2
      }`,
    backgroundColor:
      backgroundColor ?? inverse
        ? theme.palette.background.inverse
        : theme.palette.background.default,

    borderRadius: borderRadius ? borderRadius : 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    transition: 'background-color 100ms ease-in',
    color: color
      ? color
      : inverse
      ? theme.palette.text.inverse
      : theme.palette.text.primary,
    textTransform: textTransform ? textTransform : 'capitalize',
    fontWeight: fontWeight ?? 400,
    boxShadow: 'none',
    marginRight: marginRight ?? 0,
    marginLeft,
    alignSelf: alignSelf ?? null,
    marginBottom,
    cursor: notAllowed ?? 'pointer',

    '&:hover': {
      backgroundColor: !restrictHoverStyles
        ? inverse
          ? theme.palette.background.paper
          : theme.palette.background.inverse
        : '',
      color: !restrictHoverStyles
        ? inverse
          ? theme.palette.text.primary
          : theme.palette.text.inverse
        : '',
    },

    '@media (max-width : 500px)': {
      fontSize: '13px !important',
      marginRight: theme.spacing(1),
      padding: theme.spacing(2),
    },

    '&.Mui-disabled': {
      opacity: 0.8,
      cursor: 'none',
    },

    '&.MuiButtonBase-root:disabled': {
      cursor: 'not-allowed',
    },
    '&:active': {
      transform: 'translateY(3px)',
    },
  }),
);

export const SecondaryLevelButton = styled(Button)(
  ({
    height,
    width,
    minWidth,
    alignSelf,
    marginRight,
    marginLeft,
    marginBottom,
    fontSize,
    fontWeight,
    border,
    notAllowed,
    backgroundColor,
    theme,
    color,
    restrictHoverStyles,
    textTransform,
    inverse,
    borderRadius,
  }) => ({
    ...theme.typography.h7,
    width: width ?? '100%',
    height: height ?? '32px',
    minWidth: minWidth ?? '64px',

    fontSize: fontSize ?? '16px',
    border:
      border ??
      `1px solid ${
        color
          ? color
          : inverse
          ? theme.palette.border2Inverse
          : theme.palette.border2
      }`,
    backgroundColor:
      backgroundColor ?? inverse
        ? theme.palette.background.inverse
        : theme.palette.background.default,

    borderRadius: borderRadius ? borderRadius : 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    transition: 'background-color 100ms ease-in',
    color: color
      ? color
      : inverse
      ? theme.palette.text.inverse
      : theme.palette.text.primary,
    textTransform: textTransform ? textTransform : 'capitalize',
    fontWeight: fontWeight ?? 400,
    boxShadow: 'none',
    marginRight: marginRight ?? 0,
    marginLeft,
    alignSelf: alignSelf ?? null,
    marginBottom,
    cursor: notAllowed ?? 'pointer',

    '&:hover': {
      backgroundColor: !restrictHoverStyles
        ? inverse
          ? theme.palette.background.paper
          : theme.palette.background.inverse
        : '',
      color: !restrictHoverStyles
        ? inverse
          ? theme.palette.text.primary
          : theme.palette.text.inverse
        : '',
    },

    '@media (max-width : 500px)': {
      fontSize: '13px !important',
      marginRight: theme.spacing(1),
      padding: theme.spacing(2),
    },

    '&.Mui-disabled': {
      opacity: 0.8,
      cursor: 'none',
    },

    '&.MuiButtonBase-root:disabled': {
      cursor: 'not-allowed',
    },
    '&:active': {
      transform: 'translateY(3px)',
    },
  }),
);

export const SecondaryButton = styled(Button)(
  ({
    height,
    width,
    alignSelf,
    marginRight,
    marginLeft,
    marginBottom,
    fontSize,
    fontWeight,
    border,
    notAllowed,
    theme,
  }) => ({
    width: width ? width : '100%',
    height: height ? height : '46px',
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.spacing(10),
    fontSize: fontSize ? fontSize : '14px',
    lineHeight: '20px',
    textTransform: 'none',
    fontWeight: fontWeight ? fontWeight : 400,
    boxShadow: 'none',
    marginRight: marginRight ? marginRight : 0,
    marginLeft,
    alignSelf: alignSelf ? alignSelf : null,
    marginBottom,
    border: border ? border : `1px solid ${theme.palette.background.inverse}`,
    cursor: notAllowed ? notAllowed : 'pointer',

    '&:hover': {
      boxShadow: 'none',
    },

    '&.Mui-disabled': {
      opacity: 0.8,
      cursor: 'none',
    },

    '&.MuiButtonBase-root:disabled': {
      cursor: 'not-allowed',
    },
    transition: 'transform 100ms',
    '&:active': {
      transform: 'translateY(3px)',
    },
  }),
);

export const TransparentButton = styled(Button)(
  ({
    height,
    width,
    alignSelf,
    marginRight,
    marginLeft,
    marginBottom,
    fontSize,
    fontWeight,
    notAllowed,
    theme,
  }) => ({
    width: width ? width : '100%',
    height: height ? height : '46px',
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.spacing(10),
    fontSize: fontSize ? fontSize : '14px',
    lineHeight: '20px',
    textTransform: 'none',
    fontWeight: fontWeight ? fontWeight : 400,
    boxShadow: 'none',
    marginRight: marginRight ? marginRight : 0,
    marginLeft,
    alignSelf: alignSelf ? alignSelf : null,
    marginBottom,
    cursor: notAllowed ? notAllowed : 'pointer',

    '&:hover': {
      backgroundColor: theme.palette.grey.normal9,
      boxShadow: 'none',
    },

    '&.Mui-disabled': {
      opacity: 0.6,
      cursor: 'none',
    },

    '&.MuiButtonBase-root:disabled': {
      cursor: 'not-allowed',
    },
    transition: 'transform 100ms',
    '&:active': {
      transform: 'translateY(3px)',
    },
  }),
);

export const OpaqueButton = styled(Button)(
  ({ height, width, variant, theme, color }) => ({
    width: width ? width : '100%',
    maxHeight: height ? height : '46px',
    minHeight: height ? height : '46px',
    color: color
      ? color
      : variant === 'secondary'
      ? theme.palette.red.main
      : theme.palette.text.active,
    backgroundColor:
      variant === 'secondary'
        ? theme.palette.grey.active
        : theme.palette.background.active,
    borderRadius: '6px',

    ...theme.typography.button5,

    textTransform: 'none',
    boxShadow: 'none',

    '&:hover': {
      backgroundColor:
        variant === 'secondary'
          ? theme.palette.grey.active
          : theme.palette.background.active,
      boxShadow: 'none',
    },
  }),
);

// TODO: Refactor this into Opaque Button
export const ErrorOpaqueButton = styled(OpaqueButton)(({ theme }) => ({
  color: theme.palette.red.main,
  backgroundColor: theme.palette.grey.normal1,
  '&:hover': {
    backgroundColor: theme.palette.grey.normal1,
  },
}));

export const ColorButton = styled(Button)(
  ({
    height,
    width,
    backgroundColor,
    color,
    borderRadius,
    fontSize,
    theme,
  }) => ({
    width: width ? width : '100%',
    maxHeight: height ? height : '46px',
    minHeight: height ? height : '46px',
    color: color,
    backgroundColor: backgroundColor,
    borderRadius: borderRadius ? borderRadius : '6px',
    fontSize: fontSize ? fontSize : '14px',

    textTransform: 'none',
    ...theme.typography.button4,

    boxShadow: 'none',

    '&:hover': {
      backgroundColor: backgroundColor,
    },
  }),
);

export const CollabTileButton = styled(Button)(({ theme }) => ({
  width: '100%',
  maxHeight: '46px',
  minHeight: '46px',
  backgroundColor: theme.palette.blue.main,
  borderRadius: '10px',
  fontSize: '14px',
  lineHeight: '20px',
  textTransform: 'none',
  fontWeight: 400,
  boxShadow: 'none',

  '&:hover': {
    opacity: 0.9,
    backgroundColor: theme.palette.blue.main,
    boxShadow: 'none',
  },
}));

export const ReferralSocialButton = styled(Button)(({ marginLeft, theme }) => ({
  height: '46px',
  width: '46px',
  backgroundColor: theme.palette.background.active,
  borderRadius: '7px',
  marginLeft: marginLeft ? marginLeft : '10px',
}));

export const PushButtonContainer = styled(Box)(({ theme }) => () => ({
  display: 'flex',
}));

export const CreateCollabNextButton = styled(Button)(
  ({ width, disabled, theme }) => ({
    width: width ? width : '200px',
    padding: '10px 0',
    boxShadow: `none`,
    fontFamily: 'inherit',
    fontSize: '14px',
    textTransform: 'none',
    borderRadius: '10px',
    fontWeight: 400,
    disabled: disabled ? disabled : false,
    backgroundColor: theme.palette.blue.main,

    '&:hover': {
      backgroundColor: theme.palette.blue.main,
      opacity: 0.9,
    },
    '&.Mui-disabled': {
      opacity: 0.5,
      backgroundColor: theme.palette.grey.commonSecondary,
    },
  }),
);

export const ChoosePlatformProcessButton = styled(CreateCollabNextButton)({});

export const BackButton = styled(Button)(
  ({ theme, width, height, fontSize, fontWeight }) => ({
    width: width ? width : '200px',
    maxHeight: height ? height : '46px',
    minHeight: height ? height : '46px',
    borderRadius: theme.spacing(10),
    fontSize: fontSize ? fontSize : '14px',
      lineHeight: '20px',
    textTransform: 'none',
    fontWeight: fontWeight ? fontWeight : 400,
    boxShadow: 'none',
    backgroundColor: 'transparent',
    border: `2px solid ${theme.palette.background.border}`,
    color: theme.palette.grey.common,
  }),
);

const ButtonStyles = {
  maxHeight: '40px',
  fontFamily: 'Montreal, sans-serif',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '20px',
  borderRadius: '6px',
  textTransform: 'none',

  boxShadow: 'none',
};

export const InviteButton = styled(Button)(({ theme }) => ({
  width: '97px',
  ...ButtonStyles,
  backgroundColor: theme.palette.black.black1F,
  padding: '10px 15px',
  color: theme.palette.white.main,
  '&:hover': {
    boxShadow: 'none',
    opacity: 0.9,
    backgroundColor: theme.palette.black.black1F,
  },
}));

InviteButton.defaultProps = {
  variant: 'contained',
};

export const ShareButton = styled(Button)(({ theme }) => ({
  width: '97px',
  ...ButtonStyles,
  backgroundColor: theme.palette.grey.normal1,
  color: theme.palette.grey.normal8,
  padding: '10px 15px',

  '&:hover': {
    boxShadow: 'none',
    opacity: 0.9,
    backgroundColor: theme.palette.grey.normal1,
  },
}));

ShareButton.defaultProps = {
  variant: 'contained',
};

export const OptionsButton = styled(Box)(({ backgroundColor, theme }) => ({
  width: '40px',
  height: '40px',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  boxShadow: 'none',
  borderRadius: '6px',
  backgroundColor: backgroundColor
    ? backgroundColor
    : theme.palette.background.paperSecondary,

  '&:hover': {
    boxShadow: 'none',
    opacity: 0.9,
    backgroundColor: backgroundColor
      ? backgroundColor
      : theme.palette.background.paperSecondary,
  },
}));

export const ButtonGroupContainer = styled(Box)(({ padding, theme }) => ({
  padding: padding ? padding : '8px 10px',
  backgroundColor: theme.palette.grey.normal1,
  borderRadius: '10px',
  cursor: 'pointer',
  display: 'flex',
  columnGap: '8px',
  justifyContent: 'space-around',
  alignItems: 'center',

  '@media (max-width : 800px)': {
    width: '400px',
    padding: '4px 8px',
  },
}));

const ButtonGroupItemStyles = {
  display: 'flex',
  alignItems: 'center',
  height: '44px',
  borderRadius: '9px',
  fontFamily: 'inherit',
  fontSize: '15px',
  lineHeight: '24px',
  textTransform: 'none',
  boxShadow: 'none',
  marginRight: '2px',
  '@media (max-width : 800px)': {
    fontSize: '10px',
  },
};

export const ButtonGroupItem = styled(Button)(
  ({ active, width, borderActiveColor, theme }) => ({
    ...ButtonGroupItemStyles,
    width: width ? width : '128px',
    border: active
      ? `1px solid ${
          borderActiveColor ? borderActiveColor : theme.palette.grey.normal1
        } `
      : '',
    backgroundColor: active
      ? theme.palette.black.main
      : theme.palette.background.paper,

    color: active ? theme.palette.white.main : theme.palette.grey.normal8,
    fontWeight: active ? 500 : 400,

    '&:hover': {
      opacity: 0.9,
      boxShadow: 'none',
      backgroundColor: active
        ? theme.palette.black.main
        : theme.palette.background.paper,
    },
  }),
);

export const ButtonGroupItemLight = styled(Button)(
  ({ active, width, theme }) => ({
    ...ButtonGroupItemStyles,
    width: width ? width : '128px',
    backgroundColor: !active
      ? theme.palette.background.main
      : theme.palette.background.paper,
    color: active ? theme.palette.text.primary : theme.palette.grey.normal8,
    fontWeight: active ? 500 : 400,

    '&:hover': {
      opacity: 0.9,
      boxShadow: 'none',
      backgroundColor: !active
        ? theme.palette.background.main
        : theme.palette.background.paper,
    },
  }),
);

ButtonGroupItem.defaultProps = {
  variant: 'contained',
};

export const ItemCount = styled(Box)(({ active, theme }) => ({
  width: '24px',
  height: '24px',
  minWidth: '24px',
  minHeight: '24px',
  fontSize: '10px',
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: active ? 'rgba(242, 242, 242, 0.3)' : '#F2F2F2',
  color: active ? '#FDFDFD' : theme.palette.grey.common,
  marginLeft: '4px',
}));

export const CollectiveButtonTabBarContainer = styled(Box)(({ theme }) => ({
  // padding: padding ? padding : '10px 0px',
  // borderRadius: '10px',
  // cursor: 'pointer',
  display: 'flex',
  columnGap: '8px',
  // justifyContent: 'space-around',
  alignItems: 'center',

  '@media (max-width : 800px)': {
    width: '800px',
    padding: '4px 8px',
  },
}));

export const CollectiveButtonTabBarItem = styled(Button)(
  ({ active, height, theme }) => ({
    ...ButtonGroupItemStyles,
    width: 'auto',
    height: height ? height : '35px',
    backgroundColor: !active
      ? theme.palette.common?.white
      : theme.palette.common?.black,
    color: active
      ? theme.palette.getContrastText(theme.palette.common?.black)
      : theme.palette.getContrastText(theme.palette.common?.white),
    fontWeight: 500,
    border: `1px solid ${theme.palette.grey[400]}`,
    borderRadius: '100px',
    columnGap: '8px',
    fontSize: '13px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '9px 14px',
    gap: '4px',

    '&:hover': {
      opacity: 0.9,
      boxShadow: 'none',
      backgroundColor: !active
        ? theme.palette.common?.white
        : theme.palette.common?.black,
    },
  }),
);

export const CollectiveButtonTabBarItemCounter = styled(Box)(
  ({ active, theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    columnGap: '10px',
    justifyContent: 'center',
    alignItems: 'center',
    // padding: padding ? padding : '0px 8px',
    width: '23px',
    height: '16px',
    border: `1px solid ${
      active ? theme.palette.grey[100] : theme.palette.grey[400]
    }`,
    borderRadius: '100px',

    // '@media (max-width : 800px)': {
    //   width: '400px',
    //   padding: '4px 8px',
    // },
  }),
);
export const CollectiveButtonTabBarItemCounterText = styled(Typography)(
  ({ active, theme }) => ({
    color: active ? theme.palette.grey[100] : theme.palette.grey[400],
    fontWeight: 500,
    fontSize: '11px',
    // letterSpacing: '-0.02em',
  }),
);
export const UserProfileDetailSeperator = styled(Box)(({ theme }) => ({
  height: '1px',
  width: screen.width,
  border: '1px solid',
  margin: '12px 0px',
  marginLeft: '-40px',

  color: theme.palette.divider,
}));

export const ProfileCircleButton = styled(Box)(
  ({ active, width, height, theme }) => ({
    width: width ? width : '32px',
    height: height ? height : '32px',
    color: active
      ? theme.palette.getContrastText(theme.palette.common?.black)
      : theme.palette.getContrastText(theme.palette.common?.white),
    fontWeight: 500,
    border: `1px solid ${theme.palette.grey[400]}`,
    borderRadius: '50%',

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    '&:hover': {
      boxShadow: 'none',
      border: `1px solid ${theme.palette.background.inverse}`,
      cursor: 'pointer',
    },
  }),
);
export const CollectiveShareWalletButton = styled(Button)(
  ({ width, height, theme }) => ({
    ...ButtonGroupItemStyles,
    width: width ? width : '207px',
    height: height ? height : '35px',
    border: `1px solid ${theme.palette.text.disabled}`,
    color: theme.palette.text.primary,
    fontWeight: 400,
    borderRadius: '100px',
    columnGap: '8px',
    fontSize: '13px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '9px 14px',

    '&:hover': {
      // opacity: 0.9,
      // backgroundColor: theme.palette.background.inverse,
      // color: theme.palette.background.default,
    },

    '&:disabled': {
      cursor: 'pointer',
      // backgroundColor: theme.palette.background.inverse,
      color: theme.palette.text.primary,
    },
  }),
);

export const UserProfileRightButton = styled(Button)(
  ({ active, height, theme, width }) => ({
    ...ButtonGroupItemStyles,
    width: width ? width : '164px',
    height: height ? height : '38px',
    backgroundColor: !active
      ? theme.palette.common?.white
      : theme.palette.common?.black,
    color: active
      ? theme.palette.getContrastText(theme.palette.common?.black)
      : theme.palette.getContrastText(theme.palette.common?.white),
    fontWeight: 400,
    border: `1px solid ${theme.palette.grey[400]}`,
    borderRadius: '100px',
    columnGap: '8px',
    fontSize: '14px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '6px 24px',
    gap: '4px',

    '&.Mui-disabled': {
      opacity: 0.6,
      cursor: 'none',
    },

    '&:hover': {
      opacity: 0.9,
      boxShadow: 'none',
      backgroundColor: !active
        ? theme.palette.common?.white
        : theme.palette.common?.black,
    },
  }),
);

const NavCommonStyles = {
  height: 48,
  width: 'auto',
  borderRadius: '100px',
  padding: '9px 16px',
  fontSize: '16px',
  display: 'flex',
  columnGap: '6px',
  alignItems: 'center',
  justifyContent: 'center',
  letterSpacing: '0.02em',
  fontWeight: 300,
};

export const NavGroupButton = styled(PrimaryButton)(({ theme, active }) => ({
  ...NavCommonStyles,

  backgroundColor: theme.palette.background.default,
  color: active ? theme.palette.text.tabActive : theme.palette.text.tabInactive,
  border: 'none',
  '& div': {
    borderColor: active
      ? theme.palette.text.tabActive
      : theme.palette.text.tabInactive,
    color: active
      ? theme.palette.text.tabActive
      : theme.palette.text.tabInactive,
  },

  '&:hover': {
    color: theme.palette.text.tabActive,

    '& div': {
      borderColor: theme.palette.text.tabActive,
      color: theme.palette.text.tabActive,
    },
  },
  '@media (min-width: 1500px)': {
    fontSize: '18px !important',
  },
  '@media (max-width: 600px)': {
    fontSize: '13px !important',
    minWidth: 140,
    padding: '0 8px',
  },
}));

export const NavGroupRightButton = styled(PrimaryButton)(({ theme }) => ({
  ...NavCommonStyles,

  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,

  marginLeft: 'auto',
}));

export const FilterDropdownButton = styled(Button)(
  ({ width, height, theme }) => ({
    ...ButtonGroupItemStyles,
    width: width ?? 150,
    height: height ?? 50,
    border: `1px solid ${theme.palette.borderLight}`,
    color: theme.palette.text.primary,
    fontWeight: 400,
    borderRadius: '100px',
    fontSize: '13px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '9px 14px',

    '&:hover': {
      opacity: 0.9,
    },
  }),
);
export const FilterDropdownText = styled(Box)(({ theme, inverse }) => ({
  ...theme.typography.h7,
  color: inverse ? theme.palette.text.inverse : theme.palette.text.primary,
}));
export const DropdownPlaceholder = styled(Box)(({ theme }) => ({
  ...theme.typography.h7,
  color: theme.palette.text.label,
}));
export const FilterDropdownItemWrap = styled(MenuItem)(
  ({ theme, inverse }) => ({
    ...theme.typography.h7,
    color: inverse ? theme.palette.text.primary : theme.palette.text.inverse,
    transition: 'background 0.35s ease-out',
    height: 45,
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',

    textTransform: 'capitalize',

    '&:hover': {
      backgroundColor: inverse
        ? theme.palette.background.inverse
        : theme.palette.background.paper,
      color: inverse ? theme.palette.text.inverse : theme.palette.text.primary,
    },
  }),
);

export const SimpleButton = styled(Button)(
  ({
    height,
    width,
    backgroundColor,
    notAllowed,
    theme,
    borderRadius,
    letterSpacing,
    padding,
  }) => ({
    ...theme.typography.h7,
    width: width ? width : '100%',
    height: height ?? '46px',

    fontSize: '16px',
    border: `1px solid ${theme.palette.borderLight}`,
    backgroundColor: backgroundColor ?? theme.palette.background.paper,
    borderRadius: borderRadius ? borderRadius : 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: padding ?? '15px 8px',
    transition: 'background-color 100ms ease-out',
    color: theme.palette.text.primary,
    textTransform: 'capitalize',
    fontWeight: 400,
    boxShadow: 'none',
    cursor: notAllowed ?? 'pointer',
    opacity: 1,
    letterSpacing,

    '&:hover': {
      backgroundColor: theme.palette.background.card,
    },

    '&.Mui-disabled': {
      cursor: 'none',
      opacity: 0.35,
      color: theme.palette.text.primary,
    },

    '&.MuiButtonBase-root:disabled': {
      cursor: 'not-allowed',
    },
  }),
);
export const NewPrimaryButton = styled(ButtonBase)(
  ({
    height,
    width,
    alignSelf,
    marginRight,
    marginLeft,
    marginBottom,
    marginTop,
    fontSize,
    fontWeight,
    backgroundColor,
    border,
    notAllowed,
    theme,
    borderRadius,
    letterSpacing,
    padding,
    fontFamily,
  }) => ({
    ...theme.typography.h7,
    width: width ? width : '100%',
    height: height ?? '46px',

    fontSize: fontSize ?? '16px',
    borderTop: border ?? '1px solid rgba(255, 255, 255, 0.30)',
    background:
    backgroundColor ?? 'radial-gradient(100% 100% at 50% 0%, rgba(255, 255, 255, 0.30) 0%, rgba(255, 255, 255, 0.00) 100%), #09090B',
    borderRadius: borderRadius ? borderRadius : 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: padding ?? '15px 8px',
    transition: 'background 100ms ease-out',
    color: '#FFF',
    textTransform: 'capitalize',
    fontWeight: fontWeight ?? 400,
    boxShadow: '0px 1px 0px 0px #7F7F80 inset',
    marginRight: marginRight ?? 0,
    marginLeft,
    alignSelf: alignSelf ?? null,
    marginBottom,
    marginTop,
    cursor: notAllowed ?? 'pointer',
    opacity: 1,
    letterSpacing,
    fontFamily,

    '&:hover': {
      background: 'radial-gradient(100% 100% at 50% 0%, rgba(255, 255, 255, 0.36) 0%, rgba(255, 255, 255, 0.00) 100%), #18181B',
    },

    '@media (max-width : 500px)': {
      fontSize: '13px !important',
      marginRight: theme.spacing(1),
      padding: theme.spacing(2),
    },

    '&.Mui-disabled': {
      cursor: 'none',
      background: '#FFF',
      boxShadow: '0px 1px 3px 0px rgba(18, 18, 18, 0.05), 0px 0px 0px 1px rgba(18, 18, 18, 0.04), 0px 1px 1px 0px rgba(18, 18, 18, 0.05)',
      color: 'rgba(18, 18, 18, 0.40)',
    },

    '&.MuiButtonBase-root:disabled': {
      cursor: 'not-allowed',
    },
    '&:active': {
      background: 'radial-gradient(100% 100% at 50% 0%, rgba(255, 255, 255, 0.20) 0%, rgba(255, 255, 255, 0.00) 53.13%), #121212',
    },
    '&:visited': {
      background: 'radial-gradient(100% 100% at 50% 0%, rgba(255, 255, 255, 0.30) 0%, rgba(255, 255, 255, 0.00) 100%), #09090B',
      boxShadow: '0px 1px 0px 0 #7F7F80 inset, 0px 0px 0px 4px rgba(18, 18, 18, 0.20)',
    },
  }),
);

export const NewSecondaryButton = styled(Button)(
  ({
    height,
    width,
    alignSelf,
    marginRight,
    marginLeft,
    marginBottom,
    marginTop,
    fontSize,
    fontWeight,
    backgroundColor,
    border,
    notAllowed,
    theme,
    borderRadius,
    letterSpacing,
    padding,
    fontFamily,
  }) => ({
    ...theme.typography.h7,
    width: width ? width : '100%',
    height: height ?? '46px',

    fontSize: fontSize ?? '16px',
    border: border ?? `none`,
    background: backgroundColor ?? '#FFF',
    borderRadius: borderRadius ? borderRadius : 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: padding ?? '15px 8px',
    transition: 'background 100ms ease-out',
    color: '#09090B',
    textTransform: 'capitalize',
    fontWeight: fontWeight ?? 400,
    boxShadow:
      '0px 1px 3px 0px rgba(18, 18, 18, 0.10), 0px 0px 0px 1px rgba(18, 18, 18, 0.07), 0px 1px 1px 0px rgba(18, 18, 18, 0.10)',
    marginRight: marginRight ?? 0,
    marginLeft,
    alignSelf: alignSelf ?? null,
    marginBottom,
    marginTop,
    cursor: notAllowed ?? 'pointer',
    opacity: 1,
    letterSpacing,
    fontFamily,

    '&:hover': {
      background: '#FAFAFA',
      boxShadow: '0px 1px 3px 0px rgba(18, 18, 18, 0.10), 0px 0px 0px 1px rgba(18, 18, 18, 0.10), 0px 1px 1px 0px rgba(18, 18, 18, 0.20)'
    },

    '@media (max-width : 500px)': {
      fontSize: '13px !important',
      marginRight: theme.spacing(1),
      padding: theme.spacing(2),
    },

    '&.Mui-disabled': {
      cursor: 'none',
      background: '#FFF',
      boxShadow: '0px 1px 3px 0px rgba(18, 18, 18, 0.05), 0px 0px 0px 1px rgba(18, 18, 18, 0.04), 0px 1px 1px 0px rgba(18, 18, 18, 0.05)',
      color: 'rgba(18, 18, 18, 0.40)',
    },

    '&.MuiButtonBase-root:disabled': {
      cursor: 'not-allowed',
    },
    '&:active': {
      background: '#F4F4F5',
      boxShadow: '0px 1px 3px 0px rgba(18, 18, 18, 0.10), 0px 0px 0px 1px rgba(18, 18, 18, 0.07), 0px 1px 1px 0px rgba(18, 18, 18, 0.10)'
    },
    '&:visited': {
      background: '#FFF',
      boxShadow: '0px 1px 3px 0px rgba(18, 18, 18, 0.10), 0px 0px 0px 1px rgba(18, 18, 18, 0.07), 0px 1px 1px 0px rgba(18, 18, 18, 0.10), 0px 0px 0px 4px rgba(18, 18, 18, 0.10)  '
    },
  }),
);

export const ButtonText = styled(Box)(({ theme }) => ({
  ...theme.typography.h7,
  color: theme.palette.text.tabInactive,
  fontWeight: 400,
  textTransform: 'capitalize',
  backgroundColor: 'unset !important',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    color: theme.palette.text.tabActive
  },
}));