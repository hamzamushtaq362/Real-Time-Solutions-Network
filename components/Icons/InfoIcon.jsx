import React from 'react';

const InfoIcon = ({ color, width, height, ...rest }) => {
  return (
  <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" width={width ?? 24} height={height ?? 24} {...rest}>
    <circle cx="9" cy="9" r="8.5" stroke={color ?? '#020202'} strokeOpacity="0.8"/>
    <path d="M8.702 14V7.279H9.508V14H8.702ZM8.702 5.849V4.705H9.508V5.849H8.702Z" fill={color ?? '#020202'} fillOpacity="0.8"/>
  </svg>
  );
};

export default InfoIcon;