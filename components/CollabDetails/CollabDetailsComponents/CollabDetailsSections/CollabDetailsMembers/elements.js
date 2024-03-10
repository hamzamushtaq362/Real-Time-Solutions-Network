import { styled, Box, Typography } from '@mui/material';

export const CollabMemberCardContainer = styled(Box)(({ theme }) => ({
  width: '300px',
  overflow: 'hidden',
  border: `1px solid ${theme.palette.grey.greyBA}`,

  '& #button-container': {
    display: 'none',
  },

  '&:hover': {
    '& #button-container': {
      display: 'block',
    },
  },
}));

export const CollabMembersGrid = styled(Box)({
  marginTop: '100px',
  padding: '0 40px',
  width: '100%',
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
  gridGap: '2rem',
  justifyContent: 'scente',
});

export const MemberImageSectionContainer = styled(Box)({
  width: '100%',
  height: '12rem',
  position: 'relative',
});

export const MessageButtonContainer = styled(Box)(({ theme }) => ({
  width: '2.5rem',
  height: '2.5rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '50%',
  backgroundColor: theme.palette.background.default,
  position: 'absolute',
  top: 10,
  right: 10,
  cursor: 'pointer',
}));

export const CoverImage = styled('img')({
  height: '100%',
  width: '100%',
  objectFit: 'cover',
});

export const ProfilePicContainer = styled(Box)({
  height: '6rem',
  width: '6rem',
  borderRadius: '50%',
  position: 'absolute',
  left: '2rem',
  bottom: '-2.8rem',
});

export const MemberDescriptionSectionContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '12.5rem',
  borderBottom: `1px solid ${theme.palette.grey.greyBA}`,
  padding: '10px',
  marginTop: '26px',
}));

export const MemberNameText = styled(Typography)(({ theme }) => ({
  ...theme.typography.h7,
  color: theme.palette.text.primary,
}));

export const MemberUserNameText = styled(Typography)(({ theme }) => ({
  ...theme.typography.body5,
  color: theme.palette.grey.common,
  marginTop: -5,
}));

export const MemberBioText = styled(Typography)(({ theme }) => ({
  ...theme.typography.body5,
  color: theme.palette.grey.commonSecondary,
}));

export const MemberRolesSectionContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '10.5rem',
  borderBottom: `1px solid ${theme.palette.grey.greyBA}`,
  padding: '10px',
}));

export const RolesLabelText = styled(Typography)(({ theme }) => ({
  ...theme.typography.body8,
  color: theme.palette.grey.common,
}));

export const RolesChipContainer = styled(Box)({
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-start',
  flexWrap: 'wrap',
  columnGap: '5px',
  rowGap: '2px',
});

export const RoleChip = styled(Box)(({ theme }) => ({
  height: '3rem',
  maxWidth: '150px',
  minWidth: '80px',
  padding: '2px 20px',
  borderRadius: '30px',
  backgroundColor: theme.palette.grey.normal2,
  ...theme.typography.body6,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const MemberCollabCountSectionContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '6rem',
  borderBottom: `1px solid ${theme.palette.grey.greyBA}`,
  padding: '10px',
  display: 'flex',
  justifyContent: 'space-between',
}));

export const CollabCountContainer = styled(Box)({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  columnGap: '4px',
});

export const MemberActionIconsContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  columnGap: '5px',
});

export const IconWrapper = styled(Box)(({ theme }) => ({
  height: '2.5rem',
  width: '2.5rem',
  border: `1px solid ${theme.palette.background.inverse}`,
  cursor: 'pointer',
  padding: '2px',
  backgroundColor: theme.palette.grey.normal2,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '50%',
}));

export const CollabCountText = styled(Typography)(({ theme }) => ({
  ...theme.typography.body8,
  color: theme.palette.grey.common,
}));

export const CompensationLabelText = styled(CollabCountText)({});

export const CompensationValueText = styled(Typography)(({ theme }) => ({
  ...theme.typography.body5,
  color: theme.palette.text.primary,
}));

export const MemberCompensationContainer = styled(Box)({
  width: '100%',
  height: '5rem',
  padding: '10px',
  display: 'flex',
  alignItems: 'center',
  columnGap: '16px',
});

export const NoMembersFoundText = styled(Typography)(({ theme }) => ({
  ...theme.typography.h6,
  color: theme.palette.grey.common,
}));
export const CrossWrap = styled(Box)(({ theme }) => ({
  position: 'absolute',
  right: 30,
  top: 20,
}));
export const DialogWrap = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6),
}));
export const SearchInputWrap = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 100,
}));
export const NotFoundText = styled(Box)(({ theme, hovered }) => ({
  ...theme.typography.h7,
  color: hovered
    ? theme.palette.text.secondary
    : theme.palette.text.inverseSecondary,
}));
export const DialogTitle = styled(Box)(({ theme }) => ({
  ...theme.typography.h1,
  color: theme.palette.text.inverse,
  width: '80%',
}));

export const SearchedItemWrap = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottom: `1px solid ${theme.palette.borderLightInverse}`,
}));
