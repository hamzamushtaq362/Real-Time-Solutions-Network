import React from 'react';

export const CodeIcon = ({ color, width, height, ...rest }) => {
  return (
    <svg width={width ?? '12'} height={height ?? '12'} {...rest} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 36L44 24L32 12" stroke={color ?? '#020202'} strokeWidth="1.71636" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 12L4 24L16 36" stroke={color ?? '#020202'} strokeWidth="1.71636" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};
