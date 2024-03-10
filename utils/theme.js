const GREY_DARK = {
  common: '#808191',
  commonSecondary: '#92929D',
  commonText: '#797979',
  grey34: '#353535',
  grey84: '#787F84',
  grey2A2C33: '#2A2A33',
  greyF5: '#F5F5F5',
  greyD3: '#D3D3D3',
  greyD5: '#CFDBD5',
  grey44: '#444444',
  grey33: '#333333',
  grey22: '#222222',
  grey11: '#111111',
  greyBA: '#BABABA',
  grey9D: '#9D9D9D',
  greyF0: '#F0F0F0',
  active: '#E2E2EA',
  paper: '#2D2D36',
  divider: '#D3D3D3',
  normal1: '#44444F',
  normal2: '#565663',
  normal3: '#92929D',
  normal4: '#272727',
  normal5: '#D5D5DC',
  normal6: '#E2E2EA',
  normal7: '#F1F1F5',
  normal8: '#F7F7F7',
  normal9: '#333333',
  greyDark: 'rgb(255, 255, 255)',
  greyLight: 'rgb(141 141 141)',
  greyC2: '#C2C2C2',
};

const GREY_LIGHT = {
  common: '#808191',
  commonSecondary: '#92929D',
  commonText: '#797979',
  grey84: '#787F84',
  grey2A2C33: '#2A2C33',
  greyF5: '#F5F5F5',
  greyD3: '#D3D3D3',
  greyD5: '#CFDBD5',
  grey44: '#444444',
  grey33: '#333333',
  grey22: '#222222',
  grey11: '#111111',
  greyBA: '#BABABA',
  grey9D: '#9D9D9D',
  greyF0: '#F0F0F0',
  active: '#F7F7F7',
  normal1: '#F7F7F7',
  normal2: '#F1F1F5',
  normal3: '#E2E2EA',
  normal4: '#D7D7D7',
  normal5: '#B5B5BE',
  normal6: '#92929D',
  normal7: '#696974',
  normal8: '#44444F',
  normal9: '#f2f2f2',
  divider: '#ADADAD',
  greyDark: 'rgb(21, 21, 21)',
  greyLight: 'rgb(117 117 117)',
  greyC2: '#C2C2C2',
};

const WHITE = {
  main: '#FFFFFF',
  secondary: '#FAFAFB',
  whiteFC: '#FCFCFC',
  whiteFF: '#F5F6FF',
};

const BLACK = {
  main: 'rgba(38, 38, 38, 1)',
  main70: 'rgba(38, 38, 38, 0.7)',
  main66: 'rgba(38, 38, 38, 0.66)',
  main88: 'rgba(38, 38, 38, 0.88)',
  inverse: 'rgba(241, 241, 241, 1)',
  inverse70: 'rgba(255, 255, 255, 0.7)',
  inverse88: 'rgba(255, 255, 255, 0.88)',
  inverse66: 'rgba(255, 255, 255, 0.66)',
  black1F: '#191A1F',
  secondary: '#5E5E5E',
};

const BLUE = {
  main: '#2F62FD',
  active: '#EAEFFF',
  blueFF: '#D5E0FF',
  blueFB: '#FAFAFB',
  blueEB: '#4D74EB',
  blueFE: '#6D91FE',
  blue00ACEE: '#00ACEE',
  blueDBDDFF: '#DBDDFF',
};

const RED = {
  main: '#FF754C',
  red2B: '#EE4B2B',
  redFF0000: '#FF0000',
};

const ORANGE = {
  orangeFDEAC9: '#FDEAC9',
  orangeF24C01: '#F24C01',
};

const GREEN = {
  main: '#04BE00',
  green08: '#08CB08',
  green7FB77E: '#7FB77E',
  greenD9FFE1: '#D9FFE1',
  green31A350: '#31A350',
  green00C48C: '#00C48C',
};

const INFO = {
  background: '#2296f3',
  text: '#fff',
};
const SUCCESS = {
  background: '#40D24F',
  text: '#fff',
};
const ERROR = {
  background: '#FF4D4D',
  text: '#fff',
};

const NOTIFICATION_LIGHT = {
  background: '#000',
  text: '#fff',
};

const NOTIFICATION_DARK = {
  background: '#fff',
  text: '#000',
};
const WARNING = {
  background: '#ff9801',
  text: '#fff',
};

const LOGOS = {
  twitter: '#1D9BF0',
  facebook: '#0062E0',
  globe: '#0062E0',
  dribbble: '#EA4C89',
};

const lightModePalette = {
  mode: 'light',
  primary: {
    main: '#262626',
  },
  logo: '#262626',
  border: '#9D9D9D',
  border2: '#262626',
  border2Inverse: '#9D9D9D',
  borderLight: 'rgba(2, 2, 2, 0.15)',
  borderLight35: 'rgba(2, 2, 2, 0.35)',
  borderLight66: 'rgba(2, 2, 2, 0.66)',
  borderLightInverse: 'rgba(241, 241, 241, 0.15)',
  borderLightInverse35: 'rgba(241, 241, 241, 0.35)',
  borderLightInverse66: 'rgba(241, 241, 241, 0.66)',
  borderMediumInverse: 'rgba(241, 241, 241, 0.5)',
  cardBorder: '#E0E0E0',
  cardBorderHover: '#CCCCCC',
  background: {
    paper: WHITE.main,
    paperLanding: BLACK.inverse,
    paperSecondary: GREY_LIGHT.normal1,
    default: WHITE.main,
    secondary: '#E6E6E6',
    inverse: BLACK.main,
    inverseLight: BLACK.black1F,
    primary: WHITE.secondary,
    active: BLUE.active,
    activeSecondary: BLUE.blueFF,
    activeLight: BLUE.blueFB,
    border: GREY_LIGHT.normal2,
    borderSecondary: GREY_DARK.greyD5,
    chatSender: '#D7F5E7',
    chatReceiver: GREY_LIGHT.normal1,
    card: '#F5F5F5',
    cardHover: '#E0E0E0',
    normal4: GREY_LIGHT.normal4,
    btnBackground: GREY_DARK.grey34,
    full: '#000',
    fullInverse: '#fff',
    emailBorderHover: '#535252',
    switch: '#D4D4D8',
  },

  snackbar: {
    info: INFO,
    warning: WARNING,
    success: SUCCESS,
    error: ERROR,
    notification: NOTIFICATION_LIGHT,
    default: {
      text: '#fff',
      background: '#313131',
    },
  },
  tooltip: {
    background: '#313131',
    text: '#fff',
  },
  divider: GREY_LIGHT?.divider,
  dividerSecondary: GREY_LIGHT?.normal2,
  blue: BLUE,
  red: RED,
  green: GREEN,
  white: WHITE,
  inverse: BLACK.main,
  black: BLACK,
  grey: GREY_LIGHT,
  radio: {
    boxShadow10: 'rgba(18, 18, 18, 0.1)',
    boxShadow15: 'rgba(18, 18, 18, 0.15)',
    boxShadow20: 'rgba(18, 18, 18, 0.2)',
    boxShadow05: 'rgba(18, 18, 18, 0.05)',
    background: '#09090B',
    border: '#121212',
  },
  text: {
    brand: '#242731',
    primary: BLACK.main,
    primary70: BLACK.main70,
    primary88: BLACK.main88,
    primary66: BLACK.main66,
    secondary: BLACK.secondary,
    inverseSecondary: 'rgba(241, 241, 241, 0.5)',
    inverse: BLACK.inverse,
    blue: BLUE.main,
    label: GREY_LIGHT.commonText,
    darkLabel: '#797979',
    active: BLUE.main,
    disabled: '#B9B9B9',
    subText: '#3F3F3F',
    tabActive: '#000',
    tabInactive: 'rgb(139,137,137)',
  },
  logos: LOGOS,
  badges: {
    admin: GREEN.greenD9FFE1,
    member: ORANGE.orangeFDEAC9,
  },
  input: {
    normal: {
      background: GREY_LIGHT.normal1,
      border: GREY_LIGHT.normal2,
      color: GREY_LIGHT.normal8,
      placeholder: GREY_LIGHT.normal6,
    },
    outlined: {
      border: GREY_LIGHT.normal2,
    },
  },
  boxShadow:
    '0px 0px 2px rgba(0, 0, 0, 0.15), 0px 2px 5px rgba(0, 0, 0, 0.05), 0px 8px 40px rgba(0, 0, 0, 0.04)',
};

const darkModePalette = {
  mode: 'dark',
  primary: {
    main: '#F1F1F1',
  },
  logo: '#F1F1F1',
  border: '#262626',
  border2: '#9D9D9D',
  border2Inverse: '#262626',

  borderLight: 'rgba(241, 241, 241, 0.15)',
  borderLight35: 'rgba(241, 241, 241, 0.35)',
  borderLight66: 'rgba(241, 241, 241, 0.66)',

  borderLightInverse: 'rgba(2, 2, 2, 0.15)',
  borderLightInverse35: 'rgba(2, 2, 2, 0.35)',
  borderLightInverse66: 'rgba(2, 2, 2, 0.66)',

  borderMediumInverse: 'rgba(2, 2, 2, 0.5)',
  cardBorder: '#1F1F1F',
  cardBorderHover: '#434343',
  background: {
    paper: BLACK.main,
    paperLanding: BLACK.main,
    paperSecondary: GREY_DARK.paper,
    secondary: '#0C0C0C',
    default: BLACK.main,
    inverse: WHITE.main,
    inverseLight: WHITE.secondary,
    primary: GREY_DARK.paper,
    active: GREY_DARK.normal1,
    activeSecondary: GREY_DARK.normal1,
    activeLight: GREY_DARK.normal1,
    border: GREY_DARK.normal2,
    borderSecondary: GREY_DARK.grey44,
    chatSender: BLUE.blueEB,
    chatReceiver: GREY_DARK.normal1,
    card: '#2b2b2b',
    cardHover: '#383838',
    normal4: GREY_DARK.normal4,
    btnBackground: GREY_DARK.grey34,
    full: '#FFF',
    fullInverse: '#000',
    switch: '#434343',
  },
  snackbar: {
    info: INFO,
    warning: WARNING,
    success: SUCCESS,
    error: ERROR,
    notification: NOTIFICATION_DARK,
    default: {
      background: '#313131',
      text: '#ffffff',
    },
  },
  tooltip: {
    background: WHITE.main,
    text: BLACK.main,
  },
  radio: {
    boxShadow10: 'rgba(237, 237, 237, 0.1)',
    boxShadow15: 'rgba(237, 237, 237, 0.15)',
    boxShadow20: 'rgba(237, 237, 237, 0.2)',
    boxShadow05: 'rgba(237, 237, 237, 0.05)',
    background: '#F6F6F4',
    border: '#EDEDED',
  },
  divider: GREY_DARK?.divider,
  dividerSecondary: GREY_DARK?.normal2,
  blue: BLUE,
  red: RED,
  green: GREEN,
  white: WHITE,
  inverse: WHITE.main,
  black: BLACK,
  grey: GREY_DARK,
  text: {
    brand: '#242731',
    primary: BLACK.inverse,
    primary70: BLACK.inverse70,
    primary88: BLACK.inverse88,
    primary66: BLACK.inverse66,
    secondary: 'rgba(241, 241, 241, 0.5)',
    inverseSecondary: BLACK.secondary,
    inverse: BLACK.main,
    label: GREY_DARK.commonText,
    darkLabel: '#4D4D4D',
    blue: BLUE.main,
    active: WHITE.main,
    disabled: '#797979',
    subText: '#797979',
    tabActive: '#ededed',
    tabInactive: '#8a8a8a',
  },
  logos: LOGOS,
  badges: {
    admin: GREEN.green31A350,
    member: ORANGE.orangeF24C01,
  },
  input: {
    normal: {
      background: GREY_DARK.normal1,
      border: GREY_DARK.normal2,
      color: GREY_DARK.normal8,
      placeholder: GREY_DARK.normal6,
    },
    outlined: {
      border: GREY_DARK.normal2,
    },
  },
};

const getColorPalette = (mode) => {
  if (mode === 'light') {
    return lightModePalette;
  } else if (mode === 'dark') {
    return darkModePalette;
  }
};

export const getTheme = (mode) => ({
  palette: getColorPalette(mode),
  components: {
    MuiDialog: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
        },
      },
    },
    MuiTooltip: {
      defaultProps: {
        arrow: false,
      },
      styleOverrides: {
        tooltip: {
          fontSize: 12,
          backgroundColor: getColorPalette(mode)?.tooltip.background,
          boxShadow:
            '0px 5px 15px -3px rgba(0, 0, 0, 0.20), 0px 15px 35px -5px rgba(17, 24, 38, 0.35), 0px 0px 1px 0px #FFF',
          padding: '8px 12px',
          letterSpacing: 'unset',
          fontFamily: 'system-ui',
          color: getColorPalette(mode)?.tooltip.text,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: 'system-ui, sans-serif',
        },
      },
    },
    MuiBox: {
      styleOverrides: {
        root: {
          fontFamily: 'system-ui, sans-serif',
        },
      },
    },
  },
  typography: {
    fontFamily: 'system-ui, sans-serif',
    fontFamilySarvatrik: 'sarvatrik-latin-variable, sans-serif',
    fontFamilyNeue: 'Neue Haas, sans-serif',
    fontFamilyFreight: 'freight-display-pro, serif',
    fontFamilySF: 'SF Pro Display, sans-serif',
    h1: {
      fontSize: 52,
      fontWeight: 400,
      lineHeight: '130%',
      letterSpacing: '-0.01em',
    },
    h2: {
      fontSize: '34px',
      fontWeight: 400,
      letterSpacing: '-0.01em',
      lineHeight: '130%',
    },
    h3: {
      fontSize: '28px',
      fontWeight: 400,
      letterSpacing: '-0.01em',
      lineHeight: '130%',
    },
    h4: {
      fontSize: '24px',
      fontWeight: 400,
      letterSpacing: '-0.01em',
      lineHeight: '130%',
    },
    h5: {
      fontSize: 20,
      fontWeight: 400,
      letterSpacing: '-0.01em',
      lineHeight: '130%',
    },
    h6: {
      fontSize: 18,
      fontWeight: 400,
      letterSpacing: '-0.01em',
      lineHeight: '130%',
    },
    h7: {
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '132%',
      letterSpacing: '-0.01em',
    },
    h8: {
      fontSize: '15px',
      fontWeight: 400,
      letterSpacing: '-0.01em',
      lineHeight: '130%',
    },
    h9: {
      fontSize: '14px',
      fontWeight: 400,
      letterSpacing: '-0.01em',
      lineHeight: '130%',
    },
    h10: {
      fontSize: '13px',
      fontWeight: 400,
      letterSpacing: '-0.01em',
      lineHeight: '130%',
    },
    h11: {
      fontSize: '12px',
      fontWeight: 400,
      letterSpacing: '-0.01em',
      lineHeight: '130%',
    },

    body1: {
      fontSize: '24px',
      fontWeight: 500,
      letterSpacing: '-0.01em',
      lineHeight: '130%',
    },
    body2: {
      fontSize: '20px',
      fontWeight: 500,
      letterSpacing: '-0.01em',
      lineHeight: '130%',
    },
    body3: {
      fontSize: '18px',
      fontWeight: 500,
      letterSpacing: '-0.01em',
      lineHeight: '130%',
    },
    body4: {
      fontSize: '16px',
      fontWeight: 400,
      letterSpacing: '-0.01em',
      lineHeight: '132%',
    },
    body5: {
      fontSize: '14px',
      fontWeight: 400,
      letterSpacing: '-0.01em',
      lineHeight: '130%',
    }, //14
    body6: {
      fontSize: '13px',
      fontWeight: 400,
    },
    body8: {
      fontSize: '12px',
      fontWeight: 400,
    },
    body9: {
      fontSize: '11px',
      fontWeight: 400,
      lineHeight: '16px',
    }, //11
    body10: {
      fontSize: '10px',
      fontWeight: 400,
      lineHeight: '8px',
    }, //10
    numberLabel: {
      fontSize: 16,
      fontWeight: 500,
    },

    title2: {
      fontSize: '22px',
      lineHeight: '28px',
      fontWeight: 600,
    },

    title3: {
      fontSize: '20px',
      lineHeight: '28px',
      fontWeight: 600,
    },

    title4: {
      fontSize: 18,
      fontWeight: 600,
    },

    title5: {
      fontSize: '16px',
      lineHeight: '24px',
      fontWeight: 600,
    },

    title6: {
      fontSize: '14px',
      lineHeight: '22px',
      fontWeight: 600,
    },

    title7: {
      fontSize: '13px',
      lineHeight: '20px',
      fontWeight: 600,
    },

    subTitle1: {
      fontWeight: 500,
      fontSize: '30px',
    },
    subTitle2: {
      fontWeight: 500,
      fontSize: '25px',
      letterSpacing: '-0.01em',
    },
    subTitle3: {
      fontWeight: 500,
      fontSize: '18px',
      letterSpacing: '-0.01em',
    },
    subTitle4: {
      fontWeight: 400,
      fontSize: '15px',
      letterSpacing: '-0.01em',
    },
    subTitle5: {
      fontWeight: 400,
      fontSize: '14px',
      letterSpacing: '-0.01em',
    },
    subTitle6: {
      fontWeight: 500,
      fontSize: '12px',
      letterSpacing: '-0.01em',
    },

    button1: {
      fontWeight: 500,
      fontSize: '20px',
      letterSpacing: '-0.01em',
    },

    button2: {
      fontWeight: 500,
      fontSize: '18px',
    },

    button3: {
      fontWeight: 500,
      fontSize: '16px',
    },

    button4: {
      fontWeight: 500,
      fontSize: '14px',
    },

    button5: {
      fontWeight: 500,
      fontSize: '12px',
    },
  },
  breakpoints: {
    values: {
      xxs: 0,
      xs: 450,
      sm: 600,
      md: 960,
      lg: 1280,
      llg: 1600,
      xl: 1920,
      xxl: 2200,
      xxxl: 2600,
      xxxxl: 3000,
      xxxxxl: 3400,
      xxxxxxl: 3800,
    },
  },
  card: {
    cursor: 'pointer',
    backgroundColor: getColorPalette(mode)?.background?.card,
    border: `1px solid ${getColorPalette(mode)?.borderLight}`,
    position: 'relative',
    boxSizing: 'border-box',
    transition: '0.1s',
    marginRight: '4px 12px 4px 0',
  },
});
