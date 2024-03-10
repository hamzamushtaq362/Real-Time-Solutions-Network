import { styled, Box } from '@mui/material';
import Link from 'next/link';

export const LogoContainer = styled(Box)(({ isMobileView }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: isMobileView ? 'flex-start' : 'center',
  width: '140px',
  cursor: 'pointer',
}));

export const LogoTextLink = styled(Link)(({ theme, color }) => ({
  lineHeight: '32.41px',
  letterSpacing: '0.3px',
  color: color ? color : theme.palette.background.full,
  fontFamily: theme.typography.fontFamilyFreight,
  fontWeight: 700,
  cursor: 'pointer',
  fontSize: 32,
}));
