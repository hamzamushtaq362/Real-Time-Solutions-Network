import React from 'react';

export const ShareUploadIcon = ({ color, width, height, ...rest }) => {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" width={width ?? '12'} height={height ?? '12'} {...rest}>
      <path d="M17.5 10V13.5C17.5 14.9001 17.5 15.6002 17.2275 16.135C16.9878 16.6054 16.6054 16.9878 16.135 17.2275C15.6002 17.5 14.9001 17.5 13.5 17.5H6.5C5.09987 17.5 4.3998 17.5 3.86502 17.2275C3.39462 16.9878 3.01217 16.6054 2.77248 16.135C2.5 15.6002 2.5 14.9001 2.5 13.5V10M13.3333 5.83333L10 2.5M10 2.5L6.66667 5.83333M10 2.5V12.5" stroke={color ?? '#000'} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};