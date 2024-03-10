import React from 'react';

const PlusMinusIcon = ({ color, width, height, isRotated, ...rest }) => {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" width={width ?? '12'} height={height ?? '12'} {...rest}>
      <path className={isRotated ? 'verticalLine hidden' : 'verticalLine'} d="M8 1V15" stroke={color ?? '#000'} strokeLinecap="square"/>
      <path d="M1 8H15" stroke={color ?? '#000'} strokeLinecap="square"/>
    </svg>
  );
};

export default PlusMinusIcon;
