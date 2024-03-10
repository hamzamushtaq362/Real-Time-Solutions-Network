import { Box, styled } from '@mui/material';

export const CollectiveHeadingChip = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  border: `1px solid ${theme.palette.border2}`,
  borderRadius: 100,
  width: 'fit-content',
  padding: theme.spacing(1, 6, 1, 1),
  margin: theme.spacing(4, 0)
}));
export const CollectiveChipText = styled(Box)(({ theme }) => ({
  ...theme.typography.h6,
  color: theme.palette.text.primary,
  marginLeft: theme.spacing(2)
}))

export const BlockchainImageWrap = styled(Box)(({ theme, active }) => ({
  width: 40,
  height: 40,
  borderRadius: '50%',
  border: `1px solid ${active ? theme.palette.borderLightInverse : theme.palette.borderLight}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
export const BlockchainImage = styled('img')(({ theme }) => ({
  width: '70%',
  height: '70%',
  borderRadius: '50%',
}));