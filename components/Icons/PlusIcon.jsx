import React from 'react';

const PlusIcon = ({ color, width, height, ...rest }) => {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" width={width ?? '12'} height={height ?? '12'} {...rest}>
      <path d="M8 1V8M8 15V8M1 8H8M15 8H8" stroke={color ?? '#000'} strokeLinecap="square"/>
      <path d="M8 1V8M8 15V8M1 8H8M15 8H8" stroke={color ?? '#000'} strokeLinecap="square"/>
    </svg>
  );
};

export default PlusIcon;