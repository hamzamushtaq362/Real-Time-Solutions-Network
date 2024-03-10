import React from 'react';

const CloseIcon = ({ color, width, height, ...rest }) => {
  return (
    <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" width={width ?? '12'} height={height ?? '12'} {...rest}>
      <path d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5" stroke={color ?? 'black'} strokeWidth="1" />
    </svg>
  );
};

export default CloseIcon;