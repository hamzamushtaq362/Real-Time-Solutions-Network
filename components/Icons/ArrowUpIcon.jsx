import React from 'react';

export const ArrowUpIcon = ({ color, width, height, ...rest }) => {
  return (
  <svg viewBox="0 0 36 38" fill="none" xmlns="http://www.w3.org/2000/svg" width={width ?? '12'} height={height ?? '12'} {...rest}>
    <path d="M32.4316 20.4919L35.3305 17.5929L17.9368 0.199219L0.54311 17.5929L3.44206 20.4919L15.8873 8.04668L15.8873 37.8856H19.9864L19.9864 8.04668L32.4316 20.4919Z" fill={color ?? '#F1F1F1'}/>
  </svg>
);
};
