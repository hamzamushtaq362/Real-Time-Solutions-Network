import { Box, styled, Typography } from '@mui/material';

export const ProfileCardContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  margin: '0 2rem',
});

export const BottomLeftContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
});

export const BottomLeftSubContainer1 = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginRight: '1rem',
  fontStyle: 'normal',
  fontWeight: '500',
  fontSize: '1.2rem',
  lineHeight: '16px',
  /* identical to box height, or 160% */

  textAlign: 'center',

  /* Natural 3 */
  color: theme.palette.grey.commonText,
}));

export const StatText = styled(Typography)(({ theme }) => ({
  fontSize: '1.2rem',
  marginLeft: '0.5rem',
}));

export const BottomLeftSubContainer2 = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  /* identical to box height, or 160% */

  textAlign: 'center',

  /* Natural 3 */

  color: theme.palette.grey.commonText,
}));

export const BottomRightContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
});

export const RightSubContainer1 = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  marginRight: '1rem',
  flexDirection: 'column',
});

export const BadgeImage = styled('img')({
  width: '20.31px',
  height: '20.31px',
  marginBottom: '0.5rem',
  borderRadius: '50%',
});

export const BadgeText = styled(Typography)(({ theme }) => ({
  ...theme.typography.body10,

  /* identical to box height, or 117% */

  textAlign: 'center',

  /* Natural 4 */
  color: theme.palette.grey.common,
}));

export const RightSubContainer2 = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
});
