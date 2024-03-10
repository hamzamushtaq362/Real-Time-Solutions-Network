import React from 'react';

export const ImageUploadIcon = ({ color, width, height, ...rest }) => {
  return (
    <svg viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg" width={width ?? '12'} height={height ?? '12'} {...rest}>
      <path d="M26.125 4.125H6.875C5.35622 4.125 4.125 5.35622 4.125 6.875V26.125C4.125 27.6438 5.35622 28.875 6.875 28.875H26.125C27.6438 28.875 28.875 27.6438 28.875 26.125V6.875C28.875 5.35622 27.6438 4.125 26.125 4.125Z"  stroke={color ?? '#020202'} strokeWidth="1.17857" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M11.6875 13.75C12.8266 13.75 13.75 12.8266 13.75 11.6875C13.75 10.5484 12.8266 9.625 11.6875 9.625C10.5484 9.625 9.625 10.5484 9.625 11.6875C9.625 12.8266 10.5484 13.75 11.6875 13.75Z" stroke={color ?? '#020202'} strokeWidth="1.17857" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M28.875 20.625L22 13.75L6.875 28.875" stroke={color ?? '#020202'} strokeWidth="1.17857" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};
