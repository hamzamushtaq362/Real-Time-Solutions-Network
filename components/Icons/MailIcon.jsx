import React from 'react';

export const MailIcon = ({ color, width, height, ...rest }) => {
  return (
    <svg
      width={width ?? '12'}
      height={height ?? '12'}
      {...rest}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.66536 2.6665H13.332C14.0654 2.6665 14.6654 3.2665 14.6654 3.99984V11.9998C14.6654 12.7332 14.0654 13.3332 13.332 13.3332H2.66536C1.93203 13.3332 1.33203 12.7332 1.33203 11.9998V3.99984C1.33203 3.2665 1.93203 2.6665 2.66536 2.6665Z"
        stroke={color ?? '#020202'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.6654 4L7.9987 8.66667L1.33203 4"
        stroke={color ?? '#020202'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
