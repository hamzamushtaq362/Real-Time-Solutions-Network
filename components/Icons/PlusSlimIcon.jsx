import React from 'react';

const PlusSlimIcon = ({ color, width, height, ...rest }) => {
  return (
    <svg viewBox="0 0 102 102" fill="none" xmlns="http://www.w3.org/2000/svg" width={width ?? '12'} height={height ?? '12'} {...rest}>
      <path d="M51 21.25V80.75" stroke={color ?? '#F1F1F1'} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M21.25 51H80.75" stroke={color ?? '#F1F1F1'} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>

);
};

export default PlusSlimIcon;