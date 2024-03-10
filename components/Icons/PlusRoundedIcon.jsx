import React from 'react';

const PlusRoundedIcon = ({ color, width, height, ...rest }) => {
  return (
    <svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" width={width ?? 12} height={height ?? 12} {...rest}>
      <path d="M11 4V11M11 18V11M4 11H11M18 11H11" stroke={color ?? '#000'} strokeLinecap="square" strokeWidth="1.2" />
      <path d="M11 4V11M11 18V11M4 11H11M18 11H11" stroke={color ?? '#000'} strokeLinecap="square" strokeWidth="1.2" />
      <path d="M11 21C16.5228 21 21 16.5228 21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5228 5.47715 21 11 21Z" stroke={color ?? '#000'} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

export default PlusRoundedIcon;