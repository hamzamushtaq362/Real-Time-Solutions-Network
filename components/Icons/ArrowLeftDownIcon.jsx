import React from 'react';

export const ArrowLeftDownIcon = ({ color, width, height, ...rest }) => {
  return (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width={width ?? '12'} height={height ?? '12'} {...rest}>
    <path d="M42.0223 40.9963V48H0L0 5.97768H7.00372L7.00372 36.0447L43.0484 -1.9819e-06L48 4.95163L11.9553 40.9963H42.0223Z" fill={color ?? '#020202'}/>
  </svg>

);
};
