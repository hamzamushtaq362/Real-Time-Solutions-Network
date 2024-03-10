import React from 'react';

export const FollowIcon = ({ color, width, height, ...rest }) => {
  return (
    <svg viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" width={width ?? '12'} height={height ?? '12'} {...rest}>
      <path d="M2.12517 9.22424C5.79786 8.67203 8.32707 11.202 7.77565 14.8747M2.12517 5.69347C7.74776 5.14126 11.8587 9.25221 11.3065 14.8748M2.12517 2.16192C9.69845 1.61049 15.3896 7.30161 14.8381 14.8749M3.54167 14.875C2.75942 14.875 2.125 14.2406 2.125 13.4583C2.125 12.6761 2.75942 12.0417 3.54167 12.0417C4.32391 12.0417 4.95833 12.6761 4.95833 13.4583C4.95833 14.2406 4.32391 14.875 3.54167 14.875Z" stroke={color ?? "black"} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};
