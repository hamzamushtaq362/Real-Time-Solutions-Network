import React from 'react';

export const MailFilledIcon = ({ color, width, height, ...rest }) => {
  return (
  <svg width={width ?? '12'} height={height ?? '12'} {...rest} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.66927 2.6665H13.3359C14.0693 2.6665 14.6693 3.2665 14.6693 3.99984V11.9998C14.6693 12.7332 14.0693 13.3332 13.3359 13.3332H2.66927C1.93594 13.3332 1.33594 12.7332 1.33594 11.9998V3.99984C1.33594 3.2665 1.93594 2.6665 2.66927 2.6665Z" stroke={color ?? '#f1f1f1'} strokeWidth="0.653061" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14.6693 3.99951L8.0026 8.66618L1.33594 3.99951" stroke={color ?? '#f1f1f1'} strokeWidth="0.653061" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
  );
};
