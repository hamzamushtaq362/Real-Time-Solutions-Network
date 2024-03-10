import React from 'react';

const ZapIcon = ({ color, width, height, ...rest }) => {
  return (
    <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" width={width ?? '12'} height={height ?? '12'} {...rest}>
      <path d="M6.49999 1L2.04672 6.34393C1.87232 6.55321 1.78511 6.65785 1.78378 6.74623C1.78262 6.82306 1.81686 6.89615 1.87662 6.94445C1.94537 7 2.08158 7 2.35401 7H5.99999L5.49999 11L9.95326 5.65607C10.1277 5.44679 10.2149 5.34215 10.2162 5.25377C10.2174 5.17694 10.1831 5.10385 10.1234 5.05555C10.0546 5 9.9184 5 9.64598 5H5.99999L6.49999 1Z" stroke={color ?? 'black'} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default ZapIcon;