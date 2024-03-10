import { styled, Box } from '@mui/material';

export const DashboardContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  overflow: 'hidden',
}));

export const BannerContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  background: theme.palette.background.paper,
  alignItems: 'center',
  paddingTop: "12px",
  paddingBottom: "12px",
  backgroundImage: "linear-gradient(135deg,#ff51d7,#ff4848 30%,#c300ff 70%,#6248ff)",
  textShadow: "1px 1px 3px rgb(0 0 0 / 20%)",
  left: 0,
  top: 0,
  right: 0,
  zIndex: 100,
  display: "flex",
  padding: "16px 40px",
  justifyContent: "center",
  backgroundColor: "#060606",
  color: theme.palette.white.main,
  textAlign: "center",

}));
export const BannerTextWrap = styled(Box)({
  position: "relative",
  display: "flex",
  maxWidth: "1280px",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center"
})
export const BannerText = styled(Box)(({ theme }) => ({
  ...theme.typography.h6,
}));
export const BannerLink = styled(Box)(({ theme }) => ({
  ...theme.typography.h6,
  cursor: 'pointer',
  marginLeft: '8px',
  padding: "2px 10px",
  border: "1px solid hsla(0,0%,100%,.1)",
  borderRadius: "50px",
  backgroundColor: "hsla(0,0%,100%,.2)",
  color: "#fff",
  textDecoration: "none",
  transition: '0.4s',
  "&:hover": {
    borderColor: theme.palette.white.main,
    backgroundColor: theme.palette.white.main,
    color: theme.palette.black.main,
  }
}));

export const DashboardContainerBottom = styled(Box)(({ theme, showBanner }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  marginTop: theme.spacing(showBanner ? 12: 8)
}));

export const DashboardContainerRight = styled(Box)(({ theme, showBanner, IsInbox }) => ({
  width: '100%',
  minHeight: showBanner ? 'calc(100vh - 13rem)' : 'calc(100vh - 7rem)',
  paddingBottom: IsInbox ? 0 : showBanner ? '20px': 0,
  marginTop: IsInbox? theme.spacing(showBanner ? '21px' : 0): theme.spacing(showBanner ? 3 : 0),
}));
