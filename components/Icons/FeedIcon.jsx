import React from 'react';

const FeedIcon = ({ color, width, height, ...rest }) => {
  return (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width={width ?? 24} height={height ?? 24} {...rest}>
    <path d="M4 11C6.38695 11 8.67613 11.9482 10.364 13.636C12.0518 15.3239 13 17.6131 13 20M4 4C8.24346 4 12.3131 5.68571 15.3137 8.68629C18.3143 11.6869 20 15.7565 20 20M6 19C6 19.5523 5.55228 20 5 20C4.44772 20 4 19.5523 4 19C4 18.4477 4.44772 18 5 18C5.55228 18 6 18.4477 6 19Z" stroke={color ?? 'black'} strokeWidth="2" strokeLinecap="square" strokeLinejoin="round"/>
  </svg>
  );
};

export default FeedIcon;