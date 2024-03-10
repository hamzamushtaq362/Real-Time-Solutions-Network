import React from 'react';

export const HamburgerIcon = ({ color, width, height, ...rest }) => {
  return (
    <svg viewBox="0 0 24 14" fill="none" xmlns="http://www.w3.org/2000/svg" width={width ?? '12'} height={height ?? '12'} {...rest}>
      <rect x="0.5" y="6.5" width="23" height="1" rx="0.5" fill="#020202" stroke={color ?? '#020202'}/>
      <rect x="0.5" y="0.5" width="23" height="1" rx="0.5" fill="#020202" stroke={color ?? '#020202'}/>
      <rect x="0.5" y="12.5" width="23" height="1" rx="0.5" fill="#020202" stroke={color ?? '#020202'}/>
    </svg>
  );
};

