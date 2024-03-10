import { Box, styled, Typography } from '@mui/material';
import { useIsMobileView } from 'utils/utils';

export const UserSettingsContainer = styled(Box)({
  width: '100%',
});

export const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '32px',
  fontWeight: 400,
  lineHeight: '41.6px',
  letterSpacing: '-1%',
  color: theme.palette.text.primary,
  width: '100%',
}));

export const SettingsHeader = styled(Box)(({ theme }) => () => {
  const isMobileView = useIsMobileView();
  return {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: isMobileView ? '1rem 2rem 2rem 2rem;' : '2.5rem 2rem 0 2rem',
    rowGap: 20,
    flexDirection: isMobileView ? 'column' : 'row',
    borderTop: isMobileView ? `1px solid ${theme.palette.borderLight}` : '',
  };
});

export const RowContainer = styled(Box)(() => {
  const isMobileView = useIsMobileView();
  return {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: isMobileView ? 'column' : 'row',
  };
});

export const RowLabelHeaderContainer = styled(Box)({
  width: '100%',
  flex: 1,
  marginBottom: '1.2rem',
  marginRight: 16,
});

export const RowLabelHeader = styled(Typography)(({ theme }) => ({
  ...theme.typography.body4,
  lineHeight: '130%',
  letter: '-2%',
  color: theme.palette.text.primary,
}));

export const InputLabel = styled(Typography)(({ theme, type }) => ({
  ...theme.typography.h9,
  color: type === 'error' ? 'red' : theme.palette.text.label,
}));

export const RowContentContainer = styled(Box)(() => {
  const isMobileView = useIsMobileView();
  return {
    position: 'relative',
    width: '100%',
    flex: 4,
    display: 'flex',
    columnGap: '20px',
    flexDirection: isMobileView ? 'column' : 'row',
    marginBottom: '1.2rem',
  };
});

export const RowImageContentContainer = styled(Box)(() => {
  return {
    width: '100%',
    flex: 4,
    display: 'flex',
    columnGap: '20px',
  };
});

export const ContentSubContainer = styled(Box)(() => {
  const isMobileView = useIsMobileView();
  return {
    width: isMobileView ? '100%' : '31%',
    height: '100%',
  };
});
export const SensitiveBoxWrap = styled(Box)(
  ({ theme, hovered, background }) => ({
    border: `1px solid ${
      hovered
        ? theme.palette.background.emailBorderHover
        : theme.palette.borderLight
    }`,
    padding: '7px 12px 7px 16px',
    borderRadius: 10,
    backgroundColor: background ?? 'rgba(217, 217, 217, 0.25)',
    transition: 'border 100ms ease-out',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 55,
  }),
);
export const EditIconWrap = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.borderLight}`,
  borderRadius: 10,
  backgroundColor: theme.palette.background.paper,
  width: 40,
  height: 40,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
}));

export const SpinnerContainer = styled(Box)({
  width: '100%',
  display: 'flex',
  height: '50vh',
  alignItems: 'center',
  justifyContent: 'center',
});

export const CoverImageWrap = styled(Box)(({ width, height }) => ({
  position: 'relative',
  width,
  height,
}));
export const CoverButtonsWrap = styled(Box)(({ theme, loading, hovered }) => ({
  position: 'absolute',
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  left: 0,
  top: 0,
  bottom: 0,
  right: 0,
  zIndex: 1,
  transition: 'background 100ms ease-out',
  backgroundColor: (loading || hovered) && 'rgba(255,255,255,0.3)',
}));

export const Overlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  left: 0,
  top: 0,
  bottom: 0,
  right: 0,
  zIndex: 1,
  transition: 'background 100ms ease-out',
  background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 49%, #fff 98.12%)',
}));

export const Placeholder = styled(Box)(({ theme }) => ({
  color: theme.palette.text.label,
  fontSize: 16,
  fontFamily: theme.typography.fontFamilySystemUI,
}));
export const DialogHeading = styled(Box)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: 32,
  fontWeight: 400,
  lineHeight: '77.5%',
  letterSpacing: '-0.32px',
  padding: 28,
  fontFamily: theme.typography.fontFamilySystemUI,
}));
export const DialogLabel = styled(Box)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: 18,
  lineHeight: '77.5%',
  letterSpacing: '-0.09px',
  padding: '28px 28px 12px 28px',
  fontFamily: theme.typography.fontFamilySystemUI,
}));
