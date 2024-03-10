import { Box, styled } from '@mui/material';
import { useIsMobileView } from 'utils/utils';

export const TitleBox = styled(Box)(() => {
  const isMobileView = useIsMobileView();
  return {
    position: 'relative',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: isMobileView ? 'column' : 'row',
    rowGap: '12px',
  };
});

export const Container = styled(Box)(() => {
  const isMobileView = useIsMobileView();
  return {
    display: 'flex',
    alignItems: isMobileView ? 'flex-start' : 'center',
    justifyContent: 'space-between',
    flexDirection: isMobileView ? 'column' : 'row',
  };
});