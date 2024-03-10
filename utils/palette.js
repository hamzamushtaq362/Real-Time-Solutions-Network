import { alpha } from '@mui/material/styles';

// SETUP COLORS
const PRIMARY = {
  lighter: '#C8FACD',
  light: '#5BE584',
  main: '#00AB55',
  dark: '#007B55',
  darker: '#005249',
};
const SECONDARY = {
  lighter: '#D6E4FF',
  light: '#84A9FF',
  main: '#3366FF',
  dark: '#1939B7',
  darker: '#091A7A',
};
const INFO = {
  lighter: '#D0F2FF',
  light: '#FFEC33',
  main: '#FFB900',
  dark: '#0C53B7',
  darker: '#04297A',
};

const SUCCESS = {
  lighter: '#E9FCD4',
  light: '#6EFFE3',
  main: '#3BE8B0',
  dark: '#229A16',
  darker: '#08660D',
};
const WARNING = {
  lighter: '#FFF7CD',
  light: '#cc6f3d',
  main: '#F98A4B',
  dark: '#B78103',
  darker: '#7A4F01',
};

const ERROR = {
  lighter: '#FFE7D9',
  light: '#cc5056',
  main: '#FC636B',
  dark: '#B72136',
  darker: '#7A0C2E',
};

const GREY = {
  grey: '#0D1117',
  0: '#FFFFFF',
  30: '#F8F8F8',
  100: '#F9FAFB',
  200: '#D0D2D3',
  300: '#DFE3E8',
  400: '#A2A4A7',
  500: '#8B8D91',
  600: '#73777C',
  700: '#5C6066',
  800: '#454950',
  900: '#2D333A',
  500_8: alpha('#919EAB', 0.08),
  500_12: alpha('#919EAB', 0.12),
  500_16: alpha('#919EAB', 0.16),
  500_24: alpha('#919EAB', 0.24),
  500_32: alpha('#919EAB', 0.32),
  500_48: alpha('#919EAB', 0.48),
  500_56: alpha('#919EAB', 0.56),
  500_80: alpha('#919EAB', 0.8),
};

const CHART_COLORS = {
  violet: ['#826AF9', '#9E86FF', '#D0AEFF', '#F7D2FF'],
  blue: ['#2D99FF', '#83CFFF', '#A5F3FF', '#CCFAFF'],
  green: ['#2CD9C5', '#60F1C8', '#A4F7CC', '#C0F2DC', '#5B8930'],
  yellow: ['#FFE700', '#FFEF5A', '#FFF7AE', '#FFF3D6', '#FDA92D'],
  red: ['#FF6C40', '#FF8F6D', '#FFBD98', '#FFF2D4', '#D24D57'],
};

const COMMON = {
  common: {
    black: '#000',
    white: '#fff',
    red: '#FC636B',
    pink: '#E91E63',
    green: '#3BE8B0',
  },
  primary: { ...PRIMARY, contrastText: '#fff' },
  secondary: { ...SECONDARY, contrastText: '#fff' },
  info: { ...INFO, contrastText: '#fff' },
  success: { ...SUCCESS, contrastText: GREY[800] },
  warning: { ...WARNING, contrastText: GREY[800] },
  error: { ...ERROR, contrastText: '#fff' },
  grey: GREY,
  chart: CHART_COLORS,
  divider: GREY[500_24],
  action: {
    hover: GREY[500_8],
    selected: GREY[500_16],
    disabled: GREY[500_80],
    disabledBackground: GREY[500_24],
    focus: GREY[500_24],
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
};

const palette = {
  light: {
    ...COMMON,
    mode: 'light',
    text: { primary: GREY[800], secondary: GREY[600], disabled: GREY[500] },
    background: { paper: '#fff', default: '#fff', neutral: GREY[200] },
    action: { active: GREY[600], ...COMMON.action },
  },
  dark: {
    ...COMMON,
    mode: 'dark',
    text: { primary: GREY[30], secondary: GREY[500], disabled: GREY[600] },
    background: {
      paper: GREY[900],
      default: GREY['grey'],
      neutral: GREY[500_16],
    },
    action: { active: GREY[500], ...COMMON.action },
  },
};

export default palette;
