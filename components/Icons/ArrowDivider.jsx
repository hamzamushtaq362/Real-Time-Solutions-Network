import React from 'react';

export const ArrowDivider = ({ color, width, height, ...rest }) => {
  return (
    <svg viewBox="0 0 20 46" fill="none" xmlns="http://www.w3.org/2000/svg" width={width ?? '12'} height={height ?? '12'} {...rest}>
      <path d="M1 1L19 23L1 45" stroke={color ?? '#F1F1F1'} strokeWidth='0.7'/>
    </svg>
  );
};
