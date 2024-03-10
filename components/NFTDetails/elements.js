import { Box, styled, Typography } from '@mui/material';

export const NFTBannerBox = styled(Box)({
  width: '80%',
  marginTop: '20px',
  height: '60px',
  border: '1px solid #3dbefa',
  borderRadius: '6px',
  padding: '10px',
  paddingLeft: '13px',
  paddingRight: '13px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: '#89d4f7',
  textAlign: 'center',
  margin: '2rem auto 1rem  auto',
});

export const NFTBannerText = styled(Typography)(({ theme }) => ({
  ...theme.typography.h7,
  color: theme.palette.text.primary,
}));

export const NFTDetailContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: '20px',
  backgroundColor: theme.palette.background.default,
}));

export const NFTBoxContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '323px',
  backgroundColor: theme.palette.background.default,
  borderRadius: '12px',
  margin: '20px',
  display: 'flex',
}));

export const NFTBoxImageContainer = styled(Box)({
  width: '30%',
});

export const NFTBoxTextContainer = styled(Box)({
  width: '120rem',
  padding: '10px',
  wordWrap: 'break-word',
});

export const NFTContentText = styled(Typography)(({ theme }) => ({
  ...theme.typography.body5,
  lineHeight: '24px',
  color: theme.palette.text.primary,
}));

export const NFTImageCaption = styled(Typography)(({ theme }) => ({
  ...theme.typography.title3,
  lineHeight: '26px',
  color: theme.palette.text.primary,
  textAlign: 'center',
}));

export const NFTCreatorMessageBox = styled(Box)({
  width: '100%',
});

export const NFTCreatorMessageBoxContainer = styled(Box)({
  width: '100%',
  padding: '10px',
  display: 'flex',
});
export const NFTCreatorMessageProfileContainer = styled(Box)({
  width: '20%',
  padding: '16px',
  display: 'flex',
  gap: '2rem',
});

export const NFTCreatorProfileTextContainer = styled(Box)({
  marginLeft: '20px',
});

export const NFTCreatorProfileTitle = styled(Typography)(({ theme }) => ({
  ...theme.typography.title5,
  color: theme.palette.text.primary,
}));

export const NFTCreatorMessageContainer = styled(Box)({
  width: '60%',
  padding: '10px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const NFTCreatorMessageText = styled(Typography)(({ color, theme }) => ({
  ...theme.palette.subTitle5,
  lineHeight: '16px',
  color: color ? color : theme.palette.blue.main,
}));

export const NFTCreatorButtonContainer = styled(Box)({
  width: '20%',
  padding: '10px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const MessageSeprator = styled(Box)({
  width: '90%',
  height: '1px',
  backgroundColor: '#F1F1F5',
  margin: 'auto',
});

export const NFTCreatorDetailsContainer = styled(Box)(({ theme }) => ({
  width: '98%',
  height: '396px',
  marginRight: '20px',
  backgroundColor: theme.palette.background.default,
  borderRadius: '12px',
}));

export const NFTCreatorDetailsBoxContainer = styled(Box)({
  width: '100%',
  height: '132px',
  padding: '1rem',
  marginTop: '3rem',
  gap: '1rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const NFTCreatorDetailsProfileContainer = styled(Box)({
  width: '30%',
  padding: '10px',
  display: 'flex',
  gap: '2rem',
});

export const NFTMintDiv = styled(Box)({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const NFTDetailsTopHeaderDiv = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});
export const LeftComponentForNftDetailsTopHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '1rem',
  fontSize: '17px',
});
export const MintStatusForNFTHeader = styled(Box)({
  fontFamily: 'inherit',
  padding: '1rem 2.2rem',
  borderRadius: '50px',
  backgroundImage: 'linear-gradient(to right, #c6ffdd, #fbd786, #f7797d)',
  cursor: 'pointer',
});
export const NFTHeaderLink = styled(Box)({
  cursor: 'pointer',
  padding: '1rem',
});

export const InputHeader = styled(Typography)(
  ({ color, fontWeight, fontSize, lineHeight, theme }) => ({
    color: color ? color : theme.palette.grey.common,
    fontSize: fontSize ? fontSize : '15px',
    fontWeight: fontWeight ? fontWeight : 400,
    fontFamily: 'inherit',
    lineHeight: lineHeight ? lineHeight : '24px',
  }),
);

export const InputBottomText = styled(Typography)(
  ({ variant, theme, showCursor }) => ({
    color:
      variant === 'error'
        ? theme.palette.red.main
        : theme.palette.grey.common,

    ...theme.typography.body6,
    lineHeight: '20px',
    cursor: showCursor && 'pointer',
  }),
);
