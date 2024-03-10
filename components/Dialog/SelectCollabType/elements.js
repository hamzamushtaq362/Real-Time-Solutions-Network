import { styled, Box, Typography } from '@mui/material';

export const SelectCollabTypeContainer = styled(Box)(({ theme }) => ({
  background: theme.palette.background.inverse,
  display: 'flex',
  height: '100%',
}));

export const SelectCollabTypeHeader = styled(Typography)(({ theme }) => ({
  ...theme.typography.h3,
  color: theme.palette.black.main,
  marginBottom: '1rem',
}));

export const CollabSectionWrap = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%',
  padding: theme.spacing(2, 3),
}));
export const OrText = styled(Box)(({ theme }) => ({
  color: theme.palette.text.darkLabel,
  fontSize: 22,
  flex: 0.1

}));
export const OrWrap = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexDirection: 'column',
  width: 0,
  zIndex: 20
}));
export const SelectCollabTypeSubHeader = styled(Typography)(({ theme }) => ({
  ...theme.typography.h6,
  fontSize: 32,
  color: theme.palette.text.inverse,
  textTransform: 'uppercase',
  width: 100,
  fontWeight: 300
}));
export const CollabDescription = styled(Typography)(({ theme }) => ({
  ...theme.typography.h8,
  color: theme.palette.text.label,
  width: 200,
  lineHeight: '19.5px',
  fontSize: 15,
  letterSpacing: '-0.15px',
}));

export const ProjectContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  height: '100%',
  width: '100%',
  cursor: 'pointer',
  '&:hover': {
    background: theme.palette.background.full,
  }
}));