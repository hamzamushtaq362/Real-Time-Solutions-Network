import React from 'react';

export const EditRectangleIcon = ({ color, width, height, ...rest }) => {
  return (
  <svg viewBox="0 0 82 18" fill="none" xmlns="http://www.w3.org/2000/svg" width={width ?? '82'} height={height ?? "18"} {...rest}>
    <rect width={width ?? '82'} height={height ?? "18"} fill={color ?? '#f1f1f1'}/>
  </svg>
  );
};

