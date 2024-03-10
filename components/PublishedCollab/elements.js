import { Box, Typography, styled } from '@mui/material';

export const PublishedCollabWrapper = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  margin: theme.spacing(8, 0, 1, 3),
  gap: '1rem',
}));

export const PublishedCollabHeader = styled(Typography)(({ theme }) => ({
  // TODO: Use font styles from global theme
  fontSize: '2.5rem',
  fontWeight: 'bold',
  color: theme.palette.text.primary,
}));

export const NFTDetailsWrapper = styled(Box)({
  //   textAlign: 'center',
  //   display: 'flex',
  //   alignItems:'center',
  //   flexDirection: 'column',
  //   overflow: 'hidden',
  margin: '4rem 0',
  display: 'grid',
  gridTemplateColumns: '50rem 60rem',
  columnGap: '1rem',
  justifyContent: 'flex-start',
  gap: '2rem',
});

export const NFTImageContainer = styled(Box)({
  width: '50rem',
  height: '45rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  //   textAlign: 'center',
  //   flexDirection: 'column',
  //   overflow: 'hidden',
  //   margin: '4rem 0',
  //   gap: '1rem',
});
export const NFTContentContainer = styled(Box)({
  textAlign: 'left',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  flexDirection: 'column',
  overflow: 'hidden',
  padding: '1rem',
  gap: '25rem',
});

export const NFTDetailsImage = styled('img')({
  //   alignItems: 'center',
  //   marginTop: '2rem',
  width: '50rem',
  height: '45rem',
  borderRadius: '2rem',
  objectFit: 'cover',
});

export const NFTDescription = styled(Typography)(({ theme }) => ({
  ...theme.typography.body5,
  marginTop: '1rem',
  color: theme.palette.text.primary,
}));

export const NFTDetails = styled(Box)({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  flexDirection: 'column',
  overflow: 'hidden',
  //   margin: '4rem 0',
  gap: '1rem',
});
export const NFTLinks = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  // marginTop: '18rem',
  gap: '1rem',
});

export const NFTHeaderLink = styled(Box)({
  cursor: 'pointer',
  padding: '1rem',
});

// Creator Comments-Box styles

export const CommentBoxOuterDiv = styled(Box)(({ theme }) => ({
  width: '40rem',
  border: `1px solid ${theme.palette.background.border}`,
  borderRadius: '4px',
  backgroundColor: theme.palette.grey.main,
  padding: '1rem',
  // flexWrap: 'wrap',
  wordWrap: 'break-word',
}));
export const CommentBoxAvatarDetails = styled(Box)({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  // justifyContent: 'center',
  padding: '1rem',
});
export const CommentBoxComments = styled(Box)({
  width: '100%',
  padding: '1rem',
});

export const CommentBoxTypography = styled(Typography)(({ theme }) => ({
  ...theme.typography.h9,
  textAlign: 'left',
  fontFamily: 'inherit',
  color: theme.palette.text.primary,
  // flexWrap: 'wrap',
  wordWrap: 'break-word',
}));

export const CommentBoxUserImage = styled('img')({
  alignItems: 'center',
  width: '6rem',
  height: '6rem',
  borderRadius: '100%',
  objectFit: 'cover',
});

export const CommentBoxAvatarContent = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  flexDirection: 'column',
  padding: '.5rem',
  marginLeft: '1rem',
  gap: '.2rem',
  flexWrap: 'wrap',
  wordWrap: 'break-word',
});
export const CollabConnectionDiv = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1rem',
});

export const CollabConnectionDivIcon = styled('img')({
  alignItems: 'center',
  width: '1.5rem',
  height: '1.5rem',
  // borderRadius: '100%',
  objectFit: 'cover',
});

export const CollabConnectionDivTypo = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  textAlign: 'center',
  fontFamily: 'inherit',
  color: theme.palette.text.primary,
}));

export const CommentBoxAvatarName = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  fontFamily: 'inherit',
  ...theme.typography.h9,
  color: theme.palette.text.primary,
}));

export const CommentBoxAvatarRoleOuterDiv = styled(Box)(
  ({ theme, userRole }) => ({
    borderRadius: '5px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:
      userRole === 'Creator'
        ? theme.palette.badges.admin
        : theme.palette.badges.member,
    // backgroundColor: '#D9FFE1', // green
    padding: '.2rem 1rem',
  }),
);

export const CommentBoxAvatarRole = styled(Typography)(({ theme }) => ({
  fontFamily: 'inherit',
  ...theme.typography.h9,
  color: theme.palette.text.primary,
}));

export const CollabLink = styled(Box)(({ theme }) => ({
  ...theme.typography.h9,
  color: theme.palette.text.primary,
  cursor: 'pointer',
  margin: theme.spacing(0, 1),
  display: 'flex',
  alignItems: 'center',
  borderBottom: `1px solid ${theme.palette.text.primary}`,
}));
