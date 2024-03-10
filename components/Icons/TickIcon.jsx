import React from 'react';

const TickIcon = ({ color, width, height, ...rest }) => {
  return (
    <svg viewBox="0 0 19 14" fill="none" xmlns="http://www.w3.org/2000/svg" width={width ?? 24} height={height ?? 24} {...rest}>
      <path d="M18 1L6.3125 13L1 7.54545" stroke={color ?? 'black'} strokeLinecap="square" strokeLinejoin="round"/>
    </svg>
  );
};

export default TickIcon;