import React from 'react';
import { Box, styled } from '@mui/material';

const BalanceCardContainer = styled(Box)(
  ({ width, height, margin, theme }) => ({
    margin: margin ? margin : '2.5rem .5rem',
    height: height ? height : '',
    padding: '1.5rem 1.5rem',
    border: `solid 1px ${theme.palette.grey.normal2}`,
    borderRadius: '8px',
    width: width ? width : '',
  }),
);

export const CardLayout = ({ width, height, margin, children }) => {
  return (
    <BalanceCardContainer width={width} height={height} margin={margin}>
      {children}
    </BalanceCardContainer>
  );
};
