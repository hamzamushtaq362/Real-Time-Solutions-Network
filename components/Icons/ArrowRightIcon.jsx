import React from 'react';

const ArrowRightIcon = ({ color, width, height, ...rest }) => {
  return (
    <svg viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg" width={width ?? '12'} height={height ?? '12'} {...rest}>
      <path d="M1 7H17M17 7L11 1M17 7L11 13" stroke={color ?? '#000'} strokeLinecap="square"/>
    </svg>
  );
};

export default ArrowRightIcon;