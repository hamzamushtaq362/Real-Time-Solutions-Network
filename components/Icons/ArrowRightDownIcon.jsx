import React from 'react';

export const ArrowRightDownIcon = ({ color, width, height, ...rest }) => {
  return (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width={width ?? '12'} height={height ?? '12'} {...rest}>
    <path d="M5.97768 40.9963V48H48V5.97768H40.9963V36.0447L4.95163 -1.9819e-06L-1.9819e-06 4.95163L36.0447 40.9963H5.97768Z" fill={color ?? '#020202'}/>
  </svg>
  );
};
