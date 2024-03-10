import React from 'react';

export const ShareFilledIcon = ({ color, width, height, ...rest }) => {
  return (
    <svg viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg" width={width ?? '12'} height={height ?? '12'} {...rest}>
      <path d="M1.04387 16.7807L1.17553 4.78146L16.1746 4.94604M16.1746 4.94604L12.131 8.90191M16.1746 4.94604L12.2188 0.90239" stroke={color ?? '#f1f1f1'} strokeLinecap="square"/>
    </svg>
  );
};