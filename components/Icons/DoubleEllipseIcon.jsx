import React from 'react';

export const DoubleEllipseIcon = ({ color, width, height, ...rest }) => {
  return (
    <svg
      width={width ?? '12'}
      height={height ?? '12'}
      {...rest}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="8" cy="8" r="7.5" stroke={color ?? '#020202'} />
    </svg>
  );
};
