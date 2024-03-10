import { Box, styled, TextField, Button } from '@mui/material';


export const SubscribeWrap = styled(Box)(({ theme }) => ({
  borderWidth: '1px 0 1px 0',
  borderStyle: 'solid',
  borderColor: theme.palette.border2,
  padding: '40px 0 70px',
}));
export const SubscribeText = styled(Box)(({ theme }) => ({
  ...theme.typography.h6,
  fontSize: 20,
  color: theme.palette.text.primary,

}));
export const SubscribeInput = styled(TextField)(({ theme }) => ({
  borderRadius: '100px',
  marginRight: theme.spacing(1),
  minWidth: 400,
  '& .MuiOutlinedInput-root': {
    ...theme.typography.h6,
    borderRadius: '100px',
    padding: theme.spacing(0, 2),
    position: 'relative',
    height: 52,
  },
  '& .MuiFormHelperText-root': {
    ...theme.typography.h6,
    fontSize: 16,
    position: 'absolute',
    bottom: -30
  },
  "& input::placeholder": {
    fontSize: 16,
    color: theme.palette.border,
    fontWeight: 300
  },
  '@media (max-width : 500px)': {
    minWidth: 200,
    '& .MuiOutlinedInput-root': {
      height: 55,
      fontSize: 18
    }
  },
}));
export const SubscribeButton = styled(Button)(({ theme }) => ({
  ...theme.typography.h6,
  fontSize: 17,
  color: theme.palette.text.inverse,
  borderRadius: '100px',
  backgroundColor: theme.palette.background.inverse,
  padding: theme.spacing(1, 4),
  textTransform: 'capitalize',
  transition: 'all 100ms ease-out',
  height: 52,
  '& svg': {
    marginLeft: theme.spacing(1),
  },
  '&:hover': {
    backgroundColor: theme.palette.background.paperLanding,
    border: `1px solid ${theme.palette.border2}`,
    color: theme.palette.text.primary,
    '& g': {
      stroke: theme.palette.text.primary
    }
  },
  '@media (max-width : 500px)': {
    fontSize: 16,
    height: 55,
    padding: theme.spacing(1, 2)
  }
}));

export const FormWrap = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  marginTop: theme.spacing(2)
}));

export const NavLinksWrap = styled(Box)(({ theme }) => ({
  display: 'inline-block'
}));

export const LinkTitle = styled(Box)(({ theme }) => ({
  ...theme.typography.h6,
  fontSize: 16,
  color: '#9D9D9D',
  marginBottom: theme.spacing(3),

  '@media (max-width : 500px)': {
    marginBottom: theme.spacing(2),
    fontSize: 16,
  },
}));

export const LinkText = styled(Box)(({ theme }) => ({
  ...theme.typography.h6,
  fontSize: 16,
  position: "relative",
  overflow: "hidden",
  display: "inline",
  cursor: 'pointer',
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(2),
  "&::after": {
    content: "''",
    position: "absolute",
    zIndex: -1,
    right: 0,
    width: 0,
    bottom: -5,
    backgroundColor: theme.palette.text.primary,
    height: 1,
    transitionProperty: "width",
    transitionDuration: "50ms",
    transitionTimingFunction: "ease-out",
  },
  "&:hover::after, &:focus::after, &:active::after": {
    left: 0,
    right: "auto",
    width: "100%",
  },

  '@media (max-width : 600px)': {
    fontSize: 18,
  },
}));

export const RoundedIcon = styled(Box)(({ theme, hovered, padding, backgroundColor }) => ({
  border: `1px solid ${theme.palette.border2}`,
  backgroundColor: hovered ? theme.palette.background.inverse : (backgroundColor ?? theme.palette.background.paper),
  borderRadius: 100,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(padding ?? 2.5),
  cursor: 'pointer',
  transition: 'all 100ms ease-in',

  '@media (max-width : 500px)': {
    marginRight: theme.spacing(1),
    padding: theme.spacing(2),
  },
}));

export const SectionHeaderContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: '190px 30px 100px',
  borderBottom: `1px solid ${theme.palette.border2}`,
  '@media (max-width : 900px)': {
    padding: '120px 30px 80px',
  },

  '@media (max-width : 600px)': {
    padding: '80px 20px 60px',
  },
}));

export const SocialIconsWrap = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'flex-end',

  '@media (max-width : 500px)': {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginTop: theme.spacing(4)
  },
}));

export const LinkTextWrap = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(0.5)
}));
