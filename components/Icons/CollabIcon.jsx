import React from 'react';

export const CollabOutlined = ({ color, width, height }) => {
  return (
    <svg width={width || "24"} height={height || "24"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M20 10C13.0556 10 10 13.0556 10 20C10 13.0556 6.94444 10 0 10C6.94444 10 10 6.94444 10 0C10 6.94444 13.0556 10 20 10Z" stroke={color ?? 'black'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  );
};
