import React from 'react';

const ShareIcon = ({ color, width, height, ...rest }) => {
  return (
    <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" width={width ?? '12'} height={height ?? '12'} {...rest}>
      <path d="M13.5 6C14.7426 6 15.75 4.99264 15.75 3.75C15.75 2.50736 14.7426 1.5 13.5 1.5C12.2574 1.5 11.25 2.50736 11.25 3.75C11.25 4.99264 12.2574 6 13.5 6Z" stroke={color ?? '#000'} strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4.5 11.25C5.74264 11.25 6.75 10.2426 6.75 9C6.75 7.75736 5.74264 6.75 4.5 6.75C3.25736 6.75 2.25 7.75736 2.25 9C2.25 10.2426 3.25736 11.25 4.5 11.25Z" stroke={color ?? '#000'} strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13.5 16.5C14.7426 16.5 15.75 15.4926 15.75 14.25C15.75 13.0074 14.7426 12 13.5 12C12.2574 12 11.25 13.0074 11.25 14.25C11.25 15.4926 12.2574 16.5 13.5 16.5Z" stroke={color ?? '#000'} strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6.44531 10.1328L11.5678 13.1178" stroke={color ?? '#000'} strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M11.5603 4.88281L6.44531 7.86781" stroke={color ?? '#000'} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

export default ShareIcon;